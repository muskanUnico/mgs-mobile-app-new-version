import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface IconButtonProps {
  iconName: any;
  onPress: () => void;
  iconSize?: number;
  iconColor?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  onPress,
  iconSize = 19,
  iconColor = "#848484",
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

export default IconButton;
