import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useTheme } from "../../../../context/ThemeContext";
import AppointmentCard from "../AppointmentReport/AppointmentCard";

const screenWidth = Dimensions.get("window").width;

const RevenueReportCards = ({
  todayIncome,
  totalrevenue,
  totalexpense,
}: any) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselItems = [
    {
      key: "today",
      component: (
        <AppointmentCard
          image={require("../../../../assets/images/todayincome.png")}
          appointmentCount={todayIncome || 0}
          cardTitle="Today's Income"
          bgCustom="#e6e6e6"
          dollarIcon={true}
          widthCustom={true}
        />
      ),
    },
    {
      key: "thisWeek",
      component: (
        <AppointmentCard
          image={require("../../../../assets/images/revenue.png")}
          appointmentCount={totalrevenue || 0}
          cardTitle="Total Revenue"
          bgCustom="#e6e6e6"
          dollarIcon={true}
          widthCustom={true}
        />
      ),
    },
    {
      key: "thisMonth",
      component: (
        <AppointmentCard
          image={require("../../../../assets/images/expense.png")}
          appointmentCount={totalexpense || 0}
          cardTitle="Total Expense"
          bgCustom="#e6e6e6"
          dollarIcon={true}
        />
      ),
    },
  ];

  const renderItem = ({ item }: any) => item.component;
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Carousel
        data={carouselItems}
        width={screenWidth}
        height={160}
        renderItem={renderItem}
        loop
        autoPlay
        autoPlayInterval={5000}
        onSnapToItem={(index) => setActiveSlide(index)}
      />

      <View style={styles.paginationContainer}>
        {carouselItems.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeSlide
                ? { backgroundColor: theme.brandColor }
                : { backgroundColor: "#ccc" },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      alignItems: "center",
      marginVertical: 10,
    },
    paginationContainer: {
      flexDirection: "row",
      justifyContent: "center",
      paddingVertical: 10,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 5,
    },
  });
};
export default RevenueReportCards;
