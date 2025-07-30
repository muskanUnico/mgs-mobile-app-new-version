//@ts-nocheck
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { styles as externalStyles } from "../../../assets/css";
import Button from "../../../components/elements/Button/Button";
import Loader from "../../../components/elements/Loader/Loader";
import Title from "../../../components/elements/Title/Title";
import { useTheme } from "../../../context/ThemeContext";
import {
  ErrorRender,
  createAppointment,
} from "../../../hooks/CreateAppointment";
import useAppointmentFlow from "../../../hooks/CreateAppointment/useAppointmentFlow";
import ConfirmAppointment from "../ConfirmAppointment/ConfirmAppointment";
import CreateAppointmentCardFeature from "./CreateAppointmentCardFeature/CreateAppointmentCardFeature";
import CreateAppointmentFromFeature from "./CreateAppointmentFromFeature/CreateAppointmentFromFeature";

const CreateAppointmentFeature = ({ navigation,customer}) => {
  const { theme } = useTheme();
  const {
    API_RUN,
    clientInfoData,
    SetClientInfoData,
    appointmentDetails,
    setAppointmentDetails,
    tableselectedData,
    setTableselectedData,
    discount,
    Loading,
    setLoading,
    memberResponse,
    finalResponse,
    Next,
    SetNext,
    errors,
    setErrors,
    appointmentRes,
    setAppointmentRes,
    paymentData,
    setPaymentData,
    find,
    next,
    previewData,
    manageDiscount,
    setManageDiscount,
  } = useAppointmentFlow();
      const screenTitle = customer?.title;
  const handleSubmit = () => {
    const body = { ...finalResponse, discount: {} };

    if (manageDiscount.code) {
      body.discount.code = manageDiscount.code;
    }

    if (manageDiscount.custom?.customValue > 0) {
      body.discount.custom = manageDiscount.custom;
    }
    createAppointment(body, setErrors, setLoading, setAppointmentRes);
  };

  return (
    <View style={{ flex: 1 }}>
      {!Next && (
        <>
          <FlatList
            ListHeaderComponent={
              <View>
                <Title navigation={navigation} 
                 title={`${screenTitle || "Create Appointments"}`}
                 />
                <View style={{ marginHorizontal: 8 }}>
                  <CreateAppointmentFromFeature
                    clientData={{
                      defaultValue: clientInfoData,
                      setValue: SetClientInfoData,
                    }}
                    details={appointmentDetails}
                    setDetails={setAppointmentDetails}
                    customer={customer}
                  />
                </View>
                {!Next && (
                  <View style={[externalStyles.container]}>
                    <ErrorRender
                      API_RUN={API_RUN}
                      memberResponse={memberResponse}
                      errors={errors}
                    />
                  </View>
                )}
                <CreateAppointmentCardFeature
                  setTableselectedData={setTableselectedData}
                  tableselectedData={tableselectedData}
                  manageDiscount={manageDiscount}
                  setManageDiscount={setManageDiscount}
                  discount={discount}
                />
              </View>
            }
          />

          <View style={styles.container}>
            {Loading == "find" ? (
              <Loader />
            ) : (
              <Button title="FIND" onPress={find} />
            )}

            {Loading == "next" ? (
              <Loader />
            ) : (
              API_RUN && (
                <View style={{ marginLeft: 16 }}>
                  <Button title="NEXT" onPress={next} />
                </View>
              )
            )}
          </View>
        </>
      )}

      {Next && (
        <FlatList
          ListHeaderComponent={
            <>
              <View
                style={{
                  paddingBottom: 64,
                  backgroundColor: theme.brandGreyColor,
                }}
              >
                <Title navigation={navigation} title="Confirm Appointments" />
                <View>
                  <ConfirmAppointment
                    API_RUN={API_RUN}
                    memberResponse={memberResponse}
                    errors={errors}
                    tableselectedData={tableselectedData}
                    setTableselectedData={setTableselectedData}
                    discount={discount}
                    findLoading={Loading == "find"}
                    nextLoading={Loading == "next"}
                    find={find}
                    next={next}
                    setNext={SetNext}
                    setErrors={setErrors}
                    previewData={previewData}
                    setPaymentData={setPaymentData}
                    takePayment
                  />
                  <View
                    style={{
                      marginBottom: 64,
                      marginHorizontal: 12,
                    }}
                  >
                    <Button
                      loading={Loading == "submit"}
                      title="Save"
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              </View>
            </>
          }
        />
      )}
    </View>
  );
};

export default CreateAppointmentFeature;
const styles = StyleSheet.create({
  container: {
    zIndex: 30,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: 16,
    paddingBottom: 90,
  },
});
