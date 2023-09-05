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
    console.error(error);
  }
};

export const fetchPostById = async (id) => {
  try {
    const token = window.localStorage.getItem('token');

    const response = await axios.get(`${baseURL}/posts/${id}`, {
      headers: {
        authorization: token
      }
    });

    return response.data[0];

  } catch (error) {
    console.error(error);
  }
};

export const fetchAllCommentsById = async (postId) => {
  try {
    const token = window.localStorage.getItem('token');

    const response = await axios.get(`${baseURL}/comments/${postId}`, {
      headers: {
        authorization: token
      }
    });

    return response.data;

  } catch (error) {
    console.error(error);
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

export const postComment = async (id, content) => {
  try {
    const token = window.localStorage.getItem('token');

    const body = {
      content
    };

    const response = await axios.post(`${baseURL}/comments/${id}`, body, {
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

export const editComment = async ( content, commentId ) => {
  try {
    
    const token = window.localStorage.getItem('token');

    const body = {
      content
    };

    const response = await axios.put(`${baseURL}/comments/${commentId}`, body ,{
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

export const deleteComment = async ( postId ) => {
  try {
    const token = window.localStorage.getItem('token');

    const response = await axios.delete(`${baseURL}/comments/${postId}` ,{
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

export const commentLikeOrDislike = async ( likeOrDislike, commentId ) => {
  try {

    const token = window.localStorage.getItem('token');

    const body = {
      like: likeOrDislike
    };

    const response = await axios.put(`${baseURL}/comments/${commentId}/like`, body ,{
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

export const findLikeDislikeComments = async ( commentId ) => {
  try {
    
    const token = window.localStorage.getItem('token');

    const response = await axios.get(`${baseURL}/comments/likes/${commentId}/`, {
      headers: {
        authorization: token
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
