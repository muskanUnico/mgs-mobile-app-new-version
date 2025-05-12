//Components
import { Image, StyleSheet, Text, View } from "react-native";

function LoginInfo() {
  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.welcomeText, { color: "#43484e" , fontFamily: "BoldText"}]}>
          Welcome Back!{" "}
        </Text>
      </View>

      <Image
        source={require("../../../../assets/images/AuthImages/loginimg.png")}
        style={styles.logo}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 10,
  },

  welcomeText: {
    fontSize: 27,
    alignItems: "center",
    textAlign: "center",
  },
 
  logo: {
    width: 277,
    height: 253,
    marginBottom: 15,
  },
});

export default LoginInfo;
