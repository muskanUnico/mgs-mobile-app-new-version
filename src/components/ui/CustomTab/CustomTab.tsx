//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { brandColor } from "../../../constants/COLORS";
import { useTheme } from "../../../context/ThemeContext";

const CustomTab = ({ state, navigation }: any) => {
  const tabs = [
    { name: "Home", icon: "ios-home", id: 1 },
    { name: "ApprovedAppointment", icon: "ios-calendar", id: 2 },
    { name: "AllTeamMember", icon: "ios-people", id: 3 },
    { name: "CreateAppointment", icon: "ios-create", id: 4 },
  ];
  const [active, setActive] = useState(1);
  const viewRefs = tabs.map(() => useRef(null));

  useEffect(() => {
    const currentTabIndex = state.index;
    tabs.forEach((tab, index) => {
      if (index === currentTabIndex) {
        viewRefs[index].current.animate({
          0: { scale: 0.5 },
          1: { scale: 1.1 },
        });
      } else {
        viewRefs[index].current.animate({
          0: { scale: 1.2 },
          1: { scale: 1.1 },
        });
      }
    });
  }, [state.index]);
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => (navigation.navigate(tab.name), setActive(tab.id))}
            style={[styles.tabItem]}
          >
            <Animatable.View ref={viewRefs[index]} duration={1000}>
              <Ionicons
                name={tab.icon}
                size={25}
                color={tab.id === active ? theme.brandColor : "#555555"}
              />
            </Animatable.View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    elevation: 50,
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
  tabContainer: {
    flexDirection: "row",
    height: 55,
    backgroundColor: "#ffffff",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomTab;
