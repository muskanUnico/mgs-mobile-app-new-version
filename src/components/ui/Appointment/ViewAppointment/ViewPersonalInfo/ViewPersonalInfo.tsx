import { FontAwesome } from "@expo/vector-icons"; // Import the icon library
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import { styles as externalStyles } from "../../../../../assets/css";
import CustomHeading from "../../../../../components/elements/CustomHeading/CustomHeading";
import {
  dividerColor,
  iconEmailColor,
  iconPersonColor,
  iconPhoneColor,
} from "../../../../../constants/COLORS";

interface ViewPersonalInfoProps {
  data: {
    name: string;
    email: string;
    phone: string;
  };
}

const ViewPersonalInfo: React.FC<ViewPersonalInfoProps> = ({ data }) => {
  const { name, email, phone } = data;

  return (
    <>
      <View style={[externalStyles.card]}>
        <View>
          <CustomHeading text="Client Information" />
        </View>
        <Divider style={styles.dividerSpacing} />

        <View style={styles.infoRow}>
          <FontAwesome
            name="user"
            style={[externalStyles.iconColorStyle, { color: iconPersonColor }]}
          />
          <View>
            <Text style={[externalStyles.content]}>{name}</Text>
          </View>
        </View>
        <Divider
          style={[{ backgroundColor: dividerColor }, styles.verticalMargin]}
        />
        <View style={styles.infoRow}>
          <FontAwesome
            name="phone"
            style={[externalStyles.iconColorStyle, { color: iconPhoneColor }]}
          />
          <View>
            <Text style={[externalStyles.content]}>{phone}</Text>
          </View>
        </View>
        <Divider
          style={[{ backgroundColor: dividerColor }, styles.myVerticalMargin]}
        />
        <View style={styles.infoRow}>
          <FontAwesome
            name="envelope"
            style={[externalStyles.iconColorStyle, { color: iconEmailColor }]}
          />
          <View>
            <Text style={[externalStyles.content]}>{email}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: "row",
  },
  verticalMargin: {
    marginTop: 8,
    marginBottom: 8,
  },
  dividerSpacing: {
    marginTop: 4,
    marginBottom: 8,
  },
  myVerticalMargin: {
    marginTop: 8,
    marginBottom: 8,
  },
});

export default ViewPersonalInfo;
