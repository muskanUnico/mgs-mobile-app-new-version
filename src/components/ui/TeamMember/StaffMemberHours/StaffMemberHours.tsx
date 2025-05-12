import React from "react";
import { Text, View } from "react-native";
import Button from "../../../elements/Button/Button";
import { convertSchedule } from "../../../../utils/tools";
import { navigate } from "../../../../utils/navigationServices";
import { styles as externalStyles } from "../../../../assets/css";
import CustomHeading from "../../../elements/CustomHeading/CustomHeading";

const StaffMemberHoursCard = ({ user }: any) => {
  let timetable = user.staffHours?.timetable;

  // Convert timetable to a more readable format
  const tableFormat: any = convertSchedule(timetable);
  const table = Object.keys(tableFormat);

  return (
    <View style={externalStyles.card}>
      <CustomHeading iconName="clock-o" text="Team Member Hours" />
      <View style={{ padding: 12 }}>
        {table.map((key, index) => {
          const item = tableFormat[key];
          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text
                style={[{ fontFamily: "Regular", fontSize: 12, width: "20%" }]}
              >
                {key}
              </Text>
              <Text
                style={[{ fontFamily: "Regular", fontSize: 12, width: "75%" }]}
              >
                {item.length > 0 ? (
                  <>{String(item)}</>
                ) : (
                  <Text style={[{ fontFamily: "Regular", color: "#D1D5DB" }]}>
                    None
                  </Text>
                )}
              </Text>
            </View>
          );
        })}
      </View>
      <Button
        onPress={() => navigate("teamMemberHorus", { user })}
        title="Manage team hours"
      />
    </View>
  );
};

export default StaffMemberHoursCard;
