import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
  const { user } = useUser();

  const AuthButton = ({ href, text }) => (
    <Link
      href={href}
      className="flex-1 mx-4 h-14 items-center justify-center 
        border rounded-lg shadow-md shadow-black bg-white"
    >
      <Text className="text-3xl text-black font-semibold text-center">
        {text}
      </Text>
    </Link>
  );

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <Text className="text-4xl pb-8 text-black font-semibold text-center">
          Welcome, Guest!
        </Text>
        <View className="flex-row">
          <AuthButton href="/sign-in" text="Sign In" />
          <AuthButton href="/sign-up" text="Sign Up" />
        </View>
      </SignedOut>
    </View>
  );
}
