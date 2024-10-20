import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./authSlice";
import { Stack, useRouter } from "expo-router";

const AppWrapper = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, loading } = useSelector((state) => state.auth); // Get authentication status and loading state

  useEffect(() => {
    dispatch(loadUser()); // Load user on mount
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace("(tabs)"); // Redirect to home if authenticated
      } else {
        router.replace("/"); 
      }
    }
  }, [isAuthenticated, loading, router]);

  // Optionally return null while the authentication state is loading
  if (loading) return null;

  return (
    <Stack>
      {/* Declare screens statically */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Welcome",
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "Welcome To Home",
          headerBackVisible: false, // This hides the back button
        }}
      />
    </Stack>
  );
};

export default AppWrapper;
