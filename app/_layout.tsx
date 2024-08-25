import { StyleSheet, Text, View } from "react-native";
import React from "react";
import "../global.css";
import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function MainzLayout() {
  return (
    <ConvexProvider client={convex}>
      <Stack></Stack>
    </ConvexProvider>
  );
}

const styles = StyleSheet.create({});
