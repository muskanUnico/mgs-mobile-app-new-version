import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { brandWhiteColor } from "../../../constants/COLORS";
import { useTheme } from "../../../context/ThemeContext";

const Heading = ({ title1 }: { title1: string }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.marginStyle, { backgroundColor: theme.brandColor }]}>
      <View style={styles.flexStyle}>
        <View style={styles.marginLeft2}>
          <View style={styles.marginStyle2}>
            <Text
              style={{
                color: brandWhiteColor,

                fontSize: 26,
                flexWrap: "wrap",
                textShadowColor: "black",
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
                fontFamily: "BoldText",
              }}
            >
              {title1}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Heading;
const styles = StyleSheet.create({
  marginStyle: {
    paddingBottom: 4,
    marginBottom: 20,
  },
  flexStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginRight: 24,
    paddingBottom: 56,
    alignItems: "center",
  },
  marginLeft2: {
    marginLeft: 8,
  },
  marginStyle2: {
    marginLeft: 16,
    marginTop: 12,
    marginBottom: 4,
  },
});
