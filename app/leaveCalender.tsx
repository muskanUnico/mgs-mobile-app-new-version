// import React from "react";
// import { SafeAreaView } from "react-native";
// // component
// import Title from "@/src/components/elements/Title/Title";
// import { useTheme } from "@/src/context/ThemeContext";
// import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
// import LeaveCalenderFeatures from "@/src/features/LeaveCalender/LeaveCalenderFeatures";

//  const LeaveCalenderScreen = ({ navigation }: any) => {
//   const { theme } = useTheme();

//   return (
//     <GlobalLoader>
//       <SafeAreaView
//         style={[
//           { backgroundColor: theme.brandGreyColor },
//           { minHeight: "100%" },
//         ]}
//       >
//         <Title navigation={navigation} title="Leave Calendar" />
//         <LeaveCalenderFeatures />
//       </SafeAreaView>
//     </GlobalLoader>
//   );
// };

// export default LeaveCalenderScreen;


import React from 'react'
import { Text, View } from 'react-native'

const leaveCalender = () => {
  return (
    <View>
      <Text>leaveCalender</Text>
    </View>
  )
}

export default leaveCalender