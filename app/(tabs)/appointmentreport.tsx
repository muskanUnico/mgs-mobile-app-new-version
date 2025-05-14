// //@ts-nocheck
// import React, { useState } from "react";
// import { View, StyleSheet, Dimensions } from "react-native";
// import Carousel, { Pagination } from "react-native-snap-carousel";
// import AppointmentCard from "@/src/components/ui/Report/AppointmentReport/AppointmentCard";
// import { brandColor } from "@/src/constants/COLORS";
// import {
//   useGetAllApprovedReports,
//   useGetAllReports,
// } from "@/src/hooks/Accounts/Accounts";
// import I1 from "@/src/assets/images/today.png";
// import I2 from "@/src/assets/images/mytoday.png";
// import I3 from "@/src/assets/images/month.png";
// import I4 from "@/src/assets/images/aaa.png";
// import I5 from "@/src/assets/images/reschedule.png";
// import I6 from "@/src/assets/images/adminreschedule.png";
// import I7 from "@/src/assets/images/Cancel.png";
// import I8 from "@/src/assets/images/unapproved.png";
// import I9 from "@/src/assets/images/a.png";
// import { useTheme } from "@/src/context/ThemeContext";
// import { formatCardCount } from "@/src/utils/functions";

// const screenWidth = Dimensions.get("window").width;

// const AppointmentReportFeatures = () => {
//   const allreports = useGetAllReports();
//   const allAppprovedRepots = useGetAllApprovedReports();

//   const [activeSlide, setActiveSlide] = useState(0);

//   const carouselItems = [
//     {
//       key: "today",
//       component: (
//         <AppointmentCard
//           image={I1}
//           appointmentCount={formatCardCount(
//             allAppprovedRepots.approved?.myTodaysAppointments || 0
//           )}
//           cardTitle="My Today's Appointments"
//           bgCustom="#e6e6e6"
//           dollarIcon={false}
//           widthCustom={true}
//         />
//       ),
//     },
//     {
//       key: "Today's Appointment",
//       component: (
//         <AppointmentCard
//           image={I2}
//           appointmentCount={formatCardCount(
//             allAppprovedRepots.approved?.todaysAppointments || 0
//           )}
//           cardTitle="Today's Appointment"
//           bgCustom="#e6e6e6"
//           dollarIcon={false}
//           widthCustom={true}
//         />
//       ),
//     },
//     {
//       key: "This Month",
//       component: (
//         <AppointmentCard
//           image={I3}
//           appointmentCount={formatCardCount(
//             allAppprovedRepots.approved?.thisMonthAppointments || 0
//           )}
//           cardTitle="This Month"
//           bgCustom="#e6e6e6"
//           dollarIcon={false}
//         />
//       ),
//     },
//     {
//       key: "This Week",
//       component: (
//         <AppointmentCard
//           image={I4}
//           appointmentCount={formatCardCount(
//             allAppprovedRepots.approved?.thisWeekAppointments || 0
//           )}
//           cardTitle="This Week"
//           bgCustom="#e6e6e6"
//           dollarIcon={false}
//         />
//       ),
//     },
//     {
//       key: "Rescheduled",
//       component: (
//         <AppointmentCard
//           image={I5}
//           appointmentCount={formatCardCount(
//             allAppprovedRepots.approved?.rescheduledAppointments || 0
//           )}
//           cardTitle="Rescheduled"
//           bgCustom="#e6e6e6"
//           dollarIcon={false}
//         />
//       ),
//     },
//     {
//       key: "Admin Reschedule Request",
//       component: (
//         <AppointmentCard
//           image={I6}
//           appointmentCount={formatCardCount(
//             allreports.data?.adminRescheduleRequests || 0
//           )}
//           cardTitle="Admin Reschedule Request"
//           bgCustom="#e6e6e6"
//           dollarIcon={false}
//         />
//       ),
//     },
//     {
//       key: "Cancelled Appointments",
//       component: (
//         <AppointmentCard
//           image={I7}
//           appointmentCount={formatCardCount(
//             allreports.data?.cancelledAppointmentsThisMonth || 0
//           )}
//           cardTitle="Cancelled Appointments"
//           bgCustom="#e6e6e6"
//           dollarIcon={false}
//         />
//       ),
//     },
//     {
//       key: "Unapproved Appointments",
//       component: (
//         <AppointmentCard
//           image={I8}
//           appointmentCount={formatCardCount(
//             allreports.data?.unapprovedAppointments || 0
//           )}
//           cardTitle="Unapproved Appointments"
//           bgCustom="#e6e6e6"
//           dollarIcon={false}
//         />
//       ),
//     },
//     {
//       key: "Total Appointments",
//       component: (
//         <AppointmentCard
//           image={I9}
//           appointmentCount={formatCardCount(
//             allreports.data?.totalAppointments || 0
//           )}
//           cardTitle="Total Appointments"
//           bgCustom="#e6e6e6"
//           dollarIcon={false}
//         />
//       ),
//     },
//   ];

//   const renderItem = ({ item }: any) => item.component;

//   const styles = useStyles();
//   const { theme } = useTheme();
//   return (
//     <View style={styles.container}>
//       <Carousel
//         data={carouselItems}
//         renderItem={renderItem}
//         sliderWidth={screenWidth}
//         itemWidth={screenWidth}
//         loop
//         autoplay
//         autoplayInterval={5000}
//         onSnapToItem={(index) => setActiveSlide(index)}
//       />
//       <Pagination
//         dotsLength={carouselItems.length}
//         activeDotIndex={activeSlide}
//         containerStyle={styles.paginationContainer}
//         dotStyle={styles.dotStyle}
//         inactiveDotOpacity={0.4}
//         inactiveDotScale={0.6}
//       />
//     </View>
//   );
// };

// const useStyles = () => {
//   const { theme } = useTheme();

//   return StyleSheet.create({
//     container: {
//       alignItems: "center",
//       marginVertical: 10,
//     },
//     paginationContainer: {
//       paddingVertical: 8,
//     },
//     dotStyle: {
//       width: 5,
//       height: 5,
//       borderRadius: 5,
//       backgroundColor: theme.brandColor,
//     },
//   });
// };
// export default AppointmentReportFeatures;

import { View, Text } from 'react-native'
import React from 'react'

const appointmentreport = () => {
  return (
    <View>
      <Text>appointmentreport</Text>
    </View>
  )
}

export default appointmentreport
