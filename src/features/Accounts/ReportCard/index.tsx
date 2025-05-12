import React from "react";
import ReportHeader from "./ReportHeader";
import { StyleSheet, View, ScrollView } from "react-native";
import { styles as externalStyles } from "../../../assets/css";

// interface
interface ReportCardProps {
  title: string;
  TableComponent?: React.ReactNode;
  setDateRange: any;
  dateRange: { from: Date | null; to: Date | null };
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  HandleResetFilter: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({
  title,
  TableComponent,
  setDateRange,
  dateRange,
  setFilter,
  filter,
  HandleResetFilter,
}) => {
  return (
    <View style={[externalStyles.card]}>
      <ReportHeader
        title={title}
        setDateRange={setDateRange}
        dateRange={dateRange}
        setFilter={setFilter}
        filter={filter}
        HandleResetFilter={HandleResetFilter}
      />
      <ScrollView contentContainerStyle={styles.bodyContainer}>
        {TableComponent}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    marginTop: 16,
  },
});

export default ReportCard;
