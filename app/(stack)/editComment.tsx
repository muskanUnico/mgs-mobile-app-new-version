import EditCommentFeature from "@/src/features/Appointment/ViewAppointment/EditCommentFeature/EditCommentFeature";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const EditCommentScreen = ({ navigation, route }: any) => {
  const { item } = useLocalSearchParams();

  const parsedItem =
    typeof item === "string" ? JSON.parse(item) : JSON.parse(item[0]);

  return (
    // <GlobalLoader>
  
    <ScrollView style={{flex:1}}>
      <KeyboardAvoidingView style={{ flex: 1 }}     behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={100}>
      <SafeAreaView style={{ minHeight: 1 * SCREEN_HEIGHT}}>
        <EditCommentFeature
          route={route}
          navigation={navigation}
          item={parsedItem}
        />
      </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>
    // </GlobalLoader>
  );
};

export default EditCommentScreen;
