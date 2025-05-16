import React, { useEffect, useState } from "react";
import { useTheme } from "@/src/context/ThemeContext";
import Loader from "@/src/components/elements/Loader/Loader";
import { getAllAppointments } from "@/src/hooks/Appointment";
import { styles as externalStyles } from "@/src/assets/css";
import { StyleSheet, Text, View, Platform, Image } from "react-native";
import { useActionHooks } from "@/src/hooks/Appointment/ActionHooks";
import WarningModal from "@/src/components/elements/WarningModal/WarningModal";
import CustomPagination from "@/src/components/elements/CustomPagination/CustomPagination";
import { Switch } from "react-native-paper";
import { borderColor } from "@/src/constants/COLORS";
import MyCalendar from "@/src/components/ui/Calendar/Calendar";
import { FilterAppointmentFeature } from "@/src/features/Appointment/FilterAppointmentFeature/FilterAppointmentFeature";
import BookingInfoCard from "@/src/components/elements/BookingInfoCard/BookingInfoCard";

const AllAppointment = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const appointments = getAllAppointments();

  const appointmentTableData = appointments.data.results.map((item) => ({
    id: item.id,
    name: item?.customerId?.name || "Not Available",
    customerId: item?.customerId?.id,
    email: item?.customerId?.email || "Not Available",
    amount: item.amount,
    date: item.date,
    start_time_range: item.start_time_range,
    end_time_range: item.end_time_range,
    bookings: item.bookings,
    status: item.status,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    paymentId: item?.paymentId,
    notes: item.notes.data.length > 0,
    reschedule: item.reschedule,
  }));

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
    <>
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
            appointmentType={"all"}
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
                    source={require("@/src/assets/images/nodata.png")}
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

      {dynamicModal.open && (
        <WarningModal
          modalVisible={dynamicModal.open}
          setModalVisible={handleModalClose}
          handleLeftbtn={handleConfirmbtn}
          handleRightbtn={handleRightbtn}
          title={dynamicModal.title}
          leftBtnName={dynamicModal.btnsec}
          rightBtnName={dynamicModal.btnfirst}
        />
      )}
    </>
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

export default AllAppointment;
