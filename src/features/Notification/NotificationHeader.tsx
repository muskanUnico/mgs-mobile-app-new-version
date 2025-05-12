import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { brandBlackColor, brandColor, brandWhiteColor } from '../../constants/COLORS';
import { markAllRead } from '../../hooks/Notification';
import { useTheme } from "../../context/ThemeContext";

export const NotificationHeader = ({ currentPage, refresh }) => {
  const notificationCount = 0;

  const { loading, submit } = markAllRead();

  const handleMarkAllRead = async () => {
    await submit(currentPage);
    refresh && refresh()
  }
  const styles = useStyles();

  return (
<View style={[styles.header, { paddingHorizontal: 24, paddingBottom: 16, paddingTop: 8, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }]}>
<View style={styles.headingContainer}>
        <Text style={styles.heading}>Notifications</Text>
        {notificationCount > 0 && <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{notificationCount}</Text>
        </View>}

      </View>

      {loading ? (
        <Text>
          <ActivityIndicator size="small" color="white" />
        </Text>
      ) : <TouchableOpacity onPress={handleMarkAllRead}>

        <Text style={styles.markAllRead} >Mark all as read</Text>
      </TouchableOpacity>}

    </View>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.brandColor,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    color: 'white',
    fontFamily: "BoldText"

  },
  badgeContainer: {
    width: 22,
    height: 22,
    borderRadius: 12,
    backgroundColor: theme.brandBlackColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  badgeText: {
    color: theme.brandWhiteColor,
    fontFamily: "BoldText"

  },
  markAllRead: {
    fontSize: 12,
    color: theme.brandBlackColor,
       fontFamily: "BoldText"
  },
});
}
export default NotificationHeader;
