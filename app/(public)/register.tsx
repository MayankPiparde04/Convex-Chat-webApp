import React, { useState } from "react";
import { TextInput, Text, Button, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Stack } from "expo-router/stack";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      await signUp.create({
        identifier : emailAddress,
        password,
      });
            
      console.log('Sign up email : ', emailAddress);
      console.log('Sign up pass : ' , password);

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      await setActive({ session: completeSignUp.createdSessionId });
      router.replace("/home");
      console.log('first attempt verification')
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center  bg-white m-2 gap-4">
      <Stack.Screen options={{headerBackVisible: !pendingVerification}} />
      {/* <Spinner visible={loading}/> */}
      {!pendingVerification ? (
        <>
          <TextInput
            className="h-14 mx-2 border rounded-lg shadow-md shadow-black bg-white px-4 text-xl"
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={setEmailAddress}
          />
          <TextInput
            className="h-14 mx-2 border rounded-lg shadow-md shadow-black bg-white px-4 text-xl"
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <Button title="Sign Up" onPress={onSignUpPress} />
        </>
      ) : (
        <>
          <TextInput
            className="h-14 mx-2 border rounded-lg shadow-md shadow-black bg-white px-4 text-xl"
            value={code}
            placeholder="Verification Code..."
            onChangeText={setCode}
          />
          <Button title="Verify Email" onPress={onPressVerify} />
        </>
      )}
    </View>
  );
}
