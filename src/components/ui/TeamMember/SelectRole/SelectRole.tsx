import React, { useState } from "react";
import { getRoles } from "../../../../hooks/Role";
import { lightTextColor } from "../../../../constants/COLORS";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../../../context/ThemeContext";

interface Role {
  _id: string;
  title: string;
  roleId: string;
  totalMember: number;
}

const SelectRole = ({ setRole, defaultRole }: any) => {
  const data = getRoles({});
  const styles = useStyles();
  const roles = data.data;
  const [selectedRole, setSelectedRole] = useState<string>(defaultRole || "");

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role.roleId);
    setRole &&
      setRole({
        roleId: role.roleId,
        title: role.title,
      });
  };

  return (
    <View>
      {roles.map((role, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.roleItem,
              selectedRole === role.roleId && styles.selectedRole,
            ]}
            onPress={() => handleSelectRole(role)}
          >
            <Text
              style={
                selectedRole === role.roleId
                  ? styles.selectedText
                  : styles.defaultText
              }
            >
              {role?.title}
            </Text>
            <Text
              style={[
                styles.totalMember,
                selectedRole === role.roleId && styles.selectedText,
              ]}
            >
              {role.totalMember} team member
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    roleItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 8,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      marginBottom: 5,
      backgroundColor: "white",
    },
    selectedRole: {
      backgroundColor: theme.brandColor,
    },
    selectedText: {
      color: "white",
      fontFamily: "Regular",
      fontSize: 12,
    },
    defaultText: {
      color: "#000",
      fontFamily: "Regular",
      fontSize: 12,
    },
    totalMember: {
      color: lightTextColor,
      fontSize: 12,
      fontFamily: "Regular",
    },
  });
};

export default SelectRole;
