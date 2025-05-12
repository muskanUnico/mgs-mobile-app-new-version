import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
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
import Bottom5ServicesCard from "../Bottom5ServicesCard/Bottom5ServicesCard";
import { useTheme } from "../../../../../context/ThemeContext";

const Bottom5ServicesTable = ({ services }: any) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const palette = ["#f4a48c", "#C1846E", "#F7DED7", "#E69C81", "#F7D0BC"];
  const { theme } = useTheme();

  return (
    <View>
      <View style={[styles.switchContainer, styles.mb2]}>
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
          style={(styles.switch, styles.mx1)}
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
          <View>
            {services.map((item: any, index: number) => (
              <View key={index}>
                <View
                  style={[
                    { backgroundColor: palette[index % palette.length] },
                    styles.roundedSmall,
                  ]}
                />

                <Text style={{ fontFamily: "Regular", fontSize: 12 }}>
                  {item.service.serviceName}
                </Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        services.map((item: any, index: any) => {
          return <Bottom5ServicesCard item={item} key={index} index={index} />;
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewLabel: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  mx1: {
    marginLeft: 4,
    marginRight: 4,
  },
  mb2: {
    marginBottom: 8,
  },
  roundedSmall: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "blue",
  },
  switch: {
    ...(Platform.OS === "ios" && {
      transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    }),
  },
});

export default Bottom5ServicesTable;
