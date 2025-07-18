import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  AutocompleteDropdown,
  AutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import { styles as externalStyles } from "../../../assets/css";
import { borderColor, brandBlackColor, placeholderTextColor } from "../../../constants/COLORS";

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
        >
          {label}
        </Text>
      )}

      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
          initialValue={inputValue?.id ?? null}
        onSelectItem={(item) => setSelectedItem(item)}
        dataSet={dataSet}
        showClear={false}
        inputContainerStyle={{
          backgroundColor: "transparent",
          borderColor: borderColor,
          borderBottomWidth: 1,
        }}
        onChangeText={(text:string) => setInputValue(text)}
        showChevron={false}
        renderItem={renderItem} // Apply custom render item
        suggestionsListContainerStyle={{
          backgroundColor: "#fff",
          borderRadius: 8,
          paddingVertical: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 6,
        }}
        textInputProps={{
          placeholder: placeholder,
          value: inputValue?.title ?? "", 
          autoCorrect: false,
          placeholderTextColor: placeholderTextColor,
          autoCapitalize: "none",
          style: {
            paddingLeft: 0,
            fontSize: 14,
            fontFamily: "Regular",
            color: brandBlackColor
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
    fontSize:14,
    backgroundColor: "#fff"
  },
  suggestionText: {
    fontFamily: "Regular",
    fontSize: 12,
  },
});
