import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { Divider } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import {
  brandColor,
  iconEmailColor,
  iconColor1,
  iconColor5,
  iconColor9,
} from "../../constants/COLORS";
import LongMenu from "../../components/elements/LongMenu/LongMenu";
import { styles as externalStyles } from "../../assets/css";
import { LeaveCalenderChips } from "../../utils/tools";
import { useTheme } from "../../context/ThemeContext";

interface ReferralCardsProps {
  handleOptions: any;
  index: number;
  item: any;
  rowOptions: any;
}

const ReferralCards = ({
  handleOptions,
  index,
  item,
  rowOptions,
}: ReferralCardsProps) => {
  const { theme } = useTheme();

  return (
    <View style={[externalStyles.card]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.indexContainer}>
            <Text
              style={[
                styles.boldText,
                { color: theme.brandColor, fontFamily: "BoldText" },
              ]}
            >
              #
            </Text>
            <Text
              style={[
                styles.boldText,
                { color: theme.brandColor, fontFamily: "BoldText" },
              ]}
            >
              {index + 1}
            </Text>
          </View>
          <Text style={[externalStyles.label, { marginLeft: 8 }]}>
            {item.customer?.name || "-"}
          </Text>
        </View>

        <View>
          <LongMenu
            options={rowOptions}
            handleOptions={(sel: any) => handleOptions(sel.id, item, item.id)}
          />
        </View>
      </View>

      <Divider style={styles.divider} />
      <View>
        <View style={styles.row}>
          <FontAwesome
            name="envelope"
            size={13}
            style={{ color: iconEmailColor }}
          />
          <Text style={[externalStyles.label, { marginLeft: 8 }]}>EMAIL</Text>
        </View>
        <Text
          style={[externalStyles.content, { marginLeft: 20, marginTop: 4 }]}
        >
          {item?.customer?.email || "-"}
        </Text>
      </View>
      <Divider style={styles.divider} />

      <View>
        <View style={styles.row}>
          <FontAwesome
            name="tag"
            style={[externalStyles.iconColorStyle, { color: iconColor1 }]}
          />
          <Text style={[externalStyles.label]}>COUPON CODE</Text>
        </View>
        <Text
          style={[externalStyles.content, { marginLeft: 20, marginTop: 4 }]}
        >
          {item.couponCode || "-"}
        </Text>
      </View>
      <Divider style={styles.divider} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <View style={styles.row}>
            <FontAwesome
              name="percent"
              style={[externalStyles.iconColorStyle, { color: iconColor5 }]}
            />
            <Text style={[externalStyles.label]}>DISCOUNT</Text>
          </View>
          <Text
            style={[externalStyles.content, { marginLeft: 20, marginTop: 4 }]}
          >
            {`${item?.discountPercentage || "-"}%`}
          </Text>
        </View>
        <View style={{ marginRight: 28 }}>
          <View style={styles.row}>
            <FontAwesome
              name="info-circle"
              style={[externalStyles.iconColorStyle, { color: iconColor9 }]}
            />
            <Text style={[externalStyles.label]}>STATUS</Text>
          </View>
          <Text style={[externalStyles.content, { marginTop: 8 }]}>
            {LeaveCalenderChips(item)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  indexContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
  },
  boldText: {},
  divider: {
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
});

export default ReferralCards;
