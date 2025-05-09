import { Alert } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Revenue } from "../../services/Revenue/Revenue";
import { navigate } from "../../utils/navigationServices";
import { ReportsProps, totalRevenue } from "../../interface/Reports";

export const useGetBookingRevenue = () => {
  const [revenue, setdata] = useState<ReportsProps>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [params, setparams] = useState({
    page: 1,
    limit: 10,
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
      Revenue.GetBookingRevenue(params)
        .then((res) => {
          setdata({ ...res.data });
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter, params])
  );

  const showLoadMore =
    revenue.totalPages != 0 && revenue.totalPages != params.page;

  const loadMore = () => {
    setparams({ ...params, page: params.page + 1 });
  };

  return { revenue, refetch, loading, setPage, loadMore, showLoadMore, page };
};

export const useGetTotalRevenue = () => {
  const [totalRevenue, setdata] = useState<totalRevenue>({
    amount: "0",
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useFocusEffect(
    useCallback(() => {
      Revenue.GetTotalRevenue()
        .then((res) => {
          setdata(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter])
  );

  return { totalRevenue, refetch, loading };
};

export const useGetOtherRevenue = () => {
  const [revenue, setdata] = useState<ReportsProps>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [params, setparams] = useState({
    page: 1,
    limit: 10,
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
      Revenue.GetOtherRevenue(params)
        .then((res) => {
          setdata({ ...res.data });
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter, params])
  );

  return { revenue, refetch, loading, setPage, page };
};

export const useDeleteRevenue = (setModalVisible: any) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = (revenueId: string, entryId: string) => {
    setIsLoading(false);
    Revenue.DeleteRevenue(revenueId, entryId)
      .then((res) => {
        Alert.alert("Your Revenue Delete Successfully");
        navigate("RevenueReport");
      })
      .catch((err) => {
        Alert.alert(err.response.data.message || "Some Problem Occured");
      })
      .finally(() => {
        setIsLoading(true);
        setModalVisible(false);
      });
  };

  return { handleDelete, isLoading };
};

export const useCreateRevenue = (refetch: any) => {
  const [loading, setLoading] = useState(false);

  const handleCreate = (formateData: any) => {
    setLoading(true);
    Revenue.createOtherRevenue(formateData)
      .then((res) => {
        setLoading(false);
        Alert.alert("Your Revenue Created Successfully");
        refetch();
      })
      .catch((err) => {
        Alert.alert(err.response.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleCreate, loading };
};

export const useUpdateRevenue = (navigation: any) => {
  const [loading, setLoading] = useState(false);

  const handleUpdate = (revenueId: string, entryId: string, form = {}) => {
    setLoading(true);
    Revenue.updateOtherRevenue(revenueId, entryId, form)
      .then((res) => {
        Alert.alert("Your Revenue Updated Successfully");
        setLoading(false);
        navigation.navigate("RevenueReport");
      })
      .catch((err) => {
        Alert.alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleUpdate, loading };
};

export const useGetOtherRevenueChart = () => {
  const [chart, setdata] = useState([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [params, setParams] = useState<{} | null>({
    from: "",
    to: "",
  });

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useFocusEffect(
    useCallback(() => {
      Revenue.getOtherRevenueChart(params)
        .then((res) => {
          setdata(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter, params])
  );

  return { chart, refetch, loading, setParams };
};

export const useGetRevenueChart = () => {
  const [chart, setdata] = useState([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [params, setParams] = useState<{} | null>({
    from: "",
    to: "",
  });

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useFocusEffect(
    useCallback(() => {
      Revenue.getRevenueChart(params)
        .then((res) => {
          setdata(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter, params])
  );

  return { chart, refetch, loading, setParams };
};
