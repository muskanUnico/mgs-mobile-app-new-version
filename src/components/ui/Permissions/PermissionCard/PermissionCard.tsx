import React from "react";
import { Divider } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { styles as externalStyles } from "../../../../assets/css";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  dividerColor,
  iconColor3,
  iconColor5,
  iconPersonColor,
  labelColor,
} from "../../../../constants/COLORS";

const PermissionCard = ({ item, navigation }: any) => {
  return (
    <View style={[externalStyles.card]}>
      <TouchableOpacity
        onPress={() => navigation.navigate("EditPermission", { id: item._id })}
        style={styles.row}
      >
        <FontAwesome
          name="user"
          style={[externalStyles.iconColorStyle, { color: iconPersonColor }]}
        />
        <Text style={[externalStyles.label, styles.label]}>NAME :</Text>
        <Text style={[externalStyles.BlueText, { marginLeft: 8 }]}>
        {item.title}
        </Text>
      </TouchableOpacity>
      <Divider style={{ backgroundColor: dividerColor }} />

      <View style={styles.row}>
        <FontAwesome
          name="key"
          style={[externalStyles.iconColorStyle, { color: iconColor3 }]}
        />
        <Text style={[externalStyles.label, styles.label]}>ACCESS :</Text>
        <Text style={[externalStyles.content, styles.value]}>
          {item.fullAccess ? "Full Access" : "Custom"}
        </Text>
      </View>

      <Divider style={{ backgroundColor: dividerColor }} />

      <View style={styles.row}>
        <FontAwesome
          name="users"
          style={[externalStyles.iconColorStyle, { color: iconColor5 }]}
        />
        <Text style={[externalStyles.label, styles.label]}>TEAM MEMBER :</Text>
        <Text style={[externalStyles.content, styles.value]}>
          {item.totalMember}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 8,
  },
  indexContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    marginLeft: 8,
    color: labelColor,
  },
  label: {
    marginLeft: 3,
  },
});

export default PermissionCard;
