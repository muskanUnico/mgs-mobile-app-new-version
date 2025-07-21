import { useTheme } from "@/src/context/ThemeContext";
import CreateCustomerFeature from "@/src/features/Customer/CreateCustomer/CreateCustomer";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";

const CreateCustomerScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const screenHeight = Dimensions.get("window").height;
  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { flex: 1, paddingBottom: 60 },
        ]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ImageBackground
            source={require("@/src/assets/images/b.png")}
            style={styles.backgroundImage}
          />
          <CreateCustomerFeature navigation={navigation} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GlobalLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.2,
    backgroundColor: "white",
  },
});

export default CreateCustomerScreen;
