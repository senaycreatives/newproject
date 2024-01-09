
import "./css/main.css";
import "./css/util.css";
import Layout from "./Layout";
import  { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSignIn } from 'react-auth-kit'
import { useMutation } from "@tanstack/react-query";
import axios from "axios";



const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [error, seterror] = useState(null);
  const signIn = useSignIn()
  const [Eroor,setError]=useState(null)

  
  const [password, setPassword] = useState('');
  
  const mutation = useMutation({
    mutationFn: async (data) => {
      return await axios.post(
        "https://dark-gold-sea-urchin-slip.cyclic.app/auth/signin",
        data,
        
      );
    },

    mutationKey: "signin",
    onSuccess: (data) => {
      signIn(
        {
            token: data.data.accessToken,
            expiresIn: data.data.expiresIn
            ,
            tokenType: data.data.tokenType,

            
            
            authState: {authenticate: data.data.authUserState,
            username:data.data.username,
            permission:data.data.permission,
            },
            refreshToken: data.data.refreshToken ,                    // Only if you are using refreshToken feature
            refreshTokenExpireIn: data.data.refreshTokenExpireIn
            // Only if you are using refreshToken feature
        }
       
    )
    navigate('/')
    },
    onError: (error) => {
      seterror(error.response.data.message);
    
      setTimeout(() => {
        seterror(null);
      }, 5000); // Hide error message after 5 seconds
    },
  });
  const handleSignIn = async (username, password) => {
    mutation.mutate({ username, password })
 
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
                
           {error && <div className="absolute top-0  text-white mt-0 w-full rounded-md bg-red-500  px-2 py-1">{error}</div>}
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
