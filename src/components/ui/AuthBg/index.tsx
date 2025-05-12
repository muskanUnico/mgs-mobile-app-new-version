import React from "react";
import { View, Image, StyleSheet } from "react-native";

type AuthBgProps = {
  children?: React.ReactNode;
};

const AuthBg = (props: AuthBgProps) => {
  const { children } = props;
  return (
    <View style={styles.centeredView}>
      <Image
        style={styles.absolutePositionedView}
        source={require("../../../assets/images/bgg.png")}
      />
    <View style={styles.customView}>
    {children}
      </View>
    </View>
  );
};

export default AuthBg;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  absolutePositionedView: {
    position: "absolute",
    width: '100%',
  },
  customView: {
    width: '90%',
    height: 'auto',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
  },
});
