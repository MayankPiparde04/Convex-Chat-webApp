import { Stack } from "expo-router/stack";
import React from "react";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6c47ff",
        },
        headerTintColor: '#fff',
        headerBackTitle: 'Back'
      }}>
        <Stack.Screen
          name="login"
          options={{
            headerTitle: 'Login Page',
          }} />
        <Stack.Screen
          name="register"
          options={{
            headerTitle: 'Register Page',
          }} />
        <Stack.Screen
          name="reset"
          options={{
            headerTitle: 'Reset Page',
          }} />
      </Stack>
  );
};

export default PublicLayout;
