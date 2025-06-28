import { AntDesign, FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { styles as externalStyles } from "../../../assets/css";
import Button from "../../../components/elements/Button/Button";
import WarningModal from "../../../components/elements/WarningModal/WarningModal";
import { AddTime } from "../../../components/ui/TeamMember/AddTime/AddTime";
import WorkedHoursCard from "../../../components/ui/TeamMember/WorkedHoursCard/WorkedHoursCard";
import { greenColor } from "../../../constants/COLORS";
import { useTheme } from "../../../context/ThemeContext";
import {
  useCreateTime,
  useDeleteInsideDataTimeTracker,
  useUpdateInsideTimeTrackerEntry,
} from "../../../hooks/TimeTracker";
import {
  CalculateDuration,
  TotalTip,
  convertToISOFormat,
} from "../../../utils/functions";
import { convertStringTimeToNumber } from "../../../utils/tools";

export const WorkedHoursFeature = ({ naviagtion, route, item }: any) => {
  const data = item?.hours;
  const { handleCreateTime, loading } = useCreateTime();
  const { handleUpdateEntry, loader } = useUpdateInsideTimeTrackerEntry();
  const { handleDelete, deleteLoading } = useDeleteInsideDataTimeTracker();
  const globalLoader = !loading ? loading : loader;

  const [showAddTime, setShowAddTime] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [getOption, setGetOption] = useState({ _id: "" });
  const [choosed, setChoosed] = useState(-1);
  const [fields, setFields] = useState<any[]>([
    {
      startTime: new Date(),
      endTime: new Date(),
      workedType: "Appointment",
      reference: "",
      duration: 60,
    },
  ]);

  // handle three dot btn
  const handleOptions = (option: any, item: any) => { 
    setGetOption(item);
    if (option == 1) {
      setFields([
        {
          startTime: new Date(
            convertToISOFormat({
              date: moment(item?.date).format("YYYY-MM-DD"),
              time: item?.startTime,
            })
          ),
          endTime: new Date(
            convertToISOFormat({
              date: moment(item?.date).format("YYYY-MM-DD"),
              time: item?.endTime,
            })
          ),
     

          duration: item?.duration,
          workedType: item?.workedType,
          reference: item?.ref || "",
        },
      ]);
      setShowAddTime(true);
      setChoosed(option);
    } else if (option == 2) {
      setModalOpen(true);
    }
  };

  const options = [
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

  const handleSubmitbtn = () => {
    const formateData = {
      teamMemberId: item?.teamMemberId.id,
      date: item?.date,
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

    const update = {
      startTime: convertStringTimeToNumber(
        moment(fields[0].startTime).format("HHmm")
      ),
      endTime: convertStringTimeToNumber(
        moment(fields[0].endTime).format("HHmm")
      ),
      duration: CalculateDuration(
        convertStringTimeToNumber(moment(fields[0].startTime).format("HHmm")),
        convertStringTimeToNumber(moment(fields[0].endTime).format("HHmm"))
      ),
      workedType: fields[0].workedType,
      reference: fields[0].reference,
    };

    const isTaskEmpty = fields.some(
      (field: any) => field?.workedType?.trim() == ""
    );
    if (isTaskEmpty) {
      Alert.alert("Task is Required");
    } else if (choosed == 1) {
      handleUpdateEntry(item?.id, getOption._id, update);
    } else {
      handleCreateTime(formateData);
    }
  };
  const { theme } = useTheme();

  return (
    <>
      <View style={styles.rowContainer}>
        <View style={styles.row}>
          <FontAwesome
            name="money"
            style={[externalStyles.iconColorStyle, { color: greenColor }]}
          />
          <Text
            style={[
              externalStyles.label,
              { color: theme.brandColor },
              styles.labelText,
            ]}
          >
            TOTAL EARNING : ${TotalTip(data)}
          </Text>
        </View>
        {!showAddTime && (
          <View style={styles.buttonContainer}>
            <Button title="Add" onPress={() => setShowAddTime(true)} />
          </View>
        )}
        {showAddTime && (
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={() => setShowAddTime(false)} />
          </View>
        )}
      </View>
      {showAddTime && (
        <View style={{ marginHorizontal: 16, marginBottom: 12 }}>
          <AddTime
            setFields={setFields}
            fields={fields}
            handleSubmitbtn={handleSubmitbtn}
            loading={globalLoader}
          />
        </View>
      )}

      {data.map((item: any, index: number) => {
        return (
          <WorkedHoursCard
            handleDelete={handleDelete}
            item={item}
            key={index}
            options={options}
            handleOptions={handleOptions}
            index={index}
          />
        );
      })}

      <WarningModal
        modalVisible={modalOpen}
        setModalVisible={setModalOpen}
        title={
          "Are u really sure if u delete this all the worked hours log on this day will be deleted ?"
        }
        handleLeftbtn={() =>
          handleDelete(item?.id, getOption._id, setModalOpen)
        }
        handleRightbtn={() => setModalOpen(false)}
        leftBtnName={"NO"}
        rightBtnName={"Delete"}
        loading={!deleteLoading}
      />
    </>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  labelText: {
    marginLeft: 5,
  },
  buttonContainer: {
    marginLeft: 20,
  },
});

export default WorkedHoursFeature;
