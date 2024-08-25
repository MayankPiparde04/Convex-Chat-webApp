import { StyleSheet, Text, View } from "react-native";
import React from "react";
import "../global.css";

export default function MainzLayout() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className='text-red-800 text-2xl'>_layout</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
