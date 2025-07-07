import { FontAwesome } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { styles as externalStyles } from "../../../../assets/css";
import {
  dividerColor,
  iconColor3,
  iconEmailColor,
  iconPhoneColor,
} from "../../../../constants/COLORS";
import { useTheme } from "../../../../context/ThemeContext";

const CustomerCard = ({ item, index }: any) => {
  const { theme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState(item?.telephone);
  const router = useRouter();
  // Function to copy phone number to clipboard
  const copyToClipboard = () => {
    Clipboard.setString(phoneNumber);
    Alert.alert(
      "Copied to clipboard",
      `Phone number ${phoneNumber} copied to clipboard`
    );
  };

  return (
    <View style={[externalStyles.card]}>
      <View style={styles.rowLayout}>
        <View style={styles.customRowLayout}>
          <View style={styles.alignedRow}>
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
          <TouchableOpacity
            onPress={() =>
              // navigate("CustomerDetails", { customerId: item._id })
              router.push({
                pathname: "/(stack)/customerDetails",
                params: { customerId: item._id },
              })
            }
            style={styles.row}
          >
            <Text style={[externalStyles.BlueText, styles.value]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Divider style={{ backgroundColor: dividerColor }} />

      <View style={styles.row}>
        <FontAwesome
          name="envelope"
          style={[externalStyles.iconColorStyle, { color: iconEmailColor }]}
        />
        <Text style={[externalStyles.content, styles.value]}>
          {item.email || ""}
        </Text>
      </View>

      <Divider style={{ backgroundColor: dividerColor }} />

      <TouchableOpacity onPress={copyToClipboard} style={styles.row}>
        <FontAwesome
          name="phone"
          style={[externalStyles.iconColorStyle, { color: iconPhoneColor }]}
        />
        <Text style={[externalStyles.content, styles.value]}>
          {phoneNumber}
        </Text>
      </TouchableOpacity>

      <Divider style={{ backgroundColor: dividerColor }} />

      <View style={styles.row}>
        <FontAwesome
          name="calendar"
          style={[externalStyles.iconColorStyle, { color: iconColor3 }]}
        />
        <Text style={[externalStyles.label, styles.marginLeft]}>
          Last Visited :
        </Text>
        <Text style={[externalStyles.content, styles.value]}>
          {item.appointment &&
            moment(item.appointment).format("DD MMM YYYY").toString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
  },
  rowLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customRowLayout: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    marginLeft: 8,
  },
  marginLeft: {
    marginLeft: 8,
  },
  alignedRow: {
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomerCard;
