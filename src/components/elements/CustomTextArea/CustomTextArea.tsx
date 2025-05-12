import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { borderColor, brandColor } from "../../../constants/COLORS";
import { styles as externalStyles } from "../../../assets/css";
import { useTheme } from "../../../context/ThemeContext";

const CustomTextArea = ({ placeholder, label, onChangeText, value }: any) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View>
    <Text style={[externalStyles.label, styles.customPadding]}>
    {label}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        multiline
        numberOfLines={2}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};
const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({

  label: {
    fontSize: 13,
    color: brandColor,
    fontFamily: "BoldText"

  },
  input: {
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 18,
    fontSize: 12,
    minHeight: 100,
    padding: 10,
    textAlignVertical: "top",
    backgroundColor: "white",
    fontFamily: "Regular"

  },
  customPadding: {
    paddingHorizontal: 8,  
    paddingBottom: 8,      
  },
});
}

export default CustomTextArea;
