import React from "react";
import moment from "moment";
import { Text, View, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import {
  iconColor9,
  iconColor12,
  iconColor10,
  brandColor,
} from "../../../constants/COLORS";
import { styles as externalStyles } from "../../../assets/css";
import { useTheme } from "../../../context/ThemeContext";

const IvsEtable = ({ item }: any) => {
  const checkData = (item.totalRevenue ?? 0) - (item.totalExpense ?? 0) || 0;
  const { theme } = useTheme();

  return (
    <View style={[externalStyles.card]}>
      <View>
        <View style={styles.headerLeft}>
          <FontAwesome
            name="calendar"
            size={13}
            style={{ color: iconColor9 }}
          />
          <Text style={[externalStyles.label, { marginLeft: 8 }]}>DATE :</Text>
          <Text style={[externalStyles.content, { marginLeft: 8 }]}>
            {moment(item.date).format("DD MMM YYYY")}
          </Text>
        </View>
        <Divider style={styles.divider} />
      </View>
      <View style={styles.row}>
        <FontAwesome
          name="balance-scale"
          size={14}
          style={{ color: theme.brandColor }}
        />
        <Text style={[externalStyles.label, { marginLeft: 4 }]}>
          PROFIT/LOSS AMOUNT :
        </Text>

        <Text style={[externalStyles.content, { marginLeft: 8 }]}>
          {checkData < 0 ? (
            <Text style={[{ color: "red", fontFamily: "Regular" }]}>
              {`-$${Math.abs(checkData).toFixed(2)}`}
            </Text>
          ) : (
            <Text style={[{ color: "green", fontFamily: "Regular" }]}>
              {`+$${checkData.toFixed(2)}`}
            </Text>
          )}
        </Text>
      </View>

      <Divider style={styles.divider} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <View style={styles.row}>
            <FontAwesome
              name="dollar"
              size={15}
              style={{ color: iconColor12 }}
            />
            <Text style={[externalStyles.label, { marginLeft: 8 }]}>
              INCOME AMOUNT
            </Text>
          </View>
          <Text
            style={[externalStyles.content, { marginLeft: 20, marginTop: 4 }]}
          >
            {item.totalRevenue ? (
              <Text style={{ fontFamily: "Regular" }}>
                {`$${item.totalRevenue.toFixed(2)}`}{" "}
              </Text>
            ) : (
              <Text style={{ fontFamily: "Regular" }}>-</Text>
            )}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View>
          <View style={styles.row}>
            <FontAwesome
              name="credit-card"
              size={12}
              style={{ color: iconColor10 }}
            />
            <Text style={[externalStyles.label, { marginLeft: 6 }]}>
              EXPENSE AMOUNT
            </Text>
          </View>
          <Text
            style={[externalStyles.content, { marginLeft: 20, marginTop: 4 }]}
          >
            {item.totalExpense ? (
              <Text>{`$${item.totalExpense.toFixed(2)}`} </Text>
            ) : (
              <Text>-</Text>
            )}
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
  boldText: {
    fontFamily: "BoldText",
  },
  divider: {
    marginVertical: 9,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
});

export default IvsEtable;
