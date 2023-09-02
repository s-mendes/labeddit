import { Box, Container, Divider, Flex, FormControl, Heading, Image, Input, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { goToHome, goToSignUp } from '../routes/coordinator';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useForms from '../hooks/useForms';
import axios from 'axios';
import { baseURL } from '../constants/baseURL';
import GradientButton from '../Components/GradientButton/GradientButton';

function LoginPage() {

  const navigate = useNavigate();

  const { form, onChange, limparCampos } = useForms({
    email: '',
    password: '',
  });

  function fazerLogin(e) {
    e.preventDefault();
    const body = {
      email: form.email,
      password: form.password,
    };
    axios.post(`${baseURL}/users/login`, body)
      .then((res) => {
        limparCampos();
        localStorage.setItem('token', res.data.token);
        goToHome(navigate);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  }
  
  return ( 
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.5}}
    >
      <Container 
        p="0" 
        h="80vh" 
        mt="20"

      >
        <Flex h="100%" flexDirection="column">
          <Container textAlign="center">
            <Image src="logo.svg" mx="auto" my="4" />
            <Heading as="h1" size="lg" fontSize="36px" fontWeight="700" color="#373737" lineHeight="46px">LabEddit</Heading>
            <Text fontSize="16px" fontWeight="300" color="#373737" lineHeight="20px">O projeto de rede social da Labenu</Text>
          </Container>
          <Spacer />
          <form onSubmit={fazerLogin}>
            <FormControl p="20px" >
              <Input 
                placeholder="E-mail" 
                mt="5px" 
                borderRadius="4px" 
                h="60px" 
                type="email"
                name="email"
                id="email"
                required
                value={form.email}
                onChange={onChange}
              />
              <Input 
                placeholder="Senha" 
                mt="5px" 
                borderRadius="4px" 
                h="60px" 
                type="password"
                name="password"
                id="password"
                required
                value={form.password}
                onChange={onChange}
              />
              <Box pt="35">
                <Box
                  as="button"
                  mt="20px"
                  w="100%"
                  h="51px"
                  color="white"
                  fontWeight="bold"
                  borderRadius="27px"
                  overflow="hidden"
                  bgGradient="linear(to-r, #FF6489, #F9B24E)"
                  _hover={{
                    bgGradient: 'linear(to-r, #F9B24E, #FF6489)',
                  }}
                >
                  <GradientButton text="Continuar"/>
                </Box>
              </Box>
            </FormControl>
          </form>
          <Container>

            <Box mt="0" bgGradient="linear(to-r, #FF6489, #F9B24E)">
              <Divider />
            </Box>
            <Box
              as="button"
              mt="20px"
              w="100%"
              h="51px"
              color="#FE7E02"
              borderColor="#FE7E02"
              border="1px"
              fontWeight="bold"
              borderRadius="27px"
              bg="transparent"
              transition="background 0.3s ease"
              _hover={{
                bg: '#FFA73F35'
              }}
              onClick={() => goToSignUp(navigate)}
            >
              Crie uma conta!
            </Box>
          </Container>
        </Flex>
      
      </Container>
    </motion.div>
  );
}

export default LoginPage;
