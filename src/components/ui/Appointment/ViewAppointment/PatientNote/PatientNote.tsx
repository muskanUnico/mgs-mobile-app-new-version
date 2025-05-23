//@ts-nocheck
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import moment from "moment";
import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { styles as externalStyles } from "../../../../../assets/css";
import {
  dividerColor,
  iconCalenderColor,
  iconColor10,
  iconColor12
} from "../../../../../constants/COLORS";
import { useTheme } from "../../../../../context/ThemeContext";
import { formatTime } from "../../../../../utils/tools";

const PatientNote = ({
  item,
  index,
  defaultDataShow,
  defaultIcons,
  navigation,
  appointmentId,
}: any) => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View
      style={[
        externalStyles.card,
        {
          borderColor:
            appointmentId == item.appointmentId ? theme.brandColor : "white",
          borderWidth: 2,
        },
      ]}
      style={styles.paddingTop}
    >
      <View style={[styles.flexRow, styles.field]}>
        <View style={styles.flexRow2}>
          <FontAwesome
            name="calendar"
            style={[
              externalStyles.iconColorStyle,
              { color: iconCalenderColor },
            ]}
          />
          <View style={styles.ml2}>
            <Text style={[externalStyles.label, styles.uppercaseText]}>
              Appointment Date
            </Text>
            <Text style={[externalStyles.content]}>
              {moment(item.date).format("DD MMM YYYY")}{" "}
              {formatTime(item.start_time)}
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback
          // onPress={() => navigation.navigate("EditComment", { item })}
          onPress={() =>
            router.push({
              pathname: "editComment",
              params: {
                item: encodeURIComponent(JSON.stringify(item)), 
              },
            })
          }
        >
          <FontAwesome name="edit" size={22} />
        </TouchableWithoutFeedback>
      </View>

      {defaultDataShow.map((dataItem, index) => (
        <React.Fragment key={index}>
          {dataItem?.title.map((title, innerIndex) => (
            <View style={styles.field} key={innerIndex}>
              <FontAwesome
                name={dataItem.icon[innerIndex]}
                color={
                  defaultIcons.find(
                    (icon) => icon.icon === dataItem.icon[innerIndex]
                  )?.color || "#000"
                }
                style={[externalStyles.iconColorStyle]}
              />
              <View style={styles.textContainer}>
                <Text style={[externalStyles.label, styles.uppercaseText]}>
                  {title}
                </Text>
                <Text style={[externalStyles.content]}>
                  {dataItem.des[innerIndex] || "-"}
                </Text>
              </View>
            </View>
          ))}
        </React.Fragment>
      ))}

      <View style={styles.field}>
        <FontAwesome
          name="comment-o"
          style={[externalStyles.iconColorStyle, { color: iconColor12 }]}
        />
        <View style={styles.textContainer}>
          <Text style={[externalStyles.label, styles.uppercaseText]}>
            Admin Comments
          </Text>
          <Text style={[externalStyles.content]}>
            {item.adminDescription || "-"}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.flexRow2}>
          <FontAwesome
            name="comment-o"
            style={[externalStyles.iconColorStyle, { color: iconColor10 }]}
          />

          <View style={styles.ml2}>
            <Text style={[externalStyles.label, styles.uppercaseText]}>
              Customer Comments
            </Text>
            <Text style={[externalStyles.content]}>
              {item.description || "-"}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              marginBottom: 1,
              color: theme.brandColor,
              fontFamily: "BoldText",
            }}
          >
            #
          </Text>
          <Text
            style={{
              color: theme.brandColor,
              paddingLeft: 1,
              fontFamily: "BoldText",
            }}
          >
            {index + 1}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: dividerColor,
    paddingBottom: 5,
    marginBottom: 5,
  },
  paddingTop: {
    paddingTop: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexRow2: {
    flexDirection: "row",
  },
  ml2: {
    marginLeft: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
});

export default PatientNote;
