import { TextInput, TextInputProps, KeyboardTypeOptions } from "react-native";
import React from "react";

interface LoginInputProps extends TextInputProps {
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
}

const LoginInput: React.FC<LoginInputProps> = ({ placeholder, ...rest }) => {
  return (
    <>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#d2d2d2"
      style={{
        fontSize: 14,
        fontFamily: "Regular",
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 20, 
      }}      
      {...rest}
    />
    </>
  );
};

export default LoginInput;
