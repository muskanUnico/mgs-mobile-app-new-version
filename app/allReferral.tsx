import React from "react";
import { SafeAreaView } from "react-native";
import { brandGreyColor } from "@/src/constants/COLORS";
import Title from "@/src/components/elements/Title/Title";
import { AllReferral } from "@/src/features/Referral/AllReferral";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import { useTheme } from "@/src/context/ThemeContext";

const ReferralsScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
       style={{ backgroundColor: theme.brandGreyColor, minHeight: '100%' }}

      >
        <Title navigation={navigation} title="All Referrals" />
        <AllReferral />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default SecurePageByPackage(ReferralsScreen, ["view_referral"]);
