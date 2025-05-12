import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "../../../components/elements/Button/Button";
import CustomDropDown from "../../../components/elements/CustomDropDown/CustomDropDown";
import StartEndDatePicker from "../../../components/elements/StartEndDatePicker/StartEndDatePicker";
import { useTheme } from "../../../context/ThemeContext";
import moment from "moment";

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
  chooseOptions: string;
  setChooseOption: React.Dispatch<React.SetStateAction<string>>;
}

const ChatFilterUI: React.FC<ReportHeaderProps> = ({
  title,
  setDateRange,
  dateRange,
  setFilter,
  filter,
  HandleResetFilter,
  chooseOptions,
  setChooseOption,
}) => {
  const options = [
    { label: "Monthly", value: "Monthly" },
    { label: "Biyearly", value: "Biyearly" },
    { label: "Yearly", value: "Yearly" },
  ];

  const dropdownData = [
    { label: "Fixed", value: "fixed" },
    { label: "Range", value: "range" },
  ];

  const handleDangeRangeChange = (type: "from" | "to", date: Date | null) => {
    setDateRange({ ...dateRange, [type]: date });
    setFilter("fixed");
  };

  const handleSelectChange = (selectedValue: any) => {
    if (selectedValue !== "none") {
      setFilter(selectedValue);
      setDateRange({
        from: moment().subtract(1, "months").toDate(),
        to: new Date(),
      });
    }
  };

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
          value={chooseOptions}
          setValue={setChooseOption}
          placeholder="Filter"
        />

        {chooseOptions === "fixed" && (
          <CustomDropDown
            items={options}
            value={filter}
            setValue={handleSelectChange}
            placeholder="Select"
          />
        )}

        {chooseOptions === "range" && (
          <StartEndDatePicker
            endDate={dateRange.from}
            startDate={dateRange.to}
            onDatesSelected={handleDangeRangeChange}
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

export default ChatFilterUI;
