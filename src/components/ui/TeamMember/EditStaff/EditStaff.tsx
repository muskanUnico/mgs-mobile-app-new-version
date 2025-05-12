import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  Platform,
} from "react-native";
import Button from "../../../../components/elements/Button/Button";
import DynamicTable from "../../../../components/elements/DynamicTable/DynamicTable";
import CustomHeading from "../../../../components/elements/CustomHeading/CustomHeading";
import { styles as externalStyles } from "../../../../assets/css";
import {
  borderColor,
  brandColor,
  brandGreyColor,
  brandPastelColor,
} from "../../../../constants/COLORS";
import { updateMember } from "../../../../hooks/Customer";
import { updateStaffHours } from "../../../../hooks/TeamMembers/StaffHours";
import { getServices } from "../../../../hooks/Services";
import { Service } from "../../../../interface/Service";
import CustomTextArea from "../../../../components/elements/CustomTextArea/CustomTextArea";
import { useTheme } from "../../../../context/ThemeContext";

const EditStaff = ({ user }: any) => {
  let id = user.id;
  let services = user.services;
  let onlineBooking = user.staffHours?.onlineBooking;
  let boi = user.description;

  const [tableFormat, setTableFormat] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    onlineBooking: onlineBooking || false,
    description: boi || "",
  });
  const [rows, setRows] = useState<any[]>([]);
  const [loadTable, setLoadTable] = useState(false);
  const [editData, setEditData] = useState(false);

  //hooks
  const handleUpdateMember = updateMember(id);
  const updateHours = updateStaffHours(id);
  const servicesData = getServices(100);

  function generateSelectedArray(data: Service[], defaults: Service[]) {
    return data.map((item) => ({
      title: item?.title,
      id: item.id,
      selected: defaults.some((defaultItem) => defaultItem.id === item.id),
    }));
  }

  function getSelectedIndices(selectedArray: { selected: boolean }[]) {
    return selectedArray
      .map((item, index) => (item.selected ? index : null))
      .filter((index) => index !== null);
  }

  function getDataByIndices(array: number[]) {
    return array.map((item, index) => servicesData.data[item]);
  }

  useEffect(() => {
    // Fetch data and set states
    if (servicesData.data.length === 0) return;

    // @ts-ignore
    const selected = generateSelectedArray(servicesData.data, services);
    setTableFormat(selected.map((item) => ({ serviceName: item?.title })));

    const rowsData = getSelectedIndices(selected);
    setRows(rowsData);

    setLoadTable(true);
  }, [servicesData.data]);

  const handleSubmit = () => {
    const selectedServices = getDataByIndices(rows).map((item) => item.id);

    if (services.length != rows.length || formData.description != boi) {
      handleUpdateMember.submit({
        description: formData.description,
        services: selectedServices,
      });
    }

    if (formData.onlineBooking != onlineBooking) {
      updateHours.submit({
        onlineBooking: formData.onlineBooking,
        timetable: user.staffHours?.timetable,
      });
    }
  };

  useEffect(() => {
    if (!loadTable) return;

    if (
      formData.onlineBooking != onlineBooking ||
      formData.description != boi ||
      services.length != rows.length
    ) {
      setEditData(true);
    } else {
      setEditData(false);
    }
  }, [formData, onlineBooking, boi, rows, services]);
  const { theme } = useTheme();

  return (
    <View style={externalStyles.card}>
      <View style={{ marginBottom: 12 }}>
        <CustomHeading iconName="edit" text="Edit Staff" />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ marginRight: 16 }}>
          <Switch
            value={formData.onlineBooking}
            onValueChange={(value) =>
              setFormData({ ...formData, onlineBooking: value })
            }
            thumbColor={
              formData.onlineBooking
                ? theme.brandPastelColor
                : theme.brandGreyColor
            }
            trackColor={{ true: theme.brandColor, false: borderColor }}
            style={styles.switch}
          />
        </View>
        <Text style={externalStyles.label}>Bookable by Customers Online</Text>
      </View>
      <Text style={externalStyles.description}>
        When enabled, this staff member will be bookable on all online Booking
        Channels you have turned on. This will not affect your ability to choose
        this person when you create an appointment.
      </Text>
      {formData.onlineBooking && (
        <View style={styles.inputContainer}>
          <Text style={externalStyles.label}>
            Services offered during online booking
          </Text>
          <Text style={externalStyles.description}>
            Customize which services this staff member will offer when clients
            book online. All services will still be available to you when you
            are creating appointments.
          </Text>
          <DynamicTable
            columns={["Select All"]}
            defaultRowSelected={rows}
            data={tableFormat}
            onRowSelect={setRows}
            checkbox
          />
        </View>
      )}
      <View style={styles.inputContainer}>
        <Text style={externalStyles.label}>Description</Text>
        <CustomTextArea
          value={formData.description}
          onChangeText={(text: string) =>
            setFormData({ ...formData, description: text })
          }
          style={styles.textInput}
          placeholder={"Description"}
        />
      </View>

      {editData && (
        <Button
          onPress={handleSubmit}
          loading={
            handleUpdateMember.loading
              ? handleUpdateMember.loading
              : updateHours.loading
          }
          title="update "
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
  },
  button: {
    backgroundColor: "#f59b90",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },

  switch: {
    ...(Platform.OS === "ios" && {
      transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    }),
  },
});

export default EditStaff;
