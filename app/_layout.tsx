import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import "../global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { Slot } from "expo-router";

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      return item;
    } catch (err) {
      console.error("Error retrieving token:", err);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("Error saving token:", err);
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL, {
  unsavedChangesWarning: false,
});

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // console.log("isSignedIn", isSignedIn);
    if (!isLoaded) return;
    const inTabsGroups = segments[0] === "(auth)";

    if (isSignedIn && !inTabsGroups) {
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }, [isSignedIn]);

  return <Slot />;
};

const RootLayout = () => {
  return (
    <ConvexProvider client={convex}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <InitialLayout />
      </ClerkProvider>
    </ConvexProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
