import React, { useContext } from 'react';
import Header from '../Components/Header/Header';
import { motion } from 'framer-motion';
import GradientButton from '../Components/GradientButton/GradientButton';
import CreatePost from '../Components/CreatePost/CreatePost';
import { Box, Container, Divider, Skeleton, Stack } from '@chakra-ui/react';
import Post from '../Components/Post/Post';
import useProtectPage from '../hooks/useProtectPage';
import GlobalContext from '../contexts/GlobalContext';

function MainPage() {

  useProtectPage();

  const { load, posts } = useContext(GlobalContext);

  return ( 

    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.5}}
    >
      <Header isMainPage={true}/>
      <GradientButton />
      <CreatePost />
      <Container>
        <Box  mt="5"  bgGradient="linear(to-r, #FF6489, #F9B24E)">
          <Divider />
        </Box>
      </Container>
      {load || posts.map( post => (
        <Post 
          key={post.id}
          id={post.id}
          content={post.content}
          creator={post.creator.name}
          likes={post.likes}
          dislikes={post.dislikes}
        />
      )).reverse()}
      { load && (
        <Container >
          <Stack>
            <Skeleton height="125px" mt="5" borderRadius="12px"/>
            <Skeleton height="125px" mt="5" borderRadius="12px"/>
            <Skeleton height="125px" mt="5" borderRadius="12px"/>
            <Skeleton height="125px" mt="5" borderRadius="12px"/>
          </Stack>
        </Container>
      )}
    </motion.div>

  );
}

export default MainPage;
