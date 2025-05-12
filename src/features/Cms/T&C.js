import React from "react";
import { View } from "react-native";

import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export const TermsAndConditions = ({ data }) => {
  const { width } = useWindowDimensions();
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
      {/* {defaultData} */}

      <RenderHtml
        contentWidth={width}
        style={{ fontFamily: "Regular" }}
        source={{
          html: data?.policy?.termsAndConditions,
        }}
      />
    </View>
  );
};
