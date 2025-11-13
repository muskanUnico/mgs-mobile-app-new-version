import AuthBg from "@/src/components/ui/AuthBg";
import SetPasswordInfo from "@/src/components/ui/SetPassword/Info";
import SetPassModule from "@/src/features/Auth/SetPassword";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Forgot = () => {
   return (
    <AuthBg>
      <View style={styles.header}>
        <Text style={[styles.welcomeText, { color: "#43484e",    fontFamily: "BoldText"
 }]}>
          Forgot Password
        </Text>
      </View>
      <SetPasswordInfo />
      <SetPassModule />
    </AuthBg>
  );
}

export default Forgot


const styles = StyleSheet.create({
  header: {
    alignItems: "center",
  },

  welcomeText: {
    fontSize: 25,
    alignItems: "center",
    textAlign: "center",
  },
});