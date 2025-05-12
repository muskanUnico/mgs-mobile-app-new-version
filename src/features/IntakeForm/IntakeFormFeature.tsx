"use client";
import React from "react";
import moment from "moment";
import { Text, View } from "react-native";
import { Data } from "../../interface/Customer";
import Title from "../../components/elements/Title/Title";
import Button from "../../components/elements/Button/Button";
import IntakeFormUI from "../../components/ui/IntakeFormUI/IntakeFormUI";
import { getBtnIntakeForm, getIntakeform } from "../../hooks/Customer";
import { StyleSheet } from "react-native";

const IntakeFormFeature = ({ navigation, route }: any) => {
  const { data } = getIntakeform(route.params?.id);
  const { handleReject, handleAccept } = getBtnIntakeForm(route.params.id);

  const {
    personal_details: personalDetails,
    form,
    edit_request_status,
  } = data as Data;

  const Step1data = personalDetails
    ? [
        {
          title: "Name",
          name: personalDetails?.name || "N/A",
        },
        {
          title: "Email Address",
          name: personalDetails?.email || "N/A",
        },
        {
          title: "Age",
          name: personalDetails?.age || "N/A",
        },
        {
          title: "Date of Birth",
          name: moment(personalDetails?.dob).format("DD MMM YYYY") || "N/A",
        },
        {
          title: "Areas to be treated",
          name: personalDetails?.areas || "N/A",
        },
      ]
    : [];

  return (
    <>
      <Title
        navigation={navigation}
        title={`Intake Form: ${personalDetails?.name}`}
      />
      <View style={[{ marginHorizontal: 16, marginBottom: 32 }]}>
        {edit_request_status == "change_request" && (
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <Text style={{ fontFamily: "BoldText", fontSize: 18 }}>
              EDIT REQUEST
            </Text>
            <View style={styles.rowLayout}>
              <View style={styles.paddingRight}>
                <Button title="ACCEPT" onPress={handleAccept} />
              </View>
              <Button title="REJECT" onPress={handleReject} />
            </View>
          </View>
        )}
        <View style={{ paddingTop: 16 }}>
          <IntakeFormUI step2data={Step1data} step1data={form} />
        </View>
      </View>
    </>
  );
};

export default IntakeFormFeature;
const styles = StyleSheet.create({
  rowLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paddingRight: {
    paddingRight: 8,
  },
});
