// Table.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { styles as externalStyles } from "../../../assets/css";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import {
  dividerColor,
  iconColor3,
  iconPersonColor,
} from "../../../constants/COLORS";
import { useTheme } from "../../../context/ThemeContext";

const CustomCard = ({ item }: any) => {
  const { theme } = useTheme();

  return (
    <View>
      <View style={styles.rowBetween}>
        <View style={styles.row}>
          <FontAwesome
            name="user"
            style={[externalStyles.iconColorStyle, { color: iconPersonColor }]}
          />
          <Text style={[externalStyles.content, styles.value, styles.width250]}>
            {item?.teamMember?.teamMemberName}
          </Text>
        </View>
      </View>

      <Divider style={{ backgroundColor: dividerColor }} />

      <View style={styles.row}>
        <MaterialIcons
          name="format-list-numbered"
          style={{ color: iconColor3 }}
        />
        <Text style={[externalStyles.label, styles.marginLeft2]}>Count:</Text>
        <Text style={[externalStyles.content, styles.value]}>
          {" "}
          {item?.count}
        </Text>
      </View>

      <Divider style={{ backgroundColor: theme.brandBlackColor }} />
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 7,
  },

  value: {
    marginLeft: 8,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  width250: {
    width: 250,
  },
  marginLeft2: {
    marginLeft: 8,
  },
});

export default CustomCard;
