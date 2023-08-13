import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MotiView, useAnimationState } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  LockClosedIcon,
  UserCircleIcon,
  UserIcon,
} from "react-native-heroicons/solid";

const useTranslateLogo = () => {
  return useAnimationState({
    from: {
      translateY: 0,
    },
    email: {
      translateY: -100,
    },
    password: {
      translateY: -150,
    },
  });
};

const useTranslateInputFields = () => {
  return useAnimationState({
    from: {
      translateY: 0,
    },
    email: {
      translateY: -100,
    },
    password: {
      translateY: -120,
    },
  });
};

export default () => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const router = useRouter();

  const translateLogo = useTranslateLogo();
  const translateBox = useTranslateInputFields();

  const focusEmail = () => {
    if (translateBox.current !== "password") {
      translateLogo.transitionTo("email");
      translateBox.transitionTo("email");
    }
    emailRef.current?.focus();
  };

  const focusPassword = () => {
    translateLogo.transitionTo("password");
    translateBox.transitionTo("password");
    passwordRef.current?.focus();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    console.log("dismiss keyboard");
    translateLogo.transitionTo("from");
    translateBox.transitionTo("from");
  };

  const handleSubmit = () => {
    console.log("submit");
    if (emailRef.current?.isFocused()) {
      console.log("only email");
      focusPassword();
      return;
    }

    if (passwordRef.current?.isFocused()) {
      console.log("only password");
      dismissKeyboard();
      console.log("login");
    }
  };

  return (
    <LinearGradient
      className="relative flex h-screen items-center justify-center space-y-12 px-2 sm:space-y-12"
      colors={["#faf5ff", "#a78bfa", "#3b0764"]}
    >
      <Pressable
        onPress={dismissKeyboard}
        className="absolute top-0 z-20 h-2/5 w-full"
      >
        <View>
          <Text>""</Text>
        </View>
      </Pressable>
      <MotiView
        state={translateLogo}
        transition={{
          type: "timing",
          duration: 300,
        }}
      >
        <UserCircleIcon size={168} />
      </MotiView>

      <MotiView
        state={translateBox}
        transition={{
          type: "timing",
          duration: 300,
        }}
        className={`h-2/5 w-11/12 rounded-3xl border-2 border-indigo-200/80 bg-white px-8 py-8 shadow-2xl shadow-white/50`}
      >
        <ScrollView
          className="w-full space-y-6"
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps="never"
        >
          <Text className="relative text-3xl font-bold tracking-widest text-indigo-500">
            Sign In
          </Text>

          <View className="flex w-full rounded-xl border-2 border-indigo-200 px-2 py-3">
            <Pressable
              className="flex flex-row items-center"
              onPress={focusEmail}
            >
              <UserIcon size={24} onPress={focusEmail} />

              <TextInput
                onFocus={focusEmail}
                ref={emailRef}
                onSubmitEditing={handleSubmit}
                className="z-50 flex-grow py-1 pl-2.5 tracking-wide"
                placeholderTextColor="gray"
                style={{ fontSize: 16 }}
                value={email}
                onChangeText={onChangeEmail}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                placeholder="Email"
              />
            </Pressable>
          </View>
          <View className="flex w-full rounded-xl border-2 border-indigo-200 px-2 py-3">
            <Pressable
              className="flex flex-row items-center"
              onPress={focusPassword}
            >
              <LockClosedIcon size={24} onPress={focusPassword} />
              <TextInput
                onFocus={focusPassword}
                ref={passwordRef}
                onSubmitEditing={handleSubmit}
                className="flex-grow py-1 pl-2.5 tracking-wide"
                placeholderTextColor="gray"
                style={{ fontSize: 16 }}
                value={password}
                onChangeText={onChangePassword}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                placeholder="Password"
              />
            </Pressable>
          </View>

          <TouchableOpacity
            className="w-full rounded-xl bg-indigo-300 py-2"
            style={{ zIndex: 100 }}
            onPress={() => console.log("login")}
          >
            <Text className="text-center text-xl text-white">Login</Text>
          </TouchableOpacity>
          <View className="flex flex-row items-center justify-center space-x-1">
            <Text className="text-xs font-bold text-gray-600">
              Don't have an account?{" "}
            </Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text className="font-semibold text-indigo-400 underline">
                Sign Up
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </MotiView>
    </LinearGradient>
  );
};
