import moment from "moment";
import React from "react";
import { Text, View } from "react-native";
import { styles as externalStyles } from "../../../assets/css";
import Button from "../../../components/elements/Button/Button";
import { useTheme } from "../../../context/ThemeContext";
import { transformViewInvoiceData } from "../../../utils/functions";
import { navigate } from "../../../utils/navigationServices";

export const Billto = ({ data }: any) => {
  const { theme } = useTheme();

  const handlePayPending = () => {
    try {
      const customerId = data?.customerId?.id;
      const appointmentId = data?.appointmentId?.id;
      const appointmentData = transformViewInvoiceData(data);
      const amount = data?.paymentId?.payment?.amount;
      if (!customerId || !appointmentId || !amount) {
        throw new Error("Invalid data for navigation");
      }
      navigate("paymentpage", {
        customerId,
        appointmentId,
        appointmentData,
        amount,
      });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <>
      <View style={{ padding: 4 }}>
        <Text
          style={[
            { fontSize: 18, color: theme.brandColor, fontFamily: "BoldText" },
          ]}
        >
          BILL TO
        </Text>
      </View>
      <View
        style={{
          paddingTop: 8,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#E5E7EB",
          marginTop: 8,
        }}
      >
        <View
          style={{
            padding: 16,
            margin: 8,
            borderWidth: 1,
            borderColor: "#E5E7EB",
          }}
        >
          <Text style={[externalStyles.label]}>FULL NAME</Text>
          <Text style={[externalStyles.content]}>
            {data.customerId?.name || "Not Available"}
          </Text>
          <Text style={[externalStyles.label, { marginTop: 12 }]}>
            EMAIL ADDRESS
          </Text>
          <Text style={[externalStyles.content]}>
            {data.customerId?.email || "Not Available"}
          </Text>
          <Text style={[externalStyles.label, { marginTop: 12 }]}>
            PHONE NUMBER
          </Text>
          <Text style={[externalStyles.content]}>
            {data.customerId?.telephone}
          </Text>
          <Text style={[externalStyles.label, { marginTop: 12 }]}>ADDRESS</Text>
          <Text style={[externalStyles.content]}>
            123st, ABC Avenue, Calgary, T1W - T4B, Canado
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            paddingRight: 6,
            paddingLeft: 6,
            margin: 0,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            {data.paymentId?.paymentStatus == "paid" && (
              <View>
                <Button title="PAID IN FULL" loading={false} />
              </View>
            )}
            {data.paymentId?.paymentStatus == "pending" && (
              <View style={{ marginHorizontal: 12, marginTop: 8 }}>
                <Button
                  loading={false}
                  onPress={handlePayPending}
                  title="Pay Pending"
                />
              </View>
            )}
            {data.paymentId?.paymentStatus == "refunded" && (
              <View >
                <Button loading={false} title="REFUNDED" />
              </View>
            )}
          </View>
          <View style={{ flexDirection: "row" }}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 16,
                  marginHorizontal: 8,
                }}
              >
                <Text
                  style={{ color: theme.brandColor, fontFamily: "BoldText" }}
                >
                  INVOICE N0:
                </Text>
                <Text style={{ fontWeight: "600", fontFamily: "Regular" }}>
                  {data?.invoiceNo || "Not Available"}
                </Text>
              </View>
              <View
                style={{
                      flexShrink: 1,
                  flexDirection: "row",
                  marginVertical: 8,
                  marginHorizontal: 8,
                  paddingRight:10
              
                }}
              >
                <Text
                  style={{ color: theme.brandColor, fontFamily: "BoldText"}}
                >
                  INVOICE DATE:
                </Text>
                <Text style={{ fontWeight: "600", fontFamily: "Regular"}}>
                  {moment(data?.invoiceDate).format("DD MMM YYYY") ||
                    "Not Available"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
