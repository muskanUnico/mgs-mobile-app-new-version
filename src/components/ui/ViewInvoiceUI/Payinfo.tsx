import moment from "moment";
import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { styles as externalStyles } from "../../../assets/css";

export const Payinfo = ({ invoicedata }: any) => {
  const advancedDate = moment(
    invoicedata?.paymentId?.advancePayment?.paymentDate
  ).format("DD MMM YYYY");

  const AdvanceDeposit = () => {
    return (
      <>
        {invoicedata?.paymentId?.paymentType == "advance" && (
          <>
            <View>
              <Text style={[externalStyles.label]}>Advance deposit of </Text>
              <Text
                style={{
                  color: "#22c55e",
                  letterSpacing: 1,
                  marginTop: 8,
                  fontFamily: "Regular",
                }}
              >
                CAD${invoicedata?.paymentId?.advancePayment?.amount || " - "}{" "}
                PAID through{" "}
                {invoicedata?.paymentId?.advancePayment?.paymentMethod} with
                Reference No{" "}
                {invoicedata?.paymentId?.advancePayment?.paymentRefNo} on{" "}
                {advancedDate || ""}
              </Text>
            </View>
          </>
        )}
      </>
    );
  };

  const PaymentsArrays = ({ item }: any) => {
    return (
      <>
        <View style={{ paddingTop: 4 }}>
          <Text style={[externalStyles.label]}>Payment deposit of </Text>
          <Text
            style={{
              color: "#22c55e",
              letterSpacing: 1,
              marginTop: 8,
              fontFamily: "Regular",
            }}
          >
            CAD${item?.amount || " - "} PAID through
            {item?.paymentMethod} with Reference No
            {item?.paymentRefNo} on{" "}
            {moment(item.paymentDate).format("DD MMM YYYY") || ""}
          </Text>
        </View>
      </>
    );
  };

  const AdvanceDepositRefunded = () => {
    return (
      <>
        {invoicedata?.paymentId?.paymentType == "advance" && (
          <View style={{ marginTop: 12 }}>
            <Text style={[externalStyles.label]}>Pending payment of </Text>
            <Text
              style={{
                color: "#dc2626",
                letterSpacing: 1,
                marginTop: 8,
                fontFamily: "BoldText",
              }}
            >
              {" "}
              CAD${invoicedata?.paymentId?.advancePayment?.amount || " - "} is
              SUCCESSFULLY REFUNDED on {advancedDate || ""}
            </Text>
          </View>
        )}
      </>
    );
  };

  const PaymentNotPaid = () => {
    return (
      <>
        <View>
          <Text style={[externalStyles.label]}>Pending payment of </Text>
          <Text
            style={{
              color: "#dc2626",
              letterSpacing: 1,
              marginTop: 8,
              fontFamily: "BoldText",
            }}
          >
            CAD${invoicedata?.paymentId?.payment?.amount?.toFixed(2)} NOT PAID
          </Text>
        </View>
      </>
    );
  };

  return (
    <>
      <View
        style={{
          marginLeft: 20,
          marginVertical: 16,
          paddingTop: 12,
          paddingBottom: 12,
        }}
      >
        {invoicedata?.paymentId?.paymentStatus == "paid" && (
          <>
            <AdvanceDeposit />
            {invoicedata.paymentId.payments.map((item: any, index: number) => {
              return <>{<PaymentsArrays key={index} item={item} />}</>;
            })}

            <View style={{ marginTop: 4 }}>
              <Text style={{ letterSpacing: 1, fontFamily: "BoldText" }}>
                {" "}
                Pending payment of{" "}
              </Text>
              <Text
                style={{
                  color: "#22c55e",
                  letterSpacing: 1,
                  fontFamily: "Regular",
                }}
              >
                {" "}
                CAD${invoicedata?.paymentId?.payment?.amount} PAID through{" "}
                {invoicedata?.paymentId?.payment?.paymentMethod} with Reference
                No {invoicedata?.paymentId?.payment?.paymentRefNo} on{" "}
                {moment(invoicedata?.paymentId?.payment?.paymentDate).format(
                  "DD MMM YYYY"
                )}
              </Text>
            </View>

            {invoicedata.paymentId.tips?.map((item: any, index: number) => {
              return (
                <View key={index} style={{ marginTop: 4 }}>
                  <Text style={{ letterSpacing: 1, fontFamily: "BoldText" }}>
                    Tip{" "}
                  </Text>
                  <Text
                    style={{
                      color: "#22c55e",
                      letterSpacing: 1,
                      fontFamily: "Regular",
                    }}
                  >
                    CAD${item.amount} PAID to {item.teamMemberName}
                  </Text>
                </View>
              );
            })}
          </>
        )}

        {invoicedata?.paymentId?.paymentStatus == "pending" && (
          <>
            <AdvanceDeposit />
            {invoicedata.paymentId.payments.map((item: any, index: number) => {
              return <>{<PaymentsArrays key={index} item={item} />}</>;
            })}

            <PaymentNotPaid />

            {invoicedata.paymentId.tips?.map((item: any, index: number) => {
              return (
                <View key={index} style={{ marginTop: 4 }}>
                  <Text style={{ letterSpacing: 1, fontFamily: "BoldText" }}>
                    Tip{" "}
                  </Text>
                  <Text
                    style={{
                      color: "#22c55e",
                      letterSpacing: 1,
                      fontFamily: "Regular",
                    }}
                  >
                    CAD${item.amount} PAID to {item.teamMemberName}
                  </Text>
                </View>
              );
            })}
          </>
        )}

        {invoicedata?.paymentId?.paymentStatus == "refunded" && (
          <>
            <AdvanceDeposit />
            <AdvanceDepositRefunded />
            {invoicedata.paymentId.payments.map((item: any, index: number) => {
              return <>{<PaymentsArrays key={index} item={item} />}</>;
            })}

            {invoicedata.paymentId.payment.paymentStatus == "paid" && (
              <View>
                <Text style={[externalStyles.label]}>Pending payment of </Text>
                <Text
                  style={{
                    color: "#16a34a",
                    letterSpacing: 1,
                    marginTop: 8,
                    fontFamily: "BoldText",
                  }}
                >
                  CAD${invoicedata?.paymentId?.payment?.amount?.toFixed(2)} PAID
                </Text>
              </View>
            )}

            {invoicedata.paymentId.payment.paymentStatus == "pending" && (
              <View>
                <Text style={[externalStyles.label]}>Pending payment of </Text>
                <Text
                  style={{
                    color: "#dc2626",
                    letterSpacing: 1,
                    marginTop: 8,
                    fontFamily: "BoldText",
                  }}
                >
                  CAD${invoicedata?.paymentId?.payment?.amount?.toFixed(2)} PAID
                </Text>
              </View>
            )}

            {invoicedata.paymentId.tips?.map((item: any, index: number) => {
              return (
                <View key={index} style={{ marginTop: 4 }}>
                  <Text style={{ letterSpacing: 1, fontFamily: "BoldText" }}>
                    Tip{" "}
                  </Text>
                  <Text
                    style={{
                      color: "#22c55e",
                      letterSpacing: 1,
                      fontFamily: "Regular",
                    }}
                  >
                    CAD${item.amount} PAID to {item.teamMemberName}
                  </Text>
                </View>
              );
            })}
          </>
        )}
      </View>
    </>
  );
};
