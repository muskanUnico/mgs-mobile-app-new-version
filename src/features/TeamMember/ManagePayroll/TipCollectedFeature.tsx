import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { styles as externalStyles } from "../../../assets/css";
import TipCollectedCard from "../../../components/ui/TeamMember/TipCollectedCard/TipCollectedCard";
import { greenColor } from "../../../constants/COLORS";
import { useTheme } from "../../../context/ThemeContext";
import { TotalTip } from "../../../utils/functions";

export const TipCollectedFeature = ({ naviagtion, route,item }: any) => {
  const data = item?.tips;
  const { theme } = useTheme();

  return (
    <>
      <View style={[styles.row, { marginHorizontal: 24 }]}>
        <FontAwesome
          name="money"
          style={[externalStyles.iconColorStyle, { color: greenColor }]}
        />
        <Text
          style={[
            externalStyles.label,
            { color: theme.brandColor, marginLeft: 4 },
          ]}
        >
          TOTAL TIP : ${TotalTip(data)}
        </Text>
      </View>

      {data.map((item: any, index: number) => {
        return <TipCollectedCard item={item} key={index} index={index} />;
      })}
    </>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
});
