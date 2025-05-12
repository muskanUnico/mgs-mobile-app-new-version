import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Chip, Divider } from "react-native-paper";
import { styles as externalStyles } from "../../../../assets/css";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconButton from "../../../../components/elements/IconButton/IconButton";
import CustomHeading from "../../../../components/elements/CustomHeading/CustomHeading";
import {
  dividerColor,
  iconColor3,
  iconEmailColor,
  iconPersonColor,
  iconPhoneColor,
} from "../../../../constants/COLORS";
import * as Clipboard from "expo-clipboard";
import { AntDesign } from "@expo/vector-icons";
import { PermissionAccess } from "../../../../middleware/PermissionAccess";
import { getIntakeform, useDeleteCustomer } from "../../../../hooks/Customer";
import WarningModal from "../../../../components/elements/WarningModal/WarningModal";

const PersonalDetails = ({ data, handleEdit, handleRelocate }: any) => {
  const res = getIntakeform(data?.id) as any;
  const [phoneNumber, setPhoneNumber] = useState(data?.telephone);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { handleDeleteCustomer, isLoading } = useDeleteCustomer();

  // Function to copy phone number to clipboard
  const copyToClipboard = () => {
    Clipboard.setString(phoneNumber);
    Alert.alert(
      "Copied to clipboard",
      `Phone number ${phoneNumber} copied to clipboard`
    );
  };

  const handleCancel = () => {
    setTimeout(() => {
      setModalVisible(false);
    }, 500);
  };

  const showDeleteModal = (customer: any) => {
    setCustomerToDelete(customer);
    setModalVisible(true);
  };

  const handleDelete = () => {
    //@ts-ignore
    handleDeleteCustomer(customerToDelete?.id);

    setTimeout(() => {
      setModalVisible(false);
    }, 500);
  };

  return (
    <>
      <View style={[externalStyles.card]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <CustomHeading iconName="wpforms" text="Personal Details" />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <PermissionAccess requiredPermissions={["edit_customers"]}>
              <IconButton iconName="edit" onPress={handleEdit} />
            </PermissionAccess>

            <PermissionAccess requiredPermissions={["delete_customers"]}>
              <AntDesign
                name="delete"
                style={[externalStyles.iconColorStyle]}
                color="red"
                onPress={() => showDeleteModal(data)}
              />
            </PermissionAccess>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome
            name="user"
            style={[externalStyles.iconColorStyle, { color: iconPersonColor }]}
          />
          <Text style={[externalStyles.content]}>{data?.name}</Text>
        </View>
        <Divider
          style={[{ backgroundColor: dividerColor }, styles.verticalSpacing]}
        />

        <View>
          <TouchableOpacity
            onPress={copyToClipboard}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="phone"
              style={[externalStyles.iconColorStyle, { color: iconPhoneColor }]}
            />
            <Text style={[externalStyles.content]}>{data?.telephone}</Text>
          </TouchableOpacity>
        </View>

        <Divider
          style={[{ backgroundColor: dividerColor }, styles.verticalSpacing]}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FontAwesome
            name="envelope"
            style={[externalStyles.iconColorStyle, { color: iconEmailColor }]}
          />
          <Text style={[externalStyles.content]}>{data?.email}</Text>
        </View>
        <Divider
          style={[{ backgroundColor: dividerColor }, styles.verticalSpacing]}
        />

        {!res.loading && (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <AntDesign
                name="form"
                style={[externalStyles.iconColorStyle, { color: iconColor3 }]}
              />

              <Text style={[externalStyles.content]}>Intake Form </Text>
              {res.data?.length == 0 ? (
                <View style={styles.leftSpacing}>
                  <Chip style={styles.customChip}>
                    <Text
                      style={[styles.whiteText, { fontFamily: "BoldText" }]}
                    >
                      Not Filled Form
                    </Text>
                  </Chip>
                </View>
              ) : (
                <Text
                  style={[externalStyles.BlueText, styles.clickable]}
                  onPress={handleRelocate}
                >
                  View
                </Text>
              )}
              {res.data?.edit_request_status == "change_request" && (
                <View>
                  <Chip icon="information">Change Request</Chip>
                </View>
              )}
            </View>
          </>
        )}
      </View>

      <WarningModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="Are you sure you want to delete the customer?"
        handleRightbtn={handleCancel}
        handleLeftbtn={handleDelete}
        rightBtnName="Delete"
        leftBtnName="Cancel"
        loading={!isLoading}
      />
    </>
  );
};

export default PersonalDetails;
const styles = StyleSheet.create({
  verticalSpacing: {
    marginVertical: 8,
  },
  leftSpacing: {
    marginLeft: 8,
  },
  clickable: {
    marginLeft: 12,
  },
  customChip: {
    backgroundColor: "red",
    borderRadius: 24,
  },
  whiteText: {
    color: "white",
  },
});
