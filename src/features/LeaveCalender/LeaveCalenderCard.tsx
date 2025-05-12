import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import {
  iconColor1,
  iconColor5,
  iconColor9,
  iconEmailColor,
} from "../../constants/COLORS";
import LongMenu from "../../components/elements/LongMenu/LongMenu";
import { styles as externalStyles } from "../../assets/css";
import { LeaveCalenderChips } from "../../utils/tools";
import { TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const LeaveCalenderCard = ({
  handleOptions,
  option,
  setLeaveDates,
  setOpen,
  navigation,
  item,
  index,
}: any) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View style={[externalStyles.card]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.indexContainer}>
            <Text style={[styles.boldText, { color: theme.brandColor }]}>
              #
            </Text>
            <Text style={[styles.boldText, { color: theme.brandColor }]}>
              {index + 1}
            </Text>
          </View>
          <Text style={[externalStyles.label, { marginLeft: 8 }]}>
            EMPLOYEE NAME
          </Text>
        </View>

        <View>
          <LongMenu
            options={option}
            handleOptions={(option: any) =>
              handleOptions(option, item, navigation)
            }
          />
        </View>
      </View>

      <View>
        <Text
          style={[externalStyles.content, { marginLeft: 20, marginTop: 4 }]}
        >
          {item?.teamMemberId?.name}
        </Text>
      </View>

      <Divider style={styles.divider} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginRight: 16,
        }}
      >
        <View>
          <View style={styles.row}>
            <FontAwesome
              name="list"
              size={13}
              style={[{ color: iconEmailColor }]}
            />
            <Text style={[externalStyles.label, { marginLeft: 8 }]}>
              LEAVE TYPE
            </Text>
          </View>
          <Text
            style={[externalStyles.content, { marginLeft: 20, marginTop: 4 }]}
          >
            {item.leaveType}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setOpen(true), setLeaveDates({ dates: item.dates, status: true });
          }}
        >
          <View style={styles.row}>
            <FontAwesome
              name="calendar"
              style={[externalStyles.iconColorStyle, { color: iconColor1 }]}
            />
            <Text style={[externalStyles.label]}>NO. OF DAYS</Text>
          </View>
          <Text
            style={[externalStyles.BlueText, { marginLeft: 20, marginTop: 4 }]}
          >
            {item.dates.length.toString()}
          </Text>
        </TouchableOpacity>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.row}>
        <FontAwesome
          name="comment"
          style={[externalStyles.iconColorStyle, { color: iconColor5 }]}
        />
        <Text style={[externalStyles.label]}>COMMENT</Text>
      </View>
      <Text style={[externalStyles.content, { marginLeft: 24, marginTop: 4 }]}>
        {item?.comment}
      </Text>

      <Divider style={styles.divider} />
      <View style={{ flexDirection: "row", marginBottom: 8 }}>
        <View style={styles.row}>
          <FontAwesome
            name="info-circle"
            style={[externalStyles.iconColorStyle, { color: iconColor9 }]}
          />
          <Text style={[externalStyles.label]}>STATUS</Text>
        </View>
        <Text style={[externalStyles.content, { marginLeft: 24 }]}>
          {LeaveCalenderChips(item)}
        </Text>
      </View>
    </View>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 8,
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    indexContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 1,
    },
    boldText: {},

    divider: {
      marginVertical: 8,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      marginRight: 8,
    },
  });
};

export default LeaveCalenderCard;
