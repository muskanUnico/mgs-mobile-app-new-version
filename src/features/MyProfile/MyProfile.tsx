import React from "react";
import { ScrollView } from "react-native";
import ServicesProvided from "./ServiceProvided";
import { useAuth } from "../../context/AuthContext";
import PersonalInfoCard from "../../components/ui/TeamMember/ PersonalInfo/PersonalInfo";
import JobInfoCard from "../../components/ui/TeamMember/JobInfoCard/JobInfoCard";
import PermissionInfoCard from "../../components/ui/TeamMember/PermissionInfo/PermissionInfo";
import StaffMemberHoursCard from "../../components/ui/TeamMember/StaffMemberHours/StaffMemberHours";

export const MyProfile = () => {
  const { user } = useAuth();

  return (
    <ScrollView>
      <PersonalInfoCard data={user} isDelete={false} />
      <PermissionInfoCard
        data={user}
        role={user.role}
        memberId={user.id}
        isEdit={false}
      />
      <JobInfoCard user={user} />
      <ServicesProvided user={user} />
      <StaffMemberHoursCard user={user} />
    </ScrollView>
  );
};

export default MyProfile;
