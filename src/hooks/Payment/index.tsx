import { useCallback, useEffect, useState } from "react";
import { removeEmptyValues } from "../../utils/tools";
//interface
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { PaymentResults } from "../../interface/Customer";
import { PaymentService } from "../../services/Payment";

export const collectPaymentFromStripe = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  // Define a function to trigger a re-fetch
  const submit = async (body = {}) => {
    setLoading(true);

    const res = await PaymentService.collectPaymentFromStripe(
      removeEmptyValues(body)
    )
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
      });

    if (!res?.success) return;

    // navigate("WebViewScreen", { url: res?.data?.redirect_url, data: res });
    router.push({
      pathname: "/webViewscreen",
      params: {
        url: res?.data?.redirect_url,
        data: JSON.stringify(res),
      },
    });
    return res;
  };

  return { submit, loading };
};

export const collectManualPayment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Define a function to trigger a re-fetch
  const submit = async (body = {}) => {
    setLoading(true);

    const res = await PaymentService.collectManualPayment(
      removeEmptyValues(body)
    )
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
      });

    if (!res?.url) return;
    const appointmentId = res.url.split("/").pop(); // ✅ Extract ID from URL
    if (!appointmentId) return;
    // navigate("ViewAppointment", { id: res.chargePayment.appointmentId });
    router.push({
      pathname: "/viewAppointments",
      params: { id: appointmentId },
    });
    return res;
  };

  return { submit, loading };
};

export const collectLater = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  // Define a function to trigger a re-fetch
  const submit = async (body = {}) => {
    setLoading(true);

    const res = await PaymentService.collectLater(removeEmptyValues(body)) 
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
      });

    if (!res?.url) return;
    setLoading(false);
      router.push({
      pathname: "/viewAppointments",
      params: { id: res.chargePayment.appointmentId },
    });
    return res;
  };

  return { submit, loading };
};

export const getPaymentHistory = () => {
  const [data, setdata] = useState<PaymentResults>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const [params, setparams] = useState({
    page: 1,
    limit: 10,
  });

  const { page } = params;

  const [loading, setLoading] = useState<boolean>(true);
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

  useEffect(() => {
    PaymentService.getPaymentHistory(removeEmptyValues(params))
      .then((res: any) => {
        setdata({
          ...res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  const showLoadMore = data.totalPages != 0 && data.totalPages != params.page;

  const loadMore = () => {
    setparams({ ...params, page: params.page + 1 });
  };

  return {
    data,
    setPage,
    refetch,
    setparams,
    loading,
    showLoadMore,
    loadMore,
    page,
  };
};

export const useGetSingleViewInvoice = (id: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useFocusEffect(
    useCallback(() => {
      if (id) {
        PaymentService.getInvoice(id)
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(true);
          });
      }
    }, [refetchCounter])
  );

  return { data, isLoading, refetch };
};
