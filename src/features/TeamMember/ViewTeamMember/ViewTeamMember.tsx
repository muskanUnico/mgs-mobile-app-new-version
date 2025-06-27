//@ts-nocheck
import React from "react";
import { View } from "react-native";
import Loader from "../../../components/elements/Loader/Loader";
import Title from "../../../components/elements/Title/Title";
import PersonalInfoCard from "../../../components/ui/TeamMember/ PersonalInfo/PersonalInfo";
import EditStaff from "../../../components/ui/TeamMember/EditStaff/EditStaff";
import JobInfoCard from "../../../components/ui/TeamMember/JobInfoCard/JobInfoCard";
import PermissionInfoCard from "../../../components/ui/TeamMember/PermissionInfo/PermissionInfo";
import StaffMemberHoursCard from "../../../components/ui/TeamMember/StaffMemberHours/StaffMemberHours";
import TeamMemberLeaveCard from "../../../components/ui/TeamMember/TeamMemberLeave/TeamMemberLeave";
import { getSingleMember } from "../../../hooks/TeamMembers";

export const ViewTeamMember = ({ navigation, route , memberId}: any) => {
  let memberDetail = getSingleMember(memberId);
  // console.log(memberDetail)
  const user = memberDetail.data;

  const data = {
    permissionSet: user?.role?.title,
    access: "All access points",
    passcode: "Show Passcode",
    permissions: "View Access",
  };

  return (
    <>
      {memberDetail.loading ? (
        <Loader />
      ) : (
        <View style={{ paddingBottom: 60 }}>
          <Title navigation={navigation} title={`${user.name}`} />
          <PersonalInfoCard data={user} isDelete={true} />
          <PermissionInfoCard
            data={data}
            role={user?.role}
            memberId={user.id}
            isEdit={true}
          />
          <JobInfoCard user={user} memberDetail={memberDetail} />
          <EditStaff user={user} />
          <StaffMemberHoursCard user={user} />
          <TeamMemberLeaveCard user={user} />
        </View>
      )}
    </>
  );
};
