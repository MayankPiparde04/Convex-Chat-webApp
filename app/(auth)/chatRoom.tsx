import React from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router"; // Ensure this import is correct based on your routing library

const ChatRoom = () => {
  const { user } = useLocalSearchParams();

  // Decode and parse the JSON string
  let userObject = null;
  try {
    userObject = user ? JSON.parse(decodeURIComponent(user)) : null;
  } catch (error) {
    console.error("Failed to parse user data:", error);
  }

  return (
    <View className="flex-1 justify-center items-center p-4">
      {userObject ? (
        <>
          <Text className="text-2xl mb-4">Chat Room</Text>
          {/* <Text className="text-lg">ID: {userObject._id}</Text> */}
          <Text className="text-lg">Name: {userObject.name}</Text>
          <Text className="text-lg">Description: {userObject.description}</Text>
        </>
      ) : (
        <Text className="text-lg">No user data available</Text>
      )}
    </View>
  );
};

export default ChatRoom;
