import { goBack, navigate } from "../../utils/navigationServices";
import { ReportsProps, totalRevenue } from "../../interface/Reports";
import { Revenue } from "../../services/Revenue/Revenue";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useGetBookingExpense = () => {
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

  useEffect(() => {
    Revenue.GetBookingExpense(params)
      .then((res) => {
        setdata({ ...res.data });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { revenue, refetch, loading, setPage, page };
};

export const useGetTotalExpense = () => {
  const [totalExpense, setdata] = useState<totalRevenue>({
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

  useEffect(() => {
    Revenue.GetTotalExpense()
      .then((res) => {
        setdata(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter]);

  return { totalExpense, refetch, loading };
};

export const useGetOtherExpense = () => {
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

  useEffect(() => {
    Revenue.GetOtherExpense()
      .then((res) => {
        setdata({ ...res.data });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter]);

  return { revenue, refetch, loading, setPage, page };
};

export const useDeleteExpense = (setModalVisible: any) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = (revenueId: string, entryId: string) => {
    setIsLoading(false);
    Revenue.DeleteExpense(revenueId, entryId)
      .then((res) => {
        Alert.alert("Your Expense Delete Successfully");
        navigate("RevenueReport");
      })
      .catch((err) => {
        Alert.alert(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(true);
        setModalVisible(false);
      });
  };

  return { handleDelete, isLoading };
};

export const useCreateExpense = (refetch: any) => {
  const [loading, setLoading] = useState(false);

  const handleCreate = (formateData: any) => {
    setLoading(true);
    Revenue.createOtherExpense(formateData)
      .then((res) => {
        setLoading(false);
        Alert.alert("Your Expense Created Successfully");
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

export const useUpdateExpense = () => {
  const [loading, setLoading] = useState(false);

  const handleUpdate = (revenueId: string, entryId: string, form = {}) => {
    setLoading(true);
    Revenue.updateOtherExpense(revenueId, entryId, form)
      .then((res) => {
        setLoading(false);
        Alert.alert("Your Expense Updated Successfully");
      })
      .catch((err) => {
        Alert.alert(err.response.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleUpdate, loading };
};

export const useGetOtherExpenseChart = () => {
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

  useEffect(() => {
    Revenue.getOtherExpenseChart(params)
      .then((res) => {
        setdata(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { chart, refetch, loading, setParams };
};

export const useGetExpenseChart = () => {
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

  useEffect(() => {
    Revenue.getExpenseChart(params)
      .then((res) => {
        setdata(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { chart, refetch, loading, setParams };
};
