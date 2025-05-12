import React from "react";
import { View } from "react-native";
import CustomerForm from "../CustomerForm/CustomerForm";
import Button from "../../../../components/elements/Button/Button";
import { styles as externalStyles } from "../../../../assets/css";
import CustomBottomSheet from "../../../../components/elements/BottomSheet/CustomBottomSheet";

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
      height={620}
    >
      <View style={[externalStyles.container]}>
        <CustomerForm formData={formData} setFromData={setFromData} />
        <Button loading={!loading} title="Save" onPress={handleSaveCustomer} />
      </View>
    </CustomBottomSheet>
  );
};

export default EditPersonalDetails;
