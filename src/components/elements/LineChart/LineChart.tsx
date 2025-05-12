import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import {
  pieColor1,
  pieColor2,
  pieColor5,
} from "../../../constants/COLORS";

const LineChartTwo = ({
  lineData,
  lineData2,
  lineData3,
  xAxisLabels,
  legendTitles,
}: any) => {
  return (
    <View>
      <LineChart
        data={lineData}
        data2={lineData2}
        data3={lineData3}
        height={350}
        showValuesAsDataPointsText
        spacing={100}
        initialSpacing={20}
        color1={pieColor1}
        color2={pieColor2}
        color3={pieColor5}
        textColor1={pieColor1}
        textColor2={pieColor2}
        textColor3={pieColor5}
        dataPointsHeight={2}
        dataPointsWidth={6}
        dataPointsColor1={pieColor1}
        dataPointsColor2={pieColor2}
        dataPointsColor3={pieColor5}
        textShiftY={-2}
        textShiftX={-5}
        textFontSize={10}
        hideRules={true}
        xAxisLabelTexts={xAxisLabels}
        
      />
      {/* Legend */}
      <View style={styles.legendContainer}>
        {legendTitles &&
          Array.isArray(legendTitles) &&
          legendTitles.map((title: string, index: number) => (
            <View key={index} style={styles.legendItemContainer}>
              <View
                style={[
                  styles.legendItem,
                  { backgroundColor: getColorForIndex(index) },
                ]}
              />
              <Text style={{ fontFamily: "Regular"}}>{title}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};

const getColorForIndex = (index: number) => {
  switch (index) {
    case 0:
      return pieColor1;
    case 1:
      return pieColor2;
    case 2:
      return pieColor5;
    default:
      return pieColor1;
  }
};

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    gap: 15,
    fontFamily: "Regular"

  },
  legendItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Regular"

  },
  legendItem: {
    width: 10,
    height: 10,
    marginRight: 5,
    fontFamily: "Regular"

  },
});

export default LineChartTwo;
