import React from "react";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import {
  pieColor1,
  pieColor2,
  pieColor3,
  pieColor4,
  pieColor5,
} from "../../constants/COLORS";

const ChartHomePage = ({ barData }) => {
  // Define a function to get colors based on the index
  const getColorByIndex = (index) => {
    switch (index) {
      case 0:
        return {
          frontColor: pieColor1,
          sideColor: pieColor1,
          topColor: pieColor1,
        };
      case 1:
        return {
          frontColor: pieColor2,
          sideColor: pieColor2,
          topColor: pieColor2,
        };
      case 2:
        return {
          frontColor: pieColor3,
          sideColor: pieColor3,
          topColor: pieColor3,
        };
      case 3:
        return {
          frontColor: pieColor4,
          sideColor: pieColor4,
          topColor: pieColor4,
        };
      case 4:
        return {
          frontColor: pieColor5,
          sideColor: pieColor5,
          topColor: pieColor5,
        };
      default:
        return {};
    }
  };

  return (
    <View>
      <BarChart
        showFractionalValues
        showYAxisIndices
        hideRules
        noOfSections={5}
        maxValue={50}
        data={barData?.map((item, index) => ({
          ...item,
          ...getColorByIndex(index),
        }))}
        barWidth={40}
        sideWidth={20}
        isThreeD
        side="right"
      />
    </View>
  );
};

export default ChartHomePage;
