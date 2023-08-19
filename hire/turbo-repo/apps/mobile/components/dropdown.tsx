import { useState } from "react";
import { View } from "react-native";

type DropdownProps<T> = {
  data: Array<{ label: string; value: T }>;
  labelField: string;
  valueField: T;
  maxHeight?: number;
  onChange: (item: { label: string; value: T }) => void;
  value: T;
};

export const Dropdown = <T,>({
  data,
  labelField,
  valueField,
  value,
  onChange,
}: DropdownProps<T>) => {
  const [open, setOpen] = useState(false);
  const [chosenValue, setChosenValue] = useState<T>(value);

  return <View></View>;
};
