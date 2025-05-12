import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getServices } from "../../hooks/Services";
import { useTheme } from "../../context/ThemeContext";
import { styles as externalStyles } from "../../assets/css";

const ServicesProvided = ({ user }: any) => {
  // integration
  const servicesData = getServices(100);

  // data
  const filteredServices = servicesData.data.filter((service) =>
    user.services.includes(service.id)
  );
  const titlesOnly = filteredServices.map((item) => [item.title]);
  const styles = useStyles();

  return (
    <View style={externalStyles.card}>
      <Text style={styles.headerText}>Services</Text>
      {titlesOnly.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              marginTop: 8,
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 12,
            }}
          >
            <Text>{index + 1}</Text>
            <Text>{item}</Text>
          </View>
        );
      })}
    </View>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      padding: 16,
    },
    header: {
      paddingBottom: 16,
    },
    headerText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.brandColor,
      fontFamily: "BoldText",
    },
  });
};

export default ServicesProvided;
