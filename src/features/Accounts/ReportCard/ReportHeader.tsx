import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "../../../components/elements/Button/Button";
import { brandBlackColor, brandPastelColor } from "../../../constants/COLORS";
import CustomDropDown from "../../../components/elements/CustomDropDown/CustomDropDown";
import StartEndDatePicker from "../../../components/elements/StartEndDatePicker/StartEndDatePicker";
import { useTheme } from "../../../context/ThemeContext";
import moment from "moment";
import { getLastDate } from "../../../utils/tools";

interface HeaderTitleProps {
  title: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title }) => {
  const { theme } = useTheme();

  return (
    <Text
      style={{
        color: theme.brandBlackColor,
        
        fontSize: 17,
        textShadowColor: theme.brandPastelColor,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0.1,
        fontFamily: "BoldText",
      }}
    >
      {title}
    </Text>
  );
};

// interface
interface ReportHeaderProps {
  title: string;
  setDateRange: any;
  dateRange: { from: Date | null; to: Date | null };
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  HandleResetFilter: any;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  title,
  setDateRange,
  dateRange,
  setFilter,
  filter,
  HandleResetFilter,
}) => {
  const [option, setOption] = useState(null)
  const options = [
    { label: "Monthly", value: "Monthly" },
    { label: "Biyearly", value: "Biyearly" },
    { label: "Yearly", value: "Yearly" },
  ];

  const dropdownData = [
    { label: "Fixed", value: "fixed" },
    { label: "Range", value: "range" },
  ];

  const handleDateRangeChange = (type: "from" | "to", date: Date | null) => {
    setDateRange({ ...dateRange, [type]: date });
  };

  const handleSelectChange = (selectedValue: any) => {
    if (selectedValue !== "none") {
      setOption(selectedValue)
      setDateRange({
        from: getLastDate(selectedValue),
        to: moment().format("YYYY-MM-DD"),
      });
    }
  }

  return (
    <>
      <View style={styles.headerRow}>
        <HeaderTitle title={title} />
        <Button
          onPress={() => HandleResetFilter()}
          loading={false}
          title="Reset"
        />
      </View>

      <View>
        <CustomDropDown
          items={dropdownData}
          value={filter}
          setValue={setFilter}
          placeholder="Filter"
        />

        {filter == "fixed" && (
          <CustomDropDown
            items={options}
            value={option}
            setValue={handleSelectChange}
            placeholder="Select"
          />
        )}

        {filter == "range" && (
          <StartEndDatePicker
            endDate={dateRange.from}
            startDate={dateRange.to}
            onDatesSelected={handleDateRangeChange}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    marginLeft: 16,
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ReportHeader;
