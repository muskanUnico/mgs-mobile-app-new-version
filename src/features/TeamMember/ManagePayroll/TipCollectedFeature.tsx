import { Text, View } from "react-native";
import TipCollectedCard from "../../../components/ui/TeamMember/TipCollectedCard/TipCollectedCard";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { styles as externalStyles } from "../../../assets/css";
import { brandColor, greenColor } from "../../../constants/COLORS";
import { StyleSheet } from "react-native";
import { TotalTip } from "../../../utils/functions";
import { useTheme } from "../../../context/ThemeContext";

export const TipCollectedFeature = ({ naviagtion, route }: any) => {
  const data = route.params?.item?.tips;
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
