//@ts-nocheck
import React from "react";
import { View } from "react-native";
import Title from "../../../components/elements/Title/Title";
import { getSingleMember } from "../../../hooks/TeamMembers";
import Loader from "../../../components/elements/Loader/Loader";
import EditStaff from "../../../components/ui/TeamMember/EditStaff/EditStaff";
import JobInfoCard from "../../../components/ui/TeamMember/JobInfoCard/JobInfoCard";
import PersonalInfoCard from "../../../components/ui/TeamMember/ PersonalInfo/PersonalInfo";
import PermissionInfoCard from "../../../components/ui/TeamMember/PermissionInfo/PermissionInfo";
import TeamMemberLeaveCard from "../../../components/ui/TeamMember/TeamMemberLeave/TeamMemberLeave";
import StaffMemberHoursCard from "../../../components/ui/TeamMember/StaffMemberHours/StaffMemberHours";

export const ViewTeamMember = ({ navigation, route }: any) => {
  let memberDetail = getSingleMember(route.params.memberId);
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
        <View style={{ paddingBottom: 128 }}>
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
