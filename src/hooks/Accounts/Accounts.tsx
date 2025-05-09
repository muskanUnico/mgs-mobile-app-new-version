import moment from "moment";
import { getLastDate } from "../../utils/tools";
import { useCallback, useEffect, useState } from "react";
import { Reports } from "../../services/Reports";
import { AccountsService } from "../../services/Accounts/accounts";
import { useFocusEffect } from "@react-navigation/native";
import { ExpenseRevenueProps } from "../../interface/Reports";

export const useGetAllReports = () => {
  const [data, setdata] = useState();
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
      AccountsService.allReports()
        .then((res) => {
          setdata(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter])
  );

  return { data, refetch, loading };
};

export const useGetAllApprovedReports = () => {
  const [approved, setdata] = useState();
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
      AccountsService.allapprovedReports()
        .then((res) => {
          setdata(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter])
  );

  return { approved, refetch, loading };
};

export const useGetExpenseRevenue = () => {
  const [data, setdata] = useState<ExpenseRevenueProps>({
    results: [],
    page: 1,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const { page } = params;

  const setPage = (page: number) => {
    setParams({ ...params, page: page });
  };

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
      Reports.getExpenseRevenue(params)
        .then((res) => {
          setdata({ ...data, results: [...res.data], totalPages: res.totalPages });
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter, params])
  );

  return { data, refetch, loading, setPage, setParams, page };
};

export const useGetProfitLossThis = () => {
  const [thisData, setdata] = useState({
    totalRevenue: 0,
    totalExpense: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };
  const [params, setParams] = useState<{} | null>({
    from: moment(new Date()).format("YYYY-MM-DD"),
    to: moment(new Date()).format("YYYY-MM-DD"),
  });

  useEffect(() => {
    Reports.getProfitLossExpenseRevenue(params)
      .then((res) => {
        setdata(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter]);

  return { thisData, refetch, loading, setParams };
};

export const useGetProfitLossWeek = () => {
  const [week, setdata] = useState({
    totalRevenue: 0,
    totalExpense: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const currentDate = moment();

  // Add 7 days to the current date
  const lastDate = currentDate.subtract(7, "days");

  const [params, setParams] = useState<{} | null>({
    from: lastDate.format("YYYY-MM-DD"),
    to: moment(new Date()).format("YYYY-MM-DD"),
  });
  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    Reports.getProfitLossExpenseRevenue(params)
      .then((res) => {
        setdata(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { week, refetch, loading, setParams };
};

export const useGetProfitLossMonth = () => {
  const [month, setdata] = useState({
    totalRevenue: 0,
    totalExpense: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const [params, setParams] = useState<{} | null>({
    from: getLastDate("Monthly"),
    to: moment(new Date()).format("YYYY-MM-DD"),
  });

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    Reports.getProfitLossExpenseRevenue(params)
      .then((res) => {
        setdata(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { month, refetch, loading, setParams };
};

export const useGetExpenseRevenueChart = () => {
  const [data, setdata] = useState<ExpenseRevenueProps>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const setPage = (page: number) => {
    setParams({ ...params, page: page });
  };

  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    Reports.getExpenseRevenueChart(params)
      .then((res) => {
        setdata({ ...data, results: [...res.data], totalPages: res.totalPages });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { data, refetch, loading, setPage, setParams };
};