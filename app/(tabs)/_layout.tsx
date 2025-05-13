import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarActiveTintColor:"#f59b90",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
        tabBarLabelStyle: {
          fontFamily: "medium",
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",tabBarIcon: ({ color, focused }) => (
            <Ionicons name="home"  size={25} color={focused ? "#f59b90" : "#555555"} />
          ),
        }}
      />
      <Tabs.Screen
        name="approvedAppointments"
        options={{
          title: "Approved",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="calendar" size={25} color={focused ? "#f59b90" : "#555555"} />
          ),
        }}
      />
      <Tabs.Screen
        name="createAppointments"
        options={{
          title: "Create",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="create" size={25} color={focused ? "#f59b90" : "#555555"} />
          ),
        }}
      />
      <Tabs.Screen
        name="team"
        options={{
          title: "Team",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="people" size={25} color={focused ? "#f59b90" : "#555555"} />
          ),
        }}
      />
    </Tabs>
  );
}


