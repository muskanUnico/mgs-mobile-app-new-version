import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
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
      {/* <Carousel
        data={carouselItems}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        loop
        autoplay
        autoplayInterval={5000}
        onSnapToItem={(index) => setActiveSlide(index)}
      /> */}
      {/* <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      /> */}
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
export default RevenueReportCards;
