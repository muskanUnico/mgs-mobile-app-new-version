import { router } from "expo-router";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "../../context/ThemeContext";

export const HomeSection = () => {
  const { theme } = useTheme();
  const styles = useStyles();
  return (
    <>
      <View style={[styles.container, { marginTop: 8, marginBottom: 20 }]}>
        <View style={styles.circleContainer}>
          <View style={styles.circleWrapper}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() =>
                router.push({
                  pathname: "/appointmentReport",
                  params: { y: 3000, ScrollDown: "true" },
                })
              }
            >
              <Icon
                name="calendar"
                size={25}
                style={{ color: theme.brandColor }}
              />
            </TouchableOpacity>
            <Text style={styles.circleText}>Top Bookable Days</Text>
          </View>

          <View style={styles.circleWrapper}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() =>
                router.push({
                  pathname: "/appointmentReport",
                  params: { y: 1400, ScrollDown: "true" },
                })
              }
            >
              <Icon
                name="arrow-down"
                size={25}
                style={{ color: theme.brandColor }}
              />
            </TouchableOpacity>
            <Text style={styles.circleText}>Bottom Services</Text>
          </View>

          <View style={styles.circleWrapper}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() =>
                router.push({
                  pathname: "/appointmentReport",
                  params: { y: 800, ScrollDown: "true" },
                })
              }
            >
              <Icon
                name="dollar"
                size={27}
                style={{ color: theme.brandColor }}
              />
            </TouchableOpacity>
            <Text style={styles.circleText}>Top Grossing Services</Text>
          </View>

          <View style={styles.circleWrapper}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() =>
                router.push({
                  pathname: "/appointmentReport", 
                  params: { y: 2500, ScrollDown: "true" },
                })
              }
            >
              <Icon
                name="clock-o"
                size={28}
                style={{ color: theme.brandColor }}
              />
            </TouchableOpacity>
            <Text style={styles.circleText}>Top Time Slots</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const useStyles = () => {
  const { theme } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    circleContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      paddingHorizontal: 20,
    },
    circleWrapper: {
      alignItems: "center",
    },
    circle: {
      width: 60,
      height: 60,
      borderRadius: 100,
      backgroundColor: theme.brandPastelColor,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 5,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    circleText: {
      textAlign: "center",
      width: 80,
      marginTop: 7,
      color: "#43484e",

      fontSize: 13,
      fontFamily: "BoldText",
    },
  });
};

export default HomeSection;
