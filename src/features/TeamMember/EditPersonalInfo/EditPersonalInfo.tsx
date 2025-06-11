import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../../components/elements/Button/Button";
import CustomColorPicker from "../../../components/elements/ColorPicker/ColorPicker";
import Title from "../../../components/elements/Title/Title";
import WarningModal from "../../../components/elements/WarningModal/WarningModal";
import CreateMemberForm from "../../../components/ui/TeamMember/CreateMemberForm/CreateMemberForm";
import { useTheme } from "../../../context/ThemeContext";
import ColorSelectorfeature from "../../../features/ColorSelectorfeature/ColorSelectorfeature";
import { updateMember } from "../../../hooks/Customer";
import { useUpdateActiveStatus } from "../../../hooks/TeamMembers";

const EditPersonalInfo = ({ navigation, route , personalInfo}: any) => {
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const data = JSON.parse(personalInfo);
  

 
  let defaultValue = {
    name: data?.name,
    email: data?.email,
    telephone: data?.phone || data.telephone,
    teamMemberId: data?.teamMemberId,
    color: data?.color,
  };
  const [formData, setFormData] = useState(defaultValue);
  const [modalOpen, setModalOpen] = useState(false);

  const { handleStatus, loading } = useUpdateActiveStatus();

  const handleDisable = () => {
    handleStatus(data?.id as string, data.active);
  };

  const updateHook = updateMember(data?.id as string );
  const [selectedColor, setSelectedColor] = useState(data?.color);

  const updateState = (data: any) => {
    setFormData((prevState) => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

  const { color } = formData;

  useEffect(() => {
    updateState({ color: selectedColor });
  }, [selectedColor]);

  return (
    <View style={[styles.screen, { backgroundColor: theme.brandWhiteColor }]}>
      <Title navigation={navigation} title="Edit Personal Info" />
      <View style={styles.mx3}>
        <CreateMemberForm formData={formData} setFormData={setFormData} />

        <View style={styles.my2}>
          <View style={[styles.row, styles.mx5, styles.my5]}>
            <Text style={{ fontFamily: "BoldText" }}>
              Your Previous Selected Color
            </Text>

            <View
              style={{
                backgroundColor: data?.color,
                width: 10,
                height: 10,
                borderRadius: 10,
                marginLeft: 8,
              }}
            ></View>
          </View>
          <ColorSelectorfeature updateState={updateState} data={color} />
          <View style={styles.my4}>
            <CustomColorPicker
              setSelectedColor={setSelectedColor}
              selectedColor={selectedColor}
              title="Select Custom Color"
              setShowModal={setShowModal}
              showModal={showModal}
            />
          </View>
        </View>
        <View style={[styles.row, styles.mx7, styles.mb7, styles.mt2]}>
          <Button
            onPress={() => updateHook.submit(formData)}
            loading={updateHook.loading}
            title="Save"
          />
          <View style={styles.ml4}>
            {data.active ? (
              <Button
                loading={false}
                title="Disable"
                onPress={() => setModalOpen(true)}
              />
            ) : (
              <Button
                loading={false}
                title="Enable"
                onPress={() => setModalOpen(true)}
              />
            )}
          </View>
        </View>
      </View>

      <WarningModal
        modalVisible={modalOpen}
        setModalVisible={() => setModalOpen(false)}
        handleLeftbtn={handleDisable}
        handleRightbtn={() => setModalOpen(false)}
        title={"Are you sure !, It is an irreverisble action, Please Confirm!"}
        leftBtnName={"No"}
        rightBtnName={"Yes"}
        loading={!loading}
      />
    </View>
  );
};

export default EditPersonalInfo;
const styles = StyleSheet.create({
  screen: {
    minHeight: "100%",
  },
  mx3: {
    marginHorizontal: 12,
  },
  ml4: {
    marginLeft: 16,
  },
  my2: {
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  mx5: {
    marginHorizontal: 20,
  },
  my5: {
    marginVertical: 20,
  },
  mx7: {
    marginHorizontal: 28,
  },
  mb7: {
    marginBottom: 28,
  },
  mt2: {
    marginTop: 8,
  },
  my4: {
    marginVertical: 16,
  },
});
