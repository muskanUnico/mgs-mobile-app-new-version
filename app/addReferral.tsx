import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import Title from "@/src/components/elements/Title/Title";
import AddReferralFeature from "@/src/features/Referral/AddReferralFeature";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";

const AddReferralScreen = ({ navigation, route }: any) => {
  return (
    <>
      <ImageBackground
        source={require("@/src/assets/images/e.jpg")}
        style={styles.backgroundImage}
      >
        <GlobalLoader>
          <Title
            navigation={navigation}
            title={`${
              route?.params?.title ? route?.params?.title : "Add Refferals"
            }`}
          />
          <AddReferralFeature route={route} />
        </GlobalLoader>
      </ImageBackground>
    </>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});
export default AddReferralScreen