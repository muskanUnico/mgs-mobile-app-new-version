import React from "react";
import moment from "moment";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { navigate } from "../../../../utils/navigationServices";
import { styles as externalStyles } from "../../../../assets/css";
import Button from "../../../../components/elements/Button/Button";
import { getUpcomingAppointments } from "../../../../hooks/Customer";
import { areAllElementsUnique, formatTime } from "../../../../utils/tools";
import { PermissionAccess } from "../../../../middleware/PermissionAccess";
import CustomHeading from "../../../../components/elements/CustomHeading/CustomHeading";

const UpcomingAppointments = ({ customerId }: any) => {
  const appointments = getUpcomingAppointments(customerId);

  return (
    <>
      <View style={[externalStyles.card]}>
        <CustomHeading iconName="calendar" text="Upcoming Appointments" />

        <Divider style={styles.customDivider} />

        {appointments.data.results.map((item, index) => {
          const formattedDate = moment(item.date).format("ddd, DD MMM YYYY");
          const startTime = formatTime(item.start_time_range);

          const title: any[] = item.bookings.map(
            (book: any) => book.serviceName
          );

          const memberIds = item.bookings.map((book: any) => book.teamMemberId);
          const member =
            memberIds.length > 1 && areAllElementsUnique(memberIds)
              ? "multiple"
              : "single";
          return (
            <View key={index} style={styles.topSpacing}>
              {title.map((tit, index) => (
                <Text key={index} style={[externalStyles.label]}>
                  {index} {tit}
                </Text>
              ))}

              <View style={styles.rowLayout}>
                <View>
                  <Text style={[externalStyles.content]}>
                    {formattedDate} {startTime}
                  </Text>
                  <Text style={[externalStyles.content]}>
                    with {member} staff members
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => navigate(`ViewAppointment`, { id: item?.id })}
                >
                  <MaterialIcons
                    name="notes"
                    style={[externalStyles.iconStyle]}
                  />
                </TouchableOpacity>
              </View>
              <Divider style={styles.customDivider} />
            </View>
          );
        })}

        {appointments.showLoadMore && (
          <Text
            style={[styles.topBottomSpacing, externalStyles.BlueText]}
            onPress={appointments.loadMore}
          >
            See More
          </Text>
        )}

        <PermissionAccess requiredPermissions={["create_appointments"]}>
          <View style={{ paddingTop: 5, marginBottom: 8 }}>
            <Button
              title={"book appointment"}
              onPress={() => navigate(`CreateAppointment`)}
            />
          </View>
        </PermissionAccess>
      </View>
    </>
  );
};
export default UpcomingAppointments;
const styles = StyleSheet.create({
  customDivider: {
    marginVertical: 4,
  },
  topSpacing: {
    marginTop: 8,
  },
  topBottomSpacing: {
    marginTop: 8,
    marginBottom: 12,
  },
  rowLayout: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
});
