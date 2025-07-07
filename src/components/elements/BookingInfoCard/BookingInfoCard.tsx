import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Divider } from "react-native-paper";
import { styles as externalStyles } from "../../../assets/css";
import {
  iconCalenderColor,
  iconColor5,
  iconColor8,
  iconPhoneColor,
} from "../../../constants/COLORS";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import {
  AppointmentPayment,
  appointmentActionOptions,
} from "../../../hooks/Appointment/hooks";
import { PermissionAccess } from "../../../middleware/PermissionAccess";
import { chips, formatDateTable, formatTimeRange } from "../../../utils/tools";
import CustomModal from "../CustomModal/CustomModal";
import LongMenu from "../LongMenu/LongMenu";

interface BookingInfoCardProps {
  handleOptions: any;
  index: number;
  item: any;
  navigation: any;
}

const BookingInfoCard = ({
  handleOptions,
  index,
  item,
  navigation,
}: BookingInfoCardProps) => {
  const [open, setOpen] = useState(false);
  const { permissions } = useAuth();
  const { paidAmount, unpaidAmount } = AppointmentPayment(item.paymentId);
  const { theme } = useTheme();
  const router = useRouter();
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
          <View style={styles.rowWithCenteredItems}>
            <Text style={[externalStyles.label, { color: theme.brandColor }]}>
              #
            </Text>
            <Text style={[externalStyles.label, { color: theme.brandColor }]}>
              {index + 1}
            </Text>
          </View>
          <Text style={[externalStyles.label, { marginLeft: 8 }]}>CLIENT</Text>
        </View>

        <View>
          <LongMenu
            options={appointmentActionOptions(
              item.status,
              item?.paymentId?.paymentStatus == "pending",
              item.notes,
              permissions
            )}
            handleOptions={(option: any) =>
              handleOptions(item.id, option, item.paymentId.id)
            }
          />
        </View>
      </View>

      <TouchableWithoutFeedback
        onPress={() =>
          // navigation.navigate("ViewAppointment", {
          //   id: item?.paymentId?.appointmentId,
          // })

        router.push({
  pathname: "/(stack)/viewAppointments",
  params: { id: item?.paymentId?.appointmentId },
})
        }
      >
        <View style={styles.viewWithLeftMargin}>
          <Text style={[externalStyles.BlueText]}>{item.name}</Text>
          <Text style={[externalStyles.BlueText]}>{item.email}</Text>
        </View>
      </TouchableWithoutFeedback>

      <Divider style={styles.dividerSpacing} />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome
          name="calendar"
          style={[externalStyles.iconColorStyle, { color: iconCalenderColor }]}
        />
        <Text style={[externalStyles.label, styles.mb1]}>APPOINTMENT</Text>
      </View>
      <Text style={[styles.marginStyles, externalStyles.content]}>
        {" "}
        {formatDateTable(item.date, item.start_time_range, item.end_time_range)}
      </Text>
      <View style={styles.rowWithMargin}>{chips(item, item.date)}</View>

      <View style={styles.rowWithMargin}>
        {item.reschedule != undefined && chips(item.reschedule, item.date)}
      </View>

      {item?.reschedule?.status == "change_request" && (
        <>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text
              style={{
                textDecorationLine: "underline",
                fontSize: 12,
                fontFamily: "Regular",
              }}
            >
              View Reschedule Request
            </Text>
          </TouchableOpacity>
          <CustomModal
            text="Request"
            modalVisible={open}
            setModalVisible={setOpen}
          >
            <View style={styles.customContainer}>
              <Text style={[styles.mb1, { fontFamily: "BoldText" }]}>
                Comment
              </Text>
              <Text style={[styles.mb4, { fontFamily: "Regular" }]}>
                {item?.reschedule?.comment}
              </Text>
              <Text style={[styles.mb2, { fontFamily: "BoldText" }]}>
                Regard,
              </Text>
              <Text style={[styles.mb2, { fontFamily: "Regular" }]}>
                Suzy Tasse,
              </Text>
            </View>
          </CustomModal>
        </>
      )}

      <Divider style={styles.dividerSpacing} />
      <PermissionAccess requiredPermissions={["view_payments"]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome
            name="money"
            style={[externalStyles.iconColorStyle, { color: iconPhoneColor }]}
          />
          <Text style={[externalStyles.label]}>
            CAD${item?.paymentId !== null && item?.paymentId?.amount?.total}
          </Text>
        </View>
        <View>
          {item?.paymentId !== null &&
            item?.paymentId?.payment?.paymentStatus === "pending" && (
              <Text style={[styles.redText, externalStyles.globalFontBold]}>
                CAD$
                {item?.paymentId !== null && unpaidAmount?.toFixed(2)} - UNPAID
              </Text>
            )}
          {item?.paymentId !== null &&
            item?.paymentId?.payment?.paymentStatus === "paid" && (
              <Text style={[styles.greenText, externalStyles.globalFontBold]}>
                CAD${paidAmount}-PAID
              </Text>
            )}
        </View>
        <Divider style={styles.dividerSpacing} />
      </PermissionAccess>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome
          name="list"
          style={[externalStyles.iconColorStyle, { color: iconColor5 }]}
        />
        <Text style={[externalStyles.label, styles.mb1]}>BOOKING DETAILS</Text>
      </View>
      {item.bookings.map((booking: any, key: number) => {
        return (
          <View
            key={key}
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <Text style={[externalStyles.globalFontLight, styles.ml6]}>
              {key + 1}. {booking.serviceName}
            </Text>
            <Text style={[externalStyles.globalFontLight, styles.ml6]}>
              - {booking.teamMemberName}
            </Text>
            <Text style={[externalStyles.globalFontLight, styles.ml6]}>
              - {formatTimeRange(booking.start_time, booking.end_time)}
            </Text>
          </View>
        );
      })}
      <Divider style={styles.dividerSpacing} />

      <View style={{ paddingBottom: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome
            name="clock-o"
            style={[externalStyles.iconColorStyle, { color: iconColor8 }]}
          />
          <Text style={[externalStyles.label, styles.mb1]}>
            APPOINTMENT CREATED ON
          </Text>
        </View>
        <Text style={[externalStyles.globalFontLight, styles.ml5]}>
          {moment(item.createdAt).format("MMMM DD, YYYY, h:mm A")}
        </Text>
      </View>
    </View>
  );
};

export default BookingInfoCard;
const styles = StyleSheet.create({
  rowWithCenteredItems: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  dividerSpacing: {
    marginTop: 8,
    marginBottom: 12,
  },
  viewWithLeftMargin: {
    marginLeft: 20,
  },
  ml5: {
    marginLeft: 20,
  },
  mb1: {
    marginBottom: 4,
  },
  ml6: {
    marginLeft: 24,
  },
  greenText: {
    color: "#16A34A",
  },
  redText: {
    color: "#DC2626",
    marginLeft: 24,
  },
  rowWithMargin: {
    flexDirection: "row",
    marginLeft: 8,
  },
  marginStyles: {
    marginBottom: 4,
    marginLeft: 16,
  },
  mb2: {
    marginBottom: 8,
  },
  mb4: {
    marginBottom: 16,
  },
  customContainer: {
    padding: 12,
    borderRadius: 24,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
