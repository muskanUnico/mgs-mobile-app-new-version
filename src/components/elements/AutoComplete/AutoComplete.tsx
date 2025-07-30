import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  AutocompleteDropdown,
  AutocompleteDropdownItem
} from "react-native-autocomplete-dropdown";
import { styles as externalStyles } from "../../../assets/css";
import { borderColor, placeholderTextColor } from "../../../constants/COLORS";

interface AutoCompleteProps {
  inputValue: any;
  dataSet: any;
  setInputValue: any;
  label?: string;
  placeholder?: string;
}

const AutoComplete = ({
  inputValue,
  dataSet,
  setInputValue,
  label,
  placeholder = "Name", 
}: AutoCompleteProps) => {
  const [selectedItem, setSelectedItem] =
    useState<AutocompleteDropdownItem | null>(null);
const [searchText, setSearchText] = useState("");

const filteredDataSet = dataSet.filter((item: AutocompleteDropdownItem) =>
  item.title?.toLowerCase().includes(searchText.toLowerCase())
);

  useEffect(() => {
    if (selectedItem) {
      setInputValue(selectedItem);
    }
  }, [selectedItem]);

  const renderItem = (item: AutocompleteDropdownItem) => {
    return (
      <View style={styles.suggestionItem}>
        <Text style={styles.suggestionText}>{item.title}</Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {label && (
        <Text
          style={[externalStyles.label]}
          // className=" text-[14px] "
        >
          {label}
        </Text>
      )}

      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={inputValue}
        onSelectItem={(item) => setSelectedItem(item)}
        dataSet={filteredDataSet}
        showClear={false}
        inputContainerStyle={{
          backgroundColor: "transparent",
          borderColor: borderColor,
          borderBottomWidth: 1,
        }}
        onChangeText={(text: string) =>{    setSearchText(text); setInputValue(text)}}
        showChevron={false}
        renderItem={renderItem} // Apply custom render item
        textInputProps={{
          placeholder: placeholder,
          autoCorrect: false,
          placeholderTextColor: placeholderTextColor,
          autoCapitalize: "none",
          style: {
            paddingLeft: 0,
            fontSize: 14,
            fontFamily: "Regular",
          }
        }}
      />
    </View>
  );
};

export default AutoComplete;

const styles = StyleSheet.create({
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontFamily: "Regular",
  },
  suggestionText: {
    fontFamily: "Regular",
    fontSize: 12,
  },
});
