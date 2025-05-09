//@ts-nocheck
import axios from "axios";
import { useCallback, useState } from "react";
import { removeEmptyValues } from "../../utils/tools";
import { useFocusEffect } from "@react-navigation/native";
import { getItemFromLocalStorage } from "../../helper/useLocalStorage";

export const getAllNotification = () => {
  const [res, setRes] = useState({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });
  const [data, setdata] = useState<[]>([]);

  const [params, setparams] = useState<any>(
    {
      page: 1,
    }
  );
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

  useFocusEffect(
    useCallback(() => {

      setLoading(true);

      getItemFromLocalStorage("user").then((user) => {
        let token = user?.jwt?.token;


        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}notification/get-all`, { ...removeEmptyValues(params), token })
          .then((response) => {
            const newData = response.data?.data?.data;

            // Combine current data and newData, removing duplicates based on _id
            let updatedData = [...data];
        
            newData.forEach((newItem) => {
              // Check if newItem already exists in updatedData
              const existingIndex = updatedData.findIndex((item) => item._id === newItem._id);
              if (existingIndex === -1) {
                updatedData.push(newItem); // Add newItem if not already present
              } else {
                updatedData[existingIndex] = newItem; // Replace existing item with newItem
              }
            });
        
            // Sort updatedData by createdAt in descending order
            updatedData.sort((a, b) => {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
        
            // Set the updated data state
            setRes(response.data?.data);
            setdata(updatedData);
          })
          .finally(() => {
            setLoading(false);
          });
      });


    }, [refetchCounter, params])
  );

  return { data, res, refetch, loading, params, setparams, setPage };
};

export const markAllRead = () => {

  const [loading, setLoading] = useState<boolean>(false);


  const submit = async (page: number) => {
    setLoading(true);

    let user = await getItemFromLocalStorage("user");
    let token = user?.jwt?.token;

    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}notification/mark-all-read`, { page, token })
      .finally(() => {
        setLoading(false);
      });
  }

  return { loading, submit };
};

export const markAsRead = () => {

  const [loading, setLoading] = useState<boolean>(false);


  const submit = async (notificationId: string) => {
    setLoading(true);

    let user = await getItemFromLocalStorage("user");
    let token = user?.jwt?.token;

    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}notification/mark-as-read`, { notificationId, token })
      .finally(() => {
        setLoading(false);
      });
  }

  return { loading, submit };
};