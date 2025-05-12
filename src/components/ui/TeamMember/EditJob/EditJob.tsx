import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../../elements/Button/Button";
import { updateMember } from "../../../../hooks/Customer";
import StandardInput from "../../../elements/StandardInput/StandardInput";
import CustomDropDown from "../../../elements/CustomDropDown/CustomDropDown";

export const EditJob = ({ user, title }: any) => {
  const [selectedItem, setSelectedItem] = useState("none");
  const handleUpdateMember = updateMember(user.id);

  // drop down
  const [form, setForm] = useState({
    jobId: title,
    wages: user?.wages,
  });

  // Sample data to pass to the DropDownSelect component
  let dropdownData = [
    {
      label: "Team Member",
      value: "team-member",
    },
    {
      label: "Technician",
      value: "technician",
    },
  ];

  useEffect(() => {
    if (selectedItem != "none") {
      setForm((pre) => ({
        ...pre,
        jobId: selectedItem,
      }));
    }
  }, [selectedItem]);

  // remove if title matched with dropdownData data title
  dropdownData = dropdownData.filter((item) => item.label !== title);

  const handleUpadate = () => {
    if (!form.jobId?.trim()) {
      alert("Primary Job Required");
    } else if (form.jobId == "none") {
      alert("Primary Job Required");
    } else {
      handleUpdateMember.submit(form);
    }
  };

  return (
    <>
      <CustomDropDown
        label="Primary Job"
        items={dropdownData}
        value={selectedItem}
        setValue={setSelectedItem}
        placeholder={title}
      />
      <View style={{ marginHorizontal: 8, marginVertical: 24 }}>
        <StandardInput
          placeholder="Wages per hour - 20"
          label="Wages per hour"
          onChangeText={(text: any) =>
            setForm((pre) => ({ ...pre, wages: text }))
          }
          value={form?.wages?.toString()}
        />
      </View>
      <Button
        loading={handleUpdateMember.loading}
        onPress={handleUpadate}
        title="Save"
      />
    </>
  );
};
