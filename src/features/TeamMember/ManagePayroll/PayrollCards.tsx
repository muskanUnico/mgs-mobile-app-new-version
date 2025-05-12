import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import AppointmentCard from "../../../components/ui/Report/AppointmentReport/AppointmentCard";
import { brandColor } from "../../../constants/COLORS";
import {
  useGetMonthEarning,
  useGetThisEarning,
  useGetWeekEarning,
} from "../../../hooks/TimeTracker";
import { useTheme } from "../../../context/ThemeContext";

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

  const renderItem = ({ item }:any) => item.component;
  const { theme } = useTheme();
  const styles = useStyles();

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

  return StyleSheet.create({  container: {
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
}
export default PayrollCards;
