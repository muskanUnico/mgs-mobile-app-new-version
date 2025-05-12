import moment from "moment";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Button from "../../../components/elements/Button/Button";
import { useCreateExpense } from "../../../hooks/Accounts/Expense";
import StandardInput from "../../../components/elements/StandardInput/StandardInput";
import CustomBottomSheet from "../../../components/elements/BottomSheet/CustomBottomSheet";
import SingleDatePicker from "../../../components/elements/SingleDatePicker/SingleDatePicker";

const AddExpense = ({ bottomSheetRef, refetch }: any) => {
  const [description, setDescription] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());

  const createExpense = useCreateExpense(refetch);

  let formateData = {
    date: moment(date).format("YYYY-MM-DD"),
    entryData: {
      type: "other",
      description: description,
      ref: referenceNo,
      amount: parseInt(amount),
    },
  };

  const handleSubmit = () => {
    setTimeout(() => {
      bottomSheetRef.current.close();
    }, 1000);
    createExpense.handleCreate(formateData);
  };

  return (
    <CustomBottomSheet
      bottomSheetRef={bottomSheetRef}
      text="Add Expense"
      height={500}
    >
      <View style={styles.container}>
        <View>
          <StandardInput
            placeholder="Description"
            label="Expense Description"
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
            loading={createExpense.loading}
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
});

export default AddExpense;
