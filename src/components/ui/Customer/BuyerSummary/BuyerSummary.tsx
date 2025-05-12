import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import CustomHeading from "../../../../components/elements/CustomHeading/CustomHeading";
import { styles as externalStyles } from "../../../../assets/css";
import {
  iconCalenderColor,
  iconColor10,
  iconColor11,
  iconColor12,
  iconColor5,
  iconColor8,
} from "../../../../constants/COLORS";

// Interface for props
interface BuyerSummaryProps {
  data: {
    firstVisit: string;
    lastVisit: string;
    frequency: string;
    totalVisits: number;
    averageSpend: string;
    totalSpent: string;
  };
}

const BuyerSummary: React.FC<BuyerSummaryProps> = ({ data }) => {
  return (
    <View style={[externalStyles.card]}>
      <View style={styles.cardContent}>
        <CustomHeading iconName="user" text="Buyer Summary" />

        <Divider style={styles.verticalSpacing} />

        <View>
          <View style={styles.cardColumn}>
            <View style={styles.iconTextRow}>
              <FontAwesome
                name="calendar"
                style={[externalStyles.iconColorStyle, { color: iconColor11 }]}
              />
              <View style={styles.textContainer}>
                <Text style={[externalStyles.label]}>First Visit</Text>
                <Text style={[externalStyles.content]}>{data?.firstVisit}</Text>
              </View>
            </View>
            <View style={styles.iconTextRow}>
              <FontAwesome
                name="clock-o"
                style={[externalStyles.iconColorStyle, { color: iconColor5 }]}
              />
              <View style={[styles.textContainer, { flex: 1 }]}>
                <Text style={[externalStyles.label]}>Frequency</Text>
                <Text style={[externalStyles.content]}>{data?.frequency}</Text>
              </View>
            </View>
            <View style={styles.rowLayout}>
              <View style={styles.cardColumn}>
                <View style={styles.iconTextRow}>
                  <FontAwesome
                    name="money"
                    style={[
                      externalStyles.iconColorStyle,
                      { color: iconColor10 },
                    ]}
                  />
                  <View style={styles.textContainer}>
                    <Text style={[externalStyles.label]}>Average Spend</Text>
                    <Text style={[externalStyles.content]}>
                      {data?.averageSpend}
                    </Text>
                  </View>
                </View>

                <View style={styles.iconTextRow}>
                  <FontAwesome
                    name="calendar"
                    style={[
                      externalStyles.iconColorStyle,
                      { color: iconCalenderColor },
                    ]}
                  />
                  <View style={styles.textContainer}>
                    <Text style={[externalStyles.label]}>Last Visit</Text>
                    <Text style={[externalStyles.content]}>
                      {data?.lastVisit}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.cardColumn}>
                <View style={styles.iconTextRow}>
                  <FontAwesome
                    name="clipboard"
                    style={[
                      externalStyles.iconColorStyle,
                      { color: iconColor8 },
                    ]}
                  />
                  <View style={styles.textContainer}>
                    <Text style={[externalStyles.label]}>Visit</Text>
                    <Text style={[externalStyles.content]}>
                      {data?.totalVisits} visits
                    </Text>
                  </View>
                </View>

                <View style={styles.iconTextRow}>
                  <FontAwesome
                    name="money"
                    style={[
                      externalStyles.iconColorStyle,
                      { color: iconColor12 },
                    ]}
                  />
                  <View style={styles.textContainer}>
                    <Text style={[externalStyles.label]}>Total Spent</Text>
                    <Text style={[externalStyles.content]}>
                      {data?.totalSpent}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BuyerSummary;

// Styles for the card and its content
const styles = StyleSheet.create({
  cardContent: {
    paddingBottom: 16,
  },
  verticalSpacing: {
    marginVertical: 4,
  },
  cardColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  iconTextRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 8,
  },
  textContainer: {
    flexDirection: "column",
    marginTop: 7,
  },
});
