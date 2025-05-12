import React from "react";
import { Text, View } from "react-native";
import { Divider } from "react-native-paper";
import { brandColor } from "../../../constants/COLORS";
import { useTheme } from "../../../context/ThemeContext";
import { styles as externalStyles } from "../../../assets/css";

export const Address = () => {
  const { theme } = useTheme();
  return (
    <>
      <View style={{ paddingRight: 12, margin: 4 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
          }}
        >
          <View>
            <Text
              style={[
                {
                  fontSize: 18,
                  color: theme.brandColor,
                  fontFamily: "BoldText",
                },
              ]}
            >
              MY GIRL SOUZ
            </Text>
            <View style={{ marginTop: 16 }}>
              <Text style={[externalStyles.content]}>
                4949 HUBALTA ROAD SE, CALGARY, AB T2B 1T5, CANADA
              </Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <Text style={[externalStyles.content]}>403-994-0400</Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <Text style={[externalStyles.content]}>INFO@MYGIRLSOUZ.COM</Text>
            </View>
          </View>
        </View>
      </View>
      <Divider style={{ marginVertical: 12 }} />
    </>
  );
};
