import { useRef, useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { ChevronDownIcon } from "react-native-heroicons/solid";

type DropdownProps<T> = {
  label: string;
  data: Array<{ label: string; value: T }>;
  selectedValue: T;
  onSelect: (item: T) => void;
};

export const Dropdown = <T,>({
  data,
  label,
  selectedValue,
  onSelect,
}: DropdownProps<T>) => {
  const [visible, setVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState(0);
  const dropdownRef = useRef<TouchableOpacity | null>(null);

  const toggleDropdown = async () => {
    visible
      ? async () => {
          await new Promise(() => setTimeout(() => setVisible(false), 50));
        }
      : openDropdown();
  };

  const openDropdown = async () => {
    dropdownRef.current?.measure((_x, _y, _width, height, _pageX, pageY) => {
      setDropdownPosition(pageY + height + 2);
    });
    await new Promise(() => setTimeout(() => setVisible(true), 50));
  };

  const filteredData = () => {
    return data.filter((item) => item.value !== selectedValue);
  };

  const renderDropdown = () => {
    if (visible)
      return (
        <Modal visible={visible} transparent animationType="none">
          <TouchableOpacity
            className="h-screen w-screen"
            onPress={async () =>
              await new Promise(() => setTimeout(() => setVisible(false), 50))
            }
          >
            <View style={{ top: dropdownPosition }}>
              <FlatList
                className="mx-8 h-32 w-56"
                data={filteredData()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="my-0.5 rounded-md border-b border-b-black/40 bg-white px-2 py-1.5"
                    onPress={() => {
                      onSelect(item.value);
                      setVisible(false);
                    }}
                  >
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(_, index) => index.toString()}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      );
  };

  return (
    <TouchableOpacity
      className="flex h-8 w-56 flex-row items-center justify-between rounded-md bg-white px-2"
      onPress={toggleDropdown}
      ref={dropdownRef}
    >
      {renderDropdown()}
      <Text>{label}</Text>
      <ChevronDownIcon color="black" size={16} />
    </TouchableOpacity>
  );
};
