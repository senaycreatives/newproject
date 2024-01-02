import React from 'react';
import Layout from './Layout';
import  { CardAdd, CardDelete, CardEdit, CardView } from './CardTemplate';
import Grid from '@mui/material/Grid';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from 'react-router-dom';
import Header from './Header';
const AdminHome = () => {
  return (
    <div>
      <Header/>
      <Layout>
          <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'relative',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '30px',
        }}
      >
        {/* Rest of your opaque container content */}
      </div>
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '20px',
          display: 'flex',
          spacing: '100px'
        }}
      >
        <IconButton aria-label="favorite">
          <LockResetOutlinedIcon style={{ color: 'white' }} />
          <span style={{ marginLeft: '5px', color: 'white' }}>Change Password</span>
        </IconButton>
        <Link to="/">
        <IconButton aria-label="favorite">
    
          <LogoutOutlinedIcon style={{ color: 'white' }} />
          <span style={{ marginLeft: '5px', color: 'white' }}>Sign Out</span>
    
        </IconButton>
        </Link>
      </div>
    </div>
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid container item spacing={2} xs={12} sm={10} md={8} lg={6} xl={4}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Link to="/AddData"><CardAdd /></Link>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>  
            <Link to="/DataTable"><CardEdit /></Link>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>      
        <Link to="/DataTable"> <CardDelete /> </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Link to="/DataTable"> <CardView /></Link>
        </Grid>
      </Grid>
    </Grid>
  
    </Layout>
    </div>
    
  )}

  export default AdminHome;