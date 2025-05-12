import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function SetPasswordInfo() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/images/AuthImages/setpassword.png")}
        style={[styles.logo, { marginVertical: 8 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 277,
    height: 320,
  },
});
// width: 277,
// height: 253,
