import { useAuth } from "@stores/index";
import { Stack, Tabs, Redirect } from "expo-router";
import { useEffect } from "react";

export default () => {
  // const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) Redirect({ href: "/" });

    if (user?.firstTimeLogin === true) {
    }
  }, []);

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
};
