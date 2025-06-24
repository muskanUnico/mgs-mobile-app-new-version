import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import {
  BookingResults,
  Customer,
  Data,
  PaymentResults,
} from "../../interface/Customer";
import { CustomerService } from "../../services/Customer/Customer";
import { TeamMemberService } from "../../services/TeamMember/TeamMember";
import { goBack } from "../../utils/navigationServices";
import { removeEmptyValues } from "../../utils/tools";

const router= useRouter();

export const getCustomers = ({ defaultParams }: any) => {
  const [data, setdata] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [res, setRes] = useState({
    results: [],
    page: 1,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const [params, setparams] = useState<any>(
    defaultParams || {
      name: "",
      page: 1,
    }
  );

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
      CustomerService.getAllCustomer(removeEmptyValues(params))
        .then((res) => {
          setRes(res.data);
          setdata([...res.data.results]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter, params])
  );

  return { data, res, refetch, loading, params, setparams, setPage, page };
};

export const getSingleCustomer = (customerId: string) => {
  console.log("customerId", customerId);

  const [data, setdata] = useState(null);
  const [params, setparams] = useState({
    title: "",
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
      CustomerService.getSingleMember(customerId)
        .then((res) => {
          console.log("res.data", res.data);
          setdata(res.data);
        })
        .catch((err) => {
          setdata(err.response?.data?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [customerId, refetchCounter, params])
  );

  return { refetch, setparams, loading, data };
};

export const updateMember = (memberId: string) => {
  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = (body = {}) => {
    setLoading(true);

    TeamMemberService.updateMemberById(memberId, body)
      .catch((err) => {
        Alert.alert(err.response?.data?.message || "An error occurred");
      })
      .then((res) => {
        if (res?.success) {
          console.log("Update response:", res);
          Alert.alert("Member updated successfully");
          router.navigate("/(stack)/allTeamMember");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { submit, loading };
};

export const createMember = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = (body = {}) => {
    setLoading(true);

    TeamMemberService.createMember(body)
      .catch((err) => {
        Alert.alert(err.response?.data?.message || "An error occurred");
      })
      .then((res) => {
        if (res?.success) {
          Alert.alert("Member created successfully");
           router.navigate("/(stack)/allTeamMember");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { submit, loading };
};

export const manageNotes = (memberId: string) => {
  // let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = (body = {}) => {
    setLoading(true);

    CustomerService.manageNotes(memberId, body)
      .catch((err) => {
        Alert.alert(err.response?.data?.message || "An error occurred");
      })
      .then((res) => {
        if (res?.success) {
          Alert.alert("Customer notes updated successfully");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { submit, loading };
};

export const getUpcomingAppointments = (customerId: string) => {
  const [data, setdata] = useState<BookingResults>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const [params, setparams] = useState({
    page: 1,
    limit: 3,
  });

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

  useFocusEffect(
    useCallback(() => {
      CustomerService.getUpcomingAppointments(
        customerId,
        removeEmptyValues(params)
      )
        .then((res) => {
          setdata({
            ...res.data,
            results: [...data.results, ...res.data.results],
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter, params, customerId])
  );

  const showLoadMore = data.totalPages != 0 && data.totalPages != params.page;

  return { data, refetch, setparams, loading, loadMore, showLoadMore };
};

export const getPastAppointments = (customerId: string) => {
  const [data, setdata] = useState<BookingResults>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const [params, setparams] = useState({
    page: 1,
    limit: 3,
  });

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

  useFocusEffect(
    useCallback(() => {
      CustomerService.getPastAppointments(customerId, removeEmptyValues(params))
        .then((res) => {
          setdata({
            ...res.data,
            results: [...data.results, ...res.data.results],
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter, params, customerId])
  );

  const showLoadMore = data.totalPages != 0 && data.totalPages != params.page;

  return { data, refetch, setparams, loading, loadMore, showLoadMore };
};

export const getPaymentHistory = (customerId: string) => {
  const [data, setdata] = useState<PaymentResults>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });
  const [params, setparams] = useState({
    page: 1,
    limit: 5,
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
      CustomerService.getPaymentHistory(customerId, removeEmptyValues(params))
        .then((res: any) => {
          setdata({
            ...res.data,
            results: [...data.results, ...res.data.results],
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter, params, customerId])
  );

  const showLoadMore = data.totalPages != 0 && data.totalPages != params.page;

  const loadMore = () => {
    setparams({ ...params, page: params.page + 1 });
  };

  return { data, refetch, setparams, loading, showLoadMore, loadMore };
};

export const getSavedCards = (customerId: string) => {
  const [data, setdata] = useState<any[]>([]);

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
      CustomerService.getSavedCards(customerId)
        .then((res) => {
          setdata([...res.data]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter, customerId])
  );

  return { data, refetch, loading };
};

export const getIntakeform = (customerId: string) => {
  const [data, setdata] = useState<Data | []>([]);
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
      CustomerService.getIntakeform(customerId)
        .then((res: any) => {
          if (res.data) {
            setdata(res.data);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter, customerId])
  );

  return { data, refetch, loading };
};

export const getBtnIntakeForm = (id: string) => {
  // let alert = useSnackbar();

  const handleAccept = () => {
    CustomerService.manageIntakeform(id, {
      edit_request_status: "approved",
    }).then((res) => {
      if (res.success) {
        // alert.SnackbarHandler(true, "success", res.message)
      }
    });
  };

  const handleReject = () => {
    CustomerService.manageIntakeform(id, {
      edit_request_status: "reject",
    }).then((res) => {
      if (res.success) {
        Alert.alert(res.message);
      }
    });
  };

  return { handleReject, handleAccept };
};

export const CreateCustomer = (navigation: any) => {
  const [loader, setLoader] = useState(true);

  const [formData, setFromData] = useState({
    name: "",
    telephone: "",
    email: "",
    address: "",
    RefId: "",
    dob: "",
  });

  const submit = () => {
    setLoader(false);
    CustomerService.createCustomer(formData)
      .then((res) => {
        if (res.success) {
          setLoader(true);
          alert("Customer Created Successfully");
          setFromData({
            name: "",
            telephone: "",
            email: "",
            address: "",
            RefId: "",
            dob: "",
          });
          // navigation.navigate("AllCustomer", { updatestate: 1 });
          router.navigate({
            pathname:"/(stack)/allCustomer",
            params: { updateState: 1 },
          });
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      })
      .finally(() => {
        setLoader(true);
      });
  };

  return { setFromData, formData, submit, loader };
};

export const useUpdateCustomer = (
  id: string,
  formData: any,
  navigation: any,
  bottomSheetRef: any
) => {
  const [loading, setLoading] = useState(true);

  const submit = () => {
    setLoading(false);
    CustomerService.updateCustomer(id, formData)
      .then((res) => {
        if (res.success) {
          setLoading(true);
          bottomSheetRef.current.close();
          Alert.alert("Updated Successfully");
          // navigation.navigate("AllCustomer", { updateState: 1 });
           router.navigate({
            pathname:"/(stack)/allCustomer",
            params: { updateState: 1 },
          });
        }
      })
      .catch((err) => {
        Alert.alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return { submit, loading };
};

export const useDeleteCustomer = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteCustomer = (id: string) => {
    setIsLoading(false);
    CustomerService.deleteCustomer(id)
      .then((res) => {
        if (res.success) {
          Alert.alert("Deleted Successfully");
          goBack();
        }
      })
      .catch((err) => {
        Alert.alert(err.response.data?.data || err.response.data?.message);
      })
      .finally(() => {
        setIsLoading(true);
      });
  };

  return { handleDeleteCustomer, setIsLoading, isLoading };
};
