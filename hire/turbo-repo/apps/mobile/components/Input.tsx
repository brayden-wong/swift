import { Text, TextInput, View } from "react-native";

type InputProps<T extends string> = {
  ref?: React.RefObject<TextInput>;
  label: string;
  value: T;
  secure?: boolean;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  onSubmitEditing?: () => void;
};

export const Input = <T extends string>({
  ref,
  label,
  value,
  secure,
  onChangeText,
  onSubmitEditing,
}: InputProps<T>) => {
  return (
    <View className="flex flex-col space-y-1">
      <Text className="text-lg text-white">{label}</Text>
      <TextInput
        ref={ref ? ref : undefined}
        className="rounded-md bg-white px-3 py-2 font-semibold tracking-widest"
        style={{
          fontSize: 18,
        }}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        secureTextEntry={secure ? secure : false}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};
