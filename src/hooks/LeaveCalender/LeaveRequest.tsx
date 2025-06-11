import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import { router, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Leave } from "../../interface/LeaveRequest";
import { LeaveRequest } from "../../services/LeaveCalender/LeaveCalender";

export const useLongMenuLeaveRequest = ({
  handleDeleteLeave,
  handleApprovedLeave,
  setCurrentbtn,
  currentbtn,
  bottomSheetRef,
}: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [warning, setWarning] = useState({
    id: 0,
    btnFirstName: "",
    btnSecName: "",
    title: "",
  });
  const router = useRouter();
  const option = [{ id: 2, title: "Delete", icon: <MaterialIcons  name="delete-outline" size={24} color="red" />, line: false }];

  // handle three dot btn
  const handleOptions = (option: any, item: Leave) => {
    if (option.id == 1) {
      router.push({
        pathname: "/requestLeave",
        params: { item: JSON.stringify(item) },
      });
      //@ts-ignore
      setCurrentbtn({ currentOptions: option.id, id: item });
    } else if (option.id == 2) {
      setCurrentbtn({ currentOptions: option.id, id: item.id });
      setWarning({
        id: option.id,
        btnFirstName: "Delete",
        btnSecName: "Cancel",
        title: "Are you sure you want to delete ?",
      });
      setTimeout(() => {
        setModalOpen(true);
      }, 1000);
    } else if (option.id == 3) {
      setWarning({
        id: option.id,
        btnFirstName: "Approve",
        btnSecName: "Reject",
        title: "You Want to Approve or Reject the Leave ?",
      });
      setCurrentbtn({ currentOptions: option.id, id: item.id });
      setTimeout(() => {
        setModalOpen(true);
      }, 1000);
    }
  };

  // handle warning modal left btn
  const handleLeftBtnClick = () => {
    if (currentbtn.currentOptions == 1) {
    } else if (currentbtn.currentOptions == 2) {
      handleDeleteLeave(currentbtn.id);
      setModalOpen(false);
    } else if (currentbtn.currentOptions == 3) {
      handleApprovedLeave(currentbtn.id);
      setModalOpen(false);
    }
  };

  // handle warning modal rigth btn
  const handleRightBtnClick = () => {
    if (currentbtn.currentOptions == 3) {
      setModalOpen(false);
      bottomSheetRef.current.open();
    } else if (currentbtn.currentOptions == 2) {
      setModalOpen(false);
    }
  };

  return {
    handleRightBtnClick,
    handleLeftBtnClick,
    handleOptions,
    warning,
    setModalOpen,
    modalOpen,
    option,
  };
};

export const useGetAllLeaveRequests = () => {
  const [leave, setLeave] = useState<Leave[] | []>([]);
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
      LeaveRequest.getAllLeaveRequests()
        .then((res) => {
          setLeave(res.data);
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [refetchCounter])
  );

  return { leave, refetch, loading };
};

export const useRejectLeaveRequests = (leaveHook: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleRejectLeave = (
    id: string,
    adminComment: any,
    bottomSheetRef: any
  ) => {
    setLoading(true);
    LeaveRequest.RejectLeaveRequests(id, adminComment)
      .then((res) => {
        Alert.alert(res.message);
        leaveHook.refetch();
        bottomSheetRef.current.close();
          router.push("/leaveCalender");
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { handleRejectLeave, loading };
};

export const useApprovedLeaveRequests = (leaveHook: any) => {
  const [loading, setLoading] = useState<boolean>(true);

  const handleApprovedLeave = (id: string) => {
    LeaveRequest.ApprovedLeaveRequests(id)
      .then((res) => {
        Alert.alert(res.message);
        leaveHook.refetch();
           router.push("/leaveCalender");
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { handleApprovedLeave, loading };
};

export const useCreateLeaveRequests = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateLeave = (body: any) => {
    setLoading(true);
    LeaveRequest.createLeaveRequest(body)
      .then((res) => {
        setLoading(false);
        Alert.alert("Request Leave created successfully");
          router.push("/leaveCalender");
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleCreateLeave, loading };
};

export const useDeleteLeaveRequests = (leaveHook: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteLeave = (id: string) => {
    setLoading(true);
    LeaveRequest.DeleteLeaveRequest(id)
      .then((res) => {
        setLoading(false);
        Alert.alert("Request Leave Deleted successfully");
        leaveHook.refetch();
           router.push("/leaveCalender");
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { handleDeleteLeave, loading };
};

export const useUpdateLeaveRequests = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdateLeave = (id: string, body: any) => {
    setLoading(true);
    LeaveRequest.updateLeaveRequest(id, body)
      .then((res) => {
        setLoading(false);
        Alert.alert("Request Leave Updated successfully");
        // navigate("LeaveCalendar");
           router.push("/leaveCalender");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleUpdateLeave, loading };
};

export const useLeaveDatesTeamMember = (teamMemberId: string) => {
  const [dates, setLeave] = useState<string[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(
    useCallback(() => {
      LeaveRequest.LeaveDatesbyTeamMember(teamMemberId)
        .then((res) => {
          setLeave(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter])
  );

  return { dates, refetch, loading };
};
