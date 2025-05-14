import React from "react";
import { StyleSheet, Text, View } from "react-native";

import CustomButton from "../../../elements/GradientButton/GradientBtn";
import HiddenInput from "../../../elements/HiddenInput";
import LoginInput from "../../../elements/LoginInput/LoginInput";
import { navigate } from "../../../../utils/navigationServices";
import { router } from "expo-router";

// Define the interface for the LoginFormProps
interface LoginFormProps {
  data: {
    email: string;
    password: string;
  };
  onDataChange: (newData: { email: string; password: string }) => void;
  submit: () => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  data,
  onDataChange,
  submit,
  isLoading,
}) => {
  return (
    <View style={styles.fullWidth}>
      <View style={{ marginVertical: 12 }}>
        <LoginInput
          placeholder="Email"
          value={data.email}
          onChangeText={(text) => onDataChange({ ...data, email: text })}
        />
      </View>
      <View style={{ marginVertical: 12 }}>
        <HiddenInput
          placeholder="Password"
          value={data.password}
          onChangeText={(text) => onDataChange({ ...data, password: text })}
        />
      </View>
      <View style={{ marginVertical: 8 }}>
        <CustomButton loading={isLoading} title="Log In" onPress={submit} />
      </View>
      <View style={styles.rowEndLayout}>
        <Text
          onPress={() => router.push("/forgot-password")}
          style={{ fontFamily: "Regular", color: "#5e5e5e" }}
        >
          forgot password?
        </Text>
      </View>
    </View>
  );
};

export default LoginForm;
const styles = StyleSheet.create({
  fullWidth: {
    width: "100%",
  },
  rowEndLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 8,
  },
});
