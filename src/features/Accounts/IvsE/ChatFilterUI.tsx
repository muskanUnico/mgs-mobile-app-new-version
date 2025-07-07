import moment from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../../components/elements/Button/Button";
import CustomDropDown from "../../../components/elements/CustomDropDown/CustomDropDown";
import StartEndDatePicker from "../../../components/elements/StartEndDatePicker/StartEndDatePicker";
import { useTheme } from "../../../context/ThemeContext";

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

  const handleDateRangeChange = (type: "from" | "to", date: Date | null) => {
    let newRange = { ...dateRange, [type]: date };
    if (newRange.from && newRange.to && newRange.from > newRange.to) {
      newRange = { from: newRange.to, to: newRange.from };
    }
    setDateRange(newRange);
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
            startDate={dateRange.from}
            endDate={dateRange.to}
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

export default ChatFilterUI;
