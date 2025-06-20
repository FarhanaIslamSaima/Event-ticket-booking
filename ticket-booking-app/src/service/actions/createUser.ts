import axios from 'axios';

export const createUser = async (userData: any) => {
  try {
    console.log("Creating user with data:", userData);

    const response = await axios.post(
      "http://localhost:8000/api/auth/registration/",
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
