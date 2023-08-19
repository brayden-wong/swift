import { Keyboard, Text, View, Pressable, TextInput } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Image } from "expo-image";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotiSafeAreaView,
  MotiView,
  useAnimationState,
} from "moti";
import { LoginBackdrop } from "@components/login.backdrop";

import {
  ChevronLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";
import { Profile, useAuth } from "@stores/index";

const useTranslateScreen = () => {
  return useAnimationState({
    from: {
      translateY: 0,
    },
    loginMoveUp: {
      translateY: -75,
    },

    registerMoveUpEmail: {
      translateY: -75,
    },
    registerMoveUpPassword: {
      translateY: -150,
    },
    registerMoveUpSignUp: {
      translateY: -225,
    },

    registerWithEmailMoveUpName: {
      translateY: -85,
    },
    registerWithEmailMoveUpPassword: {
      translateY: -125,
    },
  });
};

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

const useTranslateRegisterFormWithEmail = () => {
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

const useTranslateRegisterFormWithoutEmail = () => {
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

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8);
const nameSchema = z.string().min(3);

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<
    "register-with-email" | "email" | "password" | "register-without-email"
  >("email");
  const router = useRouter();

  const translateScreen = useTranslateScreen();
  const translateEmailForm = useTranslateEmailForm();
  const translatePasswordForm = useTranslatePasswordForm();
  const translateRegisterFormWithEmail = useTranslateRegisterFormWithEmail();
  const translateRegisterFormWithoutEmail =
    useTranslateRegisterFormWithoutEmail();

  const { profile, getMe, login, register } = useAuth();

  const handleContinue = async () => {
    Keyboard.dismiss();

    if (step === "email") {
      if (email === "") return;

      await handleEmailForm();
      return;
    }

    if (step === "register-without-email" || step === "register-with-email") {
      if (
        nameSchema.safeParse(name).success &&
        passwordSchema.safeParse(password).success &&
        emailSchema.safeParse(email).success
      ) {
        await handleRegisterWithoutEmailForm();
        return;
      }
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

    const profile = await getMe(email.toLowerCase());

    if (!profile) {
      translateEmailForm.transitionTo("goTo");
      setStep("register-with-email");
      return;
    }

    setStep("password");
    return;
  };

  const handleRegisterWithoutEmailForm = async () => {
    if (name === "" || email === "" || password === "") return;
    translateScreen.transitionTo("from");
    Keyboard.dismiss();

    if (!emailSchema.safeParse(email).success) return;
    if (!passwordSchema.safeParse(password).success) return;
    if (!nameSchema.safeParse(name).success) return;

    await register({ name, email, password });

    translateRegisterFormWithoutEmail.transitionTo("from");
    translateRegisterFormWithEmail.transitionTo("from");
    setStep("password");
    setPassword("");
  };

  const handlePasswordForm = async () => {
    if (password === "" || email === "") {
      translatePasswordForm.transitionTo("down");
      return;
    }

    const user = await login({ email, password, type: "mobile" });

    console.log(user.firstTimeLogin);

    if (user.firstTimeLogin) {
      router.push("/onboarding");
      return;
    }

    router.replace("/home");
  };

  const handlePressSignUp = () => {
    setStep("register-without-email");
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (step === "email") {
      await handleEmailForm();
      return;
    }

    if (step === "password") {
      translateScreen.transitionTo("from");
      Keyboard.dismiss();
      await handlePasswordForm();
      return;
    }

    if (step === "register-without-email" || step === "register-with-email") {
      translateScreen.transitionTo("from");
      await handleRegisterWithoutEmailForm();
      return;
    }
  };

  const goBack = () => {
    if (step === "register-without-email") {
      if (Keyboard.isVisible()) {
        translateScreen.transitionTo("from");
        setTimeout(() => {
          Keyboard.dismiss();
          setStep("email");
          translateEmailForm.transitionTo("from");
          translateRegisterFormWithoutEmail.transitionTo("from");
        }, 250);
        return;
      }
      setStep("email");
      translateEmailForm.transitionTo("from");
      translateRegisterFormWithoutEmail.transitionTo("from");

      return;
    }

    if (step === "register-with-email") {
      if (Keyboard.isVisible()) {
        translateScreen.transitionTo("from");
        setTimeout(() => {
          Keyboard.dismiss();
          setStep("email");
          translateEmailForm.transitionTo("from");
          translateRegisterFormWithEmail.transitionTo("from");
        }, 250);
        return;
      }
      setStep("email");
      translateEmailForm.transitionTo("from");
      translateRegisterFormWithEmail.transitionTo("from");

      return;
    }
  };

  useEffect(() => {
    if (step === "password") {
      translateEmailForm.transitionTo("goTo");
      translatePasswordForm.transitionTo("goTo");
    }

    if (step === "register-without-email") {
      translateEmailForm.transitionTo("goTo");
      translateRegisterFormWithoutEmail.transitionTo("goTo");
    }

    if (step === "register-with-email") {
      translateEmailForm.transitionTo("goTo");
      translateRegisterFormWithEmail.transitionTo("goTo");
    }
  }, [step]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <MotiSafeAreaView
        transition={{
          type: "timing",
        }}
        state={translateScreen}
        className="relative h-screen w-screen bg-black"
      >
        <AnimatePresence>
          <LoginBackdrop />
          <RequestEmail
            key={"email"}
            email={email}
            setEmail={setEmail}
            handleRegister={handlePressSignUp}
            handleContinue={handleContinue}
            handleSubmit={handleSubmit}
            animation={translateEmailForm}
          />
          {profile && (
            <RequestPassword
              key={"password"}
              profile={profile}
              password={password}
              setPassword={setPassword}
              handleContinue={handleContinue}
              handleSubmit={handleSubmit}
              screenAnimation={translateScreen}
              animation={translatePasswordForm}
            />
          )}
          <RequestUserWithOutEmail
            key={"register-without-email"}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleContinue={handleContinue}
            handleSubmit={handleSubmit}
            goBack={goBack}
            screenAnimation={translateScreen}
            registerFormAnimation={translateRegisterFormWithoutEmail}
          />
          <RequestUserWithEmail
            key={"register-with-email"}
            name={name}
            setName={setName}
            email={email}
            password={password}
            setPassword={setPassword}
            handleContinue={handleContinue}
            handleSubmit={handleSubmit}
            goBack={goBack}
            screenAnimation={translateScreen}
            registerFormAnimation={translateRegisterFormWithEmail}
          />
        </AnimatePresence>
      </MotiSafeAreaView>
    </>
  );
};

type RequestEmailProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleRegister: () => void;
  handleContinue: () => void;
  handleSubmit: () => Promise<void>;
  animation: ReturnType<typeof useTranslateEmailForm>;
};
const RequestEmail = ({
  email,
  setEmail,
  handleRegister,
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
      className="absolute top-1/2 z-50 h-3/5 w-[95%] rounded-tr-3xl bg-black/50 px-6 py-2 backdrop-blur-lg"
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
          <Pressable onPress={handleRegister}>
            <Text className="font-bold text-indigo-400">Sign up</Text>
          </Pressable>
        </View>
      </View>
    </MotiView>
  );
};

type RequestUserWithoutEmailProps = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleContinue: () => void;
  handleSubmit: () => Promise<void>;
  goBack: () => void;
  screenAnimation: ReturnType<typeof useTranslateScreen>;
  registerFormAnimation: ReturnType<
    typeof useTranslateRegisterFormWithoutEmail
  >;
};
const RequestUserWithOutEmail = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  handleContinue,
  handleSubmit,
  goBack,
  screenAnimation,
  registerFormAnimation,
}: RequestUserWithoutEmailProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  return (
    <MotiView
      state={registerFormAnimation}
      transition={{
        type: "timing",
        duration: 400,
      }}
      className="absolute top-1/2 z-50 h-3/5 w-[95%] rounded-tr-3xl bg-black/60 px-6 py-2"
    >
      <View className="flex w-full items-start justify-start space-y-3">
        <Pressable
          onPress={goBack}
          className="relative -left-1.5 flex flex-row items-center"
        >
          <ChevronLeftIcon color="#f5f5f5" size={24} />
          <Text className="text-white">Back</Text>
        </Pressable>

        <View className="flex w-full flex-col space-y-4">
          <View className="flex flex-col space-y-1">
            <Text className="text-lg text-white">Name</Text>
            <TextInput
              className="rounded-md bg-white px-3 py-2 font-semibold tracking-widest"
              style={{
                fontSize: 18,
              }}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              value={name}
              onFocus={() =>
                screenAnimation.transitionTo("registerMoveUpEmail")
              }
              onChangeText={setName}
              onSubmitEditing={() => emailRef.current?.focus()}
            />
          </View>
        </View>
        <View className="flex w-full flex-col space-y-4">
          <View className="flex flex-col space-y-1">
            <Text className="text-lg text-white">Email</Text>
            <TextInput
              ref={emailRef}
              className="rounded-md bg-white px-3 py-2 font-semibold tracking-widest"
              style={{
                fontSize: 18,
              }}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              value={email}
              onFocus={() =>
                screenAnimation.transitionTo("registerMoveUpPassword")
              }
              onChangeText={setEmail}
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
          </View>
        </View>
        <View className="mb-2.5 flex space-y-4">
          <View className="flex flex-col space-y-1">
            <Text className="text-lg text-white">Password</Text>
            <View className="relative flex flex-row items-center">
              <TextInput
                ref={passwordRef}
                className="w-full rounded-md bg-white px-3 py-2 font-semibold tracking-widest"
                style={{
                  fontSize: 18,
                }}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                secureTextEntry={!showPassword}
                value={password}
                onFocus={() =>
                  screenAnimation.transitionTo("registerMoveUpSignUp")
                }
                onSubmitEditing={handleSubmit}
                onChangeText={setPassword}
              />
              <Pressable
                onPress={() => setShowPassword((prev) => !prev)}
                className="absolute right-2.5"
              >
                {!showPassword ? (
                  <EyeIcon size={20} color="gray" />
                ) : (
                  <EyeSlashIcon size={20} color="gray" />
                )}
              </Pressable>
            </View>
          </View>
        </View>
        <Pressable
          onPress={handleContinue}
          className="w-full rounded-md bg-indigo-400 py-2"
        >
          <Text className="text-center text-lg font-bold tracking-wider text-white">
            Sign Up
          </Text>
        </Pressable>
      </View>
    </MotiView>
  );
};

