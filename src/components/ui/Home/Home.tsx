import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { brandPastelColor, brandWhiteColor } from "../../../constants/COLORS";
import { navigate } from "../../../utils/navigationServices";
import { useTheme } from "../../../context/ThemeContext";

interface HomeProps {
  number: number;
  serviceTitle: string;
  time: string;
  appointmentId: string;
}

export const Home = ({
  number,
  serviceTitle,
  time,
  appointmentId,
}: HomeProps) => {
  const styles = useStyles();
  return (
    <TouchableOpacity
      onPress={() => navigate("ViewAppointment", { id: appointmentId })}
      style={styles.link}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>{number}</Text>
          </View>
          <View style={styles.smallLeftMargin}>
            <Text style={[styles.serviceTitle, styles.smallBottomMargin]}>
              {serviceTitle}
            </Text>
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>
        <Icon name="arrow-forward-ios" size={20} color="gray" />
      </View>
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    link: {
      width: "100%",
      backgroundColor: brandPastelColor,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#D9D9D9",
      paddingHorizontal: 16,
      paddingVertical: 10,
      overflow: "hidden",
      marginBottom: 10,
    },
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    smallBottomMargin: {
      marginBottom: 4, // mb-1 equivalent
    },
    smallLeftMargin: {
      marginLeft: 4,
    },
    numberContainer: {
      borderRadius: 25,
      backgroundColor: theme.brandColor,
      height: 35,
      width: 35,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#FFFFFF",
    },
    number: {
      color: brandWhiteColor,
      fontFamily: "BoldText",
    },
    serviceTitle: {
      fontFamily: "BoldText",
      fontSize: 14,
      color: "#000000",
    },
    time: {
      fontFamily: "Regular",
      fontSize: 12,
      color: "#000000",
    },
  });
};
