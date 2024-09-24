import React from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { useQuery } from "convex/react";
import { useRouter } from "expo-router";
import { api } from "../../convex/_generated/api";

const Home = () => {
  const groups = useQuery(api.groups.get) || [];
  const router = useRouter();

  const handlePress = (user) => {
    // Convert the user object to a JSON string
    const userString = encodeURIComponent(JSON.stringify(user));
    router.push({ pathname: "/chatRoom", params: { user: userString } });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)} className="">
      <View className="flex-row bg-white items-center border rounded-xl border-gray-400 m-2 p-2">
        <View className="">
          <Image
            source={{ uri: item.iconUrl }}
            className=" w-16 h-16 rounded-full pr-2"
          />
        </View>
        <Text className=" flex-1 text-lg mx-2 pl-2">
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white justify-center">
      <FlatList
        data={groups}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default Home;
