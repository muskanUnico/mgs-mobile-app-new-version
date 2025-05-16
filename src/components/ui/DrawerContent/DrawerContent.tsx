import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import { PermissionAccess } from "../../../middleware/PermissionAccess";
import { navigate } from "../../../utils/navigationServices";


const DrawerContent = (props: any) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const { user, setUser } = useAuth();
  const [dropdownTabs, setDropdownTabs] = useState([
    "appointments",
    "customers",
  ]);
 

  const SCREEN_WIDTH = Dimensions.get("window").width;

  const handleDropdown = (key: string) => {
    let arr = [...dropdownTabs];
    if (arr.includes(key)) {
      arr = arr.filter((item) => item != key);
    } else {
      arr.push(key);
    }
    setDropdownTabs(arr);
  };

  const handleLogout = () => {
    props.navigation.dispatch(DrawerActions.closeDrawer());
    AsyncStorage.removeItem("user");
    setUser(null);
  };

  const getInitialLetter = (name: string) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  const isDropdownOpen = (key: string) => {
    return dropdownTabs.includes(key);
  };


  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          marginTop: -SCREEN_WIDTH * 0.0305,
           marginRight: -SCREEN_WIDTH * 0.0315,
           marginLeft: -SCREEN_WIDTH * 0.0295,
          backgroundColor: theme.brandColor,
          paddingTop: 12,
        }}
      >
        <TouchableHighlight
          underlayColor={theme.brandColor}
          onPress={() => props.navigation.navigate("MyProfile")}
        >
          <View style={styles.centeredContainer}>
            <View style={styles.customItem}>
              <Avatar.Text
                size={70}
                label={getInitialLetter(user?.name)}
                labelStyle={{
                  color: "#f59b90",
                  fontSize: 32,
                  textTransform: "uppercase",
                  fontFamily: "Regular",
                }}
                style={{ backgroundColor: "#fff8f5" }}
              />
            </View>
            <Text style={styles.pageTitle}>{user?.name}</Text>
            <Text style={[styles.emailText, { fontFamily: "BoldText" }]}>
              {user?.email}
            </Text>
          </View>
        </TouchableHighlight>

        <View style={styles.customView}>
          {/* Your sidebar content */}
          <TouchableHighlight
            onPress={() => props.navigation.navigate("(tabs)")}
            style={styles.drawerItem}
            underlayColor="transparent"
          >
            <View style={styles.uniqueRowLayout}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.iconWrapper}>
                  <Icon name="home" size={20} style={styles.icon} />
                </View>
                <Text
                  style={styles.boldtext}
                >
                  Home
                </Text>
              </View>
            </View>
          </TouchableHighlight>

          <PermissionAccess requiredPermissions={["view_appointments"]}>
            {/* Appointments */}
            <TouchableOpacity
              onPress={() => handleDropdown("appointments")}
              style={styles.drawerItem}
            >
              <View style={styles.uniqueRowLayout}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.iconWrapper}>
                    <Icon name="calendar" size={20} style={styles.icon} />
                  </View>
                  <Text
                    style={styles.boldtext}
                  >
                    Appointments
                  </Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={26}
                  color={"#848484"}
                  style={
                    isDropdownOpen("appointments") ? styles.iconRotate : null
                  }
                />
              </View>
            </TouchableOpacity>

            {dropdownTabs.includes("appointments") && (
              <>
                {/* All Appointments */}
                <TouchableHighlight
                  underlayColor={theme.brandGreyColor}
                 onPress={() => props.navigation.navigate("allAppointments")}
                  style={styles.drawerSubItem}
                >
                  <View style={styles.rowLayout}>
                    <MaterialIcons name="list" size={20} />
                    <Text
                      style={{
                        marginLeft: 10,
                        fontFamily: "Regular",
                        fontSize: 12,
                      }}
                    >
                      All Appointments
                    </Text>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight
                  underlayColor={theme.brandGreyColor}
                  onPress={() =>
                    props.navigation.navigate("ApprovedAppointment")
                  }
                  style={styles.drawerSubItem}
                >
                  <View style={styles.rowLayout}>
                    <MaterialIcons name="done" size={20} />
                    <Text
                      style={{
                        marginLeft: 10,
                        fontFamily: "Regular",
                        fontSize: 12,
                      }}
                    >
                      Approved Appointments
                    </Text>
                  </View>
                </TouchableHighlight>

                <PermissionAccess requiredPermissions={["create_appointments"]}>
                  <TouchableHighlight
                    underlayColor={theme.brandGreyColor}
                    // CreateAppointment
                    onPress={() =>
                      props.navigation.navigate("CreateAppointment")
                    }
                    style={styles.drawerSubItem}
                  >
                    <View style={styles.rowLayout}>
                      <MaterialIcons name="add" size={20} />
                      <Text
                        style={{
                          marginLeft: 10,
                          fontFamily: "Regular",
                          fontSize: 12,
                        }}
                      >
                        Create Appointment
                      </Text>
                    </View>
                  </TouchableHighlight>
                </PermissionAccess>
              </>
            )}
          </PermissionAccess>

          {/* Customers */}
          <TouchableOpacity
            onPress={() => handleDropdown("customers")}
            style={styles.drawerItem}
          >
            <View style={styles.uniqueRowLayout}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.iconWrapper}>
                  <Icon name="account-multiple" size={20} style={styles.icon} />
                </View>
                <Text
                  style={styles.boldtext}
                >
                  Customers
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={26}
                color={"#848484"}
                style={isDropdownOpen("customers") ? styles.iconRotate : null}
              />
            </View>
          </TouchableOpacity>
          {dropdownTabs.includes("customers") && (
            <>
              {/* <PermissionAccess requiredPermissions={["view_customers"]}> */}
              {/* All Customers */}
              <TouchableHighlight
                underlayColor={theme.brandGreyColor}
                onPress={() => props.navigation.navigate("allCustomer")}
                style={styles.drawerSubItem}
              >
                <View style={styles.rowLayout}>
                  <Icon name="account-group" size={20} />

                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: "Regular",
                      fontSize: 12,
                    }}
                  >
                    All Customers
                  </Text>
                </View>
              </TouchableHighlight>
              {/* </PermissionAccess> */}
              {/* Add Customers */}

              {/* <PermissionAccess requiredPermissions={["create_customer"]}> */}
              <TouchableHighlight
                underlayColor={theme.brandGreyColor}
                onPress={() => props.navigation.navigate("createCustomer")}
                style={styles.drawerSubItem}
              >
                <View style={styles.rowLayout}>
                  <Icon name="account-plus" size={20} />

                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: "Regular",
                      fontSize: 12,
                    }}
                  >
                    Add Customers
                  </Text>
                </View>
              </TouchableHighlight>
              {/* </PermissionAccess> */}
            </>
          )}

          <PermissionAccess requiredPermissions={["view_referral"]}>
            {/* Referral */}
            <TouchableOpacity
              onPress={() => handleDropdown("referral")}
              style={styles.drawerItem}
            >
              <View style={styles.uniqueRowLayout}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.iconWrapper}>
                    <Icon name="share" size={20} style={styles.icon} />
                  </View>
                  <Text
                    style={styles.boldtext}
                  >
                    Referral
                  </Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={26}
                  color={"#848484"}
                  style={isDropdownOpen("referral") ? styles.iconRotate : null}
                />
              </View>
            </TouchableOpacity>
            {dropdownTabs.includes("referral") && (
              <>
                <PermissionAccess requiredPermissions={["view_referral"]}>
                  {/* All Referrals */}
                  <TouchableHighlight
                    underlayColor={theme.brandGreyColor}
                    onPress={() => props.navigation.navigate("allReferral")}
                    style={styles.drawerSubItem}
                  >
                    <View style={styles.rowLayout}>
                      <Icon name="account-group" size={20} />

                      <Text
                        style={{
                          marginLeft: 10,
                          fontFamily: "Regular",
                          fontSize: 12,
                        }}
                      >
                        All Referrals
                      </Text>
                    </View>
                  </TouchableHighlight>
                </PermissionAccess>

                <PermissionAccess requiredPermissions={["create_referral"]}>
                  {/* Add Referral */}
                  <TouchableHighlight
                    underlayColor={theme.brandGreyColor}
                    onPress={() => props.navigation.navigate("addReferrals")}
                    style={styles.drawerSubItem}
                  >
                    <View style={styles.rowLayout}>
                      <Icon name="account-plus-outline" size={20} />

                      <Text
                        style={{
                          marginLeft: 10,
                          fontFamily: "Regular",
                          fontSize: 12,
                        }}
                      >
                        Add Referral
                      </Text>
                    </View>
                  </TouchableHighlight>
                </PermissionAccess>
              </>
            )}
          </PermissionAccess>

          <PermissionAccess requiredPermissions={["view_payments"]}>
            {/* Payment History */}
            <TouchableHighlight
              underlayColor={theme.brandGreyColor}
              style={styles.drawerItem}
              onPress={() => props.navigation.navigate("paymentHistory")}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.iconWrapper}>
                  <MaterialIcons name="payment" size={20} style={styles.icon} />
                </View>

                <Text
                  style={styles.boldtext}
                >
                  Payment History
                </Text>
              </View>
            </TouchableHighlight>
          </PermissionAccess>

          <PermissionAccess requiredPermissions={["view_member"]}>
            {/* Team Members */}
            <TouchableOpacity
              onPress={() => handleDropdown("team-members")}
              style={styles.drawerItem}
            >
              <View style={styles.uniqueRowLayout}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.iconWrapper}>
                    <Icon
                      name="account-group-outline"
                      size={20}
                      style={styles.icon}
                    />
                  </View>
                  <Text
                    style={ styles.boldtext}
                  >
                    Team Members
                  </Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={26}
                  color={"#848484"}
                  style={
                    isDropdownOpen("team-members") ? styles.iconRotate : null
                  }
                />
              </View>
            </TouchableOpacity>
            {dropdownTabs.includes("team-members") && (
              <>
                {/* All Team Members */}
                <TouchableHighlight
                  underlayColor={theme.brandGreyColor}
                  onPress={() => props.navigation.navigate("team")}
                  style={styles.drawerSubItem}
                >
                  <View style={styles.rowLayout}>
                    <Icon name="account-group" size={20} />

                    <Text
                      style={{
                        marginLeft: 10,
                        fontFamily: "Regular",
                        fontSize: 12,
                      }}
                    >
                      All Team Members
                    </Text>
                  </View>
                </TouchableHighlight>

                {/* Leave Calendar */}
                <TouchableHighlight
                  underlayColor={theme.brandGreyColor}
                  onPress={() => props.navigation.navigate("LeaveCalendar")}
                  style={styles.drawerSubItem}
                >
                  <View style={styles.rowLayout}>
                    <Icon name="calendar-clock" size={20} />

                    <Text
                      style={{
                        marginLeft: 10,
                        fontFamily: "Regular",
                        fontSize: 12,
                      }}
                    >
                      Leave Calendar
                    </Text>
                  </View>
                </TouchableHighlight>

                <PermissionAccess requiredPermissions={["create_member"]}>
                  {/* Add Team Members */}
                  <TouchableHighlight
                    underlayColor={theme.brandGreyColor}
                    onPress={() =>
                      props.navigation.navigate("createTeamMember")
                    }
                    style={styles.drawerSubItem}
                  >
                    <View style={styles.rowLayout}>
                      <Icon name="account-plus-outline" size={20} />

                      <Text
                        style={{
                          marginLeft: 10,
                          fontFamily: "Regular",
                          fontSize: 12,
                        }}
                      >
                        Add Team Members
                      </Text>
                    </View>
                  </TouchableHighlight>
                </PermissionAccess>

                {/* Time Tracker */}
                <TouchableHighlight
                  onPress={() => navigate("Timetracker")}
                  underlayColor={theme.brandGreyColor}
                  style={styles.drawerSubItem}
                >
                  <View style={styles.rowLayout}>
                    <Icon name="timer" size={20} />

                    <Text
                      style={{
                        marginLeft: 10,
                        fontFamily: "Regular",
                        fontSize: 12,
                      }}
                    >
                      Time Tracker
                    </Text>
                  </View>
                </TouchableHighlight>

                <PermissionAccess requiredPermissions={["view_payroll"]}>
                  {/* Manage Payroll */}
                  <TouchableHighlight
                    underlayColor={theme.brandGreyColor}
                    onPress={() => props.navigation.navigate("managePayroll")}
                    style={styles.drawerSubItem}
                  >
                    <View style={styles.rowLayout}>
                      <Icon name="currency-usd" size={20} />

                      <Text
                        style={{
                          marginLeft: 10,
                          fontFamily: "Regular",
                          fontSize: 12,
                        }}
                      >
                        Manage Payroll
                      </Text>
                    </View>
                  </TouchableHighlight>
                </PermissionAccess>
              </>
            )}
          </PermissionAccess>

          <PermissionAccess
            matchPermissions={[
              "manage_sales_revenue_report",
              "view_income_vs_expense_report",
              "appointment_report",
            ]}
          >
            {/* Accounts */}
            <TouchableOpacity
              onPress={() => handleDropdown("accounts")}
              style={styles.drawerItem}
            >
              <View style={styles.uniqueRowLayout}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.iconWrapper}>
                    <Icon
                      name="calculator-variant"
                      size={20}
                      style={styles.icon}
                    />
                  </View>
                  <Text
                    style={styles.boldtext}
                  >
                    Accounts
                  </Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={26}
                  color={"#848484"}
                  style={isDropdownOpen("accounts") ? styles.iconRotate : null}
                />
              </View>
            </TouchableOpacity>
            {dropdownTabs.includes("accounts") && (
              <>
                <PermissionAccess
                  requiredPermissions={["manage_sales_revenue_report"]}
                >
                  {/* Sales Revenue Report */}
                  <TouchableHighlight
                    underlayColor={theme.brandGreyColor}
                    onPress={() => props.navigation.navigate("RevenueReport")}
                    style={styles.drawerSubItem}
                  >
                    <View style={styles.rowLayout}>
                      <Icon name="chart-bar" size={20} />

                      <Text
                        style={{
                          marginLeft: 10,
                          fontFamily: "Regular",
                          fontSize: 12,
                        }}
                      >
                        Sales Revenue Report
                      </Text>
                    </View>
                  </TouchableHighlight>
                </PermissionAccess>

                <PermissionAccess
                  requiredPermissions={["view_income_vs_expense_report"]}
                >
                  {/* Income vs Expense Report */}
                  <TouchableHighlight
                    underlayColor={theme.brandGreyColor}
                    onPress={() => props.navigation.navigate("IncomeVsExpense")}
                    style={styles.drawerSubItem}
                  >
                    <View style={styles.rowLayout}>
                      <Icon name="account-group" size={20} />

                      <Text
                        style={{
                          marginLeft: 10,
                          fontFamily: "Regular",
                          fontSize: 12,
                        }}
                      >
                        {" "}
                        Income vs Expense Report
                      </Text>
                    </View>
                  </TouchableHighlight>
                </PermissionAccess>

                <PermissionAccess requiredPermissions={["appointment_report"]}>
                  {/* Appointment Report */}
                  <TouchableHighlight
                    underlayColor={theme.brandGreyColor}
                    onPress={() =>
                      props.navigation.navigate("AppointmentReport")
                    }
                    style={styles.drawerSubItem}
                  >
                    <View style={styles.rowLayout}>
                      <Icon name="file-chart" size={20} />

                      <Text
                        style={{
                          marginLeft: 10,
                          fontFamily: "Regular",
                          fontSize: 12,
                        }}
                      >
                        Appointment Report
                      </Text>
                    </View>
                  </TouchableHighlight>
                </PermissionAccess>
              </>
            )}
          </PermissionAccess>

          {/* App Settings */}
          <TouchableOpacity
            onPress={() => handleDropdown("settings")}
            style={styles.drawerItem}
          >
            <View style={styles.uniqueRowLayout}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.iconWrapper}>
                  <Icon name="cog-outline" size={20} style={styles.icon} />
                </View>
                <Text
                  style={styles.boldtext}
                >
                  App Settings
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={26}
                color={"#848484"}
                style={isDropdownOpen("settings") ? styles.iconRotate : null}
              />
            </View>
          </TouchableOpacity>
          {dropdownTabs.includes("settings") && (
            <>
              <PermissionAccess requiredPermissions={["view_permission"]}>
                {/* Permissions */}
                <TouchableHighlight
                  underlayColor={theme.brandGreyColor}
                  onPress={() => props.navigation.navigate("AllPermissions")}
                  style={styles.drawerSubItem}
                >
                  <View style={styles.rowLayout}>
                    <Icon name="account-check" size={20} />

                    <Text
                      style={{
                        marginLeft: 10,
                        fontFamily: "Regular",
                        fontSize: 12,
                      }}
                    >
                      Permissions
                    </Text>
                  </View>
                </TouchableHighlight>
              </PermissionAccess>

              <PermissionAccess requiredPermissions={["view_service"]}>
                {/* Services */}
                <TouchableHighlight
                  underlayColor={theme.brandGreyColor}
                  onPress={() => props.navigation.navigate("AllServices")}
                  style={styles.drawerSubItem}
                >
                  <View style={styles.rowLayout}>
                    <Icon name="briefcase-check" size={20} />

                    <Text
                      style={{
                        marginLeft: 10,
                        fontFamily: "Regular",
                        fontSize: 12,
                      }}
                    >
                      Services
                    </Text>
                  </View>
                </TouchableHighlight>
              </PermissionAccess>

              {/* CMS */}
              <TouchableHighlight
                underlayColor={theme.brandGreyColor}
                onPress={() => props.navigation.navigate("Cms")}
                style={styles.drawerSubItem}
              >
                <View style={styles.rowLayout}>
                  <Icon name="file-document-edit" size={20} />

                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: "Regular",
                      fontSize: 12,
                    }}
                  >
                    CMS
                  </Text>
                </View>
              </TouchableHighlight>
            </>
          )}

          <View style={styles.line} />
          <TouchableWithoutFeedback onPress={handleLogout}>
            <View style={styles.rowLayout2}>
              <Text
                style={[
                  styles.customText,
                  { fontFamily: "BoldText", color: theme.brandColor },
                ]}
              >
                Logout
              </Text>
              <Icon name="logout" size={20} color={theme.brandColor} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const useStyles = () => {
  const { theme } = useTheme();
  const ScreenWidth = Dimensions.get("window").width;

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerItem: {
      paddingVertical: 10,
      paddingLeft: 15,
      paddingRight: 10,
      marginHorizontal: 3,
      margin: 2,
      borderRadius: 10,
    },
    drawerSubItem: {
      paddingVertical: 8,
      paddingHorizontal: 15,
      marginHorizontal: 10,
    },
    rowLayout: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 24,
    },
    drawerItemText: {
      fontSize: 16,
      color: "white",
    },
    uniqueRowLayout: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    customItem: {
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    customView: {
      borderTopRightRadius: 100,
      backgroundColor: "white",
      minHeight: "100%",
    },
    gradientContainer: {
      marginVertical: 10,
      height: 130,
      overflow: "hidden",
    },
    pageTitle: {
      fontSize: 20,
      color: "white",
      fontFamily: "BoldText",
    },
    line: {
      borderBottomWidth: 1,
      borderBottomColor: "#D9D9D9",
      marginVertical: 10,
    },

    iconWrapper: {
      padding: 5,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.brandColor,
    },
    topPadding: {
      paddingTop: 12,
    },
    icon: {
      color: theme.brandWhiteColor,
    },
    iconRotate: {
      transform: [{ rotate: "90deg" }],
    },
    customText: {
      fontSize: 16,
      fontWeight: "500",
      color: "#f59b90",
      marginRight: 8,
    },
    rowLayout2: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingLeft: 24,
      marginHorizontal: 20,
      marginBottom: 20,
    },
    customText2: {
      fontSize: 15,
      fontWeight: "500",
      color: "white",
      marginBottom: 24,
    },
    centeredContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    emailText: {
      fontSize: 15,
      fontWeight: "500",
      color: "white",
      marginBottom: 24,
    },
    boldtext:{
      marginLeft: 10,
      fontFamily: "BoldText",
      fontSize: 13,
      fontWeight: "800",
    }
  });
};

export default DrawerContent;
