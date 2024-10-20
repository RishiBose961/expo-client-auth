import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const loginUser = async ({ email, password }) => {

  try {
    const response = await axios.post(
      "https://expo-server-eight.vercel.app/api/users/login",
      {
        email,
        password,
      }
    );

    const { token } = response.data;

    AsyncStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
 
};

const registerUser = async ({ email, password }) => {
  const response = await axios.post(
    "https://expo-server-eight.vercel.app/api/users/register",
    {
      email,
      password,
    }
  );
  return response.data;
};




export { loginUser, registerUser };
