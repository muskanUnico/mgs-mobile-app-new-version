import { StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import CustomDropDown from "../../../../components/elements/CustomDropDown/CustomDropDown";
import CustomInput from "../../../../components/elements/Input";

function ManualTRX({ manualPayment, setManualPayment }: any) {
  const [value, setValue] = useState("");

  const [modeOfPaymentList, setModeOfPaymentList] = useState([
    { label: "Paypal", value: "paypal" },
    { label: "Cash", value: "cash" },
    { label: "Credit / Debit", value: "card" },
    { label: "Apply Pay / Google Pay / Paypal", value: "online-pay" },
    { label: "Net Banking", value: "net-banking" },
    { label: "Others", value: "others" },
  ]);

  useEffect(() => {
    setManualPayment((prev: any) => ({ ...prev, paymentMethod: value }));
  }, [value]);

  return (
    <View style={styles.container}>
      <View style={styles.marginBottom}>
        <Text style={[styles.customText, { fontFamily: "BoldText" }]}>
          Manual Transcation
        </Text>
      </View>

      <View style={styles.marginVertical}>
        <Text style={[styles.customComponent, { fontFamily: "BoldText" }]}>
          Mode of payment
        </Text>

        <CustomDropDown
          setItems={setModeOfPaymentList}
          items={modeOfPaymentList}
          value={value}
          setValue={setValue}
          placeholder="Select mode of payment"
        />
      </View>

      <View style={styles.paddingTopBottom}>
        <CustomInput
          value={manualPayment.amount.toString()}
          placeholder="$354"
          onChangeText={(value) =>
            setManualPayment({ ...manualPayment, amount: Number(value) })
          }
          label="Amount"
        />
      </View>

      <View style={styles.bottomPadding}>
        <CustomInput
          placeholder="6549 8213 365"
          onChangeText={(value) =>
            setManualPayment({ ...manualPayment, ref: value })
          }
          label="Reference Number"
        />
      </View>
    </View>
  );
}

export default ManualTRX;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 12,
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  marginVertical: {
    marginVertical: 8,
  },
  customComponent: {
    marginBottom: 8,
    marginLeft: 8,
    fontSize: 16,
    color: "#43484e",
  },
  customText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#f59b90",
    marginLeft: 8,
  },
  bottomPadding: {
    paddingBottom: 12,
  },
  paddingTopBottom: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  marginBottom: {
    marginBottom: 8,
  },
});
