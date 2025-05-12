import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Switch } from "react-native-paper";
import { styles as externalStyles } from "../../../../assets/css";
import CustomInput from "../../../../components/elements/Input";
import Button from "../../../../components/elements/Button/Button";
import CustomTextArea from "../../../../components/elements/CustomTextArea/CustomTextArea";
import CustomDropDown from "../../../../components/elements/CustomDropDown/CustomDropDown";
import { borderColor } from "../../../../constants/COLORS";
import { PermissionAccess } from "../../../../middleware/PermissionAccess";
import { useTheme } from "../../../../context/ThemeContext";

interface ServiceFormProps {
  option: { label: string; value: string }[];
  hours: string;
  setHours: (value: string) => void;
  minutes: string;
  setMinutes: (value: string) => void;
  formData: {
    title: string;
    price: string;
    description: string;
    switchValue: boolean;
    overlap: boolean;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      price: string;
      description: string;
      switchValue: boolean;
      overlap: boolean;
    }>
  >;
  handleSave: () => void;
  handleDelete: () => void;
  optionMinutes: { label: string; value: string }[];
  defaultData: boolean;
  deleteHook: { loading: boolean };
  serviceHook: { loading: boolean };
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  option,
  hours,
  setHours,
  minutes,
  setMinutes,
  formData,
  setFormData,
  handleSave,
  handleDelete,
  optionMinutes,
  defaultData,
  deleteHook,
  serviceHook,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[externalStyles.container]}>
      <View style={{ paddingTop: 8 }}>
        <CustomInput
          placeholder="Title"
          label="Title"
          onChangeText={(text) =>
            setFormData((prevData) => ({ ...prevData, title: text }))
          }
          value={formData.title}
        />
      </View>
      <View style={{ paddingTop: 8, paddingBottom: 8 }}>
        <CustomInput
          placeholder="Price"
          label="Price"
          onChangeText={(text) =>
            setFormData((prevData) => ({ ...prevData, price: text }))
          }
          value={formData.price.toString()}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <View style={{ paddingTop: 8, width: "45%" }}>
          <CustomDropDown
            items={option}
            value={hours}
            setValue={setHours}
            label="Hours"
            placeholder="Hours"
          />
        </View>

        <View style={{ paddingTop: 8, width: "45%" }}>
          <CustomDropDown
            items={optionMinutes}
            value={minutes}
            setValue={setMinutes}
            label="Minutes"
            placeholder="Minutes"
          />
        </View>
      </View>

      <CustomTextArea
        label={"Description"}
        onChangeText={(text: string) =>
          setFormData((prevData) => ({
            ...prevData,
            description: text,
          }))
        }
        value={formData.description}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.brandColor }}>Active</Text>

        <Switch
          value={formData.switchValue}
          onValueChange={() =>
            setFormData((prevData) => ({
              ...prevData,
              switchValue: !formData.switchValue,
            }))
          }
          thumbColor={
            formData.switchValue ? theme.brandPastelColor : theme.brandGreyColor
          }
          trackColor={{ true: theme.brandColor, false: borderColor }}
          style={styles.switch}
        />
      </View>
      <Text style={[externalStyles.label]}>
        Choose whether this service is active or inactive for booking online by
        the customer
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.brandColor }}>
          Overlapping service availability
        </Text>

        <Switch
          value={formData.overlap}
          onValueChange={() =>
            setFormData((prevData) => ({
              ...prevData,
              overlap: !formData.overlap,
            }))
          }
          thumbColor={
            formData.overlap ? theme.brandPastelColor : theme.brandGreyColor
          }
          trackColor={{ true: theme.brandColor, false: borderColor }}
          style={styles.switch}
        />
      </View>

      <Text style={[externalStyles.label]}>
        Choose whether this service Overlapping service
      </Text>

      <View style={{ flexDirection: "row", paddingVertical: 8 }}>
        <View style={{ marginRight: 8 }}>
          <Button
            title="Save"
            loading={serviceHook.loading}
            onPress={handleSave}
          />
        </View>
        <PermissionAccess requiredPermissions={["delete_service"]}>
          {defaultData && (
            <Button
              title="Delete"
              loading={deleteHook.loading}
              onPress={handleDelete}
            />
          )}
        </PermissionAccess>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  switch: {
    ...(Platform.OS === "ios" && {
      transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    }),
  },
});

export default ServiceForm;
