import { Alert, View, ImageBackground, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getTeamMembers } from "../../hooks/TeamMembers";
import {
  getAllDatesBetween,
  getTotalDaysBetweenDates,
} from "../../utils/tools";
import Button from "../../components/elements/Button/Button";
import { styles as externalStyles } from "../../assets/css";
import Title from "../../components/elements/Title/Title";
import AutoComplete from "../../components/elements/AutoComplete/AutoComplete";
import StandardInput from "../../components/elements/StandardInput/StandardInput";
import CustomTextArea from "../../components/elements/CustomTextArea/CustomTextArea";
import CustomDropDown from "../../components/elements/CustomDropDown/CustomDropDown";
import MultiDatePicker from "../../components/elements/MultiDatePicker/MultiDatePicker";
import RangeDatePicker from "../../components/elements/RangeDatePicker/RangeDatePicker";
import {
  useCreateLeaveRequests,
  useUpdateLeaveRequests,
} from "../../hooks/LeaveCalender/LeaveRequest";
import { PermissionAccess } from "../../middleware/PermissionAccess";

const RequestLeaveFeature = ({ navigation, route,item }: any) => {
  const existingData = item;

  const { permissions, user } = useAuth();
  const isAdmin = permissions.includes("manage_leave_request");
  const createLeave = useCreateLeaveRequests();
  const updateLeave = useUpdateLeaveRequests();
  const { data } = getTeamMembers();

  const [teamMember, setTeamMember] = useState({
    id: "",
    title: "",
  });
  const [selectedValue, setSelectedValue] = useState("");
  const [leave, setLeave] = useState("Sick");
  const [loading, setLoading] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  // dtate
  const [single, setSingle] = useState([]);
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);

  // Options for autocomplete
  const options = data.map((item) => ({ title: item.name, id: item?.id }));

  const dropdownData = [
    { label: "Select Individual Dates", value: "single" },
    { label: "Select Range", value: "range" },
  ];

  const leaveType = [
    { label: "Sick Leave", value: "Sick Leave" },
    { label: "Emergency", value: "Emergency Leave" },
    { label: "Casual", value: "Casual Leave" },
    { label: "Paid", value: "Paid Leave" },
    { label: "No", value: "No Call No Show" },
  ];

  // formate data at create leave
  const formateData = {
    teamMemberId: isAdmin ? teamMember?.id : user.id,
    leaveType: leave,
    comment: textareaValue,
    dateType: selectedValue,
    dates: selectedValue == "single" ? single : getAllDatesBetween(start, end),
  };

  const handleSubmit = () => {
    if (!formateData?.comment?.trim()) {
      Alert.alert("Comment Required");
    } else {
      if (existingData) {
        updateLeave.handleUpdateLeave(existingData.id, formateData);
      } else {
        createLeave.handleCreateLeave(formateData);
      }
    }
  };

  useEffect(() => {
    if (existingData) {
      setTextareaValue(existingData.comment);
      setTeamMember(existingData.teamMemberId?.id);
      setLeave(existingData.leaveType);
      setSelectedValue(existingData.dateType);

      if (existingData.dateType == "range") {
        setStart(null);
        setEnd(null);
      } else {
        setSingle(existingData.dates);
      }
    }
  }, [existingData]);

  return (
    <ImageBackground
      source={require("../../assets/images/background1.png")}
      style={styles.backgroundImage}
    >
      <View style={{ marginBottom: 384 }}>
        <Title navigation={navigation} title="Request Leave" />
        <View style={[externalStyles.container]}>
          <PermissionAccess requiredPermissions={["manage_leave_request"]}>
            <View style={{ marginVertical: 12 }}>
              <AutoComplete
                inputValue={teamMember}
                dataSet={options}
                setInputValue={setTeamMember}
                label="Team Member"
                placeholder="Select a team member"
              />
            </View>
          </PermissionAccess>

          <View style={{ marginVertical: 12 }}>
            <CustomDropDown
              label="Date Type"
              items={dropdownData}
              value={selectedValue}
              setValue={setSelectedValue}
              placeholder="Select an option"
            />
          </View>

          {selectedValue == "single" && (
            <View style={{ marginVertical: 16 }}>
              <MultiDatePicker value={single} setValue={setSingle} />
            </View>
          )}

          {selectedValue == "range" && (
            <View style={{ marginVertical: 16 }}>
              <RangeDatePicker
                start={start}
                setStart={setStart}
                end={end}
                setEnd={setEnd}
              />
            </View>
          )}

          {selectedValue == "single" && (
            <View style={{ marginVertical: 12 }}>
              <StandardInput
                label="Calculated days"
                value={single.length.toString()}
                editable={false}
              />
            </View>
          )}

          {selectedValue == "range" && (
            <View style={{ marginVertical: 12 }}>
              <StandardInput
                label="Calculated days"
                value={getTotalDaysBetweenDates(start, end).toString()}
                editable={false}
              />
            </View>
          )}
          <View style={{ marginVertical: 12 }}>
            <CustomDropDown
              label="Leave Type"
              items={leaveType}
              value={leave}
              setValue={setLeave}
              placeholder="Select an option"
            />
          </View>

          <View style={{ marginVertical: 12 }}>
            <CustomTextArea
              label="Comment"
              onChangeText={(text: any) => setTextareaValue(text)}
              value={textareaValue}
              placeholder={"comment"}
            />
          </View>

          <View style={{ marginVertical: 16 }}>
            <Button title="Submit" onPress={handleSubmit} loading={loading} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default RequestLeaveFeature;
