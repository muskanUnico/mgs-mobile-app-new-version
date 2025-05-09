//@ts-nocheck

import { navigate } from "../../utils/navigationServices";
import { AppointmentService, AvailabilityService } from "../../services";
import { Text, View } from "react-native";

export const callAvailabilityService = async (body, setResponse) => {
  try {
    const res = await AvailabilityService.findTeamMemberAvailability(body);
    setResponse(res);
    return res;
  } catch (error) {
    console.error("Error calling AvailabilityService:", error);
  }
};

export const createCustomAvailability = async (body) => {
  return await AvailabilityService.createCustomAvailability(body);
};

export const createAppointment = async (
  finalResponse,
  setErrors,
  setLoading,
  setAppointmentRes
) => {
  setLoading("submit");
  try {
    const appointmentRes = await AppointmentService.createAppointment(
      finalResponse
    );

    if (!appointmentRes.success) {
      setErrors((old) => [...old, appointmentRes.data.message]);
    }

    if (appointmentRes?.success) {
      setAppointmentRes(appointmentRes.data);
      setLoading("");
    }
    return appointmentRes;
  } catch (err) {
    console.log("code worked perfect", err);

    setErrors((old) => [...old, err?.response?.data?.message]);
  } finally {
    setLoading("");
  }
};

// Component for rendering errors
export const ErrorRender: React.FC<{
  API_RUN: boolean;
  memberResponse: any;
  errors: string[];
}> = ({ API_RUN, memberResponse, errors }) => {
  return (
    <View style={{ paddingVertical: 16 }}>
      <View>
        {memberResponse?.error?.map((err: any) => (
          <View key={err.memberId} style={{ paddingTop: 8, color: "#FCA5A5" }}>
            <Text style={{ color: "#F87171", fontFamily: "BoldText" }}>
              {" "}
              {err.error}
            </Text>
          </View>
        ))}
        {errors.map((err, index) => (
          <View key={index} style={{ paddingTop: 8, color: "#FCA5A5" }}>
            <Text style={{ color: "#F87171", fontFamily: "BoldText" }}>
              {" "}
              {err}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
