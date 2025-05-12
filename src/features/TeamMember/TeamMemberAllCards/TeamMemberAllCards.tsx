import React from "react";
import { View } from "react-native";
import { getTeamMembers } from "../../../hooks/TeamMembers";
import Loader from "../../../components/elements/Loader/Loader";
import TeamMemberCard from "../../../components/ui/TeamMember/TeamMemberCard/TeamMemberCard";
import CustomPagination from "../../../components/elements/CustomPagination/CustomPagination";

export const TeamMemberAllCards = () => {
  // data
  const members = getTeamMembers();
  const { data, loading, setPage, res, page, refetch } = members;

  return (
    <View style={{ paddingBottom: 16 }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {data.map((item, index) => {
            return <TeamMemberCard key={index} item={item} index={index} />;
          })}
          <CustomPagination
            gotoPage={setPage}
            totalPage={res.totalPages}
            pageIndex={page}
          />
        </>
      )}
    </View>
  );
};
