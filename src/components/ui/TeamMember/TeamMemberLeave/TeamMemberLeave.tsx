import { useRouter } from "expo-router";
import moment from "moment";
import React from "react";
import { Text, View } from "react-native";
import { styles as externalStyles } from "../../../../assets/css";
import { useLeaveDatesTeamMember } from "../../../../hooks/LeaveCalender/LeaveRequest";
import Button from "../../../elements/Button/Button";
import CustomHeading from "../../../elements/CustomHeading/CustomHeading";

const TeamMemberLeaveCard = ({ user }: any) => {
  const { dates } = useLeaveDatesTeamMember(user?.id);
  const router = useRouter();
  return (
    <View style={externalStyles.card}>
      <CustomHeading iconName="suitcase" text="Team Member Leave" />
      <View style={{ marginTop: 8, marginBottom: 20, marginHorizontal: 12 }}>
        {dates?.map((item, index) => {
          return (
            <Text key={index} style={{ marginTop: 8, fontFamily: "Regular" }}>
              {moment(item).format("DD MMM YYYY")}
            </Text>
          );
        })}
      </View>
      <Button title="Manage leave" onPress={() => router.push("/(stack)/leaveCalender")} />
    </View>
  );
};

export default TeamMemberLeaveCard;
