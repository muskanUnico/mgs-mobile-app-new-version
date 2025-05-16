import React from "react";
import CreateCustomerFeature from "@/src/features/Customer/CreateCustomer/CreateCustomer";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { brandGreyColor } from "@/src/constants/COLORS";
import { useTheme } from "@/src/context/ThemeContext";

const CreateCustomerScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { minHeight: "100%" },
        ]}
      >
        <View style={styles.container}>
          <ImageBackground
            source={require("@/src/assets/images/b.png")}
            style={styles.backgroundImage}
          />
          <CreateCustomerFeature navigation={navigation} />
        </View>
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
