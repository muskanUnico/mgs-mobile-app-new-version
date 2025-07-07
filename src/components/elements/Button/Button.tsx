import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { styles as externalStyles } from "../../../assets/css";
import { useTheme } from "../../../context/ThemeContext";

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, loading }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.brandBlackColor }]}
    >
      <TouchableOpacity style={styles.fullWidth} onPress={onPress}>
        <View style={styles.rowCenter}>
          {loading && (
            <Text>
              <ActivityIndicator size="small" color="white" />
            </Text>
          )}
          <Text style={[styles.labelText, externalStyles.globalFontBold]}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 16,
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    fontSize: 16,
    textAlign: "center",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  fullWidth: {
    width: '100%',
  },
});
