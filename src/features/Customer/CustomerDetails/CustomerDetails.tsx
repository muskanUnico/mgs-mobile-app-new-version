//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";

// components
import { useRouter } from "expo-router";
import Loader from "../../../components/elements/Loader/Loader";
import Title from "../../../components/elements/Title/Title";
import AddNotes from "../../../components/ui/Customer/AddNotes/AddNotes";
import BuyerSummary from "../../../components/ui/Customer/BuyerSummary/BuyerSummary";
import CustomerActivity from "../../../components/ui/Customer/CustomerActivity/CustomerActivity";
import EditPersonalDetails from "../../../components/ui/Customer/EditPersonalDetails/EditPersonalDetails";
import PastAppointments from "../../../components/ui/Customer/PastAppointments/PastAppointments";
import PersonalDetails from "../../../components/ui/Customer/PersonalDetails/PersonalDetails";
import UpcomingAppointments from "../../../components/ui/Customer/UpcomingAppointments/UpcomingAppointments";
import {
  getPastAppointments,
  getSingleCustomer,
  useUpdateCustomer,
} from "../../../hooks/Customer";
import ManagesCustomerCards from "../ManageCustomerCards/ManagesCustomerCards";

const CustomerDetails = ({ navigation, route, customerId }: any) => {
  const bottomSheetRef = useRef<any>(null);
  let customerDetail = getSingleCustomer(customerId);
  const appointments = getPastAppointments(customerId);
  const router = useRouter();

  let customer = customerDetail.data && customerDetail.data.customer;
  let buyerSummary = customerDetail.data && customerDetail.data.buyerSummary;

  // data manage
  const [formData, setFromData] = useState({
    name: "",
    telephone: "",
    email: "",
    address: "",
    refId: "",
    dob: "",
  });

  useEffect(() => {
    setFromData({
      name: customer?.name,
      telephone: customer?.telephone,
      email: customer?.email,
      address: customer?.address,
      refId: customer?.refId,
      dob: customer?.dob,
    });
  }, [customerDetail.data]);

  const { submit, loading } = useUpdateCustomer(
    customerId,
    formData,
    navigation,
    bottomSheetRef
  );

  return (
    <View style={{ minHeight: "100%" ,paddingBottom:60}}>
      {customerDetail.loading ? (
        <Loader />
      ) : (
        <View>
          <Title
            navigation={navigation}
            title={`${customerDetail?.data?.customer?.name}`}
          />

          <PersonalDetails
            data={customerDetail.data?.customer}
            handleEdit={() => bottomSheetRef.current.open()}
            handleRelocate={() =>
              router.push({
                pathname: "/(stack)/intakeForm",
                params: { id: customer?.id },
              })
            }
          />

          <UpcomingAppointments customerId={customerId} />

          <PastAppointments appointments={appointments} />
          <AddNotes data={customer} />
          <BuyerSummary data={buyerSummary} />

          <CustomerActivity customerId={customerId} />

          <ManagesCustomerCards customerId={customerId} />

          {/* -------------- edit personal details ------------------*/}

          <EditPersonalDetails
            setFromData={setFromData}
            formData={formData}
            bottomSheetRef={bottomSheetRef}
            handleSaveCustomer={submit}
            loading={loading}
          />
        </View>
      )}
    </View>
  );
};

export default CustomerDetails;
