//@ts-nocheck
import React, { useEffect, useState } from "react";

import { getSingleRole } from "@/src/hooks/Role";
import { RoleService } from "@/src/services";
import { stringToSlug } from "@/src/utils/tools";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Searchbar, Switch } from "react-native-paper";

import { styles as externalStyles } from "@/src/assets/css";
import Button from "@/src/components/elements/Button/Button";
import CustomInput from "@/src/components/elements/Input";
import Loader from "@/src/components/elements/Loader/Loader";
import Tab from "@/src/components/elements/Tabs/Tabs";
import Title from "@/src/components/elements/Title/Title";
import {
  FilterBorder,
  borderColor,
  placeholderTextColor
} from "@/src/constants/COLORS";
import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { managePermissionData } from "@/src/hooks/Role/SelectPermission";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import SelectPermission from "@/src/screens/SelectPermission";
import { useLocalSearchParams, useRouter } from "expo-router";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import ViewPermissions from "./viewPermission";

const EditPermission = ({ navigation, route }: any) => {
  const params = useLocalSearchParams();
  const styles = useStyles();
  const { theme } = useTheme();
  const roleData = getSingleRole(params?.id);
  const [active, setActive] = useState(0);
  const [title, setTitle] = useState("");
  const router = useRouter();

  const { permissionData, setpermissionData, filteredPermissions } =
    managePermissionData();

  // state
  const [switchValue, setSwitchValue] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //integration

  const handleSearch = (text) => {
    roleData.setparams({ title: text });
    setSelectedService(text);
  };

  useEffect(() => {
   if (roleData?.data) {
    setTitle(roleData.data.title || "");
    setSwitchValue(roleData.data.fullAccess || false);
  }
  }, [roleData.data]);

  // handle submit
  const handleSubmit = async () => {
    setLoading(true);
    let body = {
      title: title,
      roleId: stringToSlug(title),
      fullAccess: switchValue,
      permissions: filteredPermissions,
    };

    let data = await RoleService.updateRole(params?.id, body).catch(
      (err) => {
        setLoading(false);
        Alert.alert(err.response?.data?.message || "An error occurred");
         return;
      }
    );

    if (data?.success) {
      setLoading(false);
      Alert.alert("Role Updated successfully");
      navigation.navigate("AllPermissions");
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    let data = await RoleService.deleteRole(params?.id).catch((err) => {
      Alert.alert(err.response?.data?.message || "An error occurred");
    });

    if (data?.success) {
      setIsLoading(false);
      Alert.alert("Role Delted successfully");
      router.push("/(tabs)")
    }
  };

  const tabs = [
    {
      id: 0,
      label: "View",
    },
    {
      id: 1,
      label: "Edit",
    },
  ];

  return (
    <>
      <GlobalLoader>
        {roleData.loading || roleData.data == null ? (
          <Loader />
        ) : (
          <>
            <View
              style={[styles.screen,{ backgroundColor: theme.brandWhiteColor}]}
            >
              <Title navigation={navigation} title="Manage Role set" />
              <View>
                <Tab
                  tabs={tabs}
                  selectedTab={active}
                  setSelectedTab={setActive}
                />
              </View>

              {active == 1 && (
                <View style={[externalStyles.container, styles.tabContent]}>
                  <View  style={styles.deleteButtonContainer}>
                    <Button
                      loading={false}
                      onPress={handleDelete}
                      title="Delete"
                    />
                  </View>

                  <View  style={styles.inputWrapper}>
                    {/* side label input component  */}
                    <CustomInput
                      label={"Permission set name"}
                      placeholder="Permission set name"
                      value={title}
                      onChangeText={(text) => setTitle(text)}
                    />
                  </View>
                  <View style={styles.section}>
                    <Text style={[externalStyles.label , {marginBottom:5}]} >
                      Customize this set of permissions
                    </Text>
                    <Text style={[externalStyles.content]}>
                      Customize the permissions below to tailor the way team
                      members with this permission set use square.
                    </Text>
                  </View>
                  <View style={[externalStyles.pinkcard,{paddingBottom:10}]} >
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
                          switchValue
                            ? theme.brandPastelColor
                            : theme.brandGreyColor
                        }
                        trackColor={{
                          true: theme.brandColor,
                          false: borderColor,
                        }}
                      />
                      <Text
                        style={[
                          externalStyles.label,
                          { color: theme.brandColor },
                        ]}
                      >
                        Full Access
                      </Text>
                    </View>

                    <Text
                      style={[externalStyles.content, styles.permissionNote]}
                    
                    >
                      This enables all permissions except managing bank
                      accounts. Only the account can manage bank accounts.
                    </Text>
                  </View>

                  <View style={{ marginVertical: 10 }}>
                    <Searchbar
                      placeholder="Search"
                      onChangeText={(text) => handleSearch(text)}
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
                    defaultData={roleData.data?.permissions}
                  />

                  <View style={{ marginVertical: 20 }}>
                    <Button
                      loading={loading}
                      onPress={handleSubmit}
                      title="Save"
                    />
                  </View>
                </View>
              )}

              {active == 0 && (
                <ViewPermissions roleId={roleData?.data?.roleId} />
              )}
            </View>
          </>
        )}
      </GlobalLoader>
    </>
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
      fontFamily: "Regular",
    },
    searchInput: {
      fontSize: 15,
      color: placeholderTextColor,
      paddingBottom: 20,
      fontFamily: "Regular",
    },
     screen: {
    minHeight: '100%',
    flex: 1,
  },
  tabContent: {
    flex: 1,
    paddingBottom: 90,
  },
  deleteButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  inputWrapper: {
    marginTop: 12,
    marginBottom: 16,
  },
    section: {
    marginVertical: 8, // equivalent to Tailwind `my-2`
  },
  labelSpacing: {
    marginBottom: 5,
  },
  permissionNote: {
    marginLeft: 56, // Tailwind `ml-14` (14 * 4 = 56)
    marginBottom: 8, // Tailwind `mb-2`
  },
  });
};

export default SecurePageByPackage(EditPermission, ["edit_permission"]);
