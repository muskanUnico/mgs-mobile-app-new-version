import moment from "moment";
import { Platform } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { getCustomers } from "../../../hooks/Customer";
import { getServices } from "../../../hooks/Services";
import { removeEmptyValues } from "../../../utils/tools";
import { getTeamMembers } from "../../../hooks/TeamMembers";
import FilterAppointment from "../../../components/ui/Appointment/FilterAppointment/FilterAppointment";
import {
  FilterBorder,
  brandWhiteColor,
  placeholderTextColor,
} from "../../../constants/COLORS";
import { useTheme } from "../../../context/ThemeContext";

interface FilterAppointmentFeatureprops {
  appointmentType?: any;
  setData: any;
}

export const FilterAppointmentFeature = ({
  appointmentType,
  setData,
}: FilterAppointmentFeatureprops) => {
  let bottomSheetRef = React.createRef<any>();

  // custom hooks integration logic
  const customersHook = getCustomers({});
  const teamMembersHook = getTeamMembers();
  const servicesHook = getServices(100);

  // state to store all filter data
  const [customer, setCustomer] = useState<{ label: string; value: string }[]>(
    []
  );

  const [teamMember, setTeamMember] = useState<
    { label: string; value: string }[]
  >([]);

  const [services, setServices] = useState<{ label: string; value: string }[]>(
    []
  );

  const [paymentStatus, setPaymentStatus] = useState([
    { label: "PAID", value: "paid" },
    { label: "UNPAID", value: "unpaid" },
  ]);

  const [appointmentStatus, setAppoinmentStatus] = useState(
    appointmentType == "all"
      ? [
          { value: "rejected", label: "REJECTED" },
          { value: "unapproved", label: "UNAPPROVED" },
          { value: "cancelled", label: "CANCELLED" },
          { value: "change_request", label: "CHANGE REQUEST" },
          { value: "completed", label: "COMPLETED" },
        ]
      : [
          { value: "past", label: "PAST" },
          { value: "today", label: "TODAY" },
          { value: "confirmed", label: "CONFIRMED" },
          { value: "this_week", label: "THIS WEEK" },
          { value: "this_month", label: "THIS MONTH" },
          { value: "upcoming", label: "UPCOMING" },
        ]
  );

  // state to get value on selecting from drop down
  const [date, setDate] = useState("");
  const [selectTeamMember, setSelectTeamMember] = useState("");
  const [selectCustomer, setSelectCustomer] = useState("");
  const [selectServices, setSelectServices] = useState("");
  const [selectPaymentStatus, setSelectPaymentStatus] = useState("");
  const [selectAppointmentStatus, setSelectAppointmentStatus] = useState("");

  // hooks for set data to  customer state
  useEffect(() => {
    if (customersHook.data.length > 0) {
      const customers = customersHook.data.map((mem) => ({
        label: mem.name,
        value: mem._id,
      }));
      setCustomer(customers);
    }
  }, [customersHook.data]);

  // hook for set data to state of team member

  useEffect(() => {
    if (teamMembersHook.data.length > 0) {
      const teamMembers = teamMembersHook.data.map((mem) => ({
        label: mem.name,
        value: mem.id,
      }));
      setTeamMember(teamMembers);
    }
  }, [teamMembersHook.data]);

  // hooks for set data to services state
  useEffect(() => {
    if (servicesHook.data.length > 0) {
      const services = servicesHook.data.map((service) => ({
        label: service.title,
        value: service.id,
      }));
      setServices(services);
    }
  }, [servicesHook.data]);

  const handleSearch = () => {
    const queryData = {
      serviceFilter: selectServices,
      customerFilter: selectCustomer,
      teamMemberFilter: selectTeamMember,
      paymentStatusFilter: selectPaymentStatus,
      appointmentStatusFilter: selectAppointmentStatus,
      dateFilter: date != "" ? moment(date).format("MM/DD/YYYY") : date,
    };
    setData && setData(removeEmptyValues(queryData));
    bottomSheetRef.current.close();
  };

  const handleReset = () => {
    setSelectAppointmentStatus("");
    setSelectPaymentStatus("");
    setSelectServices("");
    setSelectCustomer("");
    setSelectTeamMember("");
    setDate("");

    const queryData = {
      serviceFilter: "",
      paymentStatusFilter: "",
      appointmentStatusFilter: "",
      dateFilter: "",
      teamMemberFilter: "",
      customerFilter: "",
    };
    setData && setData(removeEmptyValues(queryData));
    bottomSheetRef.current.close();
  };
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <>
      <View
        style={[
          styles.container,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            alignItems: "center",
          },
        ]}
      >
        <Text
          style={{
            color: placeholderTextColor,
            fontFamily: "Regular",
            fontSize: 13,
          }}
        >
          Filter appointment
        </Text>

        <AntDesign
          onPress={() => bottomSheetRef.current.open()}
          name="filter"
          size={24}
          style={{ color: placeholderTextColor }}
        />
      </View>
      <FilterAppointment
        bottomSheetRef={bottomSheetRef}
        handleSearch={handleSearch}
        handleReset={handleReset}
        /*

          drop down data state

        */
        setAppoinmentStatus={setAppoinmentStatus}
        appointmentStatus={appointmentStatus}
        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
        setServices={setServices}
        services={services}
        teamMember={teamMember}
        setTeamMember={setTeamMember}
        customer={customer}
        setCustomer={setCustomer}
        /*
        
          get selected state 
          
        */
        selectTeamMember={selectTeamMember}
        setSelectTeamMember={setSelectTeamMember}
        /*
            get value of customer
        */
        selectCustomer={selectCustomer}
        setSelectCustomer={setSelectCustomer}
        /*
            get value of services
        */
        selectServices={selectServices}
        setSelectServices={setSelectServices}
        /*
          get value  payment status
        */
        selectPaymentStatus={selectPaymentStatus}
        setSelectPaymentStatus={setSelectPaymentStatus}
        /*
            get value appointment status
        */
        selectAppointmentStatus={selectAppointmentStatus}
        setSelectAppointmentStatus={setSelectAppointmentStatus}
        /*
            get date value
        */
        date={date}
        setDate={setDate}
      />
    </>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      padding: 8,
      backgroundColor: theme.brandWhiteColor,
      marginBottom: 5,
      borderWidth: 1,
      borderColor: FilterBorder,
      marginHorizontal: 16,
      borderRadius: 20,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        android: {
          elevation: 1,
        },
      }),
    },
  });
};
