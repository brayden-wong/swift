import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen name="login" />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
};
