import AutoCompleteInput from "@/src/components/elements/AutoCompleteInput/AutoCompleteInput";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { styles as externalStyles } from "../../assets/css";
import Button from "../../components/elements/Button/Button";
import StandardInput from "../../components/elements/StandardInput/StandardInput";
import { getCustomers } from "../../hooks/Customer";
import {
  useCreateReferral,
  useUpdateReferral,
} from "../../hooks/ManageReferral";

const AddReferralFeature = ({ isEdit, referral }: any) => {
  const [percent, setPercent] = useState("");
  // const [coupon, setCoupon] = useState("");
  const [customer, setCustomer] = useState({
    id: "",
    title: "",
  });

  // customers
  const { data } = getCustomers({ defaultParams: {} });
  const updateReferral = useUpdateReferral();
  const createReferral = useCreateReferral();

  const globalLoading = createReferral.loading
    ? createReferral.loading
    : updateReferral.loading;

  const formatePercent = {
    customer: customer.id,
    discountPercentage: parseInt(percent, 10),
  };

  // Options for autocomplete
  const options = data.map((item) => ({ title: item.name, id: item._id }));

  useFocusEffect(
    useCallback(() => {
      if (isEdit) {
        setCustomer({
          id: referral?.customer?.id,
          title: referral?.customer?.name,
        });
        // setCoupon(route.params.data?.couponCode);
        setPercent(referral?.discountPercentage?.toString());
      }
    }, [referral])
  );

  // Handle submit action
  const handleAddReferral = () => {
    if (isEdit) {
      updateReferral.handleUpdate(customer.id, {
        discountPercentage: parseInt(percent, 10),
      });
    } else {
      createReferral.handleCreate(formatePercent);
    }
  };

  return (
    <>
      <View style={[externalStyles.container, { marginHorizontal: 12 }]}>
        <View style={{ marginTop: 12, marginBottom: 8 }}>
          <AutoCompleteInput
            inputValue={customer}
            dataSet={options}
            setInputValue={setCustomer}
            label="Select Customer"/>
        </View>

        {/* <View>
          <StandardInput
            label="Coupon Code"
            placeholder="Coupon Code(optional)"
            value={coupon}
            onChangeText={setCoupon}
          />
        </View> */}

        <View style={{ marginVertical: 16 }}>
          <StandardInput
            label="Discount Percentage"
            placeholder="Discount Percentage"
            value={percent}
            onChangeText={setPercent}
          />
        </View>

        <View style={{ marginVertical: 20 }}>
          <Button
            title="Submit"
            onPress={handleAddReferral}
            loading={globalLoading}
          />
        </View>
      </View>
    </>
  );
};

export default AddReferralFeature;
