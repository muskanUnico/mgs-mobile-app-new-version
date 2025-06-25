import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  CalendarProvider,
  CalendarUtils,
  ExpandableCalendar,
} from "react-native-calendars";
import { styles as externalStyles } from "../../../assets/css";
import { getItemFromLocalStorage } from "../../../helper/useLocalStorage";
import CustomModal from "../../elements/CustomModal/CustomModal";
import CalenderCards from "./CalenderCards";
import Timeline from "./Timeline";

const today = new Date();

const getDate = (offset: number = 0): string =>
  CalendarUtils.getCalendarDateString(
    new Date().setDate(today.getDate() + offset)
  );

const MyCalendar = ({ appointments }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [currentDate, setCurrentDate] = useState(getDate());
  const [currentAppointment, setCurrentAppointment] = useState([]);

  const convertToMarkedDates = (): { [key: string]: { marked: boolean } } => {
    const uniqueDates = new Set<string>();
    appointments.forEach((item: any) => {
      const formattedDate = moment(item.date).format("YYYY-MM-DD");
      uniqueDates.add(formattedDate);
    });
    const markedDates: { [key: string]: { marked: boolean } } = {};
    uniqueDates.forEach((date) => {
      markedDates[date] = { marked: true };
    });

    return markedDates;
  };

  function convertTime(time: string) {
    const timeString = time.toString().padStart(4, "0");
    const hours = timeString.slice(0, -2).padStart(2, "0");
    const minutes = timeString.slice(-2);
    return `${hours}:${minutes}`;
  }

  const getColorByTeamMember = async (memberId: any) => {
    const members = (await getItemFromLocalStorage("members-color")) || {};
    //@ts-ignore
    return members[memberId];
  };

  useEffect(() => {
    const currentApp = appointments.filter(
      (item: any) => moment(item.date).format("YYYY-MM-DD") === currentDate
    );
    const currentShow = currentApp.flatMap((item: any) =>
      item.bookings.map((subItem: any) => ({
        title: subItem.teamMemberName,
        startTime: convertTime(subItem.start_time),
        endTime: convertTime(subItem.end_time),
        backgroundColor: getColorByTeamMember(subItem.teamMemberId),
        item,
      }))
    );
    setCurrentAppointment(currentShow);
  }, [currentDate]);

  const onDateChanged = useCallback((date: string) => {
    setCurrentDate(date);
  }, []);

  const onMonthChange = useCallback((month: any) => {
    setCurrentDate(month.dateString);
  }, []);

  const handleCards = (item: any, index: number) => {
    setSelectedDateData(item?.item);
    setModalVisible(true);
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <CalendarProvider
          date={currentDate}
          onDateChanged={onDateChanged}
          onMonthChange={onMonthChange}
          disabledOpacity={0.6}
          style={{ flex: 1 }}
        >
          <ExpandableCalendar
            firstDay={1}
            markedDates={convertToMarkedDates()}
          />
        </CalendarProvider>

        {currentAppointment && currentAppointment.length > 0 ? (
          <Timeline events={currentAppointment} handleCards={handleCards} />
        ):( <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text style={externalStyles.label}>No data found</Text>
      </View>)}
      </View>

      <CustomModal
        text="Appointment"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        {selectedDateData && (
          //@ts-ignore
          <CalenderCards item={selectedDateData} key={selectedDateData.id} />
        )}
      </CustomModal>
    </>
  );
};

export default MyCalendar;
