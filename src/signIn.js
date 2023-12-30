import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/system';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Layout from './Layout';

const CenteredContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: '800px',
    margin: 'auto',
    alignItems: 'center',
    flexGrow: 1, // Allow the container to grow and fill the available space
    border: '1px solid #ccc', // Add the border style
    borderRadius: '4px', // Add the border radius
  }));


  const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  }));


  export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
  
    // const navigate = useNavigate();
  
    const handleEmailChange = (event) => {
      const inputValue = event.target.value;
      setEmail(inputValue);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSignIn = async(e) => {
      e.preventDefault();
      const newErrors = {};
  
      if (!email) {
        newErrors.email = 'Email is required.';
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        newErrors.email = 'Invalid email format.';
      }
  
      if (!password) {
        newErrors.password = 'Password is required.';
      }
  
      setError(newErrors);
  
      if (Object.keys(newErrors).length === 0) {
        const user = {
          email,
          password,        
        }
      }}
   
    return (
        <Layout>
      <div style={{ marginTop: '140px', marginBottom: "120px"}}>
      <CenteredContainer component="main" maxWidth="xs">
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <FormContainer component="form" noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmailChange}
            multiline
          />
          <FormHelperText error>{error.email}</FormHelperText>
          <TextField
             type={showPassword ? 'text' : 'password'}
             label="Password"
             variant="outlined"
             InputProps={{
               endAdornment: (
                 <InputAdornment position="end">
                   <IconButton onClick={handleTogglePassword} edge="end">
                     {showPassword ? <VisibilityOff /> : <Visibility />}
                   </IconButton>
                 </InputAdornment>
               ),
             }}
             onChange={handlePasswordChange}
           />
          <FormHelperText error>{error.password}</FormHelperText>
          <FormHelperText error>{msg}</FormHelperText>
  
  
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSignIn}>
            Sign In
          </Button>           
        
        </FormContainer>
        </CenteredContainer>
        </div>
        </Layout>
  );
  }
