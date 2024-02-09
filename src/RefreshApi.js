import axios from "axios";
import {  createRefresh} from "react-auth-kit";

const refreshApi = createRefresh({
  interval: 1000, // Refreshs the token every 10 minutes
  refreshApiCallback: async ({
    authToken,
    refreshToken,
    authUserState,
  }) => {
    try {
      const response = await axios.post(
        "https://server.industrialclearance.co.uk/auth/refresh",
        { refreshToken: refreshToken },
        {
          headers: { Authorization: `Jwt ${authToken}` },
        }
      );

      console.log("now refreshing", response.data.accessToken);

      return {
        isSuccess: true,
        newAuthToken: response.data.accessToken,
        newAuthTokenExpireIn: response.data.expiresIn,
      };
    } catch (error) {
      console.error(error);

      // Check if the error status is 401 (Unauthorized)
      if (error.response && error.response.status === 401) {
        // Clear local storage or remove specific keys based on your requirements
        localStorage.clear();

        // Perform any additional logout logic (e.g., redirect to login page)
         // Uncomment this line if you are using react-auth-kit's useSignOut hook
      }

      return {
        isSuccess: false,
      };
    }
  },
});

export default refreshApi;
