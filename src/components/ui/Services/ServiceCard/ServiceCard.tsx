import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { styles as externalStyles } from "../../../../assets/css";
import {
  brandColor,
  dividerColor,
  iconColor2,
  iconColor7,
  iconPhoneColor,
  labelColor,
} from "../../../../constants/COLORS";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formatMinutesToHoursAndMinutes } from "../../../../utils/tools";
import { useTheme } from "../../../../context/ThemeContext";

const ServiceCard = ({ item, handleRelocation, index }: any) => {
  const { theme } = useTheme();

  return (
    <View style={[externalStyles.card]}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleRelocation(item)}
          style={styles.titleContainer}
        >
          <MaterialCommunityIcons
            name="subtitles-outline"
            style={[externalStyles.iconColorStyle, { color: iconColor2 }]}
          />
          <Text style={[externalStyles.BlueText, styles.title]}>
            {item?.title}
          </Text>
        </TouchableOpacity>
        <View style={[styles.indexContainer, { marginLeft: 36 }]}>
          <Text style={{ color: theme.brandColor, fontFamily: "BoldText" }}>
            #
          </Text>
          <Text
            style={{
              color: theme.brandColor,
              marginLeft: 4,
              fontFamily: "BoldText",
            }}
          >
            {index + 1}
          </Text>
        </View>
      </View>

      <Divider style={{ backgroundColor: dividerColor }} />

      <View style={styles.row}>
        <FontAwesome
          name="clock-o"
          style={[externalStyles.iconColorStyle, { color: iconColor7 }]}
        />
        <Text style={[externalStyles.label, { marginLeft: 4 }]}>DURATION:</Text>
        <Text style={[externalStyles.content, styles.value]}>
          {formatMinutesToHoursAndMinutes(item.duration)}
        </Text>
      </View>
      <Divider style={{ backgroundColor: dividerColor }} />
      <View style={styles.row}>
        <FontAwesome
          name="dollar"
          style={[externalStyles.iconColorStyle, { color: iconPhoneColor }]}
        />
        <Text style={[externalStyles.label, { marginLeft: 8 }]}>PRICE:</Text>
        <Text style={[externalStyles.content, styles.value]}>
          ${item.price}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 8,
  },
  indexContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    marginLeft: 8,
    color: labelColor,
  },
});

export default ServiceCard;
