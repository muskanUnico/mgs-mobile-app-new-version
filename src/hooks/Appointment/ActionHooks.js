import { useRouter } from "expo-router";
import { useState } from "react";
import {
  approvedAppointment,
  cancelAppointment,
  deleteAppointment,
  rejectedAppointment,
} from "../../hooks/Appointment";
import { handleApppointmentAction } from "../../hooks/Appointment/hooks";
const router = useRouter();

export const useActionHooks = ({ appointments = [] }) => {
  // Action modal
  const [refundPayment, setRefundPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicModal, setdynamicModal] = useState({
    open: false,
    title: "",
    btnfirst: "",
    btnsec: "",
    appointmentId: "",
    actionId: "",
    isLoading: false,
  });

  const handleModalClose = () => {
    setdynamicModal({
      ...dynamicModal,
      open: false,
    });
  };
  // Hooks
  const approvedAppointmentHook = approvedAppointment();
  const rejectedAppointmentHook = rejectedAppointment();
  const deleteAppointmentHook = deleteAppointment();
  const cancelAppointmentHook = cancelAppointment();

  const handleConfirmbtn = async () => {
    const { appointmentId, actionId } = dynamicModal;

    if (actionId === "approve-reject") {
      await approvedAppointmentHook.submit(appointmentId);
      handleModalClose();
    }
    if (actionId == "delete-appointment") {
      setIsLoading(true);
      await deleteAppointmentHook.submit(appointmentId).finally(() => {
        setIsLoading(false);
      });
      handleModalClose();
    }

    if (actionId == "cancel") {
      if (!refundPayment) {
        setRefundPayment(true);
        setdynamicModal((pre) => ({
          ...pre,
          title: "Are you sure!  you want to Refund Payment ?",
        }));
      } else {
        await cancelAppointmentHook
          .submit(appointmentId, refundPayment)
          .finally(() => {
            handleModalClose();
          });
        setRefundPayment(false);
      }
    }
  };

  const handleRightbtn = async () => {
    const { appointmentId, actionId } = dynamicModal;

    if (actionId == "approve-reject") {
      await rejectedAppointmentHook.submit(appointmentId);
    }
    if (actionId == "cancel") {
      if (refundPayment) {
        await cancelAppointmentHook.submit(appointmentId, refundPayment);
        setRefundPayment(false);
      }
    }
    handleModalClose();
  };

  const router = useRouter();

  const handleActionClick = (appointmentId, actionItem, paymentId) => {
    const modalResponse = handleApppointmentAction(
      appointmentId,
      actionItem,
      paymentId
    );
    if (modalResponse) {
      setTimeout(() => {
        setdynamicModal({ ...modalResponse, name: "DON" });
      }, 1000);
    }

    if (actionItem.id === "collect-payment") {
      const getAppointment = appointments.find(
        (appointment) => appointment.id == appointmentId
      );
      const amount = getAppointment?.paymentId?.payment?.amount;

      // useAppointmentStore.getState().setAppointment({
      //   customerId:
      //     getAppointment?.customerId?.id || getAppointment?.customerId,
      //   appointmentId,
      //   amount,
      //   appointmentData: getAppointment,
      // });
      router.push({
        pathname: "/(stack)/paymentPage",
        params: {
          customerId:
            getAppointment?.customerId?.id || getAppointment?.customerId,
          appointmentId: appointmentId,
          amount: String(amount),
          appointmentData: JSON.stringify(getAppointment),
        },
      });
    }

    if (actionItem.id === "sms") {
      const getAppointment = appointments.find(
        (appointment) => appointment.id == appointmentId
      );
        router.navigate(
        `/(stack)/smsScreen?getAppointment=${encodeURIComponent(
          JSON.stringify(getAppointment)
        )}`
      );
    }
  };

  return {
    dynamicModal,
    setdynamicModal,
    handleModalClose,
    handleConfirmbtn,
    handleRightbtn,
    handleActionClick,
    isLoading,
  };
};
