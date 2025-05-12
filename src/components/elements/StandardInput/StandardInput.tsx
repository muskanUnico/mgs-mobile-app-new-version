import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { styles as externalStyles } from "../../../assets/css";
import { borderColor } from "../../../constants/COLORS";
import { useTheme } from "../../../context/ThemeContext";

interface StandardInputProps {
  placeholder?: string;
  label?: string;
  onChangeText?: any;
  value: any;
  editable?:boolean,
  maxLength?:number,
}

const StandardInput: React.FC<StandardInputProps> = ({
  placeholder,
  label,
  onChangeText,
  value,
  editable,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const styles = useStyles();

  return (
    <View>
      <TouchableOpacity onPress={() => inputRef.current?.focus()}>
      <Text style={[externalStyles.label, { marginBottom: 12 }]}>
          {label}
        </Text>
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChangeText={(text) => onChangeText(text)}
        editable={editable}
        maxLength={maxLength}
      />
    </View>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({  label: {
    fontSize: 16,
    color: "black",
    fontWeight: "600",
    paddingBottom: 10,
    fontFamily: "BoldText"

  },
  labelFocused: {
    fontSize: 14,
    
    marginBottom: 7,
    color: theme.brandBlackColor,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: borderColor,
    borderRadius: 5,
    fontSize: 14,
    fontFamily: "Regular",


  },

});
}

export default StandardInput;
