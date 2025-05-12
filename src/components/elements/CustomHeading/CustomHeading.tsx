import React from "react";
import { View, Text, StyleProp, TextStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { brandColor } from "../../../constants/COLORS";
import { useTheme } from "../../../context/ThemeContext";

interface CustomHeadingProps {
  iconName?: any;
  text: string;
  textStyle?: StyleProp<TextStyle>;
}

const CustomHeading: React.FC<CustomHeadingProps> = ({
  iconName,
  text,
  textStyle,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 4,
      }}
    >
      <FontAwesome
        name={iconName}
        size={17}
        color={theme.brandColor}
        style={{ marginRight: 7 }}
      />
      <Text
        style={[
          { fontSize: 15,  color: theme.brandColor,    fontFamily: "BoldText"
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default CustomHeading;
