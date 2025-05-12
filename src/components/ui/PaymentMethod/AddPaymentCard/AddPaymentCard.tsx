import React from "react";
import { View } from "react-native";
import AddNewPaymentCardDefault from "../../../../features/Payment/AddNewPaymentCard";

const AddPaymentCard = ({ customerId, refresh }: any) => {
  return (
    <View style={{marginLeft: 15}}>
      <AddNewPaymentCardDefault customerId={customerId} refresh={refresh} />
    </View>
  );
};

export default AddPaymentCard;
