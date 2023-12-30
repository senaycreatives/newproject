import React from 'react';
import './LoginForm.css'; 

const LoginForm = () => {
    return (
      <div className="container">
        <h2>ACCOUNT LOGIN</h2>
        <form>
          <div className="user">
            <label htmlFor="username"><img src="png/user.png" alt="" /></label>
            <input type="email" id="username" placeholder="Username" name="username" />
          </div>
          <div className="luck">
            <label htmlFor="password"><img src="png/lcok.png" alt="" /></label>
            <input type="password" id="password" placeholder="Password" name="password" />
          </div>
          <div className="Login">
            <input type="submit" id="Login" value="Login" />
          </div>
        </form>
      </div>
    );
  }
  
  export default LoginForm;