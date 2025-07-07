import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import CollectOnline from "./CollectOnline/CollectOnline";
import ManualTRX from "./ManualTRX/ManualTRX";

const PaymentMethod = ({ customerId, setData, amount, islater }: any) => {
  const [payMethodType, setpayMethodType] = useState("later");

  //Online Payment
  const [onlinePayment, setOnlinePayment] = useState({});

  //Manual Payment
  const [manualPayment, setmanualPayment] = useState({
    amount: Number(amount),
    ref: "",
    paymentMethod: "",
  });

  useEffect(() => {
    setmanualPayment((prev: any) => ({ ...prev, amount: Number(amount) }));
  }, [amount]);

  useEffect(() => {
    setData &&
      setData({
        payMethodType,
        onlinePayment,
        manualPayment,
      });
  }, [payMethodType, onlinePayment, manualPayment]);
  const { theme } = useTheme();

  return (
  
     <View> 
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 12,
          marginBottom: 4,
        }}
      >
        <RadioButton
          value="Collect Online"
          status={payMethodType === "online" ? "checked" : "unchecked"}
          onPress={() => setpayMethodType("online")}
          color={theme.brandColor}
        />
        <Text style={{ fontFamily: "BoldText" }}>Collect Online</Text>
      </View>

      {payMethodType == "online" && (
        <CollectOnline customerId={customerId} setData={setOnlinePayment} />
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <RadioButton
          value="Manual TRX"
          status={payMethodType === "manual" ? "checked" : "unchecked"}
          onPress={() => setpayMethodType("manual")}
          color={theme.brandColor}
        />
        <Text style={{ fontFamily: "BoldText" }}>Manual TRX</Text>
      </View>

      {payMethodType == "manual" && (
        <ManualTRX
          amount={amount}
          setManualPayment={setmanualPayment}
          manualPayment={manualPayment}
        />
      )}

      {islater && (
        <View
          style={{
            zIndex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <RadioButton
            value="Collect Latter"
            status={payMethodType === "later" ? "checked" : "unchecked"}
            onPress={() => setpayMethodType("later")}
            color={theme.brandColor}
          />
          <Text style={{ fontFamily: "BoldText" }}>Collect Later</Text>
        </View>
      )}
    </View>
    
  );
};

export default PaymentMethod;
