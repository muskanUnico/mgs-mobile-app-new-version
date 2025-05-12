import { View } from "react-native";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { generateColorArray } from "../../utils/functions";
import ColorBox from "../../components/elements/Colorbox/Colorbox";

interface ColorObject {
  color: string;
  check: boolean;
}

const ColorSelectorfeature = ({
  data,
  updateState,
}: {
  data?: string;
  updateState: any;
}) => {
  const initialColors: ColorObject[] = generateColorArray(12, data);
  const [colorsArray, setColorsArray] = useState<ColorObject[]>(initialColors);

  // Update the selected color in the parent component
  useEffect(() => {
    const selectedColor = colorsArray.find((col) => col.check)?.color || data;
    updateState({ color: selectedColor || "" });
  }, [colorsArray]);

  const handleColorChange = (index: number) => {
    const newColors = colorsArray.map((item, i) => ({
      ...item,
      check: i === index,
    }));
    setColorsArray(newColors);
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.grid}>
        {colorsArray.map((item, index) => (
          <View style={styles.gridItem} key={index}>
            <ColorBox
              color={item.color}
              isSelected={item.check}
              onPress={() => handleColorChange(index)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "50%",
  },
  gridItem: {
    marginBottom: 5,
  },
  container: {
    alignItems: "center",
    marginHorizontal: "auto",
    textAlign: "center",
  },
});

export default ColorSelectorfeature;
