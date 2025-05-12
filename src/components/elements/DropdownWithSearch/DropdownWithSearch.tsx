//@ts-nocheck
import { borderColor } from "../../../constants/COLORS";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface DropdownComponentProps {
  data: {
    label: String;
    value: string;
  };
  value: any;
  setValue: any;
}

const DropdownWithSearch = ({
  data,
  setValue,
  value,
}: DropdownComponentProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Service" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item);
          setIsFocus(false);
        }}
        renderItem={renderItem} 
      />
    </View>
  );
};

export default DropdownWithSearch;

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 0,
    fontSize: 16,
    zIndex: 50,
    fontFamily: "Regular",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: "Regular",
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Regular",
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "Regular",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    fontFamily: "Regular",
  },
  container: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemText: {
    fontFamily: "Regular",
    fontSize: 14,
  },
});
