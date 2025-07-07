import React from "react";
import { TextInput, View } from "react-native";

import { cleanText } from "@/src/utils/tools";
import { useWindowDimensions } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export const Refunds = ({ value, onChangeText }) => {

  const { theme } = useTheme();

  return (
    <View
      style={{
        marginHorizontal: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: theme.brandGreyColor,
        borderRadius: 10,
      }}
    >
      <TextInput
        value={cleanText(value)}
        onChangeText={onChangeText}
        placeholder="Write refunds and cancellation policy here..."
        multiline
        textAlignVertical="top"
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        style={{
          minHeight: 100,
          fontSize: 12,
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 8,
        }}
      />
    </View>
  );
};
