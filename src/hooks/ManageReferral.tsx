import { Alert } from "react-native";
import { useCallback, useState } from "react";
import { navigate } from "../utils/navigationServices";
import { Referral } from "../services/Referral/Referral";
import { useFocusEffect } from "@react-navigation/native";

export const useHandleOptionsReferral = ({
  setWarninigModalOpen, // Function to set the warning modal open state
  handleReject, // Function to handle rejection
  handleApprove, // Function to handle approval
  handleDelete, // Function to handle deletion
  refetch, // Function to refetch data
}: any) => {
  // Store referral id
  const [referralId, setreferralId] = useState("");
  const [current, setCurrent] = useState(-1); // Current tab index

  const [warning, setWarning] = useState({
    // Warning modal content
    id: 0,
    btnFirstName: "Approve",
    btnSecName: "Reject",
    title: "You Want to Approve or Reject the Referral?",
  });

  // Handler for rejection button
  const handleRejectbtn = () => {
    setWarninigModalOpen(false); // Close warning modal
    if (current == 0) {
      // If the current tab is for approval/rejection
      handleReject(referralId, refetch); // Handle rejection
    }
  };

  // Handler for approval button
  const handleApprovebtn = () => {
    setWarninigModalOpen(false); // Close warning modal
    if (current == 0) {
      // If the current tab is for approval/rejection
      handleApprove(referralId, refetch); // Handle approval
    } else if (current == 2) {
      // If the current tab is for deletion
      handleDelete(referralId); // Handle deletion
    }
  };

  // Handler for options
  const handleOptions = (
    selectedTabId: number,
    referral: any,
    referralId: string
  ) => {
    setCurrent(selectedTabId);
    if (selectedTabId == 0) {
      setWarning({
        id: 0,
        btnFirstName: "Approve",
        btnSecName: "Reject",
        title: "You Want to Approve or Reject the Referral?",
      });
      setTimeout(() => {
        setWarninigModalOpen(true);
    }, 5000);
      setreferralId(referralId);
    } else if (selectedTabId == 1) {
      // If the selected tab is for editing
      navigate("AddReferrals", {
        data: referral,
        edit: true,
        title: "Edit Refferal",
      });
    } else if (selectedTabId == 2) {
      setWarning({
        id: selectedTabId,
        btnFirstName: "Delete",
        btnSecName: "Cancel",
        title: "You Want to Delete the Referral?",
      });
      
      setTimeout(() => {
        setWarninigModalOpen(true);
    }, 1000);
      // setWarninigModalOpen(true);
      setreferralId(referral.customer?.id);
    }
  };

  return {
    handleRejectbtn,
    handleApprovebtn,
    handleOptions,
    warning,
    setWarning,
    current,
  };
};

export const useGetReferrals = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setdata] = useState<any | []>([]);
  const [error, setError] = useState<string | null>(null);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useFocusEffect(
    useCallback(() => {
      Referral.getReferral()
        .then((res) => {
          if (res.success) {
            setdata(res.data.results);
          } else {
            setError("Failed to retrieve referral data");
          }
        })
        .catch((err) => {
          setError("An error occurred while fetching referral data");
        })
        .finally(() => {
          setLoading(false);
        });
    }, [refetchCounter])
  );

  return { data, loading, error, refetch };
};

export const useApproveReferral = () => {
  const [loading, setLoading] = useState(true);

  const handleApprove = (id: string, refetch: any) => {
    setLoading(false);
    Referral.ApproveReferral(id)
      .then((res) => {
        if (res.success) {
          refetch();
          setLoading(true);
          Alert.alert("Your Referral Approved Successfully");
        }
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleApprove, loading };
};

export const useRejectReferral = () => {
  const [loading, setLoading] = useState(true);

  const handleReject = (id: string, refetch: any) => {
    setLoading(false);
    Referral.RejectReferral(id)
      .then(() => {
        refetch();
        setLoading(true);
        Alert.alert("Your Referral Rejected Successfully");
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleReject, loading };
};

export const useCreateReferral = () => {
  const [loading, setLoading] = useState(false);

  const handleCreate = (formateData: {}) => {
    setLoading(true);
    Referral.CreateReferral(formateData)
      .then(() => {
        setLoading(false);
        Alert.alert("Your Referral Created Successfully");
        navigate("AllReferrals");
      })
      .catch((err) => {
        alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleCreate, loading };
};

export const useDeleteReferral = () => {
  // const snackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = (customerId: string) => {
    setIsLoading(false);
    Referral.DeleteReferral(customerId)
      .then(() => {
        Alert.alert("Your Referral Delete Successfully");
      })
      .finally(() => {
        setIsLoading(true);
      });
  };

  return { handleDelete, isLoading };
};

export const useUpdateReferral = () => {
  const [loading, setLoading] = useState(false);

  const handleUpdate = (id: string, formateData: {}) => {
    setLoading(true);
    Referral.updateReferral(id, formateData)
      .then(() => {
        setLoading(false);
        Alert.alert("Your Referral Updated Successfully");
        navigate("AllReferrals");
      })
      .catch((err) => {
        alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleUpdate, loading };
};
