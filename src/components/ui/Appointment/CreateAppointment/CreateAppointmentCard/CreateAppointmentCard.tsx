import React, { useState } from "react";
import CustomInput from "../../../../elements/Input";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { styles as externalStyles } from "../../../../../assets/css";
import { convertOppositeOfMinutesOrTime } from "../../../../../utils/tools";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  iconCalenderColor,
  iconColor1,
  iconPhoneColor,
} from "../../../../../constants/COLORS";
import CustomDuration from "../../../../../features/Appointment/CreateAppointment/CustomDuration";

const CreateAppointmentCard = ({
  item,
  handleRemoveCard,
  handleTeamMember,
  index,
  handleChangeSelectedItem,
  onChange,
  showPicker,
  setShowPicker,
  setIndex,
}: any) => {
  const time = String(convertOppositeOfMinutesOrTime(item.duration));

  const [selectedHour, setSelectedHour] = useState("01");
  const [selectedMinute, setSelectedMinute] = useState("01");

  // const onChange
  const handleSaveDuration = () => {
    onChange(selectedHour, selectedMinute);
    setShowPicker(false);
  };

  const handleDuration = () => {
    setIndex(index), setSelectedHour(time.split(":")[0].toString());
    setSelectedMinute(time.split(":")[1].toString());

    setTimeout(() => {
      setShowPicker(true);
    }, 500);
  };

  return (
    <>
      <View style={[externalStyles.pinkcard, styles.paddedView]}>
        <View style={styles.rowView}>
          <View style={styles.rowView2}>
            <FontAwesome
              name="list-alt"
              style={[
                externalStyles.iconColorStyle,
                { color: iconCalenderColor },
              ]}
            />
            <Text style={[styles.viewWithMargin, { fontFamily: "BoldText" }]}>
              Service
            </Text>
          </View>
          <Entypo
            onPress={handleRemoveCard}
            name="cross"
            size={24}
            color="black"
          />
        </View>

        <TouchableWithoutFeedback onPress={() => handleTeamMember(item, index)}>
          <View style={styles.columnView}>
            <Text style={[styles.blueText, { fontFamily: "Regular" }]}>
              {item.service}
            </Text>
            <Text style={[styles.redText, { fontFamily: "Regular" }]}>
              {item.teamMember.name}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.rowBetween}>
          <View style={styles.box}>
            <View style={styles.row}>
              <Entypo
                name="back-in-time"
                style={[externalStyles.iconColorStyle, { color: iconColor1 }]}
              />
              <Text style={[styles.mb1, { fontFamily: "BoldText" }]}>
                Duration
              </Text>
            </View>

            <TouchableOpacity onPress={() => handleDuration()}>
              <Text style={[styles.blueText, { fontFamily: "Regular" }]}>
                {time}
              </Text>
            </TouchableOpacity>

            {showPicker && (
              <CustomDuration
                isTime={time}
                setModal={setShowPicker}
                modal={showPicker}
                onChange={onChange}
                handleSaveDuration={handleSaveDuration}
                setSelectedMinute={setSelectedMinute}
                setSelectedHour={setSelectedHour}
                selectedHour={selectedHour}
                selectedMinute={selectedMinute}
              />
            )}
          </View>

          <View style={styles.spacing}>
            <View style={styles.row2}>
              <FontAwesome
                name="money"
                style={[
                  externalStyles.iconColorStyle,
                  { color: iconPhoneColor },
                ]}
              />
              <Text style={[styles.mb1, { fontFamily: "BoldText" }]}>
                Amount
              </Text>
            </View>
            <CustomInput
              placeholder="$Price"
              onChangeText={(text) =>
                handleChangeSelectedItem(index, { price: text })
              }
              value={item?.price?.toString()}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default CreateAppointmentCard;
const styles = StyleSheet.create({
  paddedView: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },

  blueText: {
    color: "#60a5fa",
  },
  redText: {
    color: "#f87171",
    marginTop: 8,
  },
  spacing: {
    margin: 4, 
    marginTop: 8, 
    marginBottom: 4, 
  },
  row2: {
    flexDirection: "row",
  },
  mb1: {
    marginBottom: 4,
  },
  rowView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowView2: {
    flex: 1,
    flexDirection: "row",
  },
  viewWithMargin: {
    marginBottom: 4,
  },
  columnView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8, 
  },
  box: {
    paddingBottom: 8, 
    margin: 4, 
    marginBottom: 4, 
  },
  row: {
    flexDirection: "row",
  },
});
