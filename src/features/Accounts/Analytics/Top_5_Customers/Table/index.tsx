import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { styles as externalStyles } from "../../../../../assets/css";
import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import {
  dividerColor,
  iconEmailColor,
  iconPersonColor,
} from "../../../../../constants/COLORS";
import { useTheme } from "../../../../../context/ThemeContext";

const Top5CustomersTable = ({ customers }: any) => {
  const { theme } = useTheme();

  return customers.map((item: any, index: any) => {
    return (
      <View key={index}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <View style={styles.row}>
            <FontAwesome
              name="user"
              style={[
                externalStyles.iconColorStyle,
                { color: iconPersonColor },
              ]}
            />
            <Text
              style={[externalStyles.content, styles.value, { width: 250 }]}
            >
              {item.name}
            </Text>
          </View>
        </View>

        <Divider style={{ backgroundColor: dividerColor }} />

        <View style={styles.row}>
          <FontAwesome
            name="envelope"
            style={[externalStyles.iconColorStyle, { color: iconEmailColor }]}
          />
          <Text style={[externalStyles.content, styles.value]}>
            {item.email}
          </Text>
        </View>

        <Divider style={{ backgroundColor: theme.brandBlackColor }} />
      </View>
    );
  });
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 7,
  },

  value: {
    marginLeft: 8,
  },
});

export default Top5CustomersTable;
