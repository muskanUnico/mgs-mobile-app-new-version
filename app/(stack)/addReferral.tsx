import Title from "@/src/components/elements/Title/Title";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import AddReferralFeature from "@/src/features/Referral/AddReferralFeature";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const AddReferralScreen = ({ navigation, route }: any) => {
  const { data, edit, title } = useLocalSearchParams();
  const referral = data
    ? JSON.parse(Array.isArray(data) ? data[0] : data)
    : null;
  const isEdit = edit === "true";
   const screenTitle = title
    ? Array.isArray(title)
      ? title[0]
      : title
    : "Add Referrals";

  return (
    <>
      <ImageBackground
        source={require("@/src/assets/images/e.jpg")}
        style={styles.backgroundImage}
      >
        <GlobalLoader>
          <Title
            navigation={navigation}
            title={`${screenTitle || "Add Referrals"}`}

          />
          <AddReferralFeature  referral={referral} isEdit={isEdit} />
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
export default AddReferralScreen;
