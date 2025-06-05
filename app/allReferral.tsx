import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { AllReferral } from "@/src/features/Referral/AllReferral";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import React from "react";
import { SafeAreaView } from "react-native";

const ReferralsScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
       style={{ backgroundColor: theme.brandGreyColor, minHeight: '100%' , marginBottom:60}}

      >
        <Title navigation={navigation} title="All Referrals" />
        <AllReferral />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default SecurePageByPackage(ReferralsScreen, ["view_referral"]);
