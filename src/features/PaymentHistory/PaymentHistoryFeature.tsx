import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import CustomPagination from "../../components/elements/CustomPagination/CustomPagination";
import Loader from "../../components/elements/Loader/Loader";
import PaymentHistory from "../../components/ui/PaymentHistory/PaymentHistory";
import { pieColor1, pieColor2, pieColor3 } from "../../constants/COLORS";
import { getPaymentHistory } from "../../hooks/Payment";
import { transformData } from "../../utils/tools";
import { FilterAppointmentFeature } from "../Appointment/FilterAppointmentFeature/FilterAppointmentFeature";

const PaymentHistoryFeature = () => {
  const { data, setparams, loading, setPage, page } = getPaymentHistory();
  const router = useRouter();

  const options = [
    {
      id: 1,
      title: "Collect Payment",
      icon: <MaterialIcons name="attach-money" size={24} color={pieColor1} />,
      line: true,
    },
    {
      id: 2,
      title: "View Invoice",
      icon: <MaterialIcons name="receipt" size={24} color={pieColor2} />,
      line: true,
    },
    {
      id: 3,
      title: "Patient Notes",
      icon: <MaterialIcons name="note" size={24} color={pieColor3} />,
      line: true,
    },
  ];

  // handle button of three dots
  const handleOptions = (options: any, item: any) => {
   
    if (options.id == 2) {
      router.push({
        pathname: "/viewInvoice",
        params: { paymentId:  item?.appointmentId.paymentId },
      });

    } else if (options.id == 3) {

      router.push({
        pathname: "/viewAppointments",
        params: { id: item?.appointmentId._id, selectedTab: 1},
      });

   
    } else if (options.id == 1) {
     router.push({
        pathname:"/paymentPage", 
        params:{
        customerId: item?.customerId?.id || item?.customerId,
        appointmentId: item.appointmentId?.id,
        amount: item.payment?.amount,
        appointmentData: JSON.stringify(transformData(item)),
      },});
    }
  };

  return (
    <View>
      <FilterAppointmentFeature
        setData={(filter: any) => {
          setparams((old: any) => ({
            ...old,
            query_services: filter.serviceFilter,
            query_teams: filter.teamMemberFilter,
            status: filter.appointmentStatusFilter,
            payment_status: filter.paymentStatusFilter,
            date: filter.dateFilter,
            query_customers: filter.customerFilter,
          }));
        }}
      />

      {!loading ? (
        <>
          {data.results.map((item, index) => {
            return (
              <PaymentHistory
                item={item}
                handleOptions={handleOptions}
                options={options}
                key={index}
                index={index}
              />
            );
          })}
          <CustomPagination
            gotoPage={setPage}
            totalPage={data.totalPages}
            pageIndex={page}
          />
        </>
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default PaymentHistoryFeature;
