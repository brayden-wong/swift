import { useAuth } from "@stores/auth.store";
import { Stack } from "expo-router";

export default () => {
  const {} = useAuth();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
