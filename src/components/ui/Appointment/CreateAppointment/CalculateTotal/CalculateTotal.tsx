import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { styles as externalStyles } from "../../../../../assets/css";
import { useAuth } from "../../../../../context/AuthContext";
import { useTheme } from "../../../../../context/ThemeContext";

interface CalculateTotalprops {
  data: {
    tax: number;
    total: number;
    subtotal: number;
    discount: number;
  };
}

const CalculateTotal = ({ data }: CalculateTotalprops) => {
  const { CMSData } = useAuth();
  const { theme } = useTheme();

  return (
    <>
      <View style={[externalStyles.pinkcard, styles.paddedView]}>
        <View style={styles.rowView}>
          <Text style={[externalStyles.label]}>SUB-TOTAL</Text>
          <Text style={[externalStyles.content]}>${data?.subtotal || 0}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={[externalStyles.label]}>DISCOUNT</Text>
          <Text style={[externalStyles.content]}>${data?.discount || 0}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={[externalStyles.label]}>GROSS-TOTAL</Text>
          <Text style={[externalStyles.content]}>${data?.subtotal || 0}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={[externalStyles.label]}>Tax - {CMSData?.tax || 0}%</Text>
          <Text style={[externalStyles.content]}>${data?.tax || 0}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={{ color: theme.brandColor, fontFamily: "BoldText" }}>
            NET-TOTAL
          </Text>
          <Text style={{ color: theme.brandColor, fontFamily: "BoldText" }}>
            {" "}
            ${isNaN(data.total) ? 0 : data.total}
          </Text>
        </View>
      </View>
    </>
  );
};

export default CalculateTotal;
const styles = StyleSheet.create({
  paddedView: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 8,
  },
});
