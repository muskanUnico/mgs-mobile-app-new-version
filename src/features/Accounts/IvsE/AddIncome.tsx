import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomBottomSheet from "../../../components/elements/BottomSheet/CustomBottomSheet";
import Button from "../../../components/elements/Button/Button";
import SingleDatePicker from "../../../components/elements/SingleDatePicker/SingleDatePicker";
import StandardInput from "../../../components/elements/StandardInput/StandardInput";
import {
  useCreateRevenue,
  useUpdateRevenue,
} from "../../../hooks/Accounts/Revenue";

const AddIncome = ({
  bottomSheetRef,
  refetch,
  form,
  getOption,
  navigation,
  wholeData,
}: any) => {
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [amount, setAmount] = useState("");
  const createRevenue = useCreateRevenue(refetch);
  const updateRevenue = useUpdateRevenue(navigation);
  // console.log("nav", navigation);

  const glodalLoading = createRevenue.loading
    ? createRevenue.loading
    : updateRevenue.loading;

  useFocusEffect(
    useCallback(() => {
      if (form != undefined) {
        setDate(new Date(form?.createdAt));
        setDescription(form?.description);
        setReferenceNo(form?.ref);
        setAmount(form?.amount?.toString());
      }
    }, [form, bottomSheetRef])
  );

  let formateData = {
    date: moment(date).format("YYYY-MM-DD"),
    entryData: {
      type: "other",
      description: description,
      ref: referenceNo,
      amount: parseInt(amount),
    },
  };

  let formateEdit = {
    date: moment(date).format("YYYY-MM-DD"),
    type: "other",
    description: description,
    ref: referenceNo,
    amount: parseInt(amount),
  };

  const handleSubmit = () => {
    console.log("getoption====",getOption.id);
    if (getOption?.id == 1) {
      updateRevenue.handleUpdate(wholeData?._id, form?._id, formateEdit);
    } else {
      createRevenue.handleCreate(formateData);
    }
    setTimeout(() => {
      bottomSheetRef.current.close();
    }, 1000);
  };

  return (
    <CustomBottomSheet
      bottomSheetRef={bottomSheetRef}
      text="Add Income"
      height={500}
    >
      <View style={styles.container}>
        <View>
          <StandardInput
            placeholder="Description"
            label="Income Description"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <StandardInput
            placeholder="Reference No"
            label="Reference No"
            value={referenceNo}
            onChangeText={setReferenceNo}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <StandardInput
            placeholder="Amount"
            label="Amount"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <SingleDatePicker date={date} setDate={setDate} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Submit"
            onPress={handleSubmit}
            loading={glodalLoading}
          />
        </View>
      </View>
    </CustomBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,

    marginBottom: 20,
    fontFamily: "BoldText",
  },
});

export default AddIncome;
