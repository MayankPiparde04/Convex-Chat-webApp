import { StyleSheet, ActivityIndicator, Text, View } from "react-native";
import React from "react";

const index = () => {
  return (
    <View className="justify-center flex-1 items-center">
      <ActivityIndicator  size={40} color={'#0101cc'} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
