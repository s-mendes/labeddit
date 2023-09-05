import { Box, Button, Container, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import { TbArrowBigDown, TbArrowBigUp, TbArrowBigDownFilled, TbArrowBigUpFilled } from 'react-icons/tb';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import convertToK from '../../util/convertToK';
import { commentLikeOrDislike, deleteComment, editComment, findLikeDislikeComments } from '../../API/labbEdditAPI';
import { decodeToken } from 'react-jwt';
import useForms from '../../hooks/useForms';

function Comment( props ) {

  const { content, creator, likes, dislikes, id } = props;

  const { form, onChange } = useForms({
    content: content,
  });
  
  const [ commentContent, setCommentContent ] = useState(content);
  const [ commentLikes, setCommentLikes ] = useState(likes);
  const [ commentDislikes, setCommentDislikes ] = useState(dislikes);
  const [ alreadyLike, setAlreadyLike ] = useState(false);
  const [ alreadyDislike, setAlreadyDislike ] = useState(false);
  const [ editIsActive, setEditIsActive ] = useState(false);
  const [ commentDelete, setCommentDelete ] = useState(false);
  // const [ buttonIsActive, setButtonIsActive ] = useState(false); // editar pra deixar o botão interagir somente depois que carregar se já deu like/dislike
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function verifyLikes() {
    const likeOrDislike = await findLikeDislikeComments(id);
    if(likeOrDislike === 'ALREADY LIKED') {
      setAlreadyLike(true);
    } else if (likeOrDislike === 'ALREADY DISLIKED') {
      setAlreadyDislike(true);
    }
  }
  
  useEffect(() => {
    verifyLikes();
  }, []);

  function likeOrDislike( value ) {
    if ( value === true ) {
      if ( alreadyDislike ) {
        setCommentLikes(commentLikes+2);
        setAlreadyDislike(false);
        setAlreadyLike(true);
      } else if ( !alreadyLike ) {
        setCommentLikes(commentLikes+1);
        setAlreadyLike(true);
      } else {
        setCommentLikes(commentLikes-1);
        setAlreadyLike(false);
      }
      
    } else if ( value === false ) { 
      if ( alreadyLike ){
        setCommentLikes(commentLikes-2);
        setAlreadyLike(false);
        setAlreadyDislike(true);
      }
      else if ( !alreadyDislike ) {
        setCommentDislikes(commentDislikes+1);
        setAlreadyDislike(true);
      } else {
        setCommentDislikes(commentDislikes-1);
        setAlreadyDislike(false, id);
      }
    }
    commentLikeOrDislike(value, id);
  }

  function renderComment () {
    return (
      <>
        <Flex>
          <Text
            fontWeight="400"
            color="#6F6F6F"
            fontSize="12px"
            mb="3"
          >
          Enviado por: {creator}
          </Text>
          <Spacer />
          {renderOptions()}
        </Flex>
        <Text
          fontWeight="400"
          fontSize="18px"
          mb="3"
        >
          {commentContent}
        </Text>
        <Flex gap="5px">
          <Box 
            w="100px"
            h="28px"
            border="0.8px solid #ECECEC"
            borderRadius="28px"
            px="1.5"
          >
            <Flex alignItems="center">
              <Icon 
                as={!alreadyLike ? TbArrowBigUp : TbArrowBigUpFilled} 
                color={!alreadyLike ? '#6F6F6F' : '#4088CB'}
                boxSize={5}
                onClick={() => likeOrDislike(true)}
                _hover={{
                  color: '#4088CB',
                }}
                cursor="pointer"
              />
              <Spacer />
              <Text
                color="#6F6F6F"
                fontSize="12px"
                lineHeight="26px"
              >{commentLikes-commentDislikes < 1000 ? commentLikes-commentDislikes : convertToK(commentLikes-commentDislikes)}</Text>
              <Spacer />
              <Icon 
                as={!alreadyDislike ? TbArrowBigDown : TbArrowBigDownFilled} 
                color={!alreadyDislike ? '#6F6F6F' : '#4088CB'}
                boxSize={5}
                onClick={() => likeOrDislike(false)}
                _hover={{
                  color: '#4088CB',
                }}
                cursor="pointer"
              />
            </Flex>
          </Box>
        </Flex>
      </>
    );
  }

  
  function renderOptions () {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken.name === creator || decodedToken.role === 'ADMIN') {
        return (<Menu>
          <MenuButton
            color={'#6F6F6F'}
            cursor="pointer"
            _hover={{
              color: '#4088CB',
            }}
            _active={{
              color: '#4088CB',
            }}
          >
            <Icon 
              as={BsThreeDotsVertical}
            />
          </MenuButton>
          <MenuList>
            {decodedToken.name === creator && (
              <MenuItem 
                onClick={handleEditForm} 
                icon={<AiOutlineEdit />}
              >
                Editar
              </MenuItem>
            )}
            {(decodedToken.name === creator || decodedToken.role === 'ADMIN') && (
              <>
                <MenuItem 
                  onClick={onOpen} 
                  icon={<RiDeleteBin6Line />}
                >
                  Apagar
                </MenuItem>
                <Modal isCentered isOpen={isOpen} onClose={onClose}> 
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Confirmação de Exclusão</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      Você está prestes a excluir esta postagem. Tem certeza de que deseja prosseguir? Lembre-se de que, uma vez excluída, a postagem será irrecuperável.
                    </ModalBody>
                    <ModalFooter>
                      <Button 
                        colorScheme="gray"
                        variant="ghost"
                        size="sm"
                        transition="background 0.3s ease"
                        mr={3} 
                        onClick={onClose}>
                        Cancelar
                      </Button>
                      <Button 
                        colorScheme="red" 
                        onClick={handleDeleteComment}
                        size="sm"
                        transition="background 0.3s ease"
                      >DELETAR</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
            )}
          </MenuList>
        </Menu>);
      }
    }
  }

  function handleEditForm() {
    setEditIsActive(!editIsActive);
  }
  
  function handleDeleteComment() {
    setCommentDelete(true);
    deleteComment(id);
  }

  function renderEditForm() {

    function handleSendFormEdited() {
      setCommentContent(form.content);
      handleEditForm();
      editComment( form.content, id );
    }

    return (
      <form>
        <Textarea 
          bg={'white'}
          value={form.content}
          onChange={onChange}
          name="content"
          id="content"
          type="textarea" 
          h="131px" 
          resize="none" 
          mb={'2'}
          _focusVisible={{

          }}
        >

        </Textarea>
        <Box>
          <Flex>
            <Spacer />
            <Button 
              onClick={handleEditForm}
              mr={'2'}
              colorScheme="twitter"
              variant="outline"
              size="sm"
              color="#FE7E02"
              transition="background 0.3s ease"
              _hover={{
                bg: '#FFA73F35'
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSendFormEdited}
              size="sm"
              colorScheme="twitter"
              bg="#FE7E02"
              transition="background 0.3s ease"
              _hover={{
                bg: '#FFA73F'
              }}
            >
              Enviar
            </Button>
          </Flex>
        </Box>
      </form>
    );
  }

  return ( 
    <>
      {commentDelete ? (<> </>) :(
        <Container>
          <Box 
            mt="5"
            p="2"
            border="1px solid #E0E0E0"
            backgroundColor="#FBFBFB"
            borderRadius="12px"
          >
            {!editIsActive ? renderComment() : renderEditForm()}
    
          </Box>
        </Container>
      ) }
    </>
  );
}

export default Comment;
