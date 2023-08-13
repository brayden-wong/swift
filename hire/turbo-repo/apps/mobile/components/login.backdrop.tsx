import { Text, View } from "react-native";

export const LoginBackdrop = () => {
  return (
    <>
      <View className="absolute top-12 h-56 w-56 rounded-full bg-green-300" />
      <View className="absolute -right-12 bottom-1/4 z-10 h-80 w-48 rounded-lg bg-sky-500" />
      <View className="absolute -right-12 top-28 flex h-[420px] w-[420px] items-center justify-center rounded-full bg-red-400">
        <Text className="text-7xl">Swift Hire</Text>
      </View>
    </>
  );
};
