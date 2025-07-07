import React from "react";
import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../../../context/ThemeContext";

interface CardProps {
  image: ImageSourcePropType;
  appointmentCount: number;
  cardTitle: string;
  bgCustom?: string;
  widthCustom?: boolean;
  dollarIcon?: boolean;
}

const Card: React.FC<CardProps> = ({
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
    <View style={styles.container}>
      <View style={[styles.card, styles.gradient, styles.paddedVertical]}>
        <View style={[styles.cardContent]}>
          <View style={styles.header}>
            <View style={[styles.titleContainer, styles.marginLeft2]}>
              <Text style={styles.titleText}>{cardTitle}</Text>
            </View>
          </View>
          <View style={[styles.countContainer, styles.marginLeft5]}>
            <Text style={styles.countText}>{formattedCount}</Text>
          </View>
        </View>
      </View>
      <Image source={image} style={[styles.image, styles.marginRight10]} />
    </View>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      position: "relative",
      width: "100%",
      // marginBottom: 20,
    },
    paddedVertical: {
      paddingVertical: 40,
    },
    marginRight10: {
      marginRight: 40,
    },
    gradient: {
      borderRadius: 20,
      marginHorizontal: 25,
      padding: 30,
      flex: 1,
    },
    marginLeft5: {
      marginLeft: 20,
    },
    cardContent: {
      backgroundColor: "transparent",
    },
    marginLeft2: {
      marginLeft: 8,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      width: "50%",
    },
    image: {
      position: "absolute",
      top: 0,
      right: 0,
      height: "100%",
      width: "40%",
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      resizeMode: "cover",
    },
    countContainer: {
      marginTop: 10,
      paddingRight: 110,
    },
    countText: {
      fontSize: 30,
      color: theme.brandColor,
      fontFamily: "BoldText",
    },
    titleContainer: {
      marginBottom: 5,
    },
    titleText: {
      fontSize: 11,

      color: theme.brandBlackColor,
      fontFamily: "BoldText",
    },
    card: {
      paddingHorizontal: 12,
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

export default Card;
