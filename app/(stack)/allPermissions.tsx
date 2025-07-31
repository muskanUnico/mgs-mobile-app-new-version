//@ts-nocheck
import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { AllPermissions } from "@/src/features/Permissions/AllPermissions";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import React from "react";
import { View } from "react-native";

const Permissions = ({ navigation }: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <View style={{ flex: 1, backgroundColor: theme.brandGreyColor, paddingBottom:60 }}>
        <Title navigation={navigation} title="Permissions" />
        <AllPermissions navigation={navigation} />
      </View>
    </GlobalLoader>
  );
};

export default SecurePageByPackage(Permissions, ["view_permission"]);
