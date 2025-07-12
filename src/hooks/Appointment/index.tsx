import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { AppointmentService } from "../../services/Appointments";
import { removeEmptyValues } from "../../utils/tools";

//interface
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Appointment, AppointmentResults } from "../../interface/Appointment";

export const createAppointment = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (body = {}) => {
    setLoading(true);

    const res = await AppointmentService.createAppointment(body)
      .catch((err) => {
        Alert.alert(err?.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });

    if (res?.success) {
      Alert.alert("Appointment created successfully");
    }
    return res;
  };

  return { submit, loading };
};

export const getAppointmentById = (appointmentId: string) => {
  const [data, setData] = useState<Appointment | null>(null);

  const [params, setParams] = useState({
    title: "",
  });

  const [loading, setLoading] = useState<boolean>(true);

  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useFocusEffect(
    useCallback(() => {
      if (appointmentId && !appointmentId?.trim()) {
        setLoading(false);
        return;
      }

      AppointmentService.getAppointmentById(appointmentId)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          // Alert.alert(err.response?.data?.message || "An error occurred");
        })
        .finally(() => {
          setLoading(false);
        });
    }, [appointmentId, params, refetchCounter])
  );

  return { data, loading, setParams, refetch };
};

export const getAllAppointments = () => {
  const [data, setdata] = useState<AppointmentResults>({
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

  const loadMore = () => {
    setparams({ ...params, page: params.page + 1 });
  };

  const setPage = (page: number) => {
    setparams({ ...params, page: page });
  };

  useFocusEffect(
    useCallback(() => {
      AppointmentService.getAllAppointment(removeEmptyValues(params))
        .then((res) => {
          setdata({ ...res.data, results: [...res.data.results] });
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter, params])
  );

  const showLoadMore = data.totalPages != 0 && data.totalPages != params.page;

  return {
    data,
    refetch,
    params,
    setparams,
    loading,
    loadMore,
    showLoadMore,
    setPage,
    page,
  };
};

export const getAllApprovedAppointments = () => {
  const [data, setdata] = useState<AppointmentResults>({
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

  const { page, limit } = params;

  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  const loadMore = () => {
    setparams({ ...params, page: params.page + 1 });
  };

  const setPage = (page: number) => {
    setparams({ ...params, page: page });
  };

  useFocusEffect(
    useCallback(() => {
      AppointmentService.getAllApprovedAppointment(removeEmptyValues(params))
        .then((res) => {
          setdata({ ...res.data, results: [...res.data.results] });
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter, params])
  );

  const showLoadMore = data.totalPages != 0 && data.totalPages != params.page;

  return {
    data,
    refetch,
    setparams,
    loading,
    loadMore,
    showLoadMore,
    setPage,
    page,
  };
};

export const approvedAppointment = () => {
  // let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (id = "") => {
    setLoading(true);

    const res = await AppointmentService.approvedAppointment(id)
      .catch((err) => {
        Alert.alert(err?.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });

    if (res?.success) {
      Alert.alert("Appointment Approved successfully");
    }
    return res;
  };

  return { submit, loading };
};

export const rescheduleAppointment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  // Define a function to trigger a re-fetch
  const submit = async (id = "", body: any) => {
    setLoading(true);

    const res = await AppointmentService.rescheduleAppointment(id, body)
      .catch((err) => {
        Alert.alert(err.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });

    if (res?.success) {
      Alert.alert("Appointment reschedule successfully");
      router.push({
        pathname: "/(stack)/viewAppointments",
        params: { id: res?.data?.id },
      });
    }
    return res;
  };

  return { submit, loading };
};

export const rejectedAppointment = () => {
  // let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (id = "") => {
    setLoading(true);

    const res = await AppointmentService.rejectedAppointment(id)
      .catch((err) => {
        Alert.alert(err?.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });

    if (res?.success) {
      Alert.alert("Appointment rejected successfully");
    }
    return res;
  };

  return { submit, loading };
};

export const deleteAppointment = () => {
  // let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (id = "") => {
    setLoading(true);

    const res = await AppointmentService.deleteAppointment(id)
      .catch((err) => {
        Alert.alert(err.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });

    if (res?.success) {
      Alert.alert("Appointment deleted successfully");
    }
    return res;
  };

  return { submit, loading };
};

export const cancelAppointment = () => {
  // let alert = useSnackbar();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (id = "", refundPayment: boolean) => {
    setLoading(true);

    const res = await AppointmentService.cancelAppointment(id, refundPayment)
      .catch((err) => {
        Alert.alert(err.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });

    if (res?.success) {
      Alert.alert("Appointment cancelled successfully");
      router.push("/(stack)/allAppointments")
    }
    return res;
  };

  return { submit, loading };
};

export const getPatientNotes = (body: any) => {
  const [data, setdata] = useState<AppointmentResults>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const [getloading, setGetLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      AppointmentService.getAllNotes(body)
        .then((res: any) => {
          setdata({ ...res.data, results: [...res.data.results] });
        })
        .finally(() => {
          setGetLoading(false);
        });
    }, [])
  );

  return { data, getloading };
};

export const addAllNotes = () => {
  // let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (id: any, body = {}) => {
    setLoading(true);
    const res = await AppointmentService.addAllNotes(id, body).catch((err) => {
      // alert.SnackbarHandler(
      //   true,
      //   "error",
      //   err.response?.data?.message || "An error occurred"
      // );
    });
    return res;
  };

  return { submit, loading, setLoading };
};

export const useCreateChangeRequest = (
  id: string,
  refetch: any,
  setValue: any,
  value: any
) => {
  const [loading, setLoading] = useState(false);

  const handleSubmitComment = () => {
    if (!value.trim()) {
      Alert.alert("Comment is Required");
      return;
    }

    setLoading(true);
    AppointmentService.createChangeRequest(id, {
      comment: value,
    })
      .then((res: any) => {
        if (res.success) {
          Alert.alert("Your Comment Send Successfully");
          refetch();
        }
      })
      .catch((err) => {
        Alert.alert(err.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setValue("");
        setLoading(false);
      });
  };
  return { handleSubmitComment, loading, value, setValue };
};

export const useConfirmedAppointment = () => {
  // const Snackbar = useSnackbar();
  const [loading, setloading] = useState(true);

  const handleConfirmed = (id: string) => {
    setloading(false);
    AppointmentService.confirmedAppointment(id).then((res) => {
      if (res.success) {
        setloading(true);
        // Snackbar.SnackbarHandler(
        //   true,
        //   "success",
        //   "Your Appointment Updated Successfully"
        // );
        // window.location.reload()
      }
    });
  };
  return { handleConfirmed, setloading, loading };
};
