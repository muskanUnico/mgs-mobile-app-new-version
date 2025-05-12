import React, { useState } from "react";
import { AuthService } from "../../../services";
import { View, StyleSheet, Alert } from "react-native";
import SetPasswordForm from "../../../components/ui/SetPassword/Form";

const SetPassModule = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (email.length < 1) {
      Alert.alert("Email Required");
      return;
    }
    setLoading(true);
    const data = await AuthService.forgot(email).catch((err) => {
      setLoading(false);
      Alert.alert(err.response?.data?.message || "An error occurred");
    });

    if (data?.success) {
      setLoading(false);
      Alert.alert("Check your mail");
    }
  };

  return (
    <View style={styles.container}>
      <SetPasswordForm
        email={email}
        setEmail={setEmail}
        submit={handleSubmit}
        isLoading={isLoading}
      />
    </View>
  );
};

export default SetPassModule;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
