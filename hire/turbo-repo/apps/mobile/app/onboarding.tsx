import {
  ActivityIndicator,
  Button,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";

import { Skill, SkillList, SkillName } from "constants/skill.list";
import { Titles } from "constants/title.list";
import { useDebounce } from "@hooks/useDebounce";
import {
  CameraIcon,
  UserCircleIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import { useAuth } from "@stores/auth.store";
import { Stack } from "expo-router";
import { Dropdown } from "@components/dropdown";
import { JobInterest, JobInterestsList } from "constants/job.interests.list";

export default () => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [searchText, setSearchText] = useState("");
  const [otherName, setOtherName] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string>("title");
  const [skills, setSkills] = useState<Array<Skill>>([]);
  const [filteredList, setFilteredList] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const [jobInterests, setJobInterests] = useState<Set<JobInterest>>(new Set());
  const debounceValue = useDebounce(searchText, 200);

  const otherTextRef = useRef<TextInput>(null);
  const { user } = useAuth();

  const pickImage = async () => {
    setIsImageLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      setIsImageLoading(false);
      return;
    }

    if (result.assets && result.assets[0].uri) {
      setImage(result.assets[0].uri);
      setIsImageLoading(false);
    }
  };

  const insertSkill = (skill: Skill) => {
    if (skill.name === "Other" && otherName === undefined) {
      setSearchText("Other");
      otherTextRef.current?.focus();
      return;
    }
    if (skill.otherName !== undefined) {
      if (findSkill(skill.otherName) !== undefined) return;

      setSkills((prev) =>
        [...prev, { name: skill.name, otherName: skill.otherName }].sort(
          (a, b) => a.name.localeCompare(b.name),
        ),
      );

      setSearchText("");
      setOtherName(undefined);
      return;
    }

    if (findSkill(skill.name) !== undefined) return;

    setSkills((prev) =>
      [...prev, { name: skill.name }].sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    );

    setSearchText("");
  };

  const removeSkill = (skill: Skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const findSkill = (skill: string) => {
    return skills.find((s) => s.name === skill);
  };

  const submitSkill = () => {
    if (filteredList.length === 1) {
      insertSkill({
        name: filteredList[0].label as SkillName,
      });
      return;
    }

    if (
      SkillList.find(
        (skillInList) =>
          skillInList.value.toLowerCase() === debounceValue.toLowerCase(),
      ) === undefined
    ) {
      return;
    }

    insertSkill({
      name:
        (SkillList.find(
          (skill) => skill.value.toLowerCase() === debounceValue.toLowerCase(),
        )?.label as SkillName) || (debounceValue as SkillName),
      otherName,
    });
  };

  const getFilteredList = () => {
    return SkillList.filter((skill) => {
      if (debounceValue === "") return undefined;

      if (debounceValue.toLowerCase() === "other") return undefined;

      const escapeRegExp = (str: string) =>
        str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const words = debounceValue.split(" ");
      const regexPatterns = words.map(
        (word) => new RegExp(escapeRegExp(word), "i"),
      );

      return regexPatterns.some((pattern) => pattern.test(skill.value));
    }).sort((a, b) => (a.value < b.value ? -1 : 1));
  };

  useEffect(() => {
    setFilteredList(getFilteredList());
  }, [debounceValue]);

  const submitAllInformation = () => {};

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerRight: () => (
            <Button
              onPress={submitAllInformation}
              color={"#818cf8"}
              title="save"
            />
          ),
        }}
      />

      <View className="h-screen w-screen bg-black">
        <View className="py-4flex items-start px-8">
          <View className="flex flex-row items-end justify-center space-x-3">
            <Pressable
              className="flex h-16 w-16 items-center justify-center"
              onPress={pickImage}
            >
              {isImageLoading ? (
                <ActivityIndicator size="small" />
              ) : image === "" ? (
                <View className="relative h-16 w-16">
                  <UserCircleIcon size={72} color={"#f5f5f5"} />
                  <View
                    className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2"
                    style={{ borderColor: "white" }}
                  >
                    <View className="flex h-6 w-6 flex-row items-center justify-center rounded-full border-2 border-white bg-black">
                      <CameraIcon color={"#818cf8"} size={12} />
                    </View>
                  </View>
                </View>
              ) : (
                <View className="relative h-16 w-16">
                  <Image
                    className="h-full w-full rounded-full"
                    source={{ uri: image }}
                  />
                  <View className="absolute -bottom-1 -right-1 flex h-6 w-6 flex-row items-center justify-center rounded-full border-2 border-white bg-black">
                    <CameraIcon color={"#818cf8"} size={12} />
                  </View>
                </View>
              )}
            </Pressable>
            <View className="flex space-y-0.5">
              <Text className="text-xl font-bold leading-5 tracking-wide text-white">
                {user?.name}
              </Text>
              <Text className="text-white">
                {title === "title" ? "unassigned title" : `${title}`}
              </Text>
            </View>
          </View>
          <View>
            <GenerateSkills
              searchText={searchText}
              setSearchText={setSearchText}
              otherName={otherName}
              setOtherName={setOtherName}
              otherTextRef={otherTextRef}
              debounceValue={debounceValue}
              jobInterests={jobInterests}
              setJobInterests={setJobInterests}
              skills={skills}
              filteredList={filteredList}
              insertSkill={insertSkill}
              submitSkill={submitSkill}
              removeSkill={removeSkill}
            />
            <View className="mt-[6px]">
              <Dropdown
                data={Titles}
                label={`${title === "title" ? "Select your title" : title}`}
                selectedValue={title}
                onSelect={setTitle}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

type GenerateSkillsProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  otherName: string | undefined;
  setOtherName: React.Dispatch<React.SetStateAction<string | undefined>>;
  otherTextRef: React.RefObject<TextInput>;
  debounceValue: string;
  jobInterests: Set<JobInterest>;
  setJobInterests: React.Dispatch<React.SetStateAction<Set<JobInterest>>>;

  skills: Array<{ name: SkillName; otherName?: string }>;
  filteredList: Array<{ label: string; value: string }>;

  submitSkill: () => void;
  insertSkill: (skill: Skill) => void;
  removeSkill: (skill: Skill) => void;
};

const GenerateSkills = ({
  debounceValue,
  otherName,
  otherTextRef,
  filteredList,
  searchText,
  setSearchText,
  setOtherName,
  skills,
  jobInterests,
  setJobInterests,

  submitSkill,
  insertSkill,
  removeSkill,
}: GenerateSkillsProps) => {
  return (
    <View className="mt-8">
      <Text className="text-lg font-black leading-5 text-white">Skills</Text>
      <View className="space-y-1">
        <View className="flex flex-row items-center justify-center space-x-3">
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            placeholder="Insert Skill"
            onSubmitEditing={submitSkill}
            className="w-64 rounded-md bg-white px-2 py-2"
            style={{
              fontSize: 16,
            }}
          />
          <TouchableOpacity
            onPress={submitSkill}
            className="w-28 rounded-md bg-white py-2"
          >
            <Text className="text-center font-bold text-indigo-400">
              Add Skill
            </Text>
          </TouchableOpacity>
        </View>
        {debounceValue.toLowerCase() === "other" && (
          <TextInput
            ref={otherTextRef}
            value={otherName}
            onChangeText={setOtherName}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            placeholder="Insert Skill"
            className="w-64 rounded-md bg-white px-2 py-2"
          />
        )}
        <View className="flex w-full flex-row flex-wrap gap-x-2 gap-y-1.5">
          {skills.map((skill, index) => (
            <TouchableOpacity
              onPress={() => removeSkill(skill)}
              className="flex min-w-[48px] flex-row items-center justify-center space-x-2 rounded-md bg-indigo-400 px-2 py-1.5"
              key={index}
            >
              <Text className="text-white">
                {skill.name !== "Other" ? skill.name : skill?.otherName}
              </Text>
              <XMarkIcon color="white" size={16} />
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView className="max-h-[140px] min-h-0 rounded-md">
          {filteredList.map((skill, index) => {
            const length = filteredList.length;
            if (length - 1 === index || length === 1)
              return (
                <SkillItem
                  key={index}
                  skill={skill}
                  insertSkill={insertSkill}
                  index={index}
                  last={true}
                />
              );
            return (
              <SkillItem
                key={index}
                skill={skill}
                insertSkill={insertSkill}
                index={index}
                last={false}
              />
            );
          })}
        </ScrollView>
      </View>
      <JobInterests
        jobInterests={jobInterests}
        setJobInterests={setJobInterests}
      />
    </View>
  );
};

type JobInterestsProps = {
  jobInterests: Set<JobInterest>;
  setJobInterests: React.Dispatch<React.SetStateAction<Set<JobInterest>>>;
};

const JobInterests = ({ jobInterests, setJobInterests }: JobInterestsProps) => {
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const debounceValue = useDebounce(searchText, 500);

  const getFilteredList = () => {
    return JobInterestsList.filter((job) => {
      if (debounceValue === "") return undefined;

      if (debounceValue.toLowerCase() === "other") return undefined;

      const escapeRegExp = (str: string) =>
        str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const words = debounceValue.split(" ");
      const regexPatterns = words.map(
        (word) => new RegExp(escapeRegExp(word), "i"),
      );

      return regexPatterns.some((pattern) => pattern.test(job.value));
    }).sort((a, b) => (a.value < b.value ? -1 : 1));
  };

  const insertJob = (job: JobInterest) => {};

  useEffect(() => {
    setFilteredList(getFilteredList());
  }, [debounceValue]);

  return (
    <View className="h-screen max-h-[210px] min-h-0">
      <Text className="text-lg font-black text-white">Job Interests</Text>
      <View className="flex flex-row space-x-3">
        <TextInput
          className="w-64 rounded-md bg-white px-2 py-2"
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          placeholder="Insert Job Interest"
        />
        <TouchableOpacity className="w-28 rounded-md bg-white py-2">
          <Text className="text-center font-bold text-indigo-400">
            Add Interest
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row flex-wrap gap-x-2 gap-y-1.5">
        {Array.from(jobInterests).map((jobInterest, index) => (
          <TouchableOpacity
            onPress={() => {}}
            className="flex min-w-[48px] flex-row items-center justify-center space-x-2 rounded-md bg-indigo-400 px-2 py-1.5"
            key={index}
          >
            <Text className="text-white">{jobInterest}</Text>
            <XMarkIcon color="white" size={16} />
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView className="mt-4 rounded-md">
        {filteredList.map((job, index) => {
          const length = filteredList.length;
          if (length - 1 === index || length === 1)
            return (
              <JobItem
                key={index}
                job={job}
                insertJob={insertJob}
                index={index}
                last={true}
              />
            );
          return (
            <JobItem
              key={index}
              job={job}
              insertJob={insertJob}
              index={index}
              last={false}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

type SkillItemProps = {
  skill: { label: string; value: string };
  insertSkill: (skill: Skill) => void;
  index: number;
  last: boolean;
};

const SkillItem = ({ index, insertSkill, skill, last }: SkillItemProps) => {
  if (last) {
    return (
      <TouchableOpacity
        className="bg-white px-4 py-2"
        key={index}
        onPress={() => insertSkill({ name: skill.value as SkillName })}
      >
        <Text>{skill.value}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      className="border-b-2 border-black/50 bg-white px-4 py-2"
      key={index}
      onPress={() => insertSkill({ name: skill.value as SkillName })}
    >
      <Text>{skill.value}</Text>
    </TouchableOpacity>
  );
};

type JobItemProps = {
  job: { label: string; value: string };
  insertJob: (job: JobInterest) => void;
  index: number;
  last: boolean;
};

const JobItem = ({ index, insertJob, job, last }: JobItemProps) => {
  if (last) {
    return (
      <TouchableOpacity
        className="rounded-md bg-white px-4 py-2"
        key={index}
        onPress={() => insertJob(job.value as JobInterest)}
      >
        <Text>{job.value}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      className="border-b-2 border-black/50 bg-white px-4 py-2"
      key={index}
      onPress={() => insertJob(job.value as JobInterest)}
    >
      <Text>{job.value}</Text>
    </TouchableOpacity>
  );
};
