import Button from "@/src/components/elements/Button/Button";
import { useManageCMS } from "@/src/hooks/CMS";
import CMSProps from "@/src/interface/CMS";
import { cleanText } from "@/src/utils/tools";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

const offerBanner = ({ data }: CMSProps) => {
  const { handleCreate, loading } = useManageCMS();
  const [offerBanner, setOfferBanner] = useState("");

  useEffect(() => {
    setOfferBanner(data?.offer_banner || "");
  }, [data]);

  const handleUpdate = () => {
    if (!offerBanner.trim()) {
      Alert.alert("Offer Banner Required");
    } else {
      handleCreate({ offer_banner: offerBanner });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        value={cleanText(offerBanner)}
        onChangeText={setOfferBanner}
        placeholder="Write here..."
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />

      <View style={styles.buttonWrapper}>
        {loading ? (
          <ActivityIndicator size="small" color="#007bff" />
        ) : (
          <Button title="Update Banner" onPress={handleUpdate} />
        )}
      </View>
    </ScrollView>
  );
};

export default offerBanner;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
    backgroundColor: "#fff",
  },
  buttonWrapper: {
    marginTop: 24,
    alignSelf: "flex-start",
  },
});
