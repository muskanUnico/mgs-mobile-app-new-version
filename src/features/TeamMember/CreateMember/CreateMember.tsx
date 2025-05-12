import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createMember } from "../../../hooks/Customer";
import { styles as externalStyles } from "../../../assets/css";
import Button from "../../../components/elements/Button/Button";
import SelectRole from "../../../components/ui/TeamMember/SelectRole/SelectRole";
import CustomColorPicker from "../../../components/elements/ColorPicker/ColorPicker";
import CustomHeading from "../../../components/elements/CustomHeading/CustomHeading";
import CreateMemberForm from "../../../components/ui/TeamMember/CreateMemberForm/CreateMemberForm";
import ColorSelectorfeature from "../../../features/ColorSelectorfeature/ColorSelectorfeature";

const CreateMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    email: "",
    teamMemberId: "",
    color: "#fff",
  });
  const createMemberHooks = createMember();
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [showModal, setShowModal] = useState(false);

  const updateState = (data: any) => {
    setFormData((prevState) => ({ ...prevState, ...data }));
  };
  const { color } = formData;

  useEffect(() => {
    updateState({ color: selectedColor });
  }, [selectedColor, showModal]);

  return (
    <>
      <View style={styles.mx2}>
        <CreateMemberForm formData={formData} setFormData={setFormData} />

        <View style={[externalStyles.container, styles.mt2]}>
          <View style={styles.mb2}>
            <CustomHeading iconName="calendar" text="Permission set" />
          </View>
          <SelectRole
            setRole={(role: any) => setFormData((old) => ({ ...old, role }))}
          />
        </View>
        <View style={styles.mt3}>
          <ColorSelectorfeature updateState={updateState} data={color} />

          <View style={styles.my3}>
            <CustomColorPicker
              handleSelectedColor={setSelectedColor}
              selectedColor={selectedColor}
              title="Select Custom Color"
              setShowModal={setShowModal}
              showModal={showModal}
            />
          </View>
        </View>
        <View style={[styles.mt2, styles.mx4]}>
          <Button
            onPress={() => createMemberHooks.submit(formData)}
            loading={createMemberHooks.loading}
            title="Save"
          />
        </View>
      </View>
    </>
  );
};

export default CreateMember;
const styles = StyleSheet.create({
  mb2: {
    marginBottom: 8,
  },
  my3: {
    marginVertical: 12,
  },
  mt2: {
    marginTop: 8,
  },
  mx4: {
    marginHorizontal: 16,
  },
  mx2: {
    marginHorizontal: 8,
  },
  mt3: {
    marginTop: 12,
  },
});
