import moment from "moment";
import { brandBlackColor, brandColor } from "../../constants/COLORS";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface NotificationPayload {
  url: string;
}

interface Notification {
  _id: string;
  content: string;
  createdAt: string;
  deleted: boolean;
  lastReadDate: string;
  lastSeenDate: string;
  payload: NotificationPayload;
  read: boolean;
  seen: boolean;
  status: string;
  templateIdentifier: string;
  updatedAt: string;
}

export const NotificationCard = ({
  data,
  onPress,
}: {
  data: Notification;
  onPress: any;
}) => {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => onPress(data)}
      style={[
        styles.card,
        { ...(data.read && { borderLeftColor: "white" }) },
        { marginHorizontal: 16, marginTop: 12 },
      ]}
    >
      <Text style={styles.text}>{data.content} </Text>
      <View style={{ marginTop: 4 }}>
        <Text style={styles.lighterText}>
          {moment(data.createdAt).format("MMMM Do YYYY, h:mm:ss")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    card: {
      padding: 10,
      backgroundColor: "white",
      borderRadius: 5,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
      borderLeftWidth: 5,
      borderLeftColor: theme.brandColor,
    },
    text: {
      fontSize: 12,
      fontFamily: "BoldText",

      color: theme.brandBlackColor,
    },
    lighterText: {
      fontSize: 12,
      fontFamily: "Regular",

      color: "#aaa",
    },
  });
};

export default NotificationCard;
