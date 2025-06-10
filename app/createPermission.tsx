//component imports
import React, { useState } from "react";

import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import { Searchbar, Switch } from "react-native-paper";
// component imports
import { RoleService } from "@/src/services";
import { stringToSlug } from "@/src/utils/tools";

import { styles as externalStyles } from "@/src/assets/css";
import Button from "@/src/components/elements/Button/Button";
import CustomInput from "@/src/components/elements/Input";
import Title from "@/src/components/elements/Title/Title";
import {
    FilterBorder,
    borderColor,
    placeholderTextColor,
} from "@/src/constants/COLORS";
import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { managePermissionData } from "@/src/hooks/Role/SelectPermission";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import SelectPermission from "@/src/screens/SelectPermission";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

 const CreatePermission = ({ navigation }: any) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  // state
  const [switchValue, setSwitchValue] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  //integration
  const [formData, setFormData] = useState({
    title: "",
  });
  const { permissionData, setpermissionData, filteredPermissions } =
    managePermissionData();


  // handle role
  const handleRoleName = (value: string) => {
    setFormData((old) => ({ ...old, title: value }));
  };

  // handle submit
  const handleSubmit = async () => {
    setLoading(true);
    let body = {
      title: formData.title,
      roleId: stringToSlug(formData.title),
      fullAccess: switchValue,
      permissions: filteredPermissions,
    };

    let data = await RoleService.createRole(body).catch((err) => {
      setLoading(false);
      Alert.alert(err.response?.data?.message || "An error occurred");
    });

    if (data?.success) {
      setLoading(false);
      Alert.alert("Role created successfully");
      navigation.navigate("AllPermissions");
    }
  };

  return (
    <GlobalLoader>
      <View
        style={{ flex :1, backgroundColor: theme.brandWhiteColor, paddingBottom: 50 }}
      >
        <Title navigation={navigation} title="New Role set" />

        <View style={[externalStyles.container]}>
          <View style={{ marginTop: 10 }}>
            {/* side label input component  */}
            <CustomInput
              label={"Permission set name"}
              placeholder="Permission set name"
              value={formData.title}
              onChangeText={(text: any) => handleRoleName(text)}
            />
          </View>
          <View className="my-4">
            <Text style={[externalStyles.label,{marginBottom:5}]} >
              Customize this set of permissions
            </Text>
            <Text style={[externalStyles.content]}>
              Customize the permissions below to tailor the way team members
              with this permission set use square.
            </Text>
          </View>
          <View style={[externalStyles.pinkcard, {paddingBottom:5} ]} >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Switch
                value={switchValue}
                onValueChange={setSwitchValue}
                thumbColor={
                  switchValue ? theme.brandPastelColor : theme.brandGreyColor
                }
                trackColor={{ true: theme.brandColor, false: borderColor }}
                style={styles.switch}
              />
              <Text style={[externalStyles.label, { color: theme.brandColor }]}>
                Full Access
              </Text>
            </View>

            <Text style={[ externalStyles.content,
      { marginLeft: 10, marginBottom: 8 }]} >
              This enables all permissions except managing bank accounts. Only
              the account can manage bank accounts.
            </Text>
          </View>

          <View style={{marginVertical:10}}>
            <Searchbar
              placeholder="Search"
              onChangeText={(text) => setSelectedService(text)}
              value={selectedService}
              style={styles.searchBar}
              inputStyle={styles.searchInput}
              icon={() => (
                <MaterialCommunityIcon
                  name="magnify"
                  style={{ color: placeholderTextColor }}
                  size={24}
                />
              )}
              placeholderTextColor={placeholderTextColor}
            />
          </View>

          {/* select permission component */}
          <SelectPermission
            access={switchValue}
            setAccess={setSwitchValue}
            setData={setpermissionData}
          />

          <View style={{ marginVertical: 20}}>
            <Button loading={loading} onPress={handleSubmit} title="Save" />
          </View>
        </View>
      </View>
    </GlobalLoader>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    searchContainer: {
      marginBottom: 5,
      marginHorizontal: 16,
    },
    searchBar: {
      borderRadius: 20,
      borderWidth: 1,
      backgroundColor: theme.brandWhiteColor,
      borderColor: FilterBorder,
      height: 40,
    },
    searchInput: {
      fontSize: 15,
      color: placeholderTextColor,
      paddingBottom: 20,
    },
    switch: {
      ...(Platform.OS === "ios" && {
        transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
      }),
    },
  });
};
export default SecurePageByPackage(CreatePermission, ["create_permission"]);
