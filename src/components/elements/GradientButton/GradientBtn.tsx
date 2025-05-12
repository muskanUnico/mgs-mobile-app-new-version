import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React from "react";
import { styles as externalStyles } from "../../../assets/css";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading,
}) => {
  return (
    <View style={styles.buttonStyle}>
      <TouchableOpacity style={styles.flexStyle} onPress={onPress}>
        {loading && <ActivityIndicator color={"white"} />}
        <Text style={[styles.textStyle, externalStyles.globalFontBold]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#f59b90",
  },
  flexStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
});
