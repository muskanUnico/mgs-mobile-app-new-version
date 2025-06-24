import { FontAwesome } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider, Switch } from "react-native-paper";
import { styles as externalStyles } from "../../../../assets/css";
import {
  borderColor,
  dividerColor,
  iconColor2,
  iconColor3,
  iconColor4,
  iconColor5,
  iconColor6,
  iconColor7
} from "../../../../constants/COLORS";
import { useTheme } from "../../../../context/ThemeContext";
import { EmptyTimetableExample } from "../../../../interface/TeamMembers";
import { TeamMemberService } from "../../../../services/TeamMember/TeamMember";
import { convertSchedule } from "../../../../utils/tools";

const TeamMemberCard = ({ item, index, showDeleteModal }: any) => {
  const getAvailability = (timetable: any) => {
    const tableFormat = convertSchedule(timetable);
    const table = Object.keys(tableFormat);
    const data = table.filter((key) => {
      //@ts-ignore
      const item = tableFormat[key];
      return item.length > 0;
    });
    return data.map((day) => day.substring(0, 2));
  };
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState(item?.telephone);

  // Function to copy phone number to clipboard
  const copyToClipboard = () => {
    Clipboard.setString(phoneNumber);
    Alert.alert(
      "Copied to clipboard",
      `Phone number ${phoneNumber} copied to clipboard`
    );
  };

  const [toggle, setToggle] = useState(item.staffHours?.onlineBooking || false);


  const handleSubmit = (onlineBooking: boolean) => {
  setToggle(onlineBooking);
  TeamMemberService.updateStaffHours(item.id, {
    onlineBooking,
    timetable: item.staffHours?.timetable || EmptyTimetableExample,
  }).catch(() => {
    // 3. If API fails, revert the toggle
    setToggle(!onlineBooking);
  });
};
  const { theme } = useTheme();

  return (
    <View style={[externalStyles.card]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              marginRight: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: theme.brandColor, fontFamily: "BoldText" }}>
              #
            </Text>
            <Text
              style={[
                {
                  paddingLeft: 4,
                  color: theme.brandColor,
                  fontFamily: "BoldText",
                },
              ]}
            >
              {index + 1}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(stack)/viewTeamMember",
                params: { memberId: item.id }
              })
              }
            style={styles.row}
          >
            <Text style={[externalStyles.BlueText]}>{item.name}</Text>
            <View
              style={{
                backgroundColor: item?.color,
                width: 10,
                height: 10,
                borderRadius: 10,
                marginLeft: 3,
              }}
            ></View>
          </TouchableOpacity>
        </View>
      </View>
      <Divider style={{ backgroundColor: dividerColor }} />

      <TouchableOpacity onPress={copyToClipboard} style={styles.row}>
        <FontAwesome
          name="phone"
          style={[externalStyles.iconColorStyle, { color: iconColor2 }]}
        />
        <Text style={[externalStyles.content]}>{phoneNumber}</Text>
      </TouchableOpacity>

      <Divider style={{ backgroundColor: dividerColor }} />

      <View style={styles.row}>
        <FontAwesome
          name="briefcase"
          style={[externalStyles.iconColorStyle, { color: iconColor3 }]}
        />
        <Text style={[externalStyles.label]}>ROLE : </Text>
        <Text style={[externalStyles.content]}>{item?.role?.title || ""}</Text>
      </View>

      <Divider style={{ backgroundColor: dividerColor }} />

      <View style={styles.row}>
        <FontAwesome
          name="calendar"
          style={[externalStyles.iconColorStyle, { color: iconColor4 }]}
        />
        <Text style={[externalStyles.label]}>AVAILABILITY : </Text>
        <Text style={[externalStyles.content]}>
          {getAvailability(item.staffHours.timetable) || ""}
        </Text>
      </View>

      <Divider style={{ backgroundColor: dividerColor }} />

      <View style={styles.row}>
        <FontAwesome
          name="briefcase"
          style={[externalStyles.iconColorStyle, { color: iconColor5 }]}
        />
        <Text style={[externalStyles.label]}>JOB ROLE : </Text>
        <Text style={[externalStyles.content]}>
          {item?.jobRole?.title || "-"}
        </Text>
      </View>

      <Divider style={{ backgroundColor: dividerColor }} />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome
          name="globe"
          style={[externalStyles.iconColorStyle, { color: iconColor6 }]}
        />
        <Text style={[externalStyles.label]}>ONLINE BOOKABLE : </Text>
        <Text style={[externalStyles.content]}>
          <Switch
            value={toggle}
            onValueChange={() => handleSubmit(!toggle)}
            thumbColor={toggle ? theme.brandPastelColor : theme.brandGreyColor}
            trackColor={{ true: theme.brandColor, false: borderColor }}
            style={styles.switch}
          />
        </Text>
      </View>

      <Divider style={{ backgroundColor: dividerColor }} />

      <View style={styles.row}>
        <FontAwesome
          name="check-circle"
          style={[externalStyles.iconColorStyle, { color: iconColor7 }]}
        />
        <Text style={[externalStyles.label]}>STATUS : </Text>
        <Text style={[externalStyles.content]}>
          {item.active ? "Active" : "Inactive"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
  },
  switch: {
    ...(Platform.OS === "ios" && {
      transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    }),
  },
});

export default TeamMemberCard;
