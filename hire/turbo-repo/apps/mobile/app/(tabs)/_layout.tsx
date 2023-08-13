import { Tabs } from "expo-router";

export const AppLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
};
