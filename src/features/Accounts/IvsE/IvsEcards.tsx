import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import AppointmentCard from "../../../components/ui/Report/AppointmentReport/AppointmentCard";
import { useTheme } from "../../../context/ThemeContext";
import {
  useGetProfitLossMonth,
  useGetProfitLossThis,
  useGetProfitLossWeek,
} from "../../../hooks/Accounts/Accounts";
import { formatCardCount } from "../../../utils/functions";

const screenWidth = Dimensions.get("window").width;

const IvsEcards = () => {
  const { thisData } = useGetProfitLossThis();
  const { week } = useGetProfitLossWeek();
  const { month } = useGetProfitLossMonth();

  const todayProfitLoss = thisData.totalRevenue - thisData.totalExpense;
  const weeklyProfitLoss = week.totalRevenue - week.totalExpense;
  const monthlyProfitLoss = month.totalRevenue - month.totalExpense;

  const [activeSlide, setActiveSlide] = useState(0);

  const carouselItems = [
    {
      key: "today",
      component: (
        <AppointmentCard
          image={require("../../../assets/images/iv2.png")}
          appointmentCount={formatCardCount(todayProfitLoss)}
          cardTitle="Today's Profit/Loss"
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
          image={require("../../../assets/images/iv1.png")}
          appointmentCount={formatCardCount(weeklyProfitLoss)}
          cardTitle="This Week's Profit/Loss"
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
          image={require("../../../assets/images/iv3.png")}
          appointmentCount={formatCardCount(monthlyProfitLoss)}
          cardTitle="This Month's Profit/Loss"
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
        width={screenWidth}
        height={180} 
        data={carouselItems}
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
export default IvsEcards;
