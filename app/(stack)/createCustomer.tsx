import { useTheme } from "@/src/context/ThemeContext";
import CreateCustomerFeature from "@/src/features/Customer/CreateCustomer/CreateCustomer";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";

const CreateCustomerScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { minHeight: "100%" ,paddingBottom:60},
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
