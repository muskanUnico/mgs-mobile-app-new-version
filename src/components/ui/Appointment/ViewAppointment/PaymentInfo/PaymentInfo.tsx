import { AppointmentPayment } from "../../../../../hooks/Appointment/hooks";
import { View } from "react-native";
import React from "react";
import { StyleSheet, Text } from "react-native";
import CustomHeading from "../../../../../components/elements/CustomHeading/CustomHeading";
import { styles as externalStyles } from "../../../../../assets/css";
import { Divider } from "react-native-paper";

const PaymentInfo = ({ data }: any) => {
  let payment = data?.paymentId;
  const { paidAmount, unpaidAmount } = AppointmentPayment(payment);

  return (
    <>
      <View>
        <View style={[externalStyles.card]}>
          <View>
            <CustomHeading text="Payment Information" />
          </View>
          <Divider style={styles.spacingText} />

          <View style={styles.rowContainer}>
            <View style={styles.paddingYContainer}>
              <Text style={externalStyles.label}>Paid Amount</Text>
              <Text style={[styles.greenText, { fontFamily: "Regular" }]}>
                CAD ${paidAmount}
              </Text>
            </View>

            {unpaidAmount > 0 && (
              <View style={styles.paddingYContainer}>
                <Text style={externalStyles.label}>Unpaid Amount</Text>
                <Text style={[styles.redText, { fontFamily: "Regular" }]}>
                  CAD ${unpaidAmount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default PaymentInfo;
const styles = StyleSheet.create({
  spacingText: {
    marginBottom: 4,
    marginTop: 8,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paddingYContainer: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  greenText: {
    color: "#22c55e",
  },
  redText: {
    color: "#ef4444",
  },
});
