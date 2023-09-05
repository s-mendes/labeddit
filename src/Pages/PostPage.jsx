import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../Components/Header/Header';
import { useParams } from 'react-router-dom';
import Post from '../Components/Post/Post';
import { fetchAllCommentsById, fetchPostById } from '../API/labbEdditAPI';
import CreateComment from '../Components/CreateComment/CreateComment';
import { Box, Container, Divider, Skeleton, Stack } from '@chakra-ui/react';
import Comment from '../Components/Comment/Comment';

function PostPage() {

  const pathParams = useParams();
  const { postId } = pathParams;
  const [ load, setLoad ] = useState(true);
  const [ post, setPost ] = useState();
  const [ comments, setComments ] = useState();

  async function getPostAndComments() {
    setLoad(true);

    const fetchPost = await fetchPostById(postId);
    const fetchComments = await fetchAllCommentsById(postId);
    const postWithComments = { ... fetchPost, comments: fetchComments.length};

    setPost(postWithComments);

    const fetchComment = await fetchAllCommentsById(postId);
    setComments(fetchComment);
    setLoad(false);
  }

  useEffect(() => {
    getPostAndComments();
  }, []);

  return ( 
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.5}}
    >
      <Header isMainPage={true} isCommentPage={true}/>
      {load || (
        <Post 
          id={post.id}
          content={post.content}
          creator={post.creator.name}
          likes={post.likes}
          dislikes={post.dislikes}
          totalComments={post.comments}
        />
      )}
      { load && (
        <Container >
          <Stack>
            <Skeleton height="125px" mt="5" borderRadius="12px"/>
          </Stack>
        </Container>
      )}
      <CreateComment id={postId} getAllComments={getPostAndComments}/>
      <Container>
        <Box  mt="5"  bgGradient="linear(to-r, #FF6489, #F9B24E)">
          <Divider />
        </Box>
      </Container>
      {load || comments.map( comment => (
        <Comment 
          key={comment.id}
          id={comment.id}
          content={comment.content}
          creator={comment.creator.name}
          likes={comment.likes}
          dislikes={comment.dislikes}
        />
      ))}
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

export default PostPage;
