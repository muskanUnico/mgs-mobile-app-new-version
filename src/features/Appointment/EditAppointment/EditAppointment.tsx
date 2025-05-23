//@ts-nocheck
import React from "react";
import { FlatList, View } from "react-native";
// css
import { styles as externalStyles } from "../../../assets/css";
// hook
import { rescheduleAppointment } from "../../../hooks/Appointment";
import { ErrorRender } from "../../../hooks/CreateAppointment";
import useAppointmentFlow from "../../../hooks/CreateAppointment/useAppointmentFlow";
// component
import Button from "../../../components/elements/Button/Button";
import Loader from "../../../components/elements/Loader/Loader";
import Title from "../../../components/elements/Title/Title";
import { useTheme } from "../../../context/ThemeContext";
import ConfirmAppointment from "../ConfirmAppointment/ConfirmAppointment";
import CreateAppointmentCardFeature from "../CreateAppointment/CreateAppointmentCardFeature/CreateAppointmentCardFeature";
import CreateAppointmentFromFeature from "../CreateAppointment/CreateAppointmentFromFeature/CreateAppointmentFromFeature";

const EditAppointment = ({ navigation, id}) => {
  const {
    wait,
    isUpdate,
    updatedKeys,
    updateNext,

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
    setPaymentData,
    find,
    next,
    previewData,

    manageDiscount,
    setManageDiscount,
  } = useAppointmentFlow(id);

  //rescheduleAppointmentHook
  const rescheduleAppointmentHook = rescheduleAppointment();

  const handleSubmit = async () => {
    setLoading("submit");

    let body = { ...finalResponse, discount: {} };

    if (manageDiscount.code) {
      body.discount.code = manageDiscount.code;
    }

    if (manageDiscount.custom?.customValue > 0) {
      body.discount.custom = manageDiscount.custom;
    }

    await rescheduleAppointmentHook
      .submit(id, body)
      .catch(() => null);
    setLoading("");
  };
  const { theme } = useTheme();

  return !wait ? (
    <View>
      {!Next && (
        <>
          <FlatList
            ListHeaderComponent={
              <>
                <Title navigation={navigation} title="Edit Appointments" />
                <View style={{ marginHorizontal: 8 }}>
                  <CreateAppointmentFromFeature
                    clientData={{
                      defaultValue: clientInfoData,
                      setValue: SetClientInfoData,
                    }}
                    details={appointmentDetails}
                    setDetails={setAppointmentDetails}
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
              </>
            }
            contentContainerStyle={{ paddingBottom: 130 }}
          />

          <View
            style={{
              position: "absolute",
              bottom: 150,
              zIndex: 30,
              width: "100%",
              flexDirection: "row",
              marginHorizontal: 8,
              marginBottom: 76,
            }}
          >
      
            {Loading == "find" ? (
              <Loader />
            ) : (
              isUpdate &&
              updatedKeys.length > 0 && (
                <View style={{ marginHorizontal: 8 }}>
                  <Button title="FIND" onPress={find} />
                </View>
              )
            )}
            {Loading == "next" ? (
              <Loader />
            ) : (
              isUpdate &&
              (updatedKeys.length == 0 ? (
                <View>
                  <Button title="NEXT" onPress={updateNext} />
                </View>
              ) : (
                API_RUN && (
                  <Button loading={false} title="Next" onPress={next} />
                )
              ))
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
                  backgroundColor: theme.brandGreyColor,
                  paddingBottom: 64,
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
                    submitLoading={Loading == "submit"}
                    find={find}
                    next={next}
                    setNext={SetNext}
                    setErrors={setErrors}
                    previewData={previewData}
                    setPaymentData={setPaymentData}
                    handleSubmit={handleSubmit}
                  />
                  <View style={{ marginHorizontal: 12 }}>
                    <Button
                      title="Save"
                      loading={rescheduleAppointmentHook.loading}
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
  ) : (
    <Loader />
  );
};

export default EditAppointment;
