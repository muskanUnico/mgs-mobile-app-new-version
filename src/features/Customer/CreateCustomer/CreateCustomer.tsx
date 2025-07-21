import React from "react";
import { ScrollView, View } from "react-native";
import Button from "../../../components/elements/Button/Button";
import Title from "../../../components/elements/Title/Title";
import CustomerForm from "../../../components/ui/Customer/CustomerForm/CustomerForm";
import { CreateCustomer } from "../../../hooks/Customer";

const CreateCustomeFeature = ({ navigation }: any) => {
  const { formData, setFromData, submit, loader } = CreateCustomer(navigation);

  const handleSaveCustomer = () => {
    if (!formData?.name?.trim()) {
      alert("Name required");
    } else if (!formData.telephone?.trim()) {
      alert("Phone Number required");
    } else if (!formData.email?.trim()) {
      alert("Phone Number required");
    } else {
      submit();
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 88 }}
      keyboardShouldPersistTaps="handled"
    >
      <Title navigation={navigation} title="Create Customer" />
      <View style={{ marginHorizontal: 16 , flex: 1}}>
        <CustomerForm formData={formData} setFromData={setFromData} />
        <Button onPress={handleSaveCustomer} title="Save" loading={!loader} />
      </View>
    </ScrollView>
  );
};

export default CreateCustomeFeature;
