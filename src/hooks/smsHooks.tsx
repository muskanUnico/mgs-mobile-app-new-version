import { SMSService } from "../services/smsServices";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

export const useGetSMS = (customerId: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [msg, setMsg] = useState({
    data: [],
    pagination: {
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      pageSize: 10,
    },
  });

  const [params, setparams] = useState<any>({
    page: 1,
    customerId,
  });

  const { page } = params;

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  const setPage = (page: number) => {
    setparams({ ...params, page: page });
  };

  useFocusEffect(
    useCallback(() => {
      if (!customerId) return;
      SMSService.getSMS(params)
        .then((res) => {
          setMsg((prevMsg) => ({
            ...res,
            data: [...prevMsg.data, ...res.data],
          }));
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter, params, customerId])
  );

  return { msg, refetch, loading, params, setparams, setPage, page };
};

export const useSendSMS = () => {
  const [loading, setLoading] = useState(true);

  const handleSendSMS = (body: any) => {
    setLoading(false);
    SMSService.sendSMS(body)
      .then((res) => {
        if (res.success) {
          setLoading(true);
        }
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleSendSMS, loading };
};
