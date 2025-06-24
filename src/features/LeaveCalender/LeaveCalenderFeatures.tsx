import { borderColor } from "@/src/constants/COLORS";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useRef, useState } from "react";
import {
  Alert, Platform, ScrollView,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';
import { styles as externalStyles } from "../../assets/css";
import CustomBottomSheet from "../../components/elements/BottomSheet/CustomBottomSheet";
import Button from "../../components/elements/Button/Button";
import CustomModal from "../../components/elements/CustomModal/CustomModal";
import CustomTextArea from "../../components/elements/CustomTextArea/CustomTextArea";
import WarningModal from "../../components/elements/WarningModal/WarningModal";
import { useTheme } from "../../context/ThemeContext";
import {
  useApprovedLeaveRequests,
  useDeleteLeaveRequests,
  useGetAllLeaveRequests,
  useLongMenuLeaveRequest,
  useRejectLeaveRequests,
} from "../../hooks/LeaveCalender/LeaveRequest";
import LeaveCalender from "./LeaveCalender";
import LeaveCalenderCard from "./LeaveCalenderCard";

const LeaveCalenderFeatures = () => {
  const leaveHook = useGetAllLeaveRequests();
  const { handleApprovedLeave } = useApprovedLeaveRequests(leaveHook);
  const { handleDeleteLeave } = useDeleteLeaveRequests(leaveHook);
  const { handleRejectLeave, loading } = useRejectLeaveRequests(leaveHook);

  const bottomSheetRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const router =useRouter();

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [currentbtn, setCurrentbtn] = useState({
    currentOptions: -1,
    id: "",
  });

  const [leaveDates, setLeaveDates] = useState<{
    dates: string[];
    status: boolean;
  }>({
    dates: [],
    status: true,
  });


  const {
    warning,
    handleLeftBtnClick,
    handleOptions,
    handleRightBtnClick,
    setModalOpen,
    modalOpen,
    option,
  } = useLongMenuLeaveRequest({
    handleDeleteLeave,
    handleApprovedLeave,
    setCurrentbtn,
    currentbtn,
    leaveHook,
    bottomSheetRef,
  });

  const handleAddComment = () => {
    if (!comment?.trim()) {
      Alert.alert("Add Comment");
    } else {
      handleRejectLeave(currentbtn.id, comment, bottomSheetRef);
    }
  };

  const { theme } = useTheme();

  return (
    <>
      <View style={[externalStyles.container, { marginVertical: 8 }]}>
        <Button
          title="Request Leave"
          onPress={() => 
            router.push("/(stack)/requestLeave")
          }
        />
      </View>

      <View style={[styles.switchContainer, { marginHorizontal: 12 }]}>
        <Text style={[externalStyles.label, { color: theme.brandColor }]}>
          TABULAR VIEW
        </Text>
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          thumbColor={
            isSwitchOn ? theme.brandPastelColor : theme.brandGreyColor
          }
          trackColor={{ true: theme.brandColor, false: borderColor }}
          style={styles.switch}
        />
        <Text style={[externalStyles.label, { color: theme.brandColor }]}>
          CALENDAR VIEW
        </Text>
      </View>

      {isSwitchOn ? (
        <View style={styles.container}>
          <LeaveCalender markedDates={leaveHook.leave} />
        </View>
      ) : (
        leaveHook.leave?.map((item: any, index: number) => {
          let rowOptions = [...option];

          if (item.status == "pending") {
            rowOptions.unshift(
              {
                id: 3,
                title: "Approve / Reject",
                icon: <Feather name="check-circle" size={18} color="green" />,
                line: false,
              },
              {
                id: 1,
                title: "Edit Leave",
                icon: <Feather name="edit" size={16} color="#6B7280" />,
                line: true,
              }
            );
          }
          return (
            <LeaveCalenderCard
              item={item}
              key={index}
              handleOptions={handleOptions}
              option={rowOptions}
              setLeaveDates={setLeaveDates}
              setOpen={setOpen}
              index={index}
            />
          );
        })
      )}

      <WarningModal
        modalVisible={modalOpen}
        setModalVisible={() => setModalOpen(false)}
        title={warning.title}
        handleLeftbtn={handleLeftBtnClick}
        handleRightbtn={handleRightBtnClick}
        leftBtnName={warning.btnSecName}
        rightBtnName={warning.btnFirstName}
        loading={false}
      />

      <CustomBottomSheet
        bottomSheetRef={bottomSheetRef}
        text={"Add Comment"}
        height={300}
      >
        <View style={{ padding: 16 }}>
          <CustomTextArea
            placeholder={"Add comment"}
            label={"Add Admin Comment"}
            onChangeText={(text: string) => setComment(text)}
            value={comment}
          />
          <View style={{ paddingTop: 48 }}>
            <Button
              title="Reject"
              onPress={handleAddComment}
              loading={loading}
            />
          </View>
        </View>
      </CustomBottomSheet>

      <CustomModal text="dates" modalVisible={open} setModalVisible={setOpen}>
        <ScrollView style={{ height: 200 }}>
          {leaveDates.dates.map((item, index) => {
            return (
              <Text key={index} style={{ marginTop: 8 }}>
                {" "}
                {moment(item).format("DD MMM YYYY")}
              </Text>
            );
          })}
        </ScrollView>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  viewLabel: {
    fontSize: 16,
    marginHorizontal: 10,
  },

  switch: {
   ...(Platform.OS === "ios" && {
      transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    }),
    marginHorizontal: 4,
  },
});

export default LeaveCalenderFeatures;
