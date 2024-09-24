import { Stack } from "expo-router/stack";
import React from "react";

const AuthLayout = () => {
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
          name="home"
          options={{
            headerTitle: 'Home Page',
          }} />
        <Stack.Screen
          name="chatRoom"
          options={{
            headerTitle: 'Chat Page',
          }} />
      </Stack>
  );
};

export default AuthLayout;
