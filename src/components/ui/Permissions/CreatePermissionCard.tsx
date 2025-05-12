import { useState } from "react";
import { borderColor } from "../../../constants/COLORS";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Card, Checkbox, Divider, Switch } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";

// interface
interface CreatePermissionCardProps {
  permissionId: string;
  title: string;
  desc: string;
  roles: {
    title: string;
    role: string;
    selected: boolean;
  }[];

  active: any;
  setActive: any;
  handleSelectRole: (role: string) => any;
}

const CreatePermissionCard = ({
  permissionId,
  title,
  desc,
  roles,
  active,
  setActive,
  handleSelectRole,
}: CreatePermissionCardProps) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const { theme } = useTheme();

  return (
    <>
      <Card style={{ flex: 1, padding: 8 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: "600", fontFamily: "BoldText" }}
          >
            {title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{
                marginBottom: 8,
                marginRight: 8,
                fontSize: 12,
                fontFamily: "BoldText",
                color: "#1F2937",
              }}
            >
              Full Access
            </Text>
            <Switch
              value={active}
              onValueChange={() => setActive(permissionId)}
              thumbColor={
                isSwitchOn ? theme.brandPastelColor : theme.brandGreyColor
              }
              trackColor={{ true: theme.brandColor, false: borderColor }}
              style={styles.switch}
            />
          </View>
        </View>
        <Text style={{ marginBottom: 16, fontFamily: "Regular" }}>{desc}</Text>

        {true && (
          <>
            <Divider />
            <View style={{ marginTop: 16, marginBottom: 16 }}>
              <Text style={{ fontFamily: "BoldText" }}>Permission</Text>
              <View>
                {roles.map((role, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Checkbox
                        key={index}
                        status={role.selected ? "checked" : "unchecked"}
                        onPress={() => handleSelectRole(role.role)}
                      />
                      <Text style={{ fontFamily: "BoldText" }}>
                        {role?.title}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </>
        )}
      </Card>
    </>
  );
};
const styles = StyleSheet.create({
  switch: {
    ...(Platform.OS === "ios" && {
      transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    }),
  },
});

export default CreatePermissionCard;
