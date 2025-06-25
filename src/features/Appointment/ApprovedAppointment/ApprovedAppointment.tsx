import React, { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { styles as externalStyles } from "../../../assets/css";
import BookingInfoCard from "../../../components/elements/BookingInfoCard/BookingInfoCard";
import CustomPagination from "../../../components/elements/CustomPagination/CustomPagination";
import Loader from "../../../components/elements/Loader/Loader";
import WarningModal from "../../../components/elements/WarningModal/WarningModal";
import MyCalendar from "../../../components/ui/Calendar/Calendar";
import {
  borderColor,
} from "../../../constants/COLORS";
import { useTheme } from "../../../context/ThemeContext";
import { getAllApprovedAppointments } from "../../../hooks/Appointment";
import { useActionHooks } from "../../../hooks/Appointment/ActionHooks";
import { FilterAppointmentFeature } from "../FilterAppointmentFeature/FilterAppointmentFeature";

const ApprovedAppointment = ({ navigation }: any) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const { theme } = useTheme();

  //integration
  const appointments = getAllApprovedAppointments();
  const appointmentTableData = appointments.data.results.map((item) => {
    return {
      id: item.id,
      name: item.customerId.name,
      customerId: item.customerId,
      email: item.customerId.email,
      amount: item.amount,
      date: item.date,
      start_time_range: item.start_time_range,
      end_time_range: item.end_time_range,
      bookings: item.bookings,
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      paymentId: item.paymentId,
      reschedule: item.reschedule,
      notes: item.notes.data.length > 0,
    };
  });

  const {
    dynamicModal,
    handleModalClose,
    handleConfirmbtn,
    handleRightbtn,
    handleActionClick,
  } = useActionHooks({ appointments: appointmentTableData });

  useEffect(() => {
    appointments.refetch();
  }, [dynamicModal]);

  return (
    <View>
      {appointments.loading ? (
        <Loader />
      ) : (
        <>
          <View
            style={[
              styles.switchContainer,
              { marginHorizontal: 24, marginVertical: 4 },
            ]}
          >
            <Text style={[externalStyles.label, { color: theme.brandColor }]}>
              TABULAR VIEW
            </Text>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              thumbColor={
                isSwitchOn ? theme.brandPastelColor : theme.brandGreyColor
              }
              trackColor={{ true: theme.brandColor, false: borderColor }}
              style={styles.switch}
            />
            <Text style={[externalStyles.label, { color: theme.brandColor }]}>
              CALENDAR VIEW
            </Text>
          </View>

          <FilterAppointmentFeature
            appointmentType={"approved"}
            setData={(filter: any) =>
              appointments.setparams((old) => ({
                ...old,
                query_services: filter.serviceFilter,
                query_teams: filter.teamMemberFilter,
                status: filter.appointmentStatusFilter,
                payment_status: filter.paymentStatusFilter,
                date: filter.dateFilter,
                query_customers: filter.customerFilter,
              }))
            }
          />

          {isSwitchOn ? (
            <MyCalendar appointments={appointments.data.results} />
          ) : (
            <>
              {appointmentTableData.length < 1 ? (
                <View
                  style={[
                    externalStyles.container,
                    { alignItems: "center", marginTop: 20 },
                  ]}
                >
                  <Image
                    source={require("../../../assets/images/nodata.png")}
                    style={{ width: 300, height: 300 }}
                  />
                  <Text style={[externalStyles.label, { marginTop: 10 }]}>
                    No data found
                  </Text>
                </View>
              ) : (
                <>
                  {appointmentTableData.map((item: any, key: number) => {
                    return (
                      <BookingInfoCard
                        key={key}
                        index={key}
                        item={item}
                        handleOptions={handleActionClick}
                        navigation={navigation}
                      />
                    );
                  })}

                  <CustomPagination
                    gotoPage={appointments.setPage}
                    totalPage={appointments.data.totalPages}
                    pageIndex={appointments.page}
                  />
                </>
              )}
            </>
          )}
        </>
      )}

      {/* 
         action modal
    */}
      {dynamicModal.open && (
        <WarningModal
          modalVisible={dynamicModal.open}
          setModalVisible={handleModalClose}
          handleLeftbtn={handleConfirmbtn}
          handleRightbtn={handleRightbtn}
          rightBtnName={dynamicModal.btnfirst}
          leftBtnName={dynamicModal.btnsec}
          title={dynamicModal.title}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switch: {
    marginHorizontal: 8,
    ...(Platform.OS === "ios" && {
      transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    }),
  },
});

export default ApprovedAppointment;
