import React from "react";
import { View } from "react-native";
import CalculateTotal from "../../../components/ui/Appointment/CreateAppointment/CalculateTotal/CalculateTotal";
import AppointmentDetails from "../../../components/ui/Appointment/ViewAppointment/AppointmentDetails/AppointmentDetails";
import ViewPersonalInfo from "../../../components/ui/Appointment/ViewAppointment/ViewPersonalInfo/ViewPersonalInfo";
import PaymentMethod from "../../../components/ui/PaymentMethod/PaymentMethod";
import { ErrorRender } from "../../../hooks/CreateAppointment";
import { formatTime } from "../../../utils/tools";

const ConfirmAppointment = ({
  API_RUN,
  memberResponse,
  errors,
  previewData,
  setPaymentData,
  takePayment = false,
}: any) => {
  const bookingsFormat = previewData.bookings
    .sort((a: any, b: any) => a.time.start_time - b.time.start_time)
    .map((ser: any) => {
      return {
        id: ser.id,
        service: ser.service,
        // @ts-ignore
        Team: ser.teamMember?.name,
        price: ser.price,
        minutes: `${ser.duration}min`,
        time: `${formatTime(ser.time?.start_time)} :${formatTime(
          ser.time?.end_time
        )}`,
      };
    });

  return (

         <View>
        {/* 
          client information
       */}
        <ViewPersonalInfo data={previewData?.client} />

        {/* 
          Appointments Details
      */}
        {bookingsFormat.map((item: any, index: number) => {
          return <AppointmentDetails item={item} key={index} />;
        })}

        {/* 
           calculate total
      */}
        <View style={{ marginHorizontal: 20, marginVertical: 8 }}>
          <CalculateTotal data={previewData?.amount} />
        </View>

        {/* 
           payment method
      */}
        <View style={{ marginHorizontal: 12 }}>
          {takePayment && (
            <PaymentMethod
              customerId={previewData?.client?.id}
              setData={setPaymentData}
              amount={previewData?.amount?.total}
              islater={true}
            />
          )}
          <ErrorRender
            API_RUN={API_RUN}
            memberResponse={memberResponse}
            errors={errors}
          />
        </View>
        </View> 
  );
};

export default ConfirmAppointment;
