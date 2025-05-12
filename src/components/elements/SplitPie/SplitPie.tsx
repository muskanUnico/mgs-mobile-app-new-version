import {
  pieColor1,
  pieColor2,
  pieColor3,
  pieColor4,
  pieColor5,
} from "../../../constants/COLORS";
import React from "react";
import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const SplitPie = () => {
  const pieData = [
    { value: 24, color: pieColor1 },
    { value: 10, color: pieColor2 },
    { value: 4, color: pieColor3 },
    { value: 3, color: pieColor4 },
    { value: 2, color: pieColor5 },
  ];
  return (
    <View>
      <PieChart data={pieData} />
    </View>
  );
};

export default SplitPie;
