//@ts-nocheck
import React, { memo } from "react";
import { getRoleInfo } from "../../../hooks/Role";
import { View, Text, StyleSheet } from "react-native";
import { styles as externalStyles } from "../../../assets/css";
import { brandColor } from "../../../constants/COLORS";
import { useTheme } from "../../../context/ThemeContext";

interface ViewAccessProps {
  navigation: any;
  route: any;
}

const ViewAccess: React.FC<ViewAccessProps> = ({ navigation, route }) => {
  const roleInfo = getRoleInfo(route?.params.roleId);

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
  const { theme } = useTheme();

  return (
    <View>
      {formatApiResponse(roleInfo.data).map((item, index) => {
        return (
          <View key={index} style={[externalStyles.container]}>
            <View style={[styles.row, { marginTop: 12, marginBottom: 4 }]}>
              <Text
                style={[externalStyles.label]}
                style={{ color: theme.brandColor }}
              >
                {index + 1}.
              </Text>
              <Text
                style={[externalStyles.label]}
                style={{ color: theme.brandColor }}
              >
                {item.title}
              </Text>
            </View>
            <View>
              {item.roles.map((role, index) => (
                <Text
                  style={[externalStyles.content, { marginBottom: 4 }]}
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

export default memo(ViewAccess);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
