import React from "react";
import {
  TextInput,
  View
} from "react-native";

import { cleanText } from "@/src/utils/tools";
import { useTheme } from "../../context/ThemeContext";

export const PrivacyPolicy = ({ value, onChangeText }) => {
  // const { width } = useWindowDimensions();
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
              fontFamily: "Regular",
            }}
          >
            {/* {defaultData} */}
            <TextInput
              value={cleanText(value)}
              onChangeText={onChangeText}
              placeholder="Write privacy policy here..."
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
