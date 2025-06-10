//@ts-nocheck
import { styles as externalStyles } from "@/src/assets/css";
import { useTheme } from "@/src/context/ThemeContext";
import { getRoleInfo } from "@/src/hooks/Role";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ViewAccessProps {
  navigation: any;
  route: any;
}

const ViewPermissions: React.FC<ViewAccessProps> = ({ roleId }) => {
  const { theme } = useTheme();
  const roleInfo = getRoleInfo(roleId);

  const formatApiResponse = (apiResponse) => {
    const formattedData = [];

    apiResponse?.permissions.forEach((permission) => {
      const filteredRoles = permission.permissionId.roles.filter((role) =>
        permission.roles.includes(role.role)
      );

      const formattedPermission = {
        title: permission.permissionId.title,
        icon: permission.permissionId.icon,
        iconColor: permission.permissionId.iconColor,
        roles: filteredRoles
          .map((filteredRole) => ({
            title: filteredRole.title,
            role: filteredRole.role,
          }))
          .map((per) => per.title),
      };

      formattedData.push(formattedPermission);
    });

    return formattedData;
  };

  return (
    <View style={{ flex: 1 }}>
      {formatApiResponse(roleInfo.data).map((item, index) => {
        return (
          <View key={index} style={[externalStyles.container]}>
            <View style={[styles.row,{marginTop:12,marginBottom:4}]}>
              <Text
                style={[externalStyles.label]}
                style={{ color: theme.brandColor }}
              >
                {index + 1}.
              </Text>
              <Text
                style={[externalStyles.label]}
                style={{ color: theme.brandColor }}
                className=" "
              >
                {item.title}
              </Text>
            </View>
            <View>
              {item.roles.map((role, index) => (
                <Text
                  style={[externalStyles.content,{marginBottom:6}]}
                  key={index}
        
                >
                  • {role}
                </Text>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default memo(ViewPermissions);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
