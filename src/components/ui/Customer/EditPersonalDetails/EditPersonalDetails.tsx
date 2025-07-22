import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { styles as externalStyles } from "../../../../assets/css";
import CustomBottomSheet from "../../../../components/elements/BottomSheet/CustomBottomSheet";
import Button from "../../../../components/elements/Button/Button";
import CustomerForm from "../CustomerForm/CustomerForm";

const EditPersonalDetails = ({
  formData,
  setFromData,
  bottomSheetRef,
  handleSaveCustomer,
  loading,
}: any) => {
  return (
    <CustomBottomSheet
      bottomSheetRef={bottomSheetRef}
      text="Edit Details"
      height={670}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} 
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 180 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[externalStyles.wrapper, { flex: 1 }]}>
            <CustomerForm formData={formData} setFromData={setFromData} />
            <Button
              loading={!loading}
              title="Save"
              onPress={handleSaveCustomer}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </CustomBottomSheet>
  );
};
``;
export default EditPersonalDetails;
