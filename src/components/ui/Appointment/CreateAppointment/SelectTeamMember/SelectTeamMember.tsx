import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../../../elements/Button/Button";
import CustomModal from "../../../../elements/CustomModal/CustomModal";
import CustomDropDown from "../../../../elements/CustomDropDown/CustomDropDown";

interface SelectTeamMemberProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setData?: any;
  data?: any;
  submit: () => void;
  options: any;
}

const SelectTeamMember = ({
  // open dropdown,
  setOpen,
  open,

  //
  setData,
  data,

  options,
  submit,
}: SelectTeamMemberProps) => {
  return (
    <CustomModal
      text="select team member"
      modalVisible={open}
      setModalVisible={setOpen}
    >
      <CustomDropDown
        items={options}
        value={data}
        setValue={setData}
        label="Team Member"
        placeholder="Select Team Member"
      />
      <View style={styles.rowJustifyBetween}>
        <Button loading={false} title="Cancel" onPress={() => setOpen(false)} />
        <Button title="Save" loading={false} onPress={submit} />
      </View>
    </CustomModal>
  );
};

export default SelectTeamMember;
const styles = StyleSheet.create({
  rowJustifyBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
  },
});
