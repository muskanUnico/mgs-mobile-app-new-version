import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import AppointmentCard from "../../../components/ui/Report/AppointmentReport/AppointmentCard";
import {
  useGetProfitLossMonth,
  useGetProfitLossThis,
  useGetProfitLossWeek,
} from "../../../hooks/Accounts/Accounts";
import { useTheme } from "../../../context/ThemeContext";
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
        data={carouselItems}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        loop
        autoplay
        autoplayInterval={5000}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
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
      paddingVertical: 8,
    },
    dotStyle: {
      width: 5,
      height: 5,
      borderRadius: 5,
      backgroundColor: theme.brandColor,
    },
  });
};
export default IvsEcards;
