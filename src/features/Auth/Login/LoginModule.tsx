import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import LoginForm from "../../../components/ui/Login/LoginForm";
import { useAuth } from "../../../context/AuthContext";
import { AuthService } from "../../../services/AuthServices";
// import { DevSettings } from 'react-native';
import { router } from "expo-router";


interface FormDataProps {
  email: string;
  password: string;
}

const LoginModule = () => {
  const { setUser, reload } = useAuth();
  const [isLoading, setLoading] = useState(false);
  // data manage
  const [formData, setFormData] = useState<FormDataProps>({
    email: "",
    password:"",
  });
 
  // submit
  const handleSubmit = () => {
    if (formData.email.length < 1) {
      Alert.alert("Email Required");
    } else if (formData.password.length < 1) {
      Alert.alert("Password Required");
    } else {
      setLoading(true);
      AuthService.login(formData.email, formData.password)
        .then((res) => {
          AsyncStorage.setItem("user", JSON.stringify(res));
          reload()
          router.push("/(tabs)");
          setUser(res);
          // DevSettings.reload();
          // setLoading(false);
        })
        .catch((err) => {
          Alert.alert("Email and Password Not Correct");
          setLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <LoginForm
        data={formData}
        onDataChange={setFormData}
        submit={handleSubmit}
        isLoading={isLoading}
      />
    </View>
  );
};

export default LoginModule;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
