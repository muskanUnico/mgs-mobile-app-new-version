//@ts-nocheck
import { styles as externalStyles } from "@/src/assets/css";
import Loader from "@/src/components/elements/Loader/Loader";
import Title from "@/src/components/elements/Title/Title";
import { Address } from "@/src/components/ui/ViewInvoiceUI/Address";
import { Billto } from "@/src/components/ui/ViewInvoiceUI/Billto";
import { Payinfo } from "@/src/components/ui/ViewInvoiceUI/Payinfo";
import { Table } from "@/src/components/ui/ViewInvoiceUI/Table";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { useGetSingleViewInvoice } from "@/src/hooks/Payment";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import { formatDateforHeader } from "@/src/utils/tools";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";

const ViewInvoiceScreen = ({ navigation, route }: any) => {
  const {paymentId } = useLocalSearchParams();

  const { data, isLoading } = useGetSingleViewInvoice(paymentId);

  if (!isLoading) {
    return <Loader />;
  }

  if (!data) {
    return (
      <Text style={{ textAlign: "center", paddingTop: 320 }}>
        Data Not Found
      </Text>
    );
  } 

  




  return (
    <SafeAreaView
      style={{ minHeight: "100%", paddingBottom: 96, backgroundColor: "white" }}
    >
      <GlobalLoader>
        <Title navigation={navigation} title="Invoice" />
        <Text
          style={[
            externalStyles.globalFontBold,
            { fontSize: 24, marginTop: 8, paddingHorizontal: 12 },
          ]}
        >
          Invoice |
          {data?.appointmentId?.date != undefined &&
            formatDateforHeader(
              data.appointmentId?.date,
              data.appointmentId?.start_time_range,
              data.appointmentId?.end_time_range
            )}
        </Text>
        <View
          style={{
            flex: 1,
            marginTop: 16,
            paddingBottom: 40,
            marginHorizontal: 8,
          }}
        >
          <View style={[externalStyles.pinkcard]}>
            <Address />
            <Billto data={data} />
            <Table data={data} />
            <Payinfo invoicedata={data} />
          </View>
        </View>
      </GlobalLoader>
    </SafeAreaView>
  );
};

export default SecurePageByPackage(ViewInvoiceScreen, ["view_invoice"]);
