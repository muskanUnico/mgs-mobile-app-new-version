//@ts-nocheck
import React from "react";
import { FlatList, View } from "react-native";
import { brandGreyColor } from "@/src/constants/COLORS";
import Title from "@/src/components/elements/Title/Title";
import { AllPermissions } from "@/src/features/Permissions/AllPermissions";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import { useTheme } from "@/src/context/ThemeContext";

const Permissions = ({ navigation }: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <View style={{ flex: 1, backgroundColor: theme.brandGreyColor }}>
        <Title navigation={navigation} title="Permissions" />
        <AllPermissions navigation={navigation} />
      </View>
    </GlobalLoader>
  );
};

export default SecurePageByPackage(Permissions, ["view_permission"]);
