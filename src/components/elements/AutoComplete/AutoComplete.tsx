import React, { useEffect, useState } from "react";
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import { Text, View, StyleSheet } from "react-native";
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
    useState<TAutocompleteDropdownItem | null>(null);

  useEffect(() => {
    if (selectedItem) {
      setInputValue(selectedItem);
    }
  }, [selectedItem]);

  const renderItem = (item: TAutocompleteDropdownItem) => {
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
        dataSet={dataSet}
        showClear={false}
        inputContainerStyle={{
          backgroundColor: "transparent",
          borderColor: borderColor,
          borderBottomWidth: 1,
        }}
        onChangeText={(text: string) => setInputValue(text)}
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
          },
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
    fontSize:14,

  },
  suggestionText: {
    fontFamily: "Regular",
    fontSize: 12,
  },
});
