import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
const loadUserFromStorage = async () => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    return null;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // add this for loading state while login/logout
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserAction: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      AsyncStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutUserAction: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      AsyncStorage.removeItem("userInfo");
    },
    // auto login
    setUserAction: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
  },
});

export const { loginUserAction, logoutUserAction, setUserAction } =
  authSlice.actions;

export const authReducer = authSlice.reducer;

//load user info

export const loadUser = () => async (dispatch) => {
  const userInfo = await loadUserFromStorage();
  if (userInfo) {
    dispatch(setUserAction(userInfo));
  }
};
