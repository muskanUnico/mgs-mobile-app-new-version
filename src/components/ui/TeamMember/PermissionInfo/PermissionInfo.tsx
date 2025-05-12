//@ts-nocheck
import React, { useRef, useState } from "react";
import SelectRole from "../SelectRole/SelectRole";
import { updateMember } from "../../../../hooks/TeamMembers";
import { styles as externalStyles } from "../../../../assets/css";
import Button from "../../../../components/elements/Button/Button";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import CustomHeading from "../../../../components/elements/CustomHeading/CustomHeading";
import CustomBottomSheet from "../../../../components/elements/BottomSheet/CustomBottomSheet";
import { navigate } from "../../../../utils/navigationServices";

interface PermissionInfoCardProps {
  data: {
    permissionSet?: string;
    access: string;
    passcode: string;
    permissions: string;
  };
  role?: {
    title: string;
    roleId: string;
  };
  memberId: string;
  isEdit?: boolean;
}

const PermissionInfoCard: React.FC<PermissionInfoCardProps> = ({
  data,
  role,
  memberId,
  isEdit,
}) => {
  const bottomSheetRef = useRef(null);
  const handleUpdateMember = updateMember(memberId);
  const [formData, setFormData] = useState({
    role: role,
  });

  return (
    <View style={externalStyles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CustomHeading iconName="lock" text="Permission" />
        <TouchableOpacity onPress={() => bottomSheetRef.current.open()}>
          {isEdit && <Text style={externalStyles.BlueText}>EDIT </Text>}
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={externalStyles.label}>PERMISSION SET</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[externalStyles.content, { marginRight: 4 }]}>
            {data?.permissionSet || data?.role?.title}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={externalStyles.label}>PERMISSIONS</Text>
        <Pressable
          onPress={() => navigate("ViewAccess", { roleId: role?.roleId })}
        >
          <Text style={externalStyles.BlueText}>View Access</Text>
        </Pressable>
      </View>

      {/* edit  permission */}
      <CustomBottomSheet
        bottomSheetRef={bottomSheetRef}
        height={600}
        text="Edit Permission set"
      >
        <View style={[externalStyles.container, { marginTop: 8 }]}>
          <SelectRole
            setRole={(role: Object) =>
              setFormData((old: any) => ({ ...old, role }))
            }
            defaultRole={role?.roleId}
          />
        </View>

        <View style={{ marginHorizontal: 16 }}>
          <Button
            loading={handleUpdateMember.loading}
            onPress={() => handleUpdateMember.submit(formData)}
            title="Save"
          />
        </View>
      </CustomBottomSheet>
    </View>
  );
};

export default PermissionInfoCard;
