import React from 'react';
import Header from '../Components/Header/Header';
import { Box, Checkbox, Container, Flex, FormControl, Heading, Input, Link, Spacer, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { baseURL } from '../constants/baseURL';
import useForms from '../hooks/useForms';
import { useNavigate } from 'react-router-dom';
import { goToHome } from '../routes/coordinator';
import GradientButton from '../Components/GradientButton/GradientButton';

function SingupPage() {

  const navigate = useNavigate();
  const { form, onChange, limparCampos } = useForms({
    name: '',
    email: '',
    password: ''
  });

  function fazerCadastro(e) {
    e.preventDefault();
    axios.post(`${baseURL}/users/signup`, form)
      .then((res) => {
        limparCampos();
        localStorage.setItem('token', res.data.token);
        alert(res.data.message);
        goToHome(navigate);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  }

  return ( 
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.5}}
    >

      <Container p="0" h="90vh" maxW="100%">
        <Header isSignupPage={true} />
        <Container p="20px" h="100%">
          <Flex direction="column" h="100%">
            <Heading as="h2" size="lg" fontSize="33px" fontWeight="700" color="#373737">Olá, boas vindas ao LabEddit ;)</Heading>
            <Spacer />
            <form onSubmit={fazerCadastro}>
              <FormControl>
                <Input 
                  placeholder="Apelido" 
                  borderRadius="4px" 
                  h="60px"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                />
                <Input 
                  placeholder="E-mail" 
                  mt="5px" 
                  borderRadius="4px" 
                  h="60px" 
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
                <Input 
                  placeholder="Senha" 
                  mt="5px" 
                  borderRadius="4px" 
                  h="60px" 
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  required
                />
                <Box pt="60px">
                  <Text fontSize="14px">Ao continuar, você concorda com o nosso <Link color="#4088CB">Contrato de usuário</Link> e nossa <Link color="#4088CB">Política de Privacidade</Link></Text>
                  <Checkbox mt="20px">
                    <Text fontSize="14px">Eu concordo em receber emails sobre coisas legais no Labbedit</Text>
                  </Checkbox>
                  {/* <Button mt="20px" borderRadius="27px" h="51px" color="white" bgGradient="linear(to-r, #FF6489, #F9B24E">Cadastrar</Button> */}
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
                    <GradientButton text="Cadastrar"/>
                  </Box>
                </Box>
              </FormControl>
            </form>
          </Flex>

        </Container>
      </Container>
    </motion.div>
  );
}

export default SingupPage;
