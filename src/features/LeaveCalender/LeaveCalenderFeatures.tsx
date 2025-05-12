import { Switch } from "react-native-paper";
import React, { useState, useRef } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import moment from "moment";
import {
  brandColor,
  brandGreyColor,
  brandPastelColor,
  borderColor,
} from "../../constants/COLORS";
import { styles as externalStyles } from "../../assets/css";
import Button from "../../components/elements/Button/Button";
import WarningModal from "../../components/elements/WarningModal/WarningModal";
import {
  useApprovedLeaveRequests,
  useDeleteLeaveRequests,
  useGetAllLeaveRequests,
  useLongMenuLeaveRequest,
  useRejectLeaveRequests,
} from "../../hooks/LeaveCalender/LeaveRequest";
import LeaveCalender from "./LeaveCalender";
import { CheckCircleIcon } from "native-base";
import LeaveCalenderCard from "./LeaveCalenderCard";
import CustomTextArea from "../../components/elements/CustomTextArea/CustomTextArea";
import CustomBottomSheet from "../../components/elements/BottomSheet/CustomBottomSheet";
import CustomModal from "../../components/elements/CustomModal/CustomModal";
import { navigate } from "../../utils/navigationServices";
import { useTheme } from "../../context/ThemeContext";

const LeaveCalenderFeatures = () => {
  const leaveHook = useGetAllLeaveRequests();
  const { handleApprovedLeave } = useApprovedLeaveRequests(leaveHook);
  const { handleDeleteLeave } = useDeleteLeaveRequests(leaveHook);
  const { handleRejectLeave, loading } = useRejectLeaveRequests(leaveHook);

  const bottomSheetRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);

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
          onPress={() => navigate("RequestLeave")}
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
          style={[styles.switch, { marginHorizontal: 4 }]}
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
                icon: <CheckCircleIcon />,
                line: false,
              },
              {
                id: 1,
                title: "Edit Leave",
                icon: <CheckCircleIcon />,
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
  },
});

export default LeaveCalenderFeatures;
