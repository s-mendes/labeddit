import axios from 'axios';
import { baseURL } from '../constants/baseURL';

export const fetchPosts = async () => {
  try {
    const token = window.localStorage.getItem('token');
    
    const response = await axios.get(`${baseURL}/posts`, {
      headers: {
        authorization: token
      }
    });

    return response.data;
    
  } catch (error) {
    console.log(error);
  }
};

export const postPost = async (content) => {
  try {
    const token = window.localStorage.getItem('token');

    const body = {
      content
    };

    const response = await axios.post(`${baseURL}/posts`, body, {
      headers: {
        authorization: token
      }
    });

    return response.status;
    
  } catch (error) {
    console.log(error);
  }
};

export const editPost = async ( content, postId ) => {
  try {
    
    const token = window.localStorage.getItem('token');

    const body = {
      content
    };

    const response = await axios.put(`${baseURL}/posts/${postId}`, body ,{
      headers: {
        authorization: token
      }
    });

    return response.status;
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async ( postId ) => {
  try {
    const token = window.localStorage.getItem('token');

    const response = await axios.delete(`${baseURL}/posts/${postId}` ,{
      headers: {
        authorization: token
      }
    });
    return response.status;
  } catch (error) {
    console.error(error);
  }
};

export const postLikeOrDislike = async ( likeOrDislike, postId ) => {
  try {

    const token = window.localStorage.getItem('token');

    const body = {
      like: likeOrDislike
    };

    const response = await axios.put(`${baseURL}/posts/${postId}/like`, body ,{
      headers: {
        authorization: token
      }
    });

    return response.status;
  } catch (error) {
    console.error(error);
  }
};

export const findLikeDislikes = async ( postId ) => {
  try {
    
    const token = window.localStorage.getItem('token');

    const response = await axios.get(`${baseURL}/posts/likes/${postId}/`, {
      headers: {
        authorization: token
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
