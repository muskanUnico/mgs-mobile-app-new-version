import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { Divider } from "react-native-paper";
import { Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { styles as externalStyles } from "../../../assets/css";
import { useTheme } from "../../../context/ThemeContext";

import CustomHeading from "../../../components/elements/CustomHeading/CustomHeading";
import { StyleSheet } from "react-native";

const IntakeFormUI = ({ step2data, step1data }: any) => {
  const { theme } = useTheme();

  return (
    <>
      <View style={styles.rowLayout}>
        <Text
          style={{
            color: theme.brandColor,
            fontFamily: "BoldText",
            fontSize: 20,
            marginRight: 4,
          }}
        >
          STEP
        </Text>

        <Image
          source={require("../../../assets/images/one.png")}
          style={{ width: hp(3.5), height: hp(3.5) }}
        />
        <CustomHeading text=" Personal Information" />
      </View>
      <View style={styles.paddingTopMedium}>
        {step1data?.map((item: any, index: number) => {
          return (
            <View key={index} style={styles.paddingBottomMedium}>
              <View>
                <Text style={[externalStyles.label]}>
                  {index + 1}. {item?.title}
                </Text>
                <Text style={[externalStyles.content]}>{item?.desc}</Text>
              </View>
            </View>
          );
        })}
      </View>
      <Divider />
      <View style={styles.rowCenterLayout}>
        <Text
          style={{
            color: theme.brandColor,
            fontFamily: "BoldText",
            fontSize: 20,
            marginRight: 4,
          }}
        >
          STEP
        </Text>

        <Image
          source={require("../../../assets/images/two.png")}
          style={{ width: hp(3.5), height: hp(3.5), marginRight: 8 }}
        />
        <Text
          style={{
            color: theme.brandColor,
            fontFamily: "BoldText",
            fontSize: 17,
          }}
        >
          Patient History
        </Text>
      </View>

      <View style={{ paddingTop: 12 }}>
        {step2data?.map((item: any, index: number) => {
          return (
            <View key={index} style={{ paddingBottom: 16 }}>
              <View>
                <Text style={[externalStyles.label]}>
                  {index + 1}. {item?.title}
                </Text>
                <Text style={[externalStyles.content]}> {item?.name}</Text>
              </View>
            </View>
          );
        })}
      </View>
      <Divider />
      <View
        style={{ flexDirection: "row", alignItems: "center", paddingTop: 16 }}
      >
        <Text
          style={{
            color: theme.brandColor,
            fontFamily: "BoldText",
            fontSize: 20,
            marginRight: 4,
          }}
        >
          STEP
        </Text>

        <Image
          source={require("../../../assets/images/three.png")}
          style={{ width: hp(3.5), height: hp(3.5), marginRight: 8 }}
        />
        <Text
          style={{
            color: theme.brandColor,
            fontSize: 17,
            fontFamily: "BoldText",
          }}
        >
          Acknowledgment
        </Text>
      </View>
      <Text style={[externalStyles.label, styles.topPadding]}>
        ALL T&C ACCEPTED
      </Text>
    </>
  );
};

export default IntakeFormUI;
const styles = StyleSheet.create({
  topPadding: {
    paddingTop: 12,
  },
  paddingTopMedium: {
    paddingTop: 12,
  },
  paddingBottomMedium: {
    paddingBottom: 12,
  },
  rowCenterLayout: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
  },
});
