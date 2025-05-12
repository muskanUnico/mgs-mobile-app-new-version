 import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getPaymentHistory } from "../../hooks/Payment";
import { navigate } from "../../utils/navigationServices";
import Loader from "../../components/elements/Loader/Loader";
import PaymentHistory from "../../components/ui/PaymentHistory/PaymentHistory";
import CustomPagination from "../../components/elements/CustomPagination/CustomPagination";
import { FilterAppointmentFeature } from "../Appointment/FilterAppointmentFeature/FilterAppointmentFeature";
import { transformData } from "../../utils/tools";
import { pieColor1, pieColor2, pieColor3 } from "../../constants/COLORS";

const PaymentHistoryFeature = () => {
  const { data, setparams, loading, setPage, page } = getPaymentHistory();

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
      navigate("viewinvoice", { paymentId: item?.appointmentId.paymentId });
    } else if (options.id == 3) {
      navigate("ViewAppointment", {
        id: item?.appointmentId?._id,
        selectedTab: 1,
      });
    } else if (options.id == 1) {
      navigate("paymentpage", {
        customerId: item?.customerId?.id || item?.customerId,
        appointmentId: item.appointmentId?.id,
        amount: item.payment?.amount,
        appointmentData: transformData(item),
      });
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
