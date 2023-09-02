import { Box, Container, Textarea } from '@chakra-ui/react';
import React, { useContext } from 'react';
import useForms from '../../hooks/useForms';
import { postPost } from '../../API/labbEdditAPI';
import GlobalContext from '../../contexts/GlobalContext';
import GradientButton from '../GradientButton/GradientButton';

function CreatePost() {

  const { getAllPosts } = useContext(GlobalContext);

  const { form, onChange, limparCampos } = useForms({
    content: '',
  });

  async function sendPost(e) {
    try {
      e.preventDefault();
      limparCampos();
      const result = await postPost(form.content);
      getAllPosts();
      return result;
    } catch (error) {
      console.error(error);
    }

  }

  return ( 
    <Container>
      <form onSubmit={sendPost}>
        <Textarea 
          placeholder="Escreva seu post" 
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

export default CreatePost;
