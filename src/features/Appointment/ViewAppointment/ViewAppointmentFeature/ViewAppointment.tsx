import React from "react";
import { View } from "react-native";
import { formatTime } from "../../../../utils/tools";
import { PermissionAccess } from "../../../../middleware/PermissionAccess";
import ViewPersonalInfo from "../../../../components/ui/Appointment/ViewAppointment/ViewPersonalInfo/ViewPersonalInfo";
import CalculateTotal from "../../../../components/ui/Appointment/CreateAppointment/CalculateTotal/CalculateTotal";
import PaymentInfo from "../../../../components/ui/Appointment/ViewAppointment/PaymentInfo/PaymentInfo";
import AppointmentDetails from "../../../../components/ui/Appointment/ViewAppointment/AppointmentDetails/AppointmentDetails";
import { styles as externalStyles } from "../../../../assets/css";

const ViewAppointment = ({
  data: { client, bookings, amount },
  paymentDetails,
}: any) => {
  // Sort and format bookings data
  const bookingsFormat = bookings.map((ser: any) => ({
    id: ser.id,
    service: ser.service,
    Team: ser.teamMember?.name,
    price: ser.price,
    minutes: `${ser.duration}min`,
    time: `${formatTime(ser.time?.start_time)} :${formatTime(
      ser.time?.end_time
    )}`,
  }));

  return (
    <View>
      <View style={{ marginTop: 5 }}>
        <ViewPersonalInfo data={client} />
      </View>

      {bookingsFormat.map((item: any, index: number) => (
        <AppointmentDetails key={item.id} item={item} />
      ))}

      <View style={[externalStyles.container]}>
        <CalculateTotal data={amount} />
      </View>

      <PermissionAccess requiredPermissions={["view_payments"]}>
        <PaymentInfo data={paymentDetails} />
      </PermissionAccess>
    </View>
  );
};

export default ViewAppointment;
