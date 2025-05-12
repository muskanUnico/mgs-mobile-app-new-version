import moment from "moment";
import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { chips, formatTime } from "../../../utils/tools";
import PatientsNotes from "./PatientNoteFeature/PatientsNotes";
import { getAppointmentById } from "../../../hooks/Appointment";
import Tabs from "../../../components/elements/Tabs/Tabs";
import ViewAppointment from "./ViewAppointmentFeature/ViewAppointment";
import { useActionHooks } from "../../../hooks/Appointment/ActionHooks";
import {
  appointmentActionOptions,
  formatAppointmentIntoConfirmAppointmentHook,
} from "../../../hooks/Appointment/hooks";
import { Appointment } from "../../../interface/Appointment";
import Loader from "../../../components/elements/Loader/Loader";
import WarningModal from "../../../components/elements/WarningModal/WarningModal";
import ViewDetails from "../../../components/ui/Appointment/ViewAppointment/ViewDetails/ViewDetails";
import { goBack } from "../../../utils/navigationServices";

const ViewAppointmentFeature = ({ navigation, route }: any) => {
  // context
  const { permissions } = useAuth();
  // integration hooks call
  const appointment = getAppointmentById(route.params?.id);
  const data = appointment.data as Appointment;
  // tab state

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (route.params.selectedTab) {
      setSelectedTab(route.params.selectedTab);
    }
  }, [route.params.selectedTab]);

  const tabs = [
    {
      id: 0,
      label: "View",
    },
    {
      id: 1,
      label: "Patient Notes",
    },
  ];

  const {
    handleActionClick,
    dynamicModal,
    handleModalClose,
    handleConfirmbtn,
    handleRightbtn,
    isLoading,
  } = useActionHooks({ appointments: [data] });

  useEffect(() => {
    if (isLoading)
      setTimeout(() => {
        goBack();
      }, 3000);
  }, [isLoading]);

  return appointment.loading ? (
    <Loader />
  ) : (
    appointment.data && (
      <View style={{ margin: 4 }}>
        <ViewDetails
          client={{
            name: data.customerId?.name || "Not Available",
          }}
          appointment={{
            date: moment(data?.date).format("DD MMM YYYY"),
            start_time: formatTime(data?.start_time_range),
            status: chips(data, data?.date),
          }}
          payment={{
            status: data?.paymentId?.paymentStatus,
          }}
          options={appointmentActionOptions(
            data?.status,
            data.paymentId?.paymentStatus === "pending",
            data.notes?.data?.length > 0,
            permissions,
            data,
            true
          )}
          handleOptions={(option: any) =>
            handleActionClick(data?.id, option, data.paymentId?.id)
          }
          timestamp={moment(data?.createdAt).format("DD MMM YYYY h:mm a")}
        />
        <View style={{ marginHorizontal: 20, marginTop: 8 }}>
          <Tabs
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
            tabs={tabs}
          />
        </View>
        {selectedTab === 0 && (
          <ViewAppointment
            paymentDetails={data}
            {...formatAppointmentIntoConfirmAppointmentHook(data)}
          />
        )}
        {selectedTab === 1 && (
          <PatientsNotes
            id={route.params?.id}
            customerId={data?.customerId?.id}
            navigation={navigation}
          />
        )}
        {dynamicModal.open && (
          <WarningModal
            modalVisible={dynamicModal.open}
            setModalVisible={handleModalClose}
            title={dynamicModal.title}
            handleLeftbtn={handleConfirmbtn}
            rightBtnName={dynamicModal.btnfirst}
            leftBtnName={dynamicModal.btnsec}
            handleRightbtn={handleRightbtn}
            loading={isLoading}
          />
        )}
      </View>
    )
  );
};

export default ViewAppointmentFeature;
