import { View, StyleSheet } from "react-native";
import React from "react";

import CustomButton from "../../../elements/GradientButton/GradientBtn";
import LoginInput from "../../../elements/LoginInput/LoginInput";

interface SetPassFormProps {
  email: string;
  setEmail: any;
  submit: () => void;
  isLoading: boolean;
}

const SetPasswordForm: React.FC<SetPassFormProps> = ({
  email,
  setEmail,
  submit,
  isLoading,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 12 }}>
        <LoginInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={{ marginVertical: 8 }}>
        <CustomButton loading={isLoading} title="Send" onPress={submit} />
      </View>
    </View>
  );
};

export default SetPasswordForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
