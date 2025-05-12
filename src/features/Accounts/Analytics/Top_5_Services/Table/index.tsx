import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Switch } from "react-native-paper";
import { borderColor } from "../../../../../constants/COLORS";
import { styles as externalStyles } from "../../../../../assets/css";
import { PieChart } from "react-native-gifted-charts";
import {
  pieColor1,
  pieColor2,
  pieColor3,
  pieColor4,
  pieColor5,
} from "../../../../../constants/COLORS";
import { formateDataForPieChart } from "../../../../../utils/functions";
import Top_5_ServicesCard from "../Top_5_ServicesCard/Top_5_ServicesCard";
import { useTheme } from "../../../../../context/ThemeContext";

const Top5ServicesTable = ({ services }: any) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const palette = ["#f4a48c", "#C1846E", "#F7DED7", "#E69C81", "#F7D0BC"];
  const { theme } = useTheme();

  return (
    <View>
      <View style={[styles.switchContainer, { marginBottom: 8 }]}>
        <Text style={[externalStyles.label, { color: theme.brandColor }]}>
          TABULAR VIEW
        </Text>
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          thumbColor={
            isSwitchOn ? theme.brandPastelColor : theme.brandGreyColor
          }
          trackColor={{ true: theme.brandColor, false: borderColor }}
          style={[styles.switch, { marginHorizontal: 4 }]}
        />
        <Text style={[externalStyles.label, { color: theme.brandColor }]}>
          CHART VIEW
        </Text>
      </View>

      {isSwitchOn ? (
        <>
          <PieChart
            data={formateDataForPieChart(services, [
              pieColor1,
              pieColor2,
              pieColor3,
              pieColor4,
              pieColor5,
            ])}
          />
          <View style={styles.wrapCenter}>
            {services.map((item: any, index: number) => (
              <View key={index} style={styles.rowCenter}>
                <View
                  style={[
                    { backgroundColor: palette[index % palette.length] },
                    styles.circle,
                  ]}
                ></View>
                <Text style={{ fontFamily: "Regular", fontSize: 12 }}>
                  {item.service.serviceName}
                </Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        services.map((item: any, index: number) => {
          return <Top_5_ServicesCard item={item} key={index} index={index} />;
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewLabel: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  wrapCenter: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingTop: 16,
  },

  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  circle: {
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: "yourColor",
  },
  switch: {
    ...(Platform.OS === "ios" && {
      transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    }),
  },
});

export default Top5ServicesTable;
