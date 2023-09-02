import { CloseButton, Container, Flex, Image, Link, Spacer,  } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { goToHome, goToLogin } from '../../routes/coordinator';


function Header( props ) {

  const { isMainPage, isSignupPage } = props;

  function logout () {
    localStorage.removeItem('token');
    goToLogin(navigate);
  }

  const navigate = useNavigate();

  return ( 
    <Container p="0" maxW="100%">
      <Flex background="#EDEDED" height="50px" alignItems="center" padding="20px">
        <CloseButton 
          color="#A3A3A3" 
          pointerEvents="none"
          opacity="0"
        />
        <Spacer />
        <Link><Image src="./logo.svg" boxSize="30px" alt="logo" onClick={() => goToHome(navigate)}/></Link>
        <Spacer />
        { isMainPage && (<Link fontSize="md" fontWeight="600" color="#4088CB" onClick={logout}>Logout</Link>)}
        { isSignupPage && (<Link fontSize="md" fontWeight="600" color="#4088CB" onClick={() => goToLogin(navigate)}>Entrar</Link>)}
      </Flex>
    </Container>
  );
}

export default Header;
