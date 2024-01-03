
import "./css/main.css";
import "./css/util.css";
import Layout from "./Layout";
import  { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSignIn } from 'react-auth-kit'



const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [error, seterror] = useState(null);
  const signIn = useSignIn()
  
  const [password, setPassword] = useState('');
  const handleSignIn = async (username, password) => {
    try {
      const res = await fetch("https://gentle-puce-angler.cyclic.app/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        signIn(
          {
              token: data.token,
              expiresIn: 36000,
              tokenType: '',

              
              
              authState: {authenticate: true},
              // refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
              // refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
          }
      )
      

        // Store the token in localSto
        navigate('/')

      
      } 
    } catch (e) {
      console.error("Error during sign-in:", e);
      seterror(error.response.me)
    }
  };
  
  return (
    <Layout>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: "url('./background-image.jpg')" }}
        >
          <div className="  wrap-login100 p-t-30 p-b-50">
            <span className="login100-form-title p-b-41">Sign In</span>
            <form className="login100-form validate-form p-b-33 p-t-5">
              <div
                className=" relative wrap-input100 validate-input"
                data-validate="Enter username"
              >
                
           {error && <div className="absolute top-0  text-red-700 w-[200px] px-2 h-[10px]">{error}</div>}
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Username" 
                  onChange={(e)=>setUsername(e.target.value)}
                />
                <span
                  className="focus-input100"
                  data-placeholder="&#xe82a;"
                ></span>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <span
                  className="focus-input100"
                  data-placeholder="&#xe80f;"
                ></span>
              </div>
              <div className="container-login100-form-btn m-t-32">
              <Link onClick={()=>handleSignIn(username,password)}>
                <button className="login100-form-btn">
                  Sign In
                </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>

  );
};

export default Login;
