import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import { styles as externalStyles } from "../../../../../assets/css";
import CustomHeading from "../../../../../components/elements/CustomHeading/CustomHeading";
import StandardInput from "../../../../../components/elements/StandardInput/StandardInput";
import { dividerColor } from "../../../../../constants/COLORS";
import AutoComplete from "../../../../elements/AutoComplete/AutoComplete";
import CustomTimePicker from "../../../../elements/CustomTimePicker/CustomTimePicker";
import SingleDatePicker from "../../../../elements/SingleDatePicker/SingleDatePicker";

interface CreateAppointmentFormProps {
  setSelectedData?: React.Dispatch<
    React.SetStateAction<{ email: string; phone: string }>
  >;
  setValue?: React.Dispatch<React.SetStateAction<any>>;
  selectedData?: { email: string; phone: string };
  value?: any;
  list: { title: string; id: string; data: { email: string; phone: string } }[];
  disabled?: boolean;
  setTime: any;
  time: any;
  date: any;
  setDate: any;
}

const CreateAppointmentForm = ({
  setSelectedData,
  setValue,
  selectedData,
  value,
  list,
  disabled,

  /*
   date and time
  */

  setTime,
  time,
  date,
  setDate,
}: CreateAppointmentFormProps) => {
  return (
    <View style={[externalStyles.container]}>
      <View style={styles.spacing}>
        <CustomHeading text="Client Information" iconName="user" />
        <Divider style={{ backgroundColor: dividerColor }} />
      </View>
      <View>
        <AutoComplete
          dataSet={list}
          setInputValue={setValue}
          inputValue={value}
        />

        <StandardInput
          placeholder="Email"
          value={selectedData?.email}
          onChangeText={(text: any) =>
            setSelectedData &&
            setSelectedData((old: any) => ({ ...old, email: text }))
          }
        />

        <StandardInput
          placeholder="Phone Number"
          value={selectedData?.phone}
          onChangeText={(text: any) =>
            setSelectedData &&
            setSelectedData((old) => ({ ...old, phone: text }))
          }
          maxLength={12}
        />

        <View style={styles.spacing2}>
          <CustomHeading text="Appointments Details" iconName="calendar" />
        </View>
        <Divider style={[{ backgroundColor: dividerColor }, styles.spacing3]} />

        <View style={styles.rowCenter}>
          <SingleDatePicker date={date} setDate={setDate} />
          <Text style={[styles.textSize, { fontFamily: "Regular" }]}>at</Text>

          <View style={styles.spacing4}>
            <CustomTimePicker
              timeformate={"hh:mm A"}
              setTime={setTime}
              time={time}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreateAppointmentForm;
const styles = StyleSheet.create({
  textSize: {
    fontSize: 13, 
  },
  spacing: {
    marginTop: 12,
    marginBottom: 8,
  },
  spacing2: {
    marginTop: 16,
  },
  spacing3: {
    marginTop: 8,
    marginBottom: 8,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  spacing4: {
    marginLeft: 16,
    marginRight: 16,
  },
});
