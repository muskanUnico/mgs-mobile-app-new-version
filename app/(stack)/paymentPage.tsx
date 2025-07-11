import CollectPaymentPage from "@/src/features/Payment/CollectPaymentPage/CollectPaymentPage";
import { useLocalSearchParams } from "expo-router";
import React from "react";



const paymentPage = () => {
  const { customerId, appointmentId, amount, appointmentData } =
    useLocalSearchParams();
      const getString = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value ?? "";
   const appointmentdata =  appointmentData && JSON.parse(getString(appointmentData));
     const parsedAmount = Number(amount);
  return (
    <>
      <CollectPaymentPage
        customerId={customerId}
        appointmentId={appointmentId}
        amount={parsedAmount}
        appointmentData={appointmentdata}
      />
    </>
  );
};

export default paymentPage;
