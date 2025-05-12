import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { styles as externalStyles } from "../../../../../assets/css";
import { Divider } from "react-native-paper";
import {
  dividerColor,
  iconColor3,
  iconColor5,
} from "../../../../../constants/COLORS";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../../../../../context/ThemeContext";

const Top_5_Grossing_ServicesCard = ({ item, index }: any) => {
  const { theme } = useTheme();

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.row}>
          <FontAwesome5 name="servicestack" style={{ color: iconColor5 }} />
          <Text style={[externalStyles.label, { marginLeft: 8 }]}>
            Service :
          </Text>
          <Text style={[externalStyles.content, styles.value, { width: 250 }]}>
            {item.serviceName}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: theme.brandColor, fontFamily: "BoldText" }}>
            #
          </Text>
          <Text
            style={{
              color: theme.brandColor,
              fontFamily: "BoldText",
              paddingLeft: 4,
            }}
          >
            {index + 1}
          </Text>
        </View>
      </View>

      <Divider style={{ backgroundColor: dividerColor }} />
      <View style={styles.row}>
        <MaterialIcons
          name="format-list-numbered"
          style={{ color: iconColor3 }}
        />
        <Text style={[externalStyles.label, { marginLeft: 8 }]}>Count:</Text>
        <Text style={[externalStyles.content, styles.value]}>
          {item?.total}
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
});
export default Top_5_Grossing_ServicesCard;
