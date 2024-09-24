import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button, View } from "react-native";
import React, { useState } from "react";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/home");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <View className="flex-1 justify-center m-2 bg-white gap-4">
      <TextInput
        className="h-14 mx-2 border rounded-lg shadow-md shadow-black bg-white px-4 text-xl "
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        className="h-14 mx-2 border rounded-lg shadow-lg shadow-black bg-white px-4 text-xl "
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button
        title="Sign In"
        onPress={onSignInPress}
        className="h-14 w-44 mx-2 border rounded-lg shadow-lg shadow-black bg-white px-4 text-xl "
      />
      <View className=" flex-row justify-center items-center text-xl ">
        <Text className="text-black text-xl">Don't have an account?</Text>
        <Link href="/register">
          <Text className="text-blue-400 text-lg">Register</Text>
        </Link>
      </View>
    </View>
  );
}
