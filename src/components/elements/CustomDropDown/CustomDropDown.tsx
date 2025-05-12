import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { styles as externalStyles } from "../../../assets/css";

const CustomDropDown = ({
  placeholder,
  items,
  setValue,
  value,
  zIndex,
}: any) => {
  const onChange = (val: any) => {
    setValue(val);
  };

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { zIndex }]}>
      <Text style={[externalStyles.label, styles.mb1]}>{placeholder}</Text>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        data={[
          {
            label: "N/A",
            value: "",
          },
          ...items,
        ]}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        placeholderStyle={styles.placeholderText}
        selectedTextStyle={styles.selectedText}
        value={value}
        onChange={(item) => onChange(item.value)}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
  },
  dropdown: {
    height: 30,
    fontFamily: "Regular",
    fontSize: 12,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderBottomWidth: 1,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemText: {
    fontFamily: "Regular",
    fontSize: 12,
  },
  placeholderText: {
    fontFamily: "Regular",
    fontSize: 12,
    color: "gray",
  },
  selectedText: {
    fontFamily: "Regular",
    fontSize: 12,
    color: "black",
  },
  mb1: {
    marginBottom: 4,
  },
});

export default CustomDropDown;
