import React, { useCallback, useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import ViewDetailsCards from "./PayrollCards";
import PayrollTablefeature from "./PayrollTablefeature";
import { useAuth } from "../../../context/AuthContext";
import { styles as externalStyles } from "../../../assets/css";
import Button from "../../../components/elements/Button/Button";
import AutoComplete from "../../../components/elements/AutoComplete/AutoComplete";
import {
  useDeleteTimeTracker,
  useGetTimeTracker,
  useUpdateTimeTrackerStatus,
} from "../../../hooks/TimeTracker";
import { getTeamMembers } from "../../../hooks/TeamMembers";
import { DefaultSelected } from "../../../utils/functions";
import { useFocusEffect } from "@react-navigation/native";
import WarningModal from "../../../components/elements/WarningModal/WarningModal";
import Loader from "../../../components/elements/Loader/Loader";
import { PermissionAccess } from "../../../middleware/PermissionAccess";
import CustomPagination from "../../../components/elements/CustomPagination/CustomPagination";
import { AntDesign } from "@expo/vector-icons";

const ManagePayrollfeature = ({ navigation }: any) => {
  const { permissions } = useAuth();
  const { data } = getTeamMembers();
  const [selectedStatus, setSelectedStatus] = useState<any>([]);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const { page } = params;

  const { timeData, setPage, isloading, refetch } = useGetTimeTracker(
    setParams,
    params
  );
  const { handleUpdateStatus } = useUpdateTimeTrackerStatus();
  const { handleDelete, loading } = useDeleteTimeTracker();
  let manage_payroll = permissions.includes("manage_payroll");

  const [modalOpen, setModalOpen] = useState(false);
  const [team, setTeamMember] = useState({
    id: "",
    title: "",
  });
  const [getOption, setGetOptions] = useState({
    id: "",
  });
  const dataSet = data.map((item) => ({ title: item.name, id: item?.id }));

  const handleAddPayroll = () => {
    navigation.navigate("AddPayroll", { edit: false });
  };

  const option = [
    {
      id: 1,
      title: "Edit Payroll",
      icon: <AntDesign name="edit" size={20} color="black" />,
      line: true,
    },
    {
      id: 2,
      title: "Delete",
      icon: <AntDesign name="delete" size={20} color="red" />,
      line: false,
    },
  ];

  // handle three dot btn
  const handleOptions = (option: any, item: any) => {
    setGetOptions(item);
    if (option.id == 1) {
      navigation.navigate("AddPayroll", { edit: true, data: item });
    } else if (option.id == 2) {
      setTimeout(() => {
        setModalOpen(true);
      }, 1000);
    }
  };

  // handle side effects
  useFocusEffect(
    useCallback(() => {
      setSelectedStatus(DefaultSelected(timeData.results));
    }, [timeData])
  );

  useFocusEffect(
    useCallback(() => {
      if (team.id == "") return;
      setParams((prev) => ({
        ...prev,
        teamMemberId: team?.id,
      }));
    }, [team])
  );

  return (
    <>
      <ViewDetailsCards />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            externalStyles.container,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          {manage_payroll && (
            <AutoComplete
              inputValue={team}
              dataSet={dataSet}
              setInputValue={setTeamMember}
              placeholder="Select Team Member"
            />
          )}
          <PermissionAccess requiredPermissions={["create_payroll"]}>
            <View style={{ marginLeft: 24 }}>
              <Button title="Add" onPress={handleAddPayroll} />
            </View>
          </PermissionAccess>
        </View>
      </TouchableWithoutFeedback>

      {isloading ? (
        <Loader />
      ) : (
        <>
          {timeData.results.map((item, index) => {
            return (
              <View style={{ marginTop: 12 }} key={index}>
                <PayrollTablefeature
                  handleOptions={handleOptions}
                  index={index}
                  item={item}
                  handleUpdateStatus={handleUpdateStatus}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                  option={option}
                />
              </View>
            );
          })}

          <CustomPagination
            gotoPage={setPage}
            totalPage={timeData.totalPages}
            pageIndex={page}
          />
        </>
      )}

      <WarningModal
        modalVisible={modalOpen}
        setModalVisible={setModalOpen}
        title={
          "Are u really sure if u delete this all the worked hours log on this day will be deleted ?"
        }
        handleLeftbtn={() => handleDelete(getOption?.id, refetch, setModalOpen)}
        handleRightbtn={() => setModalOpen(false)}
        leftBtnName={"NO"}
        rightBtnName={"Delete"}
        loading={!loading}
      />
    </>
  );
};

export default ManagePayrollfeature;
