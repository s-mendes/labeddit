import React from 'react';

import { Box, Heading, Text, Button, Image } from '@chakra-ui/react';

export default function ErrorPage() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Image src="./logo.svg" mx="auto" my={4}/>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, #FF6489, #F9B24E)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Página não encontrada
      </Text>
      <Text color={'gray.500'} mb={6}>
        A página que você está procurando parece não existir
      </Text>

      <Button
        colorScheme="red"
        bgGradient="linear(to-r, #FF6489, #F9B24E)"
        color="white"
        variant="solid">
        Voltar para Página Inicial
      </Button>
    </Box>
  );
}
