import React, { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import HomeCards from "@/src/features/Home/HomeCards";
import Tabs from "@/src/components/elements/Tabs/Tabs";
import { styles as externalStyles } from "@/src/assets/css";
import { HomeSection } from "@/src/features/Home/HomeSection";
import HomeChartFeature from "@/src/features/Home/HomeChartFeature";
import { useTopCustomer, useTopMembers } from "@/src/hooks/Reports";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { View, ImageBackground, StyleSheet, Text } from "react-native";
import { PermissionAccess } from "@/src/middleware/PermissionAccess";
import CustomCard from "@/src/components/elements/CustomCard/CustomCard";
import Top5CustomersTable from "@/src/features/Accounts/Analytics/Top_5_Customers/Table";
import { useTheme } from "@/src/context/ThemeContext";

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const { customers } = useTopCustomer();
  const { members } = useTopMembers();
  const { theme } = useTheme();
  const { user } = useAuth();

  const tabs = [ 
    { id: 1, label: "Top 5 Customers" },
    { id: 2, label: "Top 5 Team Members" },
  ];

  return (
    <ImageBackground
      source={require("@/src/assets/images/home.png")}
      style={styles.backgroundImage}
    >
      <GlobalLoader>
        <View style={{ marginTop: 12, marginBottom: 12, marginLeft: 40 }}>
          <Text
            style={[
              externalStyles.globalFontBold,
              {
                color: theme.brandWhiteColor,
                fontSize: 26,
                flexWrap: "wrap",
                textShadowColor: "black",
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
              },
            ]}
          >
            Hi {user?.name}
          </Text>
        </View>

         <PermissionAccess matchPermissions={["view_appointments"]}>
          <HomeCards />
        </PermissionAccess>
 
        <PermissionAccess
          matchPermissions={[
            "manage_sales_revenue_report",
            "view_income_vs_expense_report",
          ]}
        >
          <HomeSection />
        </PermissionAccess>

        <PermissionAccess matchPermissions={["view_income_vs_expense_report"]}>
          <HomeChartFeature />
        </PermissionAccess>

        <PermissionAccess
          requiredPermissions={["view_customers", "view_member"]}
        >
          <View style={{ marginVertical: 8, marginLeft: 16 }}>
            <Tabs
              tabs={tabs}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </View>

          {selectedTab === 1 && (
            <View style={[externalStyles.card]}>
              <Top5CustomersTable customers={customers} />
            </View>
          )}

          {selectedTab === 2 && (

        
            <View style={[externalStyles.card]}>
              {members.map((item: any, index: any) => {
                return <CustomCard item={item} index={index} key={index} />;
              })}
            </View>
          )}
        </PermissionAccess>  
      </GlobalLoader>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default HomeScreen;



