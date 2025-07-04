import React, { useState } from "react";
import { View } from "react-native";
import Tabs from "../../components/elements/Tabs/Tabs";
import { useGetCMS } from "../../hooks/CMS";
import Colorsfeature from "./Colorsfeature";
import Logofeature from "./Logofeature";
import OfferBanner from "./OfferBanner";
import Policy from "./Policy";
import Taxfeature from "./Taxfeature";

export const CmsFeature = () => {
  const { data } = useGetCMS();
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const tabs = [
    { id: 1, label: "Logo" },
    { id: 2, label: "Tax" },
    { id: 3, label: "Colors" },
    { id: 4, label: "Offer Banner" },
    { id: 5, label: "Policy" },
  ];

  return (
    <>
      <View style={{ marginHorizontal: 16 }}>
        <Tabs
          tabs={tabs}
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
        />
      </View>
      <View>
        {selectedTab === 1 && (
          <View style={{ marginHorizontal: 24, marginTop: 4 }}>
            <Logofeature />
          </View>
        )}
        {selectedTab === 2 && (
          <View style={{ marginHorizontal: 20, marginTop: 4 }}>
            <Taxfeature />
          </View>
        )}
        {selectedTab === 3 && (
          <View style={{ marginTop: 4 }}>
            <Colorsfeature />
          </View>
        )}
        {selectedTab === 4 && (
          <View>
            <OfferBanner data={data} />
          </View>
        )}
        {selectedTab === 5 && (
          <View>
            <Policy data={data} />
          </View>
        )}
      </View>
    </>
  );
};

export default CmsFeature;
