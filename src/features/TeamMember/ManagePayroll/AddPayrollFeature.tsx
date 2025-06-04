import { Fontisto } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { Alert, Text, View } from "react-native";
import { styles as externalStyles } from "../../../assets/css";
import AutoComplete from "../../../components/elements/AutoComplete/AutoComplete";
import SingleDatePicker from "../../../components/elements/SingleDatePicker/SingleDatePicker";
import { AddTime } from "../../../components/ui/TeamMember/AddTime/AddTime";
import { iconColor7 } from "../../../constants/COLORS";
import { getTeamMembers } from "../../../hooks/TeamMembers";
import {
  useCreateTime,
  useUpdateDataTimeTracker,
} from "../../../hooks/TimeTracker";
import {
  CalculateDuration,
  convertToISOFormat,
} from "../../../utils/functions";
import { convertStringTimeToNumber } from "../../../utils/tools";

export const AddPayrollFeature = ({ route, isEdit }: any) => {
  const { handleUpdate, loader } = useUpdateDataTimeTracker();
  const root = route.params;


  const { handleCreateTime, loading } = useCreateTime();
  const { data } = getTeamMembers();
  const globalLoader = !loading ? loading : loader;

  const dataSet = data.map((item) => ({ title: item.name, id: item?.id }));

  const [dateFilter, setDateFilter] = useState(new Date());
  const [team, setTeamMember] = useState({
    id: root.data?.teamMemberId?.id,
    title: root.data?.teamMemberId?.id,
  });

  const [fields, setFields] = useState<any[]>([
    {
      startTime: new Date(),
      endTime: new Date(),
      workedType: "Appointment",
      reference: "",
      duration: 60,
    },
  ]);

  useFocusEffect(
    useCallback(() => {
      const exiting = root.data?.hours.map((item: any, index: any) => ({
        startTime: new Date(
          convertToISOFormat({
            date: moment(root.data?.date).format("YYYY-MM-DD"),
            time: item?.startTime,
          })
        ),
        endTime: new Date(
          convertToISOFormat({
            date: moment(root.data?.date).format("YYYY-MM-DD"),
            time: item?.endTime,
          })
        ),
        duration: item?.duration,
        workedType: item?.workedType,
        reference: item?.ref || "",
      }));
      if (isEdit) {
        setFields(exiting);
        setDateFilter(new Date(root.data?.date));
      }
    }, [route.params?.data])
  );

  const handleSubmitbtn = () => {
    const formateData = {
      teamMemberId: team?.id,
      date: dateFilter,
      hours: fields.map((item, index) => ({
        startTime: convertStringTimeToNumber(
          moment(item.startTime).format("HHmm")
        ),
        endTime: convertStringTimeToNumber(moment(item.endTime).format("HHmm")),
        duration: CalculateDuration(
          convertStringTimeToNumber(moment(item.startTime).format("HHmm")),
          convertStringTimeToNumber(moment(item.endTime).format("HHmm"))
        ),
        workedType: item.workedType,
        reference: item.reference,
      })),
    };

    const isTaskEmpty = fields.some(
      (field: any) => field?.workedType?.trim() == ""
    );
    if (isTaskEmpty) {
      Alert.alert("Task is Required");
    } else if (team?.id == "") {
      Alert.alert("Team Member is Required");
    } else if (isEdit) {
      handleUpdate(root.data?.id, formateData);
    } else {
      handleCreateTime(formateData);
    }
  };

  return (
    <>
      <View style={{ marginHorizontal: 24, marginTop: 8 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 12,
          }}
        >
          <Fontisto
            name="date"
            style={[externalStyles.iconColorStyle, { color: iconColor7 }]}
          />
          <Text style={[externalStyles.label, { marginRight: 8 }]}>
            Select Date :
          </Text>
          <SingleDatePicker date={dateFilter} setDate={setDateFilter} />
        </View>

        <View style={{ marginTop: 8, marginBottom: 16 }}>
          <AutoComplete
            inputValue={team}
            dataSet={dataSet}
            setInputValue={setTeamMember}
            placeholder="Select Team Member"
          />
        </View>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <AddTime
          setFields={setFields}
          fields={fields}
          handleSubmitbtn={handleSubmitbtn}
          loading={globalLoader}
        />
      </View>
    </>
  );
};
