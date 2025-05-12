import React from "react";
import moment from "moment";
import { Divider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { navigate } from "../../../../utils/navigationServices";
import { styles as externalStyles } from "../../../../assets/css";
import { areAllElementsUnique, formatTime } from "../../../../utils/tools";
import CustomHeading from "../../../../components/elements/CustomHeading/CustomHeading";

const PastAppointments = ({ appointments }: any) => {
  return (
    appointments.data.results.length > 0 && (
      <>
        <View style={[externalStyles.card]}>
          <CustomHeading iconName="history" text="Past Appointments" />
          <Divider style={styles.customDivider} />
          {appointments.data.results.map((item: any, index: number) => {
            const formattedDate = moment(item.date).format("ddd, DD MMM YYYY");
            const startTime = formatTime(item.start_time_range);

            const title: any[] = item.bookings.map(
              (book: any) => book.serviceName
            );
            const memberIds = item.bookings.map(
              (book: any) => book.teamMemberId
            );
            const member =
              memberIds.length > 1 && areAllElementsUnique(memberIds)
                ? "multiple"
                : "single";
            return (
              <View key={index}>
                {title?.map((tit, index) => (
                  <Text key={index} style={[externalStyles.label]}>
                    {index} {tit}
                  </Text>
                ))}
                <View  key={index}  style={styles.customRowLayout}>
                  <View>
                    <Text style={[externalStyles.content]}>
                      {formattedDate} {startTime}
                    </Text>
                    <Text style={[externalStyles.content]}>
                      with {member} staff members
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      navigate(`ViewAppointment`, { id: item?.id })
                    }
                  >
                    <MaterialIcons
                      name="notes"
                      style={[externalStyles.iconStyle]}
                    />
                  </TouchableOpacity>
                </View>
                <Divider style={styles.customDivider2} />
                </View>
            );
          })}

          {appointments.showLoadMore && (
            <Text
            style={[styles.customMargin, externalStyles.BlueText]}
              onPress={appointments.loadMore}
            >
              See More
            </Text>
          )}
        </View>
      </>
    )
  );
};

export default PastAppointments;
const styles = StyleSheet.create({
  customDivider: {
    marginVertical: 4,
    marginBottom: 12,
  },
  customRowLayout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  customDivider2: {
    marginVertical: 4,
  },
  customMargin: {
    marginBottom: 12,
    marginTop: 8,
  },
});