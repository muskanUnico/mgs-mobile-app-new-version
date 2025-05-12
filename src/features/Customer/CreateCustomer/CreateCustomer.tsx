import React from "react";
import { View } from "react-native";
import { CreateCustomer } from "../../../hooks/Customer";
import Title from "../../../components/elements/Title/Title";
import Button from "../../../components/elements/Button/Button";
import CustomerForm from "../../../components/ui/Customer/CustomerForm/CustomerForm";

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
    <View style={{ minHeight: "100%" }}>
      <Title navigation={navigation} title="Create Customer" />
      <View style={{ marginHorizontal: 16 }}>
        <CustomerForm formData={formData} setFromData={setFromData} />
        <Button onPress={handleSaveCustomer} title="Save" loading={!loader} />
      </View>
    </View>
  );
};

export default CreateCustomeFeature;
