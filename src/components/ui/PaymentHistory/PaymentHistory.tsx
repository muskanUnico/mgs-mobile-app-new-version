import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import moment from "moment";
import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Divider } from "react-native-paper";
import { styles as externalStyles } from "../../../assets/css";
import {
  iconCalenderColor,
  iconColor5,
  iconColor8,
  iconPhoneColor
} from "../../../constants/COLORS";
import { useTheme } from "../../../context/ThemeContext";
import { chips, formatDateTable, formatTimeRange } from "../../../utils/tools";
import LongMenu from "../../elements/LongMenu/LongMenu";

interface PaymentHistoryProps {
  handleOptions: any;
  index: number;
  item: any;
  options: any;
}
const router = useRouter();
const PaymentHistory = ({
  handleOptions,
  index,
  item,
  options,
}: PaymentHistoryProps) => {
  const { theme } = useTheme();

  return (
    <View style={[externalStyles.card]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.rowCenter}>
            <Text style={{ color: theme.brandColor, fontFamily: "BoldText" }}>
              #
            </Text>
            <Text
              style={{
                color: theme.brandColor,
                fontFamily: "BoldText",
                marginRight: 8,
              }}
            >
              {index + 1}
            </Text>
          </View>
          <Text style={[externalStyles.label, { marginLeft: 3 }]}>CLIENT</Text>
        </View>

        <View>
          <LongMenu
            options={options}
            handleOptions={(option: any) => handleOptions(option, item)}
          />
        </View>
      </View>

      <TouchableWithoutFeedback
        onPress={() =>
          // navigate("viewinvoice", {
          //   paymentId: item?.appointmentId?.paymentId,
          // })
          router.push({
           pathname: "/viewInvoice",
           params :  item?.appointmentId?.paymentId})
        }
      >
        <View style={{ marginLeft: 24, marginTop: 4 }}>
          <Text style={[externalStyles.BlueText]}>
            {item.appointmentId?.customerId?.name}
          </Text>
          <Text style={[externalStyles.BlueText]}>
            {item.appointmentId?.customerId?.email}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <Divider style={{ marginBottom: 12, marginTop: 8 }} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome
          name="calendar"
          style={[externalStyles.iconColorStyle, { color: iconCalenderColor }]}
        />
        <Text style={[styles.dividerMarginBottom, externalStyles.label]}>
          APPOINTMENT
        </Text>
      </View>
      <View style={{ marginLeft: 20, marginTop: 4 }}>
        <Text style={[externalStyles.content, { marginBottom: 4 }]}>
          {" "}
          {formatDateTable(
            item.appointmentId.date,
            item.appointmentId.start_time_range,
            item.appointmentId.end_time_range
          )}
        </Text>

        <View style={{ flexDirection: "row" }}>
          {chips(item, item.appointmentId.date)}
        </View>
      </View>
      <Divider style={{ marginBottom: 12, marginTop: 8 }} />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome
          name="money"
          style={[externalStyles.iconColorStyle, { color: iconPhoneColor }]}
        />
        <Text style={[externalStyles.label]}>
          CAD${item?.paymentId !== null && item?.payment?.amount.toFixed(2)}
        </Text>
      </View>
      <View style={{ marginLeft: 24, marginTop: 4 }}>
        <View>
          {item?.paymentId !== null &&
            item?.payment?.paymentStatus === "pending" && (
              <Text style={{ fontFamily: "BoldText", color: "#F87171" }}>
                CAD$
                {item?.payment !== null && item?.payment?.amount.toFixed(2)} -
                UNPAID
              </Text>
            )}
          {item?.paymentId !== null &&
            item?.payment?.paymentStatus === "paid" && (
              <Text style={{ fontFamily: "BoldText", color: "#16A34A" }}>
                CAD${item?.payment !== null && item?.payment?.amount.toFixed(2)}
                -PAID
              </Text>
            )}
        </View>
      </View>
      <Divider style={{ marginBottom: 12, marginTop: 8 }} />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome
          name="list"
          style={[externalStyles.iconColorStyle, { color: iconColor5 }]}
        />
        <Text style={[externalStyles.label, { marginBottom: 4 }]}>
          BOOKING DETAILS
        </Text>
      </View>
      <View style={{ marginLeft: 24, marginTop: 4 }}>
        {item.appointmentId.bookings.map((booking: any, key: number) => {
          return (
            <View
              key={key}
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Text style={[externalStyles.content]}>
                {key + 1}. {booking.serviceName}
              </Text>
              <Text style={[externalStyles.content, { paddingLeft: 8 }]}>
                - {booking.teamMemberName}
              </Text>
              <Text style={[externalStyles.content, { paddingLeft: 8 }]}>
                - {formatTimeRange(booking.start_time, booking.end_time)}
              </Text>
            </View>
          );
        })}
      </View>
      <Divider style={{ marginBottom: 12, marginTop: 8 }} />

      <View style={{ paddingBottom: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome
            name="clock-o"
            style={[externalStyles.iconColorStyle, { color: iconColor8 }]}
          />
          <Text style={[externalStyles.label, { marginBottom: 4 }]}>
            APPOINTMENT CREATED ON
          </Text>
        </View>
        <View style={{ marginLeft: 24, marginTop: 4 }}>
          <Text style={[externalStyles.content]}>
            {moment(item.createdAt).format("MMMM DD, YYYY, h:mm A")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentHistory;
const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  dividerMarginBottom: {
    marginBottom: 4,
  },
});
