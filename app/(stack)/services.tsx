//@ts-nocheck
import React from "react";
import { FlatList, View } from "react-native";
import { brandGreyColor } from "@/src/constants/COLORS";
import Title from "@/src/components/elements/Title/Title";
import { AllServices } from "@/src/features/Services/AllServices";
import { useTheme } from "@/src/context/ThemeContext";

const Services = ({ navigation }: any) => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.brandGreyColor }} >
      <FlatList
        ListHeaderComponent={
          <>
            <Title navigation={navigation} title="Services" />
            <AllServices navigation={navigation}/>
          </>
        }
      />
    </View>
  );
};

export default Services;
