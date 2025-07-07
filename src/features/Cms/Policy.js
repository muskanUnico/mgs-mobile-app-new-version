import Button from "@/src/components/elements/Button/Button";
import { useManageCMS } from "@/src/hooks/CMS";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import Tabs from "../../components/elements/Tabs/Tabs";
import { BookingPolicy } from "./BookingPolicy";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { Refunds } from "./Refunds";
import { TermsAndConditions } from "./T&C";

export const Policy = ({ data }) => {
  const { handleCreate, loading } = useManageCMS();
  const [selectedTab, setSelectedTab] = useState(1);
  const tabs = [
    { id: 1, label: "T&C" },
    { id: 2, label: "Privacy Policy" },
    { id: 3, label: "Booking Policy" },
    { id: 4, label: "Refunds & Cancellation Policy" },
  ];
  const [textAreas, setTextAreas] = useState({
    tc: "",
    privacy: "",
    book: "",
    cancel: "",
  });

useFocusEffect(
  useCallback(() => {
    if (!data?.policy) return;

    setTextAreas({
      tc: data.policy.termsAndConditions || "",
      privacy: data.policy.privacyPolicy || "",
      book: data.policy.bookingPolicy || "",
      cancel: data.policy.refundsAndCancellationPolicy || "",
    });
  }, [data])
);

  const handleTextAreaChange = (key: string, value: string) => {
    setTextAreas((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const handleSave = () => {
    const policy = {
      termsAndConditions: textAreas.tc,
      privacyPolicy: textAreas.privacy,
      bookingPolicy: textAreas.book,
      refundsAndCancellationPolicy: textAreas.cancel,
    };
    if (!textAreas.tc.trim()) {
      Alert.alert("T&C Required");
    } else {
      handleCreate({ policy });
    }
  };

  return (
    <View style={{ flex: 1}}>
      <View style={{ marginHorizontal: 16 }}>
        <Tabs
          tabs={tabs}
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
        />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom:140 }}
          keyboardShouldPersistTaps="handled"
        >
          {selectedTab === 1 && (
            <View style={{ marginHorizontal: 10, marginTop: 4 }}>
              <TermsAndConditions
                value={textAreas.tc}
                onChangeText={(text) => handleTextAreaChange("tc", text)}
              />
            </View>
          )}
          {selectedTab === 2 && (
            <View style={{ marginHorizontal: 10, marginTop: 4 }}>
              <PrivacyPolicy
                value={textAreas.privacy}
                onChangeText={(text) => handleTextAreaChange("privacy", text)}
              />
            </View>
          )}
          {selectedTab === 3 && (
            <View style={{marginHorizontal:10, marginTop: 4 }}>
              <BookingPolicy  value={textAreas.book}
                onChangeText={(text) => handleTextAreaChange("book", text)} />
            </View>
          )}
          {selectedTab === 4 && (
            <View style={{marginHorizontal:10, marginTop: 4 }}>
              <Refunds  value={textAreas.cancel}
                onChangeText={(text) => handleTextAreaChange("cancel", text)} />
            </View>
          )}

          <View style={{ margin: 34, paddingTop: 10 }}>
            <Button loading={loading} onPress={handleSave} title="Save" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Policy;
