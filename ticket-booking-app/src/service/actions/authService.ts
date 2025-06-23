
import { getTokenFromLocal, removeTokenFromLocal, setTokenInLocal } from "@/utils/FormData/localStorage"
import { DecodedData } from "@/type/common"
import axios from "axios"

const key = 'accessToken'

export const saveAccessToken = async (data: { accessToken: string }) => {
  // Make sure the token is actually saved before proceeding
  const result = setTokenInLocal(key, data.accessToken)

  // Add a small delay to ensure localStorage write is complete
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Verify the token was saved
  const savedToken = getTokenFromLocal(key)
  if (savedToken !== data.accessToken) {
    throw new Error("Failed to save token to localStorage")
  }

  return result
}
export const removeAccessToken = () => {
    return removeTokenFromLocal(key)
}

// Get user profile
export const getUserProfile = async () => {
  try {
    const token = getTokenFromLocal(key) // or however you store your token
    console.log('Fetching user profile with token:', token);
  if (!token) {
  console.warn("No token found in localStorage!");
  return;
}
   const response = await axios.get('http://localhost:8000/api/auth/user/', {
      headers: {
        // Try this format first (most common for Django)
        Authorization: 'Token ' + token

      },
    });
    console.log('Response status:', response);

    if (response.status === 200) {
      console.log('User profile fetched successfully:', response.data);
      let data : DecodedData = response.data;
      return data;
    } else {
      throw new Error('Failed to fetch user profile');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
