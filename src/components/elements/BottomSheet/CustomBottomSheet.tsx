import { Entypo } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import BottomSheet from "react-native-raw-bottom-sheet";
import { styles as externalStyles } from "../../../assets/css";
import { useTheme } from "../../../context/ThemeContext";

const CustomBottomSheet = ({ bottomSheetRef, children, text, height }: any) => {
  const { theme } = useTheme();

  return (
    <BottomSheet
      ref={bottomSheetRef}
      height={height}
      customStyles={{
        container: {
          borderTopLeftRadius: 9,
          borderTopRightRadius: 9,

          backgroundColor: theme.brandWhiteColor,
        },
        wrapper: {
          backgroundColor: "transparent",
        },
      }}
    >
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: theme.brandColor,
        }}
      >
        <Text style={[styles.customText, externalStyles.globalFontBold]}>
          {text}
        </Text>
        <Entypo
          name="cross"
          size={24}
          color="white"
          onPress={() => bottomSheetRef.current.close()}
        />
      </View>
      <SafeAreaView
        style={[{ backgroundColor: theme.brandPastelColor }, styles.fullHeight]}
      >
        {children}
      </SafeAreaView>
    </BottomSheet>
  );
};

export default CustomBottomSheet;
const styles = StyleSheet.create({
  customText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#ffffff",
    textTransform: "uppercase",
    marginLeft: 12,
  },
  fullHeight: {
    minHeight: "100%",
    paddingBottom:60
  },
});
