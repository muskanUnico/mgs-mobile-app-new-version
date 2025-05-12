import React, { useState } from "react";
import { View } from "react-native";
import Tabs from "../../components/elements/Tabs/Tabs";
import { MyProfile } from "./MyProfile";
import MyPayroll from "./MyPayroll";

export const MyProfileFeature = () => {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const tabs = [
    { id: 1, label: "My Profile" },
    { id: 2, label: "My Payroll" },
  ];

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 16,
          marginVertical: 16,
        }}
      >
        <Tabs
          tabs={tabs}
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
        />
      </View>
      {selectedTab == 1 && <MyProfile />}
      {selectedTab == 2 && (
        <View>
          <MyPayroll />
        </View>
      )}
    </>
  );
};

export default MyProfileFeature;
