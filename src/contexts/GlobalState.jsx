import React, { useEffect, useState }  from 'react';
import GlobalContext from './GlobalContext';
import { fetchAllCommentsById, fetchPosts } from '../API/labbEdditAPI';


function GlobalState(props) {

  const [ load, setLoad ] = useState(true);
  const [ posts, setPosts ] = useState([]);
  // const [ token, setToken ] = useState('');
  // setToken(localStorage.getItem('token'));


  async function getAllPosts() {
    try {
      setLoad(true);
      const posts = await fetchPosts();
      const result = await Promise.all(posts);
  
      const postWithComments = await Promise.all(
        result.map(async (post) => {
          const comments = await fetchAllCommentsById(post.id);
          const totalComments = comments.length;
          return { ...post, comments: totalComments };
        })
      );
  
      setPosts(postWithComments);
      setLoad(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, [Promise]);

  const data = {
    load,
    setLoad,
    posts, 
    setPosts,
    getAllPosts,
    // token
  };
  return ( 
    <>
      <GlobalContext.Provider value={data}>
        {props.children}
      </GlobalContext.Provider>
    </>
  );
}

export default GlobalState;
