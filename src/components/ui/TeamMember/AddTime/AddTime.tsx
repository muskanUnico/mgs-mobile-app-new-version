import React from "react";
import { Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import CustomTimePicker from "../../../../components/elements/CustomTimePicker/CustomTimePicker";
import StandardInput from "../../../../components/elements/StandardInput/StandardInput";
import Button from "../../../../components/elements/Button/Button";
import { styles as externalStyles } from "../../../../assets/css";
import {
  brandBlackColor,
  brandColor,
  iconColor1,
  iconColor3,
} from "../../../../constants/COLORS";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../../../context/ThemeContext";

export const AddTime = ({
  setFields,
  fields,
  handleSubmitbtn,
  loading,
  activebtn,
}: any) => {
  const handleTimeChange = (
    index: number,
    time: string,
    isStartTime: boolean
  ) => {
    setFields((prevFields: any) => {
      const updatedFields = [...prevFields];
      if (isStartTime) {
        updatedFields[index] = {
          ...updatedFields[index],
          startTime: time,
        };
      } else {
        updatedFields[index] = {
          ...updatedFields[index],
          endTime: time,
        };
      }
      return updatedFields;
    });
  };

  const handleWorkTypeChange = (index: number, value: string) => {
    setFields((prevFields: any) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = { ...updatedFields[index], workedType: value };
      return updatedFields;
    });
  };

  const handleReferenceChange = (index: number, value: string) => {
    setFields((prevFields: any) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = { ...updatedFields[index], reference: value };
      return updatedFields;
    });
  };

  const handleAddField = () => {
    const lastField = fields[fields.length - 1];
    const newStartTime = new Date(lastField.endTime);
    const newEndTime = new Date(newStartTime.getTime() + 60 * 60 * 1000);

    setFields((prevFields: any) => [
      ...prevFields,
      {
        startTime: newStartTime,
        endTime: newEndTime,
        workedType: "Appointment",
        reference: "",
        duration: 60,
      },
    ]);
  };

  const handleRemoveField = (index: number) => {
    if (fields.length == 1) {
      return;
    }
    setFields((prevFields: any) => {
      const updatedFields = [...prevFields];
      updatedFields.splice(index, 1);
      return updatedFields;
    });
  };
  const { theme } = useTheme();

  return (
    <>
      {fields.map((field: any, index: any) => (
        <View
          key={index}
          style={[externalStyles.pinkcard, { marginBottom: 12 }]}
        >
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Entypo
              name="cross"
              size={24}
              onPress={() => handleRemoveField(index)}
              color={theme.brandBlackColor}
            />
            {index === fields.length - 1 && (
              <Entypo
                onPress={handleAddField}
                name="plus"
                size={24}
                color={theme.brandColor}
              />
            )}
          </View>
          <View style={{ flexDirection: "row" }}>
            <View>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="clock"
                  style={[externalStyles.iconColorStyle, { color: iconColor1 }]}
                />
                <Text
                  style={[
                    externalStyles.label,
                    { marginRight: 20, marginBottom: 4 },
                  ]}
                >
                  Start Time
                </Text>
              </View>
              <View style={{ marginLeft: 24 }}>
                <CustomTimePicker
                  setTime={(time: string) =>
                    handleTimeChange(index, time, true)
                  }
                  time={field.startTime}
                  timeformate={"hh:mm A"}
                />
              </View>
            </View>
            <View style={{ marginLeft: 24 }}>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="clock-check"
                  style={[externalStyles.iconColorStyle, { color: iconColor3 }]}
                />
                <Text
                  style={[
                    externalStyles.label,
                    { marginRight: 20, marginBottom: 4 },
                  ]}
                >
                  End Time{" "}
                </Text>
              </View>
              <View style={{ marginLeft: 24 }}>
                <CustomTimePicker
                  setTime={(time: string) =>
                    handleTimeChange(index, time, false)
                  }
                  time={field.endTime}
                  timeformate={"hh:mm A"}
                />
              </View>
            </View>
          </View>
          <View
            style={{ marginHorizontal: 16, marginBottom: 12, marginTop: 16 }}
          >
            <StandardInput
              label="Task"
              placeholder="Task"
              value={field.workedType}
              onChangeText={(text: string) => handleWorkTypeChange(index, text)}
            />
            <View style={{ marginTop: 16 }}>
              <StandardInput
                placeholder="Reference"
                label="Reference"
                value={field.reference}
                onChangeText={(text: string) =>
                  handleReferenceChange(index, text)
                }
              />
            </View>
          </View>
        </View>
      ))}

      <View style={{ marginTop: 12 }}>
        <Button title="Submit" onPress={handleSubmitbtn} loading={!loading} />
      </View>
    </>
  );
};
