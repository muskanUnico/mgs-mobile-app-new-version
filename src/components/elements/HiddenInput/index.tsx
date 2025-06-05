import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { styles as externalStyles } from "../../../assets/css";
import { useTheme } from "../../../context/ThemeContext";

interface HiddenInputProps extends TextInputProps {
  placeholder: string;
}

const HiddenInput: React.FC<HiddenInputProps> = ({ placeholder, ...rest }) => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };
  const { theme } = useTheme();

  return (
    <View style={styles.viewStyle}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#d2d2d2"
        secureTextEntry={isHidden}
        style={[externalStyles.globalFontLight, styles.flexStyle]}
        {...rest}
      />
      <TouchableOpacity onPress={toggleVisibility}>
        <MaterialIcons
          name={isHidden ? "visibility-off" : "visibility"}
          size={24}
          style={{ color: theme.brandBlackColor }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HiddenInput;
const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 24,
    alignItems:"center",
    paddingVertical:0,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  flexStyle: {
    flex: 1,
    fontSize: 16,
  },
});