type RequestUserWithEmailProps = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleContinue: () => void;
  handleSubmit: () => Promise<void>;
  goBack: () => void;
  screenAnimation: ReturnType<typeof useTranslateScreen>;
  registerFormAnimation: ReturnType<typeof useTranslateRegisterFormWithEmail>;
};
const RequestUserWithEmail = ({
  name,
  setName,
  email,
  password,
  setPassword,
  handleContinue,
  handleSubmit,
  goBack,
  screenAnimation,
  registerFormAnimation,
}: RequestUserWithEmailProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  return (
    <MotiView
      state={registerFormAnimation}
      transition={{
        type: "timing",
        duration: 400,
      }}
      className="absolute top-1/2 z-50 h-3/5 w-[95%] rounded-tr-3xl bg-black/60 px-6 py-2"
    >
      <View className="flex w-full items-start justify-start space-y-3">
        <View className="flex space-y-1">
          <Text className="text-base font-light leading-4 tracking-wider text-white">
            Looks like you don't have an account.
          </Text>
          <Text className="text-base font-light leading-4 tracking-wider text-white">
            Let's create a new account for
          </Text>
          <Text className="font-bold tracking-wide text-white">{email}</Text>
        </View>
        <View className="flex w-full flex-col space-y-4">
          <View className="flex flex-col space-y-1">
            <Text className="text-lg text-white">Name</Text>
            <TextInput
              className="rounded-md bg-white px-3 py-2 font-semibold tracking-widest"
              style={{
                fontSize: 18,
              }}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              value={name}
              onFocus={() =>
                screenAnimation.transitionTo("registerWithEmailMoveUpName")
              }
              onChangeText={setName}
              onSubmitEditing={() => emailRef.current?.focus()}
            />
          </View>
        </View>
        <View className="mb-2.5 flex space-y-4">
          <View className="flex flex-col space-y-1">
            <Text className="text-lg text-white">Password</Text>
            <View className="relative flex flex-row items-center">
              <TextInput
                ref={passwordRef}
                className="w-full rounded-md bg-white px-3 py-2 font-semibold tracking-widest"
                style={{
                  fontSize: 18,
                }}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                secureTextEntry={!showPassword}
                value={password}
                onFocus={() =>
                  screenAnimation.transitionTo(
                    "registerWithEmailMoveUpPassword",
                  )
                }
                onSubmitEditing={handleSubmit}
                onChangeText={setPassword}
              />
              <Pressable
                onPress={() => setShowPassword((prev) => !prev)}
                className="absolute right-2.5"
              >
                {!showPassword ? (
                  <EyeIcon size={20} color="gray" />
                ) : (
                  <EyeSlashIcon size={20} color="gray" />
                )}
              </Pressable>
            </View>
          </View>
        </View>
        <Pressable
          onPress={handleContinue}
          className="w-full rounded-md bg-indigo-400 py-2"
        >
          <Text className="text-center text-lg font-bold tracking-wider text-white">
            Sign Up
          </Text>
        </Pressable>
      </View>
    </MotiView>
  );
};

