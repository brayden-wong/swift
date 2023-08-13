import {
  Keyboard,
  Text,
  SafeAreaView,
  View,
  Pressable,
  TextInput,
} from "react-native";
import { Stack } from "expo-router";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { AnimatePresence, MotiView, useAnimationState } from "moti";
import { LoginBackdrop } from "@components/login.backdrop";
import type { PublicCredentials } from "@swift/types";

import axios from "axios";
import {
  EyeIcon,
  EyeSlashIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";

const useTranslateEmailForm = () => {
  return useAnimationState({
    from: {
      translateX: 0,
      delay: 100,
      duration: 300,
    },
    goTo: {
      translateX: -400,
      duration: 300,
    },
  });
};

const useTranslatePasswordForm = () => {
  return useAnimationState({
    from: {
      translateX: -400,
      duration: 300,
    },
    goTo: {
      translateX: 0,
      delay: 100,
      duration: 300,
    },
    raise: {
      type: "timing",
      translateY: -50,
      duration: 300,
    },
    down: {
      translateY: 0,
      duration: 300,
    },
  });
};

const useTranslateRegisterForm = () => {
  return useAnimationState({
    from: {
      translateX: 0,
      delay: 100,
      duration: 300,
    },
    goTo: {
      translateX: -400,
      duration: 300,
    },
  });
};

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"register" | "email" | "password">("email");

  const [publicCredentials, setPublicCredentials] = useState<PublicCredentials>(
    {
      id: "",
      email: "",
      name: "",
      avatar: null,
    },
  );

  const translateEmailForm = useTranslateEmailForm();
  const translatePasswordForm = useTranslatePasswordForm();
  const translateRegisterForm = useTranslateRegisterForm();

  const handleContinue = async () => {
    Keyboard.dismiss();

    if (step === "email") {
      if (email === "") return;

      await handleEmailForm();
      return;
    }

    if (step === "password") {
      if (password === "" || email === "") {
        translatePasswordForm.transitionTo("down");
        return;
      }

      await handlePasswordForm();
      return;
    }
  };

  const handleEmailForm = async () => {
    if (email === "") return;

    const response = await axios.post<PublicCredentials>(
      "http://localhost:8080/users/public/credentials",
      {
        email: email.toLowerCase(),
      },
    );

    if (response.status !== 200) {
      return;
    }

    setPublicCredentials(response.data);
    setStep("password");
    return;
  };

  const handlePasswordForm = async () => {
    if (password === "" || email === "") {
      translatePasswordForm.transitionTo("down");
      return;
    }

    const response = await axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    });

    console.log(response.data);

    if (response.status !== 200) {
      return;
    }
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (step === "email") {
      await handleEmailForm();
      return;
    }

    if (step === "password") {
      await handlePasswordForm();
      return;
    }
  };

  useEffect(() => {
    if (step === "password") {
      translateEmailForm.transitionTo("goTo");
      translatePasswordForm.transitionTo("goTo");
    }

    if (step === "register") {
      translateEmailForm.transitionTo("goTo");
      translateRegisterForm.transitionTo("goTo");
    }
  }, [step]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView className="h-screen w-screen bg-black">
        <LoginBackdrop />
        <AnimatePresence>
          <RequestEmail
            key={"email"}
            email={email}
            setEmail={setEmail}
            handleContinue={handleContinue}
            handleSubmit={handleSubmit}
            animation={translateEmailForm}
          />
          <RequestPassword
            key={"password"}
            credentials={publicCredentials}
            password={password}
            setPassword={setPassword}
            handleContinue={handleContinue}
            handleSubmit={handleSubmit}
            animation={translatePasswordForm}
          />
        </AnimatePresence>
      </SafeAreaView>
    </>
  );
};

type RequestEmailProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleContinue: () => void;
  handleSubmit: () => Promise<void>;
  animation: ReturnType<typeof useTranslateEmailForm>;
};
const RequestEmail = ({
  email,
  setEmail,
  handleContinue,
  handleSubmit,
  animation,
}: RequestEmailProps) => {
  return (
    <MotiView
      state={animation}
      transition={{
        type: "timing",
        duration: 400,
      }}
      className="absolute top-1/2 z-50 h-2/5 w-[95%] rounded-tr-3xl bg-black/60 px-6 py-2   backdrop-blur-sm"
    >
      <View className="flex space-y-4">
        <View className="flex flex-col space-y-1">
          <Text className="text-lg text-white">Email</Text>
          <TextInput
            className="rounded-md bg-white px-3 py-2 font-semibold tracking-widest"
            style={{
              fontSize: 18,
            }}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={handleSubmit}
          />
        </View>
        <Pressable
          onPress={handleContinue}
          className="w-full rounded-md bg-indigo-400 py-1.5"
        >
          <Text className="text-center text-lg font-bold tracking-wider text-white">
            Continue
          </Text>
        </Pressable>

        <View className="flex flex-row items-center justify-start space-x-1 text-sm">
          <Text className="text-gray-400">Don't have an account?</Text>
          <Pressable>
            <Text className="font-bold text-indigo-400">Sign up</Text>
          </Pressable>
        </View>
      </View>
    </MotiView>
  );
};

type RequestPasswordProps = {
  credentials: PublicCredentials;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleContinue: () => void;
  handleSubmit: () => Promise<void>;
  animation: ReturnType<typeof useTranslatePasswordForm>;
};
const RequestPassword = ({
  credentials,
  password,
  setPassword,
  handleContinue,
  handleSubmit,
  animation,
}: RequestPasswordProps) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <MotiView
      state={animation}
      transition={{
        type: "timing",
        duration: 400,
      }}
      className="absolute bottom-0 z-50 h-3/5 w-[95%] rounded-tr-3xl bg-black/60 px-6 py-2   backdrop-blur-sm"
    >
      <View className="flex flex-row items-center justify-start space-x-2">
        {credentials.avatar === null ? (
          <UserCircleIcon color="#f5f5f5" className="rounded-full" size={48} />
        ) : (
          <Image
            source={{
              uri: credentials.avatar,
            }}
            className="h-12 w-12 rounded-full"
          />
        )}
        <View className="flex flex-col items-start justify-start space-y-0.5 py-2">
          <Text className="text-white">{credentials.name}</Text>
          <Text className="text-sm text-white">{credentials.email}</Text>
        </View>
      </View>
      <View className="flex space-y-4">
        <View className="flex flex-col space-y-1">
          <Text className="text-lg text-white">Password</Text>
          <View className="relative flex flex-row items-center">
            <TextInput
              className="w-full rounded-md bg-white px-3 py-2 font-semibold tracking-widest"
              style={{
                fontSize: 18,
              }}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              secureTextEntry={showPassword}
              value={password}
              onChangeText={setPassword}
              onFocus={() => {
                console.log("focus on password");
                animation.transitionTo("raise");
              }}
              onSubmitEditing={handleSubmit}
            />
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              className="absolute right-2"
            >
              {showPassword ? (
                <EyeIcon size={20} />
              ) : (
                <EyeSlashIcon size={20} />
              )}
            </Pressable>
          </View>
        </View>
        <Pressable
          onPress={handleContinue}
          className="w-full rounded-md bg-indigo-400 py-1.5"
        >
          <Text className="text-center text-lg font-bold tracking-wider text-white">
            Sign In
          </Text>
        </Pressable>
      </View>
    </MotiView>
  );
};
