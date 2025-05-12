import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles as externalStyles } from "../../../../assets/css";
import {
  brandBlackColor,
  brandColor,
  brandWhiteColor,
} from "../../../../constants/COLORS";
import { Platform } from "react-native";
import { useTheme } from "../../../../context/ThemeContext";

interface AppointmentCardProps {
  image: ImageSourcePropType;
  appointmentCount: number;
  cardTitle: string;
  bgCustom?: string;
  widthCustom?: boolean;
  dollarIcon?: boolean;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  image,
  appointmentCount,
  cardTitle,
  dollarIcon,
}) => {
  const formattedCount =
    appointmentCount < 0
      ? `-$${Math.abs(appointmentCount)}`
      : dollarIcon
      ? `$${appointmentCount}`
      : `${appointmentCount}`;
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { marginHorizontal: 24 }]}>
      {/* <LinearGradient
        colors={["#43484e", "#f59b90"]}
        style={[externalStyles.pinkcard, styles.gradient]}
        start={[0, 0]}
        end={[1, 1]}
      > */}
      <View
        style={[
          styles.cardContent,
          { marginLeft: 8, marginTop: 32, marginBottom: 32 },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{cardTitle}</Text>
          </View>
        </View>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{formattedCount}</Text>
        </View>
      </View>
      {/* </LinearGradient> */}
      <Image
        source={image}
        style={[
          styles.image,
          { marginRight: 8, marginTop: 8, marginBottom: 8 },
        ]}
      />
    </View>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      position: "relative",
      width: "100%",
      // marginBottom: 20,
    },
    gradient: {
      borderRadius: 20,
      marginHorizontal: 30,
      padding: 35,
      flex: 1,
    },
    cardContent: {
      backgroundColor: "transparent",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
    },
    image: {
      position: "absolute",
      top: 0,
      right: 0,
      height: "100%",
      width: "50%",
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      resizeMode: "cover",
    },
    countContainer: {
      marginTop: 10,
    },
    countText: {
      fontSize: 30,
      color: theme.brandColor,
      fontFamily: "BoldText",
    },
    titleContainer: {
      marginBottom: 5,
      width: "40%",
    },
    titleText: {
      fontSize: 13,

      color: theme.brandBlackColor,
      fontFamily: "BoldText",
      // width: "95%",
    },
    card: {
      paddingLeft: 12,
      marginTop: 5,
      marginBottom: 8,
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#D9D9D9",
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
        android: {
          elevation: 4,
        },
      }),
    },
  });
};
export default AppointmentCard;