type RequestPasswordProps = {
  profile: Profile;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleContinue: () => void;
  handleSubmit: () => Promise<void>;
  screenAnimation: ReturnType<typeof useTranslateScreen>;
  animation: ReturnType<typeof useTranslatePasswordForm>;
};
const RequestPassword = ({
  profile,
  password,
  setPassword,
  handleContinue,
  handleSubmit,
  screenAnimation,
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
      className="absolute bottom-0 z-50 h-3/5 w-[95%] rounded-tr-3xl bg-black/60 px-6 py-2"
    >
      <View className="flex flex-row items-center justify-start space-x-2">
        {profile.avatar === null ? (
          <UserCircleIcon color="#f5f5f5" className="rounded-full" size={48} />
        ) : (
          <Image
            source={{
              uri: profile.avatar,
            }}
            className="h-12 w-12 rounded-full"
          />
        )}
        <View className="flex flex-col items-start justify-start space-y-0.5 py-2">
          <Text className="text-white">{profile.name}</Text>
          <Text className="text-sm text-white">{profile.email}</Text>
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
                screenAnimation.transitionTo("loginMoveUp");
              }}
              onSubmitEditing={handleSubmit}
            />
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              className="absolute right-2"
            >
              {showPassword ? (
                <EyeIcon size={20} color="gray" />
              ) : (
                <EyeSlashIcon size={20} color="gray" />
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
        <Pressable>
          <Text className="mt-2 font-semibold text-indigo-400">
            Forgot your password?
          </Text>
        </Pressable>
      </View>
    </MotiView>
  );
};
