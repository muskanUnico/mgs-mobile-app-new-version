import React, { useState } from "react";
import { View } from "react-native";
import Tabs from "../../components/elements/Tabs/Tabs";
import { TermsAndConditions } from "./T&C";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { BookingPolicy } from "./BookingPolicy";
import { Refunds } from "./Refunds";

export const Policy = ({ data }) => {
    const [selectedTab, setSelectedTab] = useState(1);
    const tabs = [
        { id: 1, label: "T&C" },
        { id: 2, label: "Privacy Policy" },
        { id: 3, label: "Booking Policy" },
        { id: 4, label: "Refunds & Cancellation Plocy" },
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
                        <TermsAndConditions data={data} />
                    </View>
                )}
                {selectedTab === 2 && (
                    <View style={{ marginHorizontal: 20, marginTop: 4 }}>
                        <PrivacyPolicy data={data} />
                    </View>
                )}
                {selectedTab === 3 && (
                    <View style={{ marginTop: 4 }}>
                        <BookingPolicy data={data} />
                    </View>
                )}
                {selectedTab === 4 && (
                    <View>
                        <Refunds data={data} />
                    </View>
                )}
            </View>
        </>
    );
};

export default Policy;
