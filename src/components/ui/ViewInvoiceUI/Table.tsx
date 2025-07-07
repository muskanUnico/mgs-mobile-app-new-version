import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { styles as externalStyles } from "../../../assets/css";
import { useTheme } from "../../../context/ThemeContext";
import { useGetCMS } from "../../../hooks/CMS";
import {
  formatDateforHeader,
  formatMinutesToHoursAndMinutes,
} from "../../../utils/tools";

export const Table = ({ data }: any) => {
  const cms = useGetCMS();
  const { theme } = useTheme();
  return (
    <>
      <View style={{ paddingTop: 8, flex: 1 }}>
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#d1d5db",
          }}
        >
          <View>
            <View style={{ backgroundColor: "white" }}>
              <View style={styles.container}>
                <Text style={[externalStyles.label]}>DESCRIPTION</Text>
              </View>

              {data.appointmentId?.bookings?.map((item: any, index: number) => {
                return (
                  <View key={index} style={{ marginTop: 8, flex: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        marginVertical: 8,
                        marginTop: 4,
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            paddingLeft: 8,
                            color: theme.brandColor,
                            fontFamily: "BoldText",
                          }}
                        >
                          #
                        </Text>
                        <Text
                          style={{
                            paddingLeft: 8,
                            color: theme.brandColor,
                            fontFamily: "BoldText",
                          }}
                        >
                          {index + 1}
                        </Text>
                      </View>
                      <View style={{ paddingLeft: 16 }}>
                        <Text style={{ width: "60%", fontFamily: "BoldText" }}>
                          {item.serviceName || "Not Available"}
                        </Text>
                        <Text style={{ fontFamily: "Regular" }}>
                          {formatMinutesToHoursAndMinutes(item.minutes) ||
                            "Not Available"}
                        </Text>
                        <Text style={{ fontFamily: "Regular" }}>
                          {item.teamMemberName || "Not Available"}
                        </Text>
                        <Text style={{ fontFamily: "Regular" }}>
                          {formatDateforHeader(
                            data.appointmentId?.date,
                            item.start_time,
                            item.end_time
                          ) || "Not Available"}
                        </Text>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text style={[externalStyles.label]}>QTY. :</Text>
                          <Text style={{ fontFamily: "Regular" }}>1</Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text style={[externalStyles.label]}>PRICE :</Text>
                          <Text style={{ fontFamily: "Regular" }}>
                            CAD${item.amount?.subtotal || "Not Available"}
                          </Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text style={[externalStyles.label]}>TOTAL :</Text>
                          <Text style={{ fontFamily: "BoldText" }}>
                            CAD${item.amount?.total || "Not Available"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={{ marginBottom: 8 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ paddingHorizontal: 16 }}>
                <View>
                  <Text style={{ paddingTop: 12, fontFamily: "BoldText" }}>
                    SUB-TOTAL
                  </Text>
                </View>
                <View>
                  <Text style={{ paddingTop: 12, fontFamily: "BoldText" }}>
                    {" "}
                    DISCOUNT-10%
                  </Text>
                </View>
                <View>
                  <Text style={{ paddingTop: 12, fontFamily: "BoldText" }}>
                    GROSS-TOTAL
                  </Text>
                </View>
                <View>
                  <Text style={{ paddingTop: 12, fontFamily: "BoldText" }}>
                  TAX-{cms.data?.tax ?? 0}%
                  </Text>
                </View>
                <Text
                  style={{
                    paddingVertical: 12,
                    color: theme.brandColor,
                    fontFamily: "BoldText",
                  }}
                >
                  NET - TOTAL
                </Text>
              </View>
              <View style={{ paddingHorizontal: 16 }}>
                <View>
                  <Text style={{ paddingTop: 12, fontFamily: "Regular" }}>
                    CAD$
                    {data.appointmentId?.amount?.subtotal || "Not Available"}
                  </Text>
                </View>
                <View>
                  <Text style={{ paddingTop: 12, fontFamily: "Regular" }}>
                    CAD$ {data.appointmentId?.amount?.discount}
                  </Text>
                </View>
                <View>
                  <Text style={{ paddingTop: 12, fontFamily: "Regular" }}>
                    CAD${" "}
                    {data.appointmentId?.amount?.subtotal || "Not Available"}
                  </Text>
                </View>
                <View>
                  <Text style={{ paddingTop: 12, fontFamily: "Regular" }}>
                    CAD$ {data.appointmentId?.amount?.tax || "Not Available"}
                  </Text>
                </View>
                <Text
                  style={{
                    paddingVertical: 12,
                    color: theme.brandColor,
                    fontFamily: "Regular",
                  }}
                >
                  CAD${data.appointmentId?.amount?.total || "Not Available"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginVertical: 8,
    marginTop: 16,
  },
});
