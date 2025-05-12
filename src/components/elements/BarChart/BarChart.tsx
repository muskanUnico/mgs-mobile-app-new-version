import React from "react";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import {
  pieColor1,
  pieColor2,
  pieColor3,
  pieColor4,
  pieColor5,
} from "../../../constants/COLORS";

const BarThreeD = ({ barData }: any) => {
  // Define a function to get colors based on the index
  const getColorByIndex = (index: number) => {
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
        noOfSections={10}
        maxValue={5000}
        data={barData?.map((item: any, index: number) => ({
          ...item,
          ...getColorByIndex(index),
        }))}
        barWidth={25}
        sideWidth={15}
        isThreeD
        side="right"
      />
    </View>
  );
};

export default BarThreeD;
