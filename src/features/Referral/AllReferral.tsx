import { View } from "react-native";
import ReferralCards from "./ReferralCards";
import React, { useEffect, useState } from "react";
import {
  useApproveReferral,
  useDeleteReferral,
  useGetReferrals,
  useHandleOptionsReferral,
  useRejectReferral,
} from "../../hooks/ManageReferral";
import { useAuth } from "../../context/AuthContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Loader from "../../components/elements/Loader/Loader";
import WarningModal from "../../components/elements/WarningModal/WarningModal";

export const AllReferral = () => {
  const { permissions } = useAuth();
  // integration
  const { handleApprove } = useApproveReferral();
  const { handleReject } = useRejectReferral();
  const { handleDelete, isLoading } = useDeleteReferral();
  const { data, refetch, loading } = useGetReferrals();
  const [warningModalOpen, setWarninigModalOpen] = useState(false);

  // hook for manage handle options
  const { handleRejectbtn, handleApprovebtn, handleOptions, warning } =
    useHandleOptionsReferral({
      setWarninigModalOpen,
      handleReject,
      handleApprove,
      handleDelete,
      refetch,
    });

  const getOptions = (status: string) => {
    const options = [];
    if (permissions.includes("edit_referral")) {
      options.push({
        id: 1,
        title: "Edit",
        icon: <AntDesign name="edit" size={16} color="black" />,
        line: true,
      });
    }
    if (permissions.includes("delete_referral")) {
      options.push({
        id: 2,
        title: "Delete",
        icon: <AntDesign name="delete" size={16} color="red" />,
        line: false,
      });
    }
    if (
      status == "pending" &&
      permissions.includes("approve_reject_referral")
    ) {
      options.unshift({
        id: 0,
        title: "Approve / Reject",
        icon: <AntDesign name="checkcircleo" size={16} color="black" />,
        line: false,
      });
    }
    return options;
  };

  useEffect(() => {
    if (isLoading) refetch();
  }, [isLoading]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {data.map((item: any, index: number) => {
            const rowOptions = getOptions(item.status);
            return (
              <ReferralCards
                item={item}
                rowOptions={rowOptions}
                index={index}
                key={index}
                handleOptions={handleOptions}
              />
            );
          })}
        </View>
      )}
      <WarningModal
        modalVisible={warningModalOpen}
        setModalVisible={setWarninigModalOpen}
        title={warning.title}
        handleLeftbtn={handleApprovebtn}
        handleRightbtn={handleRejectbtn}
        leftBtnName={warning.btnSecName}
        rightBtnName={warning.btnFirstName}
        loading={!isLoading}
      />
    </>
  );
};
