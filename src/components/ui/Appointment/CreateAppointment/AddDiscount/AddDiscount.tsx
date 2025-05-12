//@ts-nocheck
import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomInput from "../../../../elements/Input";
import Button from "../../../../elements/Button/Button";
import CustomBottomSheet from "../../../../elements/BottomSheet/CustomBottomSheet";
import CustomDropDown from "../../../../elements/CustomDropDown/CustomDropDown";
import { getCouponDiscountPrice } from "../../../../../hooks/Coupon";

const AddDiscount = ({ bottomSheetRef, data, defaultData, setData }: any) => {
  const [customSelect, setCustomSelect] = useState("coupon");
  const [manualSelect, setManualSelect] = useState("");
  const [inputval, setInputval] = useState({
    coupon: "",
    percentage: 0,
    fixed: 0,
  });

  let coupon = getCouponDiscountPrice();

  const custom = [
    { label: "Custom", value: "custom" },
    { label: "Coupon", value: "coupon" },
  ];

  const manual = [
    { label: "%", value: "percentage" },
    { label: "Fixed", value: "fixed" },
  ];

  const handleChangeInput = (field: string, value: string) => {
    setInputval((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (defaultData) {
      setCustomSelect(defaultData.code ? "coupon" : "custom");
      setManualSelect(defaultData?.custom?.customType);
      setInputval((prev) => ({
        ...prev,
        coupon: defaultData.code || "",
        [defaultData?.custom?.customType]:
          defaultData?.custom?.customValue.toString() || 0,
      }));
    }
  }, [defaultData]);

  const handleSubmit = async () => {
    if (customSelect == "coupon") {
      //coupon handle
      let res = await coupon.submit({
        couponCode: inputval.coupon,
        totalPrice: data.amount,
      });

      if (!res?.discountedPrice) return;

      setData((old: any) => ({
        code: inputval.coupon,
        discountType: res.coupon.discountType,
        discountValue: res.coupon.discountValue,
      }));

      setInputval({ coupon: inputval.coupon, percentage: 0, fixed: 0 });
    } else {
      setData((old: any) => ({
        custom: {
          customType: manualSelect,
          customValue: Number(inputval[manualSelect]),
        },
      }));
      setInputval({
        coupon: "",
        percentage: 0,
        fixed: 0,
        [manualSelect]: Number(inputval[manualSelect]),
      });
    }
    bottomSheetRef.current.close();
  };

  return (
    <CustomBottomSheet
      bottomSheetRef={bottomSheetRef}
      text="Add Discount"
      height={400}
    >
      <View style={styles.PaddedView}>
        <CustomDropDown
          label="Select for discount"
          value={customSelect}
          placeholder="Select for discount"
          setValue={setCustomSelect}
          items={custom}
        />

        {customSelect === "coupon" && (
          <View style={styles.customContainer}>
            <CustomInput
              label="Coupon code"
              placeholder="Coupon code"
              onChangeText={(text) => handleChangeInput("coupon", text)}
              value={inputval.coupon}
            />
          </View>
        )}

        {customSelect == "custom" && (
          <View style={styles.paddingTopView}>
            <CustomDropDown
              value={manualSelect}
              setValue={setManualSelect}
              items={manual}
              placeholder=" Choose Once Again"
            />
          </View>
        )}

        {manualSelect === "percentage" && (
          <View style={styles.paddingView}>
            <CustomInput
              label="Percentage value"
              placeholder="%"
              onChangeText={(text) => handleChangeInput("percentage", text)}
              value={inputval.percentage}
              disableFullscreenUI={true}
              keyboardType="number-pad"
            />
          </View>
        )}

        {manualSelect === "fixed" && customSelect != "coupon" && (
          <View style={styles.viewWithPadding}>
            <CustomInput
              label="Fixed value"
              placeholder="Fixed"
              onChangeText={(text) => handleChangeInput("fixed", text)}
              value={inputval.fixed}
              disableFullscreenUI={true}
              keyboardType="number-pad"
            />
          </View>
        )}

        <View style={styles.paddingTopView}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </CustomBottomSheet>
  );
};

export default AddDiscount;
const styles = StyleSheet.create({
  PaddedView: {
    padding: 20,
  },
  customContainer: {
    paddingTop: 24,
    paddingBottom: 16,
  },
  paddingTopView: {
    paddingTop: 16,
  },
  paddingView: {
    paddingTop: 24,
    paddingBottom: 16,
  },
  viewWithPadding: {
    paddingTop: 24,
    paddingBottom: 16,
  },
  paddingTopView: {
    paddingTop: 16,
  },
});
