import axios from 'axios';

export const login = async (userData: any) => {
  try {
    console.log("Logging in user with data:", userData);

    const response = await axios.post(
      "http://localhost:8000/api/auth/login/",
      userData,
      {
        headers: {
          "Content-Type": "application/json", // assuming you're sending a plain object
        },
      }
    );

    console.log("Response from server:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Axios error during registration:", error.response?.data || error.message);
    throw error;
  }
};
