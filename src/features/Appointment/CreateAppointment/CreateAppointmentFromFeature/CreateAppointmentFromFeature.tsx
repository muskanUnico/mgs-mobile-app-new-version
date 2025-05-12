import moment from "moment";
import React, { useEffect, useState } from "react";
import { getCustomers } from "../../../../hooks/Customer";
import { convertToISOFormat } from "../../../../utils/functions";
import { convertStringTimeToNumber } from "../../../../utils/tools";
import CreateAppointmentForm from "../../../../components/ui/Appointment/CreateAppointment/CreateAppointmentForm/CreateAppointmentForm";

// Define types for client data and details
interface ClientData {
  defaultValue: {
    email: string;
    value: string;
    telephone: string;
  };
  setValue: (value: { value: string; title: string; email: string; phone: string }) => void;
}

interface Details {
  date: string;
  time?: string | number;
}

interface Props {
  clientData: ClientData;
  details: Details;
  setDetails: (details: Details) => void;
}

interface CustomerData {
  title: string;
  id: string;
  data: {
    email: string;
    phone: string;
  };
}

const CreateAppointmentFromFeature: React.FC<Props> = ({
  clientData,
  details,
  setDetails,
}) => {
  const [value, setValue] = useState<CustomerData>({
    title: clientData?.defaultValue?.email || "",
    id: clientData?.defaultValue?.value || "",
    data: {
      email: clientData?.defaultValue?.email || "",
      phone: clientData?.defaultValue?.telephone || "",
    },
  });

  const [selectedData, setSelectedData] = useState<{
    email: string;
    phone: string;
  }>({
    email: "",
    phone: "",
  });

  // Date and time management
  const [time, setTime] = useState<Date>(new Date(convertToISOFormat(details)));
  const [date, setDate] = useState<Date>(new Date(details.date));

  // Integration: Fetching customer list
  const customerList = getCustomers({
    defaultParams: { limit: 10000 },
  });

  const list: CustomerData[] = customerList.data.map((item: any) => ({
    title: item?.name || "",
    id: item?._id || "",
    data: {
      email: item?.email || "",
      phone: item?.telephone || "",
    },
  }));

  useEffect(() => {
    if (!value?.data) return;
    setSelectedData({
      email: value.data.email,
      phone: value.data.phone,
    });
  }, [value]);

  useEffect(() => {
    if (clientData) {
      clientData.setValue({
        value: value.id,
        title: value.title || "",
        email: selectedData.email,
        phone: selectedData.phone,
      });
    }
  }, [value, selectedData]);

  useEffect(() => {
    if (!setDetails || details.time === undefined) return;

    setDetails({
      date: moment(date).format("YYYY-MM-DD"),
      time: convertStringTimeToNumber(moment(time).format("HHmm")),
    });
  }, [time, date]);

  return (
    <CreateAppointmentForm
      value={value}
      setValue={setValue}
      // Date and time
      date={date}
      setDate={setDate}
      time={time}
      setTime={setTime}
      // Client info
      setSelectedData={setSelectedData}
      selectedData={selectedData}
      list={list}
    />
  );
};

export default CreateAppointmentFromFeature;
