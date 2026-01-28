//Components
import AuthBg from "@/src/components/ui/AuthBg";
import LoginInfo from "@/src/components/ui/Login/Info";
import LoginModule from "@/src/features/Auth/Login/LoginModule";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";


function LoginScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <AuthBg>
            <LoginInfo />
            <LoginModule />
          </AuthBg>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;
