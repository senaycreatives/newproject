import axios from 'axios'
import {useAuthHeader, createRefresh, useSignOut} from 'react-auth-kit'

const refreshApi = createRefresh({
  
  interval: 1200,   // Refreshs the token in every 10 minutes
  refreshApiCallback: async (
    
    {   // arguments
      authToken,
      authTokenExpireAt,
      refreshToken,
      refreshTokenExpiresAt,
      authUserState
    }) => {
    try {
      const response = await axios.post("https://dark-gold-sea-urchin-slip.cyclic.app/auth/refresh", {'refreshToken': refreshToken}, {
        headers: {'Authorization': `Jwt${authToken}`}}
      )
      console.log("now refreshing")
      return {
        isSuccess: true,
        newAuthToken: response.data.accessToken,
        newAuthTokenExpireIn: response.data.expiresIn,
       
      }
    }
    catch(error){
      console.error(error)
 
      return {
        isSuccess: false
      } 
    }    
  }
})

export default refreshApi