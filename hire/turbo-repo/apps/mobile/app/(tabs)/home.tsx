import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex h-screen w-screen items-center justify-center">
      <Pressable
        onPress={() => router.replace("/")}
        className="rounded-md bg-red-500 px-4 py-2"
      >
        <Text>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};
