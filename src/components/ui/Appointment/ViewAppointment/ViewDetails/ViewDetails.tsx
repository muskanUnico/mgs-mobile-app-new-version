import LongMenu from "../../../../elements/LongMenu/LongMenu";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Chip, Divider } from "react-native-paper";
import { styles as externalStyles } from "../../../../../assets/css";

const ViewDetails = ({
  client,
  appointment,
  payment,
  handleOptions,
  options,
  timestamp,
}: any) => {
  return (
    <View style={[externalStyles.card]}>
      <View style={styles.startAlignedRow}>
        <View style={styles.paddingBottomView}>
          <Text style={[styles.marginBottomView, externalStyles.label]}>
            Client Name
          </Text>
          <Text style={[externalStyles.content]}>{client.name}</Text>
        </View>
        <LongMenu options={options} handleOptions={handleOptions} />
      </View>

      <Divider style={styles.spacingBottom} />

      <View style={styles.rowCenterJustified}>
        <View style={styles.rowCenter}>
          <Text style={[externalStyles.label]}>Date : </Text>
          <Text style={[externalStyles.content]}>{appointment.date}</Text>
        </View>

        <View style={styles.rowAlignCenter}>
          <Text style={[externalStyles.label]}>Time : </Text>
          <Text style={[externalStyles.content]}>{appointment.start_time}</Text>
        </View>
      </View>
      <Divider style={styles.dividerSpacing} />

      <Text style={[styles.bottomSpacing, externalStyles.label]}>
        Appointment Status
      </Text>
      <View style={styles.rowContainer}>{appointment.status}</View>

      <Divider style={styles.dividerSpacing} />
      <View style={styles.centeredRowWithSpace}>
        <Text style={[styles.customBottomMargin, externalStyles.label]}>
          Payment Status
        </Text>
        {payment.status == "paid" ? (
          <Chip style={styles.greenChip}>
            <Text style={[styles.smallText, { fontFamily: "BoldText" }]}>
              PAID
            </Text>{" "}
          </Chip>
        ) : payment.status == "pending" ? (
          <Chip style={styles.redChip} textStyle={{ color: "white" }}>
            <Text style={[styles.smallText, { fontFamily: "BoldText" }]}>
              PENDING
            </Text>
          </Chip>
        ) : (
          payment.status == "refunded" && (
            <Chip style={styles.pinkBackgroundRounded}>
              <Text style={[styles.smallText, { fontFamily: "BoldText" }]}>
                REFUNDED
              </Text>
            </Chip>
          )
        )}
      </View>
      <Divider style={styles.spacingDivider} />

      <View style={styles.rowCenterWithGap}>
        <Text style={[externalStyles.label]}>Time Stamp :</Text>
        <Text style={[externalStyles.content]}>{timestamp}</Text>
      </View>
    </View>
  );
};

export default ViewDetails;
const styles = StyleSheet.create({
  startAlignedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 4,
  },
  paddingBottomView: {
    paddingBottom: 8,
  },
  marginBottomView: {
    marginBottom: 8,
  },
  spacingBottom: {
    marginBottom: 12,
  },
  rowCenterJustified: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowCenterWithGap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingBottom: 8,
  },
  spacingDivider: {
    marginBottom: 12,
    marginTop: 8,
  },
  pinkBackgroundRounded: {
    backgroundColor: "#fbb6ce",
    borderRadius: 16,
  },
  smallText: {
    fontSize: 12,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  dividerSpacing: {
    marginBottom: 12,
    marginTop: 12,
  },
  bottomSpacing: {
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: "row",
  },
  centeredRowWithSpace: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  customBottomMargin: {
    marginBottom: 8,
  },
  greenChip: {
    backgroundColor: "#22c55e",
    borderRadius: 16,
  },
  redChip: {
    backgroundColor: "#ef4444",
    borderRadius: 16,
  },
});
