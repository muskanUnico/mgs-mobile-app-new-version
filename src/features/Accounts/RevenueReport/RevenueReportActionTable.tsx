import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import LongMenu from "../../..//components/elements/LongMenu/LongMenu";
import { styles as externalStyles } from "../../../assets/css";
import Button from "../../../components/elements/Button/Button";
import CustomModal from "../../../components/elements/CustomModal/CustomModal";
import Title from "../../../components/elements/Title/Title";
import {
  iconCalenderColor,
  iconColor3,
  iconPhoneColor,
} from "../../../constants/COLORS";
import { useDeleteExpense } from "../../../hooks/Accounts/Expense";
import AddIncome from "../IvsE/AddIncome";

interface RevenueReportActionTableProps {
  navigation: any;
  route: any;
  data:any,
  action:any,
}

const RevenueReportActionTable: React.FC<RevenueReportActionTableProps> = ({
  route,
  navigation,
  data,
  action
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef<any>(null);
  const [getOption, setGetOption] = useState({});
  const { handleDelete, isLoading } = useDeleteExpense(setModalVisible);

  const [form, setForm] = useState({
    date: "",
    description: "",
    ref: "",
    amount: "",
    type: "other",
    _id: "",
  });

  const options = [
    {
      id: 1,
      title: "Edit",
      icon: <MaterialIcons name="edit" size={20} color="black" />,
    },
    {
      id: 2,
      title: "Delete",
      icon: <MaterialIcons name="delete" size={20} color="black" />,
    },
  ];

  const handleOptions = (option: any, item: any) => {
    setForm(item);
    setGetOption(option);
    if (option.title == "Edit") {
      setTimeout(() => {
        bottomSheetRef.current.open();
      }, 1000);
    } else {
      setModalVisible(true);
    }
  };
  return (
    <>
      <Title
        navigation={navigation}
        title={`${moment(data.date).format("DD MMM YYYY")}`}
      />

      {data.entries.map((item: any, index: number) => {
        return (
          <View style={[externalStyles.card]} key={index}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={styles.row}>
                <FontAwesome
                  name="calendar"
                  style={[externalStyles.iconColorStyle, { color: iconColor3 }]}
                />
                <Text style={[externalStyles.label]}>DATE : </Text>
                <Text style={[externalStyles.content]}>
                  {moment(data.date).format("DD MMM YYYY")}
                </Text>
              </View>
              {action && (
                <LongMenu
                  options={options}
                  handleOptions={(option: any) => handleOptions(option, item)}
                />
              )}
            </View>
            <Divider style={{ marginBottom: 12, marginTop: 4 }} />

            <View style={styles.row}>
              <FontAwesome
                name="dollar"
                style={[
                  externalStyles.iconColorStyle,
                  { color: iconPhoneColor },
                ]}
              />
              <Text style={[externalStyles.label]}>AMOUNT : </Text>
              <Text style={[externalStyles.content]}>{item.amount}</Text>
            </View>
            <Divider style={{ marginBottom: 12, marginTop: 4 }} />

            <View>
              <View style={styles.row}>
                <FontAwesome
                  name="file-text-o"
                  style={[
                    externalStyles.iconColorStyle,
                    { color: iconCalenderColor },
                  ]}
                />
                <Text style={[externalStyles.label]}>DESCRIPTION : </Text>
              </View>

              <View>
                <Text style={[externalStyles.content, { flex: 1 }]}>
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
        );
      })}

      <AddIncome
        bottomSheetRef={bottomSheetRef}
        form={form}
        getOption={getOption}
        wholeData={data}
      />

      <CustomModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        text="Other Income"
      >
        <View>
          <Text style={{ textAlign: "center", fontFamily: "BoldText" }}>
            Are you sure you want to delete this?
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
          }}
        >
          <Button
            loading={!isLoading}
            onPress={() => handleDelete(data._id, form?._id)}
            title="Delete"
          />
          <Button onPress={() => setModalVisible(false)} title="Cancel" />
        </View>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default RevenueReportActionTable;
