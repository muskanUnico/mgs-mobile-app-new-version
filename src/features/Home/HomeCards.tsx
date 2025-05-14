//@ts-nocheck
import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import Card from "../../components/elements/Card/Card";
import {
  useGetAllApprovedReports,
  useGetAllReports
} from "../../hooks/Accounts/Accounts";

const screenWidth = Dimensions.get("window").width;
const i1 = require("../../assets/images/aa.png");
const i2 = require("../../assets/images/aaaa.png");
const i3 = require("../../assets/images/aaa.png");
const i4 = require("../../assets/images/a.png");

const HomeCards = () => {
  const allreports = useGetAllReports();
  const allAppprovedRepots = useGetAllApprovedReports();

  console.log("HomeCards.tsx — allreports:", allreports);
  console.log("HomeCards.tsx — allAppprovedRepots:", allAppprovedRepots);

  const [activeSlide, setActiveSlide] = useState(0);

  const carouselItems = [
    {
      key: "today",
      component: (
        <Card
          image={i1}
          appointmentCount={allAppprovedRepots.approved?.myTodaysAppointments || 0}
          cardTitle="My Today's Appointment"
          bgCustom="#e6e6e6"
          dollarIcon={false}
          widthCustom={true}
        />
      ),
    },
    {
      key: "thisWeek",
      component: (
        <Card
          image={i2}
          appointmentCount={allAppprovedRepots.approved?.thisWeekAppointments || 0}
          cardTitle="This Week"
          bgCustom="#e6e6e6"
          dollarIcon={false}
          widthCustom={true}
        />
      ),
    },
    {
      key: "thisMonth",
      component: (
        <Card
          image={i4}
          appointmentCount={allAppprovedRepots.approved?.thisMonthAppointments || 0}
          cardTitle="This Month"
          bgCustom="#e6e6e6"
          dollarIcon={false}
        />
      ),
    },
    {
      key: "total",
      component: (
        <Card
          image={i3}
          appointmentCount={allreports.data?.totalAppointments || 0}
          cardTitle="Total Appointments"
          bgCustom="#e6e6e6"
          dollarIcon={false}
        />
      ),
    },
  ];

  const renderItem = ({ item }: any) => item.component;

  return (
    <View style={styles.container}>
      <Carousel
        data={carouselItems}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        loop
        autoplay
        autoplayInterval={4000}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

export default HomeCards;
