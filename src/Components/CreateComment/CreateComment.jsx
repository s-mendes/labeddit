import React from 'react';
import useForms from '../../hooks/useForms';
import { Box, Container, Textarea } from '@chakra-ui/react';
import GradientButton from '../GradientButton/GradientButton';
import { postComment } from '../../API/labbEdditAPI';

function CreateComment(props) {

  const { id, getAllComments } = props;

  const { form, onChange, limparCampos } = useForms({
    content: '',
  });

  async function sendComment(e) {
    try {
      e.preventDefault();
      limparCampos();
      const result = await postComment(id, form.content);
      getAllComments();
      return result;
    } catch (error) {
      console.error(error);
    }

  }

  return ( 
    <Container>
      <form onSubmit={sendComment}>
        <Textarea 
          placeholder="Adicionar comentário" 
          mt="5" 
          resize="none" 
          backgroundColor="#EDEDED" 
          h="131px" 
          border="none"
          required
          value={form.content}
          onChange={onChange}
          name="content"
          id="content"
          type="textarea" 
        />
        <Box
          as="button"
          mt="20px"
          w="100%"
          h="51px"
          color="white"
          fontWeight="bold"
          borderRadius="12px"
          overflow="hidden"
          bgGradient="linear(to-r, #FF6489, #F9B24E)"
          transition="background 0.3s ease"
          _hover={{
            bgGradient: 'linear(to-r, #F9B24E, #FF6489)',
          }}
        >
          <GradientButton text="Postar"/>
        </Box>
      </form>
    </Container>
  );
}

export default CreateComment;
