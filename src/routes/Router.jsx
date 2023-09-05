import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../Pages/MainPage';
import React from 'react';
import ErrorPage from '../Pages/ErrorPage';
import LoginPage from '../Pages/LoginPage';
import SingupPage from '../Pages/SingupPage';
import { AnimatePresence } from 'framer-motion';
import PostPage from '../Pages/PostPage';


function Router() {

  return ( 
    <BrowserRouter>
      <Routes>
        <Route index element={
          <AnimatePresence mode="wait">
            <MainPage key="home"/>
          </AnimatePresence>
        } />
        <Route path="/signup" element={ 
          <AnimatePresence mode="wait">
            <SingupPage key="signup"/> 
          </AnimatePresence>
        } />
        <Route path="/login" element={ 
          <AnimatePresence mode="wait">
            <LoginPage key="login"/> 
          </AnimatePresence>
        } />
        <Route path="/post/:postId" element={ 
          <AnimatePresence mode="wait">
            <PostPage key="post"/> 
          </AnimatePresence>
        } />
        <Route path="*" element={ <ErrorPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
