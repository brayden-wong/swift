import {
  ActivityIndicator,
  Button,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { useEffect, useState } from "react";

import { SkillList } from "constants/skill.list";
import { useDebounce } from "@hooks/useDebounce";
import { UserCircleIcon } from "react-native-heroicons/solid";
import { useAuth } from "@stores/auth.store";
import { Stack } from "expo-router";

export default function ModalScreen() {
  const [searchText, setSearchText] = useState("");
  const debounceValue = useDebounce(searchText, 200);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [haveAllInformation, setHaveAllInformation] = useState<boolean>(false);

  const [status, requestPermissions] = ImagePicker.useCameraPermissions();
  const [mediaStatus, requestMediaPermissions] =
    ImagePicker.useMediaLibraryPermissions();

  const { user } = useAuth();

  const pickImage = async () => {
    setIsImageLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (result.assets && result.assets[0].uri) {
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
      setIsImageLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log(debounceValue);
  // }, [debounceValue]);

  const submitAllInformation = () => {};

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              disabled={haveAllInformation}
              onPress={submitAllInformation}
              title="save"
            />
          ),
        }}
      />
      <View className="mx-6 my-4 flex items-start">
        <View className="flex flex-row items-center justify-center space-x-3">
          <Pressable
            className="flex h-16 w-16 items-center justify-center"
            onPress={pickImage}
          >
            {isImageLoading ? (
              <ActivityIndicator size="large" />
            ) : image === "" ? (
              <UserCircleIcon size={72} color="gray" />
            ) : (
              <Image
                className="h-full w-full rounded-full"
                source={{ uri: image }}
              />
            )}
          </Pressable>
          <View className="flex space-y-0.5">
            <Text className="text-lg leading-5 tracking-wide">
              {user?.name}
            </Text>
            <Text className="text-base font-light leading-4 tracking-wider text-gray-600">
              {user?.email}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
