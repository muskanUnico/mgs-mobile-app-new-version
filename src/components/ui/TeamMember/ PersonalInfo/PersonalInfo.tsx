//@ts-nocheck
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { styles as externalStyles } from "../../../../assets/css";
import CustomHeading from "../../../../components/elements/CustomHeading/CustomHeading";
import WarningModal from "../../../../components/elements/WarningModal/WarningModal";
import {
  iconEmailColor,
  iconPersonColor,
  iconPhoneColor,
} from "../../../../constants/COLORS";
import { useDeleteTeamMember } from "../../../../hooks/TeamMembers";

interface PersonalInfoCardProps {
  data: {
    name: string;
    email: string;
    phone?: string;
    id?: string;
    teamMemberId?: string;
    color?: string;
    telephone?: string;
  };
  isDelete: boolean;
}

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({
  data,
  isDelete,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(data?.phone || data.telephone);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const { handleDeleteTeamMember, isLoading } = useDeleteTeamMember();
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    //@ts-ignore
    handleDeleteTeamMember(memberToDelete?.id);

    setTimeout(() => {
      setModalVisible(false);
    }, 500);
  };

  const handleCancel = () => {
    setTimeout(() => {
      setModalVisible(false);
    }, 500);
  };

  const showDeleteModal = (member: any) => {
    setMemberToDelete(member);
    setModalVisible(true);
  };

  const copyToClipboard = () => {
    Clipboard.setString(phoneNumber);
    Alert.alert(
      "Copied to clipboard",
      `Phone number ${phoneNumber} copied to clipboard`
    );
  };

  return (
    <View style={externalStyles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CustomHeading iconName="wpforms" text="Personal Information" />

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(stack)/editPersonalInfo",
              params: {
                personalInfo: JSON.stringify(data),
              },
            })
          }
        >
          <Text style={externalStyles.BlueText}>EDIT</Text>
        </TouchableOpacity>
        {isDelete && (
          <AntDesign
            name="delete"
            style={[externalStyles.iconColorStyle]}
            color="red"
            onPress={() => showDeleteModal(data)}
          />
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome
              name="user"
              style={[
                externalStyles.iconColorStyle,
                { color: iconPersonColor },
              ]}
            />
            <Text style={externalStyles.content} style={{ marginRight: 4 }}>
              {data?.name}
            </Text>
            <View
              style={{
                backgroundColor: data?.color,
                width: 10,
                height: 10,
                borderRadius: 10,
              }}
            ></View>
          </View>
        </View>
        <TouchableOpacity
          onPress={copyToClipboard}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome
            name="phone"
            style={[externalStyles.iconColorStyle, { color: iconPhoneColor }]}
          />
          <View>
            <Text style={externalStyles.content}>{phoneNumber}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,
          marginBottom: 3,
        }}
      >
        <FontAwesome
          name="envelope"
          style={[externalStyles.iconColorStyle, { color: iconEmailColor }]}
        />
        <View>
          <Text style={externalStyles.content}>{data?.email}</Text>
        </View>
      </View>

      <WarningModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="Are you sure you want to delete this team member?"
        handleRightbtn={handleCancel}
        handleLeftbtn={handleDelete}
        rightBtnName="Delete"
        leftBtnName="Cancel"
        loading={!isLoading}
      />
    </View>
  );
};

export default PersonalInfoCard;
