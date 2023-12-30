import React from 'react';
import backgroundImage from './background-image.jpg';
import { styled } from '@mui/system';

const Background = styled('div')({
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  minHeight: '100vh',
});

const Layout = ({ children }) => { 
  return <Background>{children}</Background>;
};

export default Layout;