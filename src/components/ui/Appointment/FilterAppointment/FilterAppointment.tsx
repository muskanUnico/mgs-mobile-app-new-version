import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { styles as externalStyles } from "../../../../assets/css";
import { PermissionAccess } from "../../../../middleware/PermissionAccess";
import CustomBottomSheet from "../../../elements/BottomSheet/CustomBottomSheet";
import Button from "../../../elements/Button/Button";
import CustomDropDown from "../../../elements/CustomDropDown/CustomDropDown";
import SingleDatePicker from "../../../elements/SingleDatePicker/SingleDatePicker";

const FilterAppointment = ({
  bottomSheetRef,
  handleSearch,
  handleReset,
  appointmentStatus,
  setAppoinmentStatus,
  paymentStatus,
  setPaymentStatus,
  setServices,
  services,
  teamMember,
  setTeamMember,
  customer,
  setCustomer,
  selectTeamMember,
  setSelectTeamMember,
  selectCustomer,
  setSelectCustomer,
  selectServices,
  setSelectServices,
  selectPaymentStatus,
  setSelectPaymentStatus,
  selectAppointmentStatus,
  setSelectAppointmentStatus,
  date,
  setDate,
}: any) => {
  const handleSearchWithFilter = () => {
    handleSearch();
  };

  const handleResetWithClearFilter = () => {
    handleReset();
  };

  return (
    <>
      <CustomBottomSheet
        bottomSheetRef={bottomSheetRef}
        text={"Filter"}
        height={650}
      >
        <View style={[externalStyles.container]}>
          <View style={styles.spacingRow}>
            <Text style={[externalStyles.label]}>
              Appointment Date - {"   "}
            </Text>
            <SingleDatePicker date={date} setDate={setDate} />
          </View>
          <View>
            <CustomDropDown
              value={selectCustomer}
              setItems={setCustomer}
              items={customer}
              setValue={setSelectCustomer}
              placeholder="Select Customer"
            />
          </View>
          <View>
            <CustomDropDown
              placeholder="Select Service"
              value={selectServices}
              setItems={setServices}
              items={services}
              setValue={setSelectServices}
            />
          </View>
          <PermissionAccess requiredPermissions={["manage_all_appointments"]}>
            <View>
              <CustomDropDown
                value={selectTeamMember}
                setItems={setTeamMember}
                items={teamMember}
                setValue={setSelectTeamMember}
                placeholder="Select Team Member"
              />
            </View>
          </PermissionAccess>
          <View>
            <CustomDropDown
              value={selectAppointmentStatus}
              setItems={setAppoinmentStatus}
              items={appointmentStatus}
              setValue={setSelectAppointmentStatus}
              placeholder="Appoinment Status"
            />
          </View>
          <PermissionAccess requiredPermissions={["view_payments"]}>
            <View>
              <CustomDropDown
                value={selectPaymentStatus}
                setItems={setPaymentStatus}
                items={paymentStatus}
                setValue={setSelectPaymentStatus}
                placeholder="Payment Status"
              />
            </View>
          </PermissionAccess>
          <View style={styles.rowStartCenter}>
            <Button onPress={handleSearchWithFilter} title="Search" />
            <View style={styles.spacing}>
              <Button onPress={handleResetWithClearFilter} title="Reset" />
            </View>
          </View>
        </View>
      </CustomBottomSheet>
    </>
  );
};

export default FilterAppointment;
const styles = StyleSheet.create({
  spacingRow: {
    marginBottom: 4,
    marginTop: 20,
    flexDirection: "row",
  },
  rowStartCenter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
  },
  spacing: {
    marginLeft: 12,
  },
});
