import { useCallback, useEffect, useState } from "react";

//interface
import { Service } from "../../interface/Service";
import { removeEmptyValues } from "../../utils/tools";
import { ServicesService } from "../../services/Services/Services";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export const getServices = (limit = 10) => {
  const [res, setRes] = useState({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });
  const [data, setdata] = useState<Service[]>([]);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  const [params, setparams] = useState({
    page: 1,
    limit: limit,
  });

  const {page} = params

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
      ServicesService.getAllServices(removeEmptyValues(params)).then((res) => {
        setRes(res.data);
        setdata([...res.data.results]);
      });
    }, [refetchCounter, params])
  );

  return { data, res, setPage, refetch , page};
};

export const createService = (bottomSheetRef: any, refetch: any) => {
  // let alert = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = (body = {}) => {
    setLoading(true);

    ServicesService.createService(body)
      .catch((err) => {
        setLoading(false);
        Alert.alert(err.response?.data?.message || "An error occurred");
      })
      .then((res) => {
        if (res?.success) {
          bottomSheetRef.current.close();
          refetch();
          setLoading(false);
          Alert.alert("Service created successfully");
        }
      });
  };

  return { submit, loading };
};

export const updateService = (bottomSheetRef: any, refetch: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = (serviceId: string, body = {}) => {
    setLoading(true);

    ServicesService.updateService(serviceId, body)
      .catch((err) => {
        setLoading(false);
        Alert.alert(err.response?.data?.message || "An error occurred");
      })
      .then((res) => {
        if (res?.success) {
          bottomSheetRef.current.close();
          refetch();
          setLoading(false);
          Alert.alert("Service updated successfully");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { submit, loading };
};

export const deleteService = (serviceId: string, bottomSheetRef: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = () => {
    setLoading(true);

    ServicesService.deleteService(serviceId)
      .catch((err) => {
        Alert.alert(err.response?.data?.message || "An error occurred");
      })
      .then((res) => {
        if (res?.success) {
          Alert.alert("Service deleted successfully");
          bottomSheetRef.current.close();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { submit, loading };
};
