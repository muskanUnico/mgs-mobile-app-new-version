import moment from "moment";
import { Divider } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from "react-native";
import CustomModal from "../../components/elements/CustomModal/CustomModal";
import {
  brandColor,
  iconColor1,
  iconColor5,
  iconColor9,
  iconEmailColor,
} from "../../constants/COLORS";
import { styles as externalStyles } from "../../assets/css";
import { LeaveCalenderChips } from "../../utils/tools";
import LongMenu from "../../components/elements/LongMenu/LongMenu";
import { useLongMenuLeaveRequest } from "../../hooks/LeaveCalender/LeaveRequest";
import {
  useApprovedLeaveRequests,
  useDeleteLeaveRequests,
  useGetAllLeaveRequests,
  useRejectLeaveRequests,
} from "../../hooks/LeaveCalender/LeaveRequest";
import { CheckCircleIcon } from "native-base";
import Button from "../../components/elements/Button/Button";
import CustomBottomSheet from "../../components/elements/BottomSheet/CustomBottomSheet";
import CustomTextArea from "../../components/elements/CustomTextArea/CustomTextArea";
import WarningModal from "../../components/elements/WarningModal/WarningModal";
import { convertDatesToMarkedFormat } from "../../utils/functions";
import { useTheme } from "../../context/ThemeContext";

const LeaveCalender = ({ markedDates }) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [filteredData, setFilterData] = useState(null);

  const bottomSheetRef = useRef(null);
  const leaveHook = useGetAllLeaveRequests();
  const { handleApprovedLeave } = useApprovedLeaveRequests(leaveHook);
  const { handleDeleteLeave } = useDeleteLeaveRequests(leaveHook);
  const { handleRejectLeave, loading } = useRejectLeaveRequests(leaveHook);

  const [currentbtn, setCurrentbtn] = useState({
    currentOptions: -1,
    id: "",
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

  let rowOptions = [...option];

  const handleAddComment = () => {
    if (!comment?.trim()) {
      Alert.alert("Add Comment");
    } else {
      handleRejectLeave(currentbtn.id, comment, bottomSheetRef);
    }
  };

  useEffect(
    useCallback(() => {
      if (selectedDateData?.status == "pending") {
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
    }, [selectedDateData]))


  const onDayPress = useCallback((day) => {

    const filteredData = markedDates.filter((item) => {
      return item.dates.some(dateStr => dateStr.split('T')[0] === day.dateString && item.status != "rejected");
    });

    console.log("filteredData", filteredData)

    setFilterData(filteredData)
  }, []);

  const handleName = (item) => {
    setSelectedDateData(item)
    setModalVisible(true)
  }

  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <>
      <View style={{ flex: 1 }}>
        <Calendar
          markingType="multi-period"
          markedDates={convertDatesToMarkedFormat(markedDates)}
          onDayPress={onDayPress}
        />
      </View>

      <View style={{ paddingTop: 48 }}>
        {filteredData && <View style={[styles.pinkcard]} >
          {filteredData.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => handleName(item)}
                style={{ marginVertical: 4, flexDirection: 'row', gap: 4 }}
              >
                <Text style={{
                  color: item.status != "approved" ? "#F98917" : "green", fontSize: 13,
                  fontFamily: "Regular",
                  textDecorationLine: "underline"
                }}>{index + 1}</Text>
                <Text style={{
                  color: item.status != "approved" ? "#F98917" : "green", fontSize: 13,
                  fontFamily: "Regular",
                  textDecorationLine: "underline"
                }} >{item?.teamMemberId?.name} </Text>
              </TouchableOpacity>
            )
          })}
        </View>
        }
      </View>

      <CustomModal
        text="Leave Details"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <View style={styles.row}>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            <FontAwesome
              name="user"
              size={13}
              style={[{ color: theme.brandColor }]}
            />
            <Text style={[externalStyles.label, { marginLeft: 8 }]}>
              EMPLOYEE NAME
            </Text>
          </View>
          <View>
            <LongMenu
              options={rowOptions}
              handleOptions={(option) =>
                handleOptions(option, selectedDateData)
              }
            />
          </View>
        </View>

        <Text style={[{ marginTop: 4, marginLeft: 20 }, { fontFamily: "Regular" }]}>
          {selectedDateData?.teamMemberId?.name}</Text>
        <Divider style={[styles.divider, { marginVertical: 8 }]} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <View style={styles.row}>
              <FontAwesome
                name="list"
                size={13}
                style={[{ color: iconEmailColor }]}
              />
              <Text style={[externalStyles.label, { marginLeft: 8 }]}>
                LEAVE TYPE
              </Text>
            </View>
            <Text style={[externalStyles.content, { marginTop: 4, marginLeft: 8 }]}>
              {selectedDateData?.leaveType}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setOpen(true);
            }}>
            <View style={styles.row}>
              <FontAwesome
                name="calendar"
                style={[externalStyles.iconColorStyle, { color: iconColor1 }]}
              />
              <Text style={[externalStyles.label]}>NO. OF DAYS</Text>
            </View>
            <Text style={[externalStyles.BlueText, { marginTop: 4, marginLeft: 20 }]}>
              {selectedDateData?.dates?.length.toString()}
            </Text>
          </TouchableOpacity>
        </View>
        <Divider style={[styles.divider, { marginVertical: 8 }]} />
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome
            name="comment"
            style={[externalStyles.iconColorStyle, { color: iconColor5 }]}
          />
          <Text style={[externalStyles.label]}>COMMENT</Text>
        </View>
        <Text style={[externalStyles.content, { marginTop: 4, marginLeft: 8 }]}>
          {selectedDateData?.comment}
        </Text>

        <Divider style={[styles.divider, { marginVertical: 8 }]} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.row}>
            <FontAwesome
              name="info-circle"
              style={[externalStyles.iconColorStyle, { color: iconColor9 }]}
            />
            <Text style={[externalStyles.label]}>STATUS</Text>
          </View>
          <Text style={[externalStyles.content, { marginLeft: 24 }]}>
            {selectedDateData && LeaveCalenderChips(selectedDateData)}
          </Text>
        </View>
      </CustomModal>

      <CustomModal text="dates" modalVisible={open} setModalVisible={setOpen}>
        <ScrollView style={{ height: 200 }}>
          {selectedDateData?.dates.map((item, index) => {
            return (
              <Text style={{ marginTop: 8 }} key={index}>
                {moment(item).format("DD MMM YYYY")}
              </Text>
            );
          })}
        </ScrollView>
      </CustomModal>

      <CustomBottomSheet
        bottomSheetRef={bottomSheetRef}
        text={"Add Comment"}
        height={300}
      >
        <View style={{ padding: 16 }}>
          <CustomTextArea
            placeholder={"Add comment"}
            label={"Add Admin Comment"}
            onChangeText={(text) => setComment(text)}
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
    </>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    dayContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 100,
    },
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    dayText: {
      fontSize: 16,
      color: "#000",
      fontFamily: "Regular"

    },
    disabledText: {
      color: "#d9e1e8",
      fontFamily: "Regular"

    },
    markedText: {
      fontSize: 10,
      color: "black",
      fontFamily: "Regular",

    },
    gbColor: {
      backgroundColor: theme.brandColor,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 10,
      color: "white",
    },
    pinkcard: {
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginTop: 5,
      marginBottom: 8,
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#D9D9D9",
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
        android: {
          elevation: 4,
        },
      }),
    },
  });
}
export default LeaveCalender;

