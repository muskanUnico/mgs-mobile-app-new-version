import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Appointment } from "../interface/Appointment";
import { timeTracker } from "../interface/Reports";
import { TimeTracker } from "../services/TimeTracker/TimeTracker";
import { getLastDate } from "../utils/tools";

export const useGetTimeTracker = (setParams: any, params: any) => {
  const [timeData, setData] = useState<timeTracker>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });
  const [isloading, setIsLoading] = useState(true);

  const router = useRouter();
  const setPage = (page: number) => {
    setParams({ ...params, page: page });
  };

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useFocusEffect(
    useCallback(() => {
      TimeTracker.getAllTimeTracker(params)
        .then((res) => {
          setData({
            ...res.data,
            results: res.data.results,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [refetchCounter, params])
  );

  return { isloading, timeData, setPage, setParams, refetch, refetchCounter };
};

export const useCreateTime = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  const handleCreateTime = (formateData = {}) => {
    setLoading(false);
    TimeTracker.createTimeTracker(formateData)
      .then(() => {
        setLoading(true);
        Alert.alert("Your Time Added Successfully");
        // navigate("ManagePayroll");
        router.push("/(stack)/managePayroll")
      })
      .catch((err) => {
        Alert.alert(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleCreateTime, loading };
};

export const useUpdateTimeTrackerStatus = () => {
  // const snackbar = useSnackbar();
  const [loading, setLoading] = useState(true);

  const handleUpdateStatus = (id: string, body = {}) => {
    setLoading(false);
    TimeTracker.UpdateStatusTimeTracker(id, body)
      .then(() => {
        setLoading(true);
        Alert.alert("Status Updated Successfully");
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleUpdateStatus, loading };
};

export const useGetThisEarning = () => {
  const [thisData, setdata] = useState({
    totalAmount: 0,
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
    TimeTracker.getTotalAmount(params)
      .then((res) => {
        setdata(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter]);

  return { thisData, refetch, loading, setParams };
};

export const useGetWeekEarning = () => {
  const [data, setdata] = useState({
    totalAmount: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const currentDate = moment();

  // Add 7 days to the current date
  const current = currentDate.subtract(7, "days");

  const [params, setParams] = useState<{} | null>({
    from: current.format("YYYY-MM-DD"),
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
    TimeTracker.getTotalAmount(params)
      .then((res) => {
        setdata(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { data, refetch, loading, setParams };
};

export const useGetMonthEarning = () => {
  const [last, setdata] = useState({
    totalAmount: 0,
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
    TimeTracker.getTotalAmount(params)
      .then((res) => {
        setdata(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { last, refetch, loading, setParams };
};

export const useDeleteTimeTracker = () => {
  const [loading, setLoading] = useState(true);

  const handleDelete = (trackerId: string, refetch: any, setModalOpen: any) => {
    setLoading(false);
    TimeTracker.deleteTimeTracker(trackerId)
      .then(() => {
        refetch();
        setLoading(true);
        Alert.alert("Your Data Delete Successfully");
        setModalOpen(false);
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleDelete, loading };
};

export const useDeleteInsideDataTimeTracker = () => {
  const [deleteLoading, setLoading] = useState(true);
  const router = useRouter();
  const handleDelete = (
    trackerId: string,
    entryId: string,
    setModalOpen: any
  ) => {
    setLoading(false);
    TimeTracker.deleteInsideTimeTracker(trackerId, entryId)
      .then(() => {
        setLoading(true);
        setModalOpen(false);
        Alert.alert("Your Data Delete Successfully");
        // navigate("ManagePayroll");
        router.push("/(stack)/managePayroll");
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleDelete, deleteLoading };
};

export const useUpdateDataTimeTracker = () => {
  const [loader, setLoading] = useState(true);
  const router = useRouter();
  const handleUpdate = (trackerId: string, body = {}) => {
    setLoading(false);
    TimeTracker.UpdateInsideDataTimeTracker(trackerId, body)
      .then(() => {
        setLoading(true);
        Alert.alert("Data Updated Successfully");
        // navigate("ManagePayroll");
        router.push("/(stack)/managePayroll");
      })
      .catch((err) => {
        Alert.alert(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleUpdate, loader };
};

export const useUpdateInsideTimeTrackerEntry = () => {
  const [loader, setLoading] = useState(true);
  const router = useRouter();
  const handleUpdateEntry = (trackerId: string, entryId: string, body = {}) => {
    setLoading(false);
    TimeTracker.updateInsideTimeTracker(trackerId, entryId, body)
      .then(() => {
        setLoading(true);
        Alert.alert("Your Data Updated Successfully");
          router.push("/(stack)/managePayroll")
      })
      .catch((err) => {
        Alert.alert(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleUpdateEntry, loader };
};

export const useGetTodayAppointment = (teamMemberId: string) => {
  // console.log("teamMemberId-------------kkk",teamMemberId)
  const [data, setdata] = useState<Appointment[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };
  useEffect(() => {
    TimeTracker.getTodayAppointment(teamMemberId)
      .then((res) => {
        setdata(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter]);

  return { data, refetch, loading };
};
