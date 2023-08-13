import { KeyboardAvoidingView, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { TextInput } from "react-native-gesture-handler";

export default () => {
  const router = useRouter();

  const goBack = () => {
    console.log("going back");
    router.back();
  };

  const goNext = () => {
    console.log("going next");
    router.replace("/");
  };

  return (
    <LinearGradient colors={["#faf5ff", "#a78bfa", "#3b0764"]}>
      <SafeAreaView className="relative h-screen">
        <Pressable
          className="absolute left-6 top-6 flex h-7 w-7 items-center justify-center rounded-full border"
          onPress={goBack}
        >
          <ChevronLeftIcon size={24} />
        </Pressable>

        <View className="flex h-full items-center justify-center space-y-8">
          <View className="flex items-center justify-center space-y-2">
            <Text className="text-6xl tracking-wider text-white">Sign Up</Text>
            <Text className="text-lg text-gray-900/60">
              create your account
            </Text>
          </View>

          <View>
            <TextInput />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
