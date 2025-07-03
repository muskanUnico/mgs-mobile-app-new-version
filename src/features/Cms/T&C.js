import { cleanText } from "@/src/utils/tools";
import React from "react";
import { TextInput, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export const TermsAndConditions = ({ value, onChangeText }) => {
  const { theme } = useTheme();



  return (
    <View
      style={{
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: theme.brandGreyColor,
        borderRadius: 10,
      }}
    >
      <TextInput
        value={cleanText(value)}
        onChangeText={onChangeText}
        placeholder="Write T&C here..."
        multiline
        textAlignVertical="top"
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}

        style={{
          minHeight: 200,
          fontSize: 12,
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 8,
        }}
      />
    </View>
  );
};
