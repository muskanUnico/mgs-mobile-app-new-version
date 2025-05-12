import React from "react";
import moment from "moment";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import { styles as externalStyles } from "../../../assets/css";
import { Text, TouchableWithoutFeedback } from "react-native";
import {
  appointmentActionOptions,
  AppointmentPayment,
} from "../../../hooks/Appointment/hooks";
import { chips, formatDateTable, formatTimeRange } from "../../../utils/tools";
import {
  iconCalenderColor,
  iconColor5,
  iconColor8,
  iconPhoneColor,
} from "../../../constants/COLORS";
import { FontAwesome } from "@expo/vector-icons";
import { navigate } from "../../../utils/navigationServices";
import LongMenu from "../../../components/elements/LongMenu/LongMenu";
import { useAuth } from "../../../context/AuthContext";
import { useActionHooks } from "../../../hooks/Appointment/ActionHooks";
import WarningModal from "../../../components/elements/WarningModal/WarningModal";

const CalenderCards = ({ item }: any) => {
  const { permissions } = useAuth();
  const { paidAmount, unpaidAmount } = AppointmentPayment(item?.paymentId);

  const {
    dynamicModal,
    handleModalClose,
    handleConfirmbtn,
    handleRightbtn,
    handleActionClick,
  } = useActionHooks({ appointments: [item] });

  return (
    <>
      <View style={styles.rowView}>
        <Text style={[externalStyles.label]}>CLIENT</Text>
        <View>
          <LongMenu
            options={appointmentActionOptions(
              item.status,
              item?.paymentId?.paymentStatus == "pending",
              item.notes,
              permissions
            )}
            handleOptions={(option: any) =>
              handleActionClick(item.id, option, item.paymentId.id)
            }
          />
        </View>
      </View>

      <TouchableWithoutFeedback
        onPress={() =>
          navigate("ViewAppointment", {
            id: item?.paymentId?.appointmentId,
          })
        }
      >
        <View>
          <Text style={[externalStyles.BlueText]}>
            {item?.customerId?.name}
          </Text>
          <Text style={[externalStyles.BlueText]}>
            {item?.customerId?.email}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <Divider style={styles.dividerSpacing} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome
          name="calendar"
          style={[externalStyles.iconColorStyle, { color: iconCalenderColor }]}
        />
        <Text style={[styles.box, externalStyles.label]}>APPOINTMENT</Text>
      </View>
      <Text style={[styles.margin, externalStyles.content]}>
        {" "}
        {formatDateTable(item.date, item.start_time_range, item.end_time_range)}
      </Text>
      <View style={[{ flexDirection: "row" }, styles.marginLeft]}>
        {chips(item, item.date)}
      </View>

      <Divider style={styles.spacing} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome
          name="money"
          style={[externalStyles.iconColorStyle, { color: iconPhoneColor }]}
        />
        <Text style={[externalStyles.label]}>
          CAD${item?.paymentId !== null && item?.paymentId?.amount?.total}
        </Text>
      </View>
      <View style={styles.greenText}>
        {item?.paymentId !== null &&
          item?.paymentId?.payment?.paymentStatus === "pending" && (
            <Text
              style={[styles.redText, styles.marginLeft]}
              style={{ fontFamily: "Regular" }}
            >
              CAD$
              {item?.paymentId !== null && unpaidAmount.toFixed(2)} - UNPAID
            </Text>
          )}
        {item?.paymentId !== null &&
          item?.paymentId?.payment?.paymentStatus === "paid" && (
            <Text style={[styles.greenText, { fontFamily: "Regular" }]}>
              CAD${paidAmount}-PAID
            </Text>
          )}
      </View>

      <Divider style={styles.spacing} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome
          name="list"
          style={[externalStyles.iconColorStyle, { color: iconColor5 }]}
        />
        <Text style={[styles.marginBottom, externalStyles.label]}>
          BOOKING DETAILS
        </Text>
      </View>
      {item.bookings.map((booking: any, key: number) => {
        return (
          <View
            key={key}
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <Text style={[styles.offset, { fontFamily: "Regular" }]}>
              {key + 1}. {booking?.serviceName}
            </Text>
            <Text style={[styles.offset, { fontFamily: "Regular" }]}>
              - {booking.teamMemberName}
            </Text>
            <Text style={[styles.offset, { fontFamily: "Regular" }]}>
              - {formatTimeRange(booking.start_time, booking.end_time)}
            </Text>
          </View>
        );
      })}
      <Divider style={styles.spacing} />

      <View style={{ paddingBottom: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome
            name="clock-o"
            style={[externalStyles.iconColorStyle, { color: iconColor8 }]}
          />
          <Text style={[styles.bottomMargin, externalStyles.label]}>
            APPOINTMENT CREATED ON
          </Text>
        </View>
        <Text style={[styles.leftMargin, { fontFamily: "Regular" }]}>
          {moment(item.createdAt).format("MMMM DD, YYYY, h:mm A")}
        </Text>
      </View>

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
    </>
  );
};

export default CalenderCards;
const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dividerSpacing: {
    marginTop: 8,
    marginBottom: 12,
  },
  box: {
    marginBottom: 8,
  },

  margin: {
    marginBottom: 8,
    marginLeft: 16,
  },

  marginLeft: {
    marginLeft: 8,
  },

  spacing: {
    marginBottom: 12,
    marginTop: 8,
  },
  greenText: {
    color: "green",
  },
  redText: {
    color: "red",
  },
  marginLeft: {
    marginLeft: 24,
  },
  marginBottom: {
    marginBottom: 8,
  },
  offset: {
    marginLeft: 24,
  },
  bottomMargin: {
    marginBottom: 8,
  },
  leftMargin: {
    marginLeft: 20,
  },
});
