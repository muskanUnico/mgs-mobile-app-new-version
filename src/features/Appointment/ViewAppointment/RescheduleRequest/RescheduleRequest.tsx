//@ts-nocheck
import { Entypo, FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { styles as externalStyles } from "../../../../assets/css";
import Button from "../../../../components/elements/Button/Button";
import CustomTextArea from "../../../../components/elements/CustomTextArea/CustomTextArea";
import Title from "../../../../components/elements/Title/Title";
import {
  iconCalenderColor
} from "../../../../constants/COLORS";
import { useTheme } from "../../../../context/ThemeContext";
import {
  getAppointmentById,
  useCreateChangeRequest,
} from "../../../../hooks/Appointment";

const RescheduleRequest = ({ navigation, route ,id}: any) => {
  const { theme } = useTheme();
  const singleAppointment = getAppointmentById(id);
  const [value, setValue] = useState("");

  const { handleSubmitComment, loading } = useCreateChangeRequest(
    id,
    singleAppointment.refetch,
    setValue,
    value
  );

  const screenHeight = singleAppointment.data?.reschedule?.comments.length;

  return (
    <View
      style={{ backgroundColor: theme.brandGreyColor, minHeight: screenHeight }}
    >
      <Title navigation={navigation} title="Reschedule Request" />
      <View style={[externalStyles.container]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
          <FontAwesome
            name="comments"
            style={[externalStyles.iconColorStyle, { color: theme.brandColor }]}
          />
          <Text
            style={[
              { color: theme.brandColor, fontFamily: "BoldText", fontSize: 16 },
            ]}
          >
            Comments
          </Text>
        </View>
        {singleAppointment.data?.reschedule?.comments.length > 0 ? (
          singleAppointment.data?.reschedule?.comments.map(
            (item: any, index: number) => {
              return (
                <View
                  style={{ paddingVertical: 8, marginHorizontal: 8 }}
                  key={index}
                >
                  <View style={styles.rowCentered}>
                    <Entypo
                      name="calendar"
                      style={[
                        externalStyles.iconColorStyle,
                        { color: iconCalenderColor },
                      ]}
                    />
                    <Text style={[externalStyles.label]}>
                      {moment(item.date).format("DD MMM YYYY ")}
                    </Text>
                  </View>
                  <Text style={[externalStyles.content]}>{item.comment}</Text>
                </View>
              );
            }
          )
        ) : (
          <Text
            style={[
              externalStyles.content,
              { fontFamily: "Regular", marginHorizontal: 20 },
            ]}
          >
            No comments available.
          </Text>
        )}

        <View style={{ paddingVertical: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome
              name="comment"
              style={[
                externalStyles.iconColorStyle,
                { color: theme.brandColor },
              ]}
            />
            <Text
              style={[
                {
                  color: theme.brandColor,
                  fontFamily: "BoldText",
                  fontSize: 16,
                },
              ]}
            >
              New Comments
            </Text>
          </View>
          <CustomTextArea
            value={value}
            placeholder={"Add Your Comment here..."}
            onChangeText={(text: any) => setValue(text)}
            rows={5}
          />
        </View>

        <View style={{ marginVertical: 16, alignItems: "center" }}>
          <Button
            loading={loading}
            onPress={() => handleSubmitComment()}
            title="Submit"
          />
        </View>
      </View>
    </View>
  );
};

export default RescheduleRequest;
const styles = StyleSheet.create({
  rowCentered: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
});
