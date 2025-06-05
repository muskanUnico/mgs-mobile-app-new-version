import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles as externalStyles } from "../../../../assets/css";
import Button from "../../../../components/elements/Button/Button";
import CustomDropdown from "../../../../components/elements/CustomDropDown/CustomDropDown";
import CustomHeading from "../../../../components/elements/CustomHeading/CustomHeading";
import CustomModal from "../../../../components/elements/CustomModal/CustomModal";
import StandardInput from "../../../../components/elements/StandardInput/StandardInput";
import { updateMember } from "../../../../hooks/TeamMembers";

const JobInfoCard = ({ user }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const router= useRouter();
  const handleOpenModel = () => {
    setTimeout(() => {
      setModalVisible(true);
    }, 1000);
  };

  const [selectedItem, setSelectedItem] = useState("none");
  const handleUpdateMember = updateMember(user.id);

  // drop down
  const [form, setForm] = useState({
    jobId: user?.jobRole?.title,
    wages: user?.wages,
  });

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
  dropdownData = dropdownData.filter(
    (item) => item.label !== user?.jobRole?.title
  );

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
      <View style={externalStyles.card}>
        <View style={styles.headerContainer}>
          <CustomHeading iconName="briefcase" text="Job and Compensation" />

          <TouchableOpacity onPress={() => handleOpenModel()}>
            <Text style={externalStyles.BlueText}>EDIT </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          <TouchableOpacity onPress={() => handleOpenModel()}>
            <Text style={[externalStyles.label, { marginBottom: 8 }]}>
              PRIMARY JOB
            </Text>
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>
                {user?.jobRole?.title || "NONE"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.infoTextContainer}>
          <Text style={externalStyles.description}>
            Add wages to track pay, commission, view sales vs labor reports, and
            calculate overtime cost
          </Text>
        </View>

        {!user?.wages && (
          <View style={styles.buttonContainer}>
            <Button
              loading={false}
              title={`Assign Wage to ${user?.name}`}
              onPress={() => handleOpenModel()}
            />
          </View>
        )}

        {user?.wages && (
          <View style={styles.buttonContainer}>
            <Button
              loading={false}
              onPress={() => handleOpenModel()}
              title={`${user?.wages || 0}$ per hour`}
            />
          </View>
        )}

        <TouchableOpacity
          onPress={() => router.push("/managePayroll")}
          style={styles.managePayrollLink}
        >
          <Text
            style={[
              externalStyles.BlueText,
              { textDecorationLine: "underline" },
            ]}
          >
            Manage Payroll
          </Text>
        </TouchableOpacity>
      </View>

      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text="Edit Job and Compensation"
      >
        {/* <EditJob
          title={user?.jobRole?.title}
          user={user}
          setModalVisible={setModalVisible}
          memberDetail={memberDetail}
        /> */}

        <CustomDropdown
          label="Primary Job"
          items={dropdownData}
          value={selectedItem}
          setValue={setSelectedItem}
          placeholder={user?.jobRole?.title}
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
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },

  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  tagContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f59b90",
    borderRadius: 15,
  },
  tagText: {
    fontSize: 12,
    color: "white",
    fontFamily: "BoldText",
  },
  infoTextContainer: {
    marginTop: 15,
  },
  infoText: {
    fontSize: 13,
    color: "#666666",
    fontFamily: "Regular",
  },
  buttonContainer: {
    marginTop: 12,
  },
  wageButton: {
    width: "auto",
  },

  managePayrollLink: {
    marginTop: 12,
  },
  managePayrollText: {
    color: "#0066FF",
    textDecorationLine: "underline",
    fontFamily: "Regular",
  },
});

export default JobInfoCard;
