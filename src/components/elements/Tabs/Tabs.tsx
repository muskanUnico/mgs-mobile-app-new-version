// Tabs.tsx
import React from "react";
import { Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

interface Tab {
  id: number;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  setSelectedTab: (tabId: number) => void;
  selectedTab: any;
}

const Tabs: React.FC<TabsProps> = ({ tabs, setSelectedTab, selectedTab }) => {
  const handleTabPress = (tabId: number) => {
    setSelectedTab(tabId);
  };

  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            {
              backgroundColor: selectedTab === tab.id ? theme.brandColor : "#5B5B5B",
            },
          ]}
          onPress={() => handleTabPress(tab.id)}
        >
          <Text style={styles.tabText}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({  container: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  tab: {
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  tabText: {
    color: theme.brandWhiteColor,
    fontSize:12,
    fontFamily: "Regular"

  },
});
}
export default Tabs;
