import React, { useCallback, useState } from "react";

//interface
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { Alert } from "react-native";
import { setItemToLocalStorage } from "../../helper/useLocalStorage";
import { TeamMembers } from "../../interface/TeamMembers";
import { TeamMemberService } from "../../services/TeamMember/TeamMember";
import { goBack, navigate } from "../../utils/navigationServices";
import { removeEmptyValues } from "../../utils/tools";

export const getTeamMembers = () => {
  const [res, setRes] = useState({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });
  const [data, setdata] = useState<TeamMembers[]>([]);

  const [params, setparams] = useState({
    page: 1,
    limit: 100,
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

  useFocusEffect(
    useCallback(() => {
      TeamMemberService.getTeamMembers(removeEmptyValues(params))
        .then((res) => {
          setRes(res);
          setdata([...res.results]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter, params])
  );

  return { data, res, setPage, refetch, loading, page };
};

export const getSingleMember = (memberId: string) => {
  const [data, setdata] = useState<null>(null);

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
      if (!memberId) {
        return;
      }
      TeamMemberService.getMemberById(memberId)
        .then((res) => {
          setdata(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter, params])
  );

  return { data, refetch, setparams, loading };
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
          setLoading(false);
          Alert.alert("Member updated successfully");
          router.back();
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
        setLoading(false);
        Alert.alert(err.response?.data?.message || "An error occurred");
      })
      .then((res) => {
        if (res?.success) {
          setLoading(false);
          Alert.alert("Member created successfully");
          navigate("AllTeamMember");
        }
      });
  };

  return { submit, loading };
};

export const setTeamMemberColors = () => {
  React.useEffect(() => {
    TeamMemberService.getColorOfTeamMembers().then((res) => {
      setItemToLocalStorage("members-color", res.colors);
    });
  }, []);
};

export const useDeleteCard = (setOpen: any) => {
  const handleDeleteCard = (body: any) => {
    TeamMemberService.deleteCard(body)
      .then((res: any) => {
        if (res.success) {
          Alert.alert("Card Deleted successfully");
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { handleDeleteCard };
};

export const useUpdateActiveStatus = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const handleStatus = (id: string, active: boolean) => {
    setLoading(false);
    TeamMemberService.UpdateActiveStatus(id, !active).then((res: any) => {
      if (res.success) {
        setLoading(true);
        Alert.alert("Request successfull");
        goBack();
      }
    });
  };

  return { handleStatus, loading };
};

export const useDeleteTeamMember = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteTeamMember = (id: string) => {
    setIsLoading(false);
    TeamMemberService.deleteTeamMember(id)
      .then((res) => {
        if (res.success) {
        Alert.alert("Deleted Successfully");
        router.push({
          pathname: "/(stack)/allTeamMember",
          params: { refresh: "true" },
        });
        }
      })
      .catch((err) => {
        Alert.alert(err.response.data?.data || err.response.data?.message);
      })
      .finally(() => {
        setIsLoading(true);
      });
  };

  return { handleDeleteTeamMember, setIsLoading, isLoading };
};
