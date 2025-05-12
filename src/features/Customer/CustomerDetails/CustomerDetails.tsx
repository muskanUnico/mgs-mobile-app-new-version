//@ts-nocheck
import { View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

// components
import Loader from "../../../components/elements/Loader/Loader";
import Title from "../../../components/elements/Title/Title";
import AddNotes from "../../../components/ui/Customer/AddNotes/AddNotes";
import {
  getPastAppointments,
  getSingleCustomer,
  useUpdateCustomer,
} from "../../../hooks/Customer";
import ManagesCustomerCards from "../ManageCustomerCards/ManagesCustomerCards";
import BuyerSummary from "../../../components/ui/Customer/BuyerSummary/BuyerSummary";
import PastAppointments from "../../../components/ui/Customer/PastAppointments/PastAppointments";
import PersonalDetails from "../../../components/ui/Customer/PersonalDetails/PersonalDetails";
import CustomerActivity from "../../../components/ui/Customer/CustomerActivity/CustomerActivity";
import UpcomingAppointments from "../../../components/ui/Customer/UpcomingAppointments/UpcomingAppointments";
import EditPersonalDetails from "../../../components/ui/Customer/EditPersonalDetails/EditPersonalDetails";
import { navigate } from "../../../utils/navigationServices";

const CustomerDetails = ({ navigation, route }: any) => {
  const bottomSheetRef = useRef<any>(null);
  let customerDetail = getSingleCustomer(route.params.customerId);
  const appointments = getPastAppointments(route.params.customerId);

  let customer = customerDetail.data && customerDetail.data.customer;
  let buyerSummary = customerDetail.data && customerDetail.data.buyerSummary;

  // data manage
  const [formData, setFromData] = useState({
    name: "",
    telephone: "",
    email: "",
    address: "",
    RefId: "",
    dob: "",
  });

  useEffect(() => {
    setFromData({
      name: customer?.name,
      telephone: customer?.telephone,
      email: customer?.email,
      address: customer?.address,
      RefId: customer?.referenceId,
      dob: customer?.dob,
    });
  }, [customerDetail.data]);

  const { submit, loading } = useUpdateCustomer(
    route.params.customerId,
    formData,
    navigation,
    bottomSheetRef
  );

  return (
    <View style={{ minHeight: "100%" }}>
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
            handleRelocate={() => navigate("IntakeForm", { id: customer?.id })}
          />

          <UpcomingAppointments customerId={route.params.customerId} />

          <PastAppointments appointments={appointments} />
          <AddNotes data={customer} />
          <BuyerSummary data={buyerSummary} />

          <CustomerActivity customerId={route.params.customerId} />

          <ManagesCustomerCards customerId={route.params.customerId} />

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
