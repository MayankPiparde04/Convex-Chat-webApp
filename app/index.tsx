import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function index() {
  const groups = useQuery(api.groups.get) || [];
  return (
    <View className="flex-1 bg-white ">
      {groups.map((group) => (
        <View
          key={group._id}
          className="m-1 bg-orange-200 p-2 rounded-2xl shadow shadow-black gap-2"
        >
          <View className="flex-row justify-between px-4">
            <Text className="text-xl">{group.name}</Text>
            <Text className="text-xl">{group.age}</Text>
          </View>
          <View className="">
            <Text className="text-xl">{group.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
