import { TextInput, TextInputProps, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { styles as externalStyles } from "../../../assets/css";

interface CustomInputProps extends TextInputProps {
  placeholder: string;
  label?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  label,
  ...rest
}) => {
  return (
    <>
      {label && <Text style={[externalStyles.label]}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#bcbcbc"
        style={{
          fontSize: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#bcbcbc',
          paddingBottom: 3,
          fontFamily: "Regular"
        }}
        {...rest}
      />
    </>
  );
};

export default CustomInput;
