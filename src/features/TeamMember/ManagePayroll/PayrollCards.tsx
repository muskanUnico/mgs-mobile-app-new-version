import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import CustomCrouselPagination from "@/src/components/elements/CustomCrouselPagination/CustomCrouselPagination";
import Carousel from "react-native-reanimated-carousel";
import AppointmentCard from "../../../components/ui/Report/AppointmentReport/AppointmentCard";
import { useTheme } from "../../../context/ThemeContext";
import {
  useGetMonthEarning,
  useGetThisEarning,
  useGetWeekEarning,
} from "../../../hooks/TimeTracker";

const i1 = require("../../../assets/images/aa.png");
const i2 = require("../../../assets/images/aaaa.png");
const i3 = require("../../../assets/images/aaa.png");
const i4 = require("../../../assets/images/a.png");

const PayrollCards = () => {
  const screenWidth = Dimensions.get("window").width;
  const { last } = useGetMonthEarning();
  const { data } = useGetWeekEarning();
  const { thisData } = useGetThisEarning();

  const todayEarnings = thisData.totalAmount;
  const weekEarnings = data.totalAmount;
  const MonthEarnings = last.totalAmount;

  const [activeSlide, setActiveSlide] = useState(0);

  const carouselItems = [
    {
      key: "today",
      component: (
        <AppointmentCard
          image={i1}
          appointmentCount={todayEarnings}
          cardTitle="Today's Earnings"
          bgCustom="#e6e6e6"
          widthCustom={true}
          dollarIcon={true}
        />
      ),
    },
    {
      key: "thisWeek",
      component: (
        <AppointmentCard
          image={i2}
          appointmentCount={weekEarnings}
          cardTitle="This Week's Earnings"
          bgCustom="#e6e6e6"
          widthCustom={true}
          dollarIcon={true}
        />
      ),
    },
    {
      key: "thisMonth",
      component: (
        <AppointmentCard
          image={i3}
          appointmentCount={MonthEarnings}
          cardTitle="This Month's Earnings"
          bgCustom="#e6e6e6"
          widthCustom={true}
          dollarIcon={true}
        />
      ),
    },
  ];

  const renderItem = ({ item }: any) => item.component;
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Carousel
        data={carouselItems}
        renderItem={renderItem}
        width={screenWidth}
        height={180}
        loop
        autoPlay
        autoPlayInterval={5000}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <CustomCrouselPagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeSlide}
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
    }
  });
};
export default PayrollCards;
