import React from "react";
import { TouchableOpacity, View } from "react-native";

interface ColorBoxProps {
  color: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const ColorBox: React.FC<ColorBoxProps> = ({color, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        borderRadius: 2,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color,
      }}
      onPress={onPress}
    >
      {isSelected && (
        <View
          style={{
            position: "absolute",
            top:-20,
            right:-20,
            borderRadius: 50,
            padding: 30,
          }}
        >
          {/* <CheckIcon /> */}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ColorBox;
