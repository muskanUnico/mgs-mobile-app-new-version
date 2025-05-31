import React, { useState } from "react";
import { View } from "react-native";
import Tabs from "../../../components/elements/Tabs/Tabs";
import RevenurReportCards from "../../../components/ui/Report/RevenueReport/RevenurReportCards";
import { useGetProfitLossThis } from "../../../hooks/Accounts/Accounts";
import { useGetTotalExpense } from "../../../hooks/Accounts/Expense";
import { useGetTotalRevenue } from "../../../hooks/Accounts/Revenue";
import BookingExpenseFeature from "./RevenueFeatures/BookingExpenseFeature";
import BookingIncomeFeature from "./RevenueFeatures/BookingIncomeFeature";
import OtherIncomeFeature from "./RevenueFeatures/OtherIncome";
import OtherRevenueFeature from "./RevenueFeatures/OtherRevenueFeature";

const tabs = [
  { id: 1, label: "Booking Income" },
  { id: 2, label: "Booking Expense" },
  { id: 3, label: "Other Income" },
  { id: 4, label: "Other Expense" },
];

console.log(tabs)

const RevenueReportFeatures = ({ navigation }: any) => {
  const { totalRevenue } = useGetTotalRevenue();
  const { totalExpense } = useGetTotalExpense();
  const { thisData } = useGetProfitLossThis();

  const totalrevenue = totalRevenue.amount;
  const totalexpense = totalExpense.amount;
  const todayIncome = thisData.totalRevenue;

  const [selectedTab, setSelectedTab] = useState<number>(1);

  const renderFeature = () => {
    switch (selectedTab) {
      case 1:
        return <BookingIncomeFeature navigation={navigation} />;
      case 2:
        return <BookingExpenseFeature navigation={navigation} />;
      case 3:
        return <OtherIncomeFeature navigation={navigation} />;
      case 4:
        return <OtherRevenueFeature navigation={navigation} />;
      default:
        return null;
    }
  };

  return (
    <View>
      <RevenurReportCards
        totalrevenue={totalrevenue}
        totalexpense={totalexpense}
        todayIncome={todayIncome}
      />
      <View style={{ marginHorizontal: 16 }}>
        <Tabs
          tabs={tabs}
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
        />
      </View>
      {renderFeature()}
    </View>
  );
};

export default RevenueReportFeatures;
