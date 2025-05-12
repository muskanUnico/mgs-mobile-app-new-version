//@ts-nocheck
import { View } from "react-native";
import React, { useRef, useState } from "react";
import {
  createService,
  deleteService,
  getServices,
  updateService,
} from "../../hooks/Services";
import Button from "../../components/elements/Button/Button";
import ServiceCard from "../../components/ui/Services/ServiceCard/ServiceCard";
import CustomPagination from "../../components/elements/CustomPagination/CustomPagination";
import { generateHoursArray } from "../../utils/functions";
import CustomBottomSheet from "../../components/elements/BottomSheet/CustomBottomSheet";
import ServiceForm from "../../components/ui/Services/ServiceForm/ServiceForm";
import { PermissionAccess } from "../../middleware/PermissionAccess";

export const AllServices = () => {
  const bottomSheetRef = useRef(null);
  const { data, res, setPage, refetch, page } = getServices(10);
  //integration
  const [defaultData, setDefaultData] = useState(null);
  const createServiceHook = createService(bottomSheetRef, refetch);
  const serviceHook = updateService(bottomSheetRef, refetch);
  const deleteHook = deleteService(defaultData?.id, bottomSheetRef);

  const optionMinutes = [
    {
      label: "0 Minutes",
      value: "0",
    },
    {
      label: "15 Minutes",
      value: "15",
    },
    {
      label: "30 Minutes",
      value: "30",
    },
    {
      label: "45 Minutes",
      value: "45",
    },
  ];

  //form data
  const option = generateHoursArray(23);
  const [hours, setHours] = useState(option[0].value);
  const [minutes, setMinutes] = useState(optionMinutes[0].value);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    switchValue: false,
    overlap: false,
  });

  const handleRelocation = (item) => {
    setFormData({
      title: item.title,
      price: item.price,
      description: item.description,
      switchValue: item.active,
      overlap: item.isComplex,
    });
    setHours(Math.floor(item.duration / 60).toString());
    setMinutes((item.duration % 60).toString());
    setDefaultData(item);
    if (item) {
      bottomSheetRef.current.open();
    }
  };

  const handleCreateServices = () => {
    setDefaultData(null);
    setFormData({
      title: "",
      price: "",
      description: "",
      switchValue: false,
      overlap: false,
    });
    setMinutes(optionMinutes[0].value);
    setHours(option[0].value);
    if (!defaultData) {
      bottomSheetRef.current.open();
    }
  };

  const handleSave = () => {
    const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);

    let body = {
      title: formData.title,
      price: formData.price,
      description: formData.description,
      duration: totalMinutes,
      active: formData.switchValue,
      isComplex: formData.overlap,
    };
    if (!defaultData) {
      createServiceHook.submit(body, bottomSheetRef, refetch);
    } else {
      serviceHook.submit(defaultData?.id, body, bottomSheetRef, refetch);
    }
  };

  const handleDetale = () => {
    deleteHook.submit(defaultData?.id);
    setTimeout(() => {
      refetch();
    }, 3000);
  };

  return (
    <>
      <PermissionAccess requiredPermissions={["create_service"]}>
      <View style={{ marginHorizontal: 16, marginVertical: 8 }}>
      <Button title="Create Services" onPress={handleCreateServices} />
        </View>
      </PermissionAccess>

      {data.map((item, index) => {
        return (
          <ServiceCard
            item={item}
            key={index}
            handleRelocation={handleRelocation}
            index={index}
          />
        );
      })}
      <CustomPagination
        gotoPage={setPage}
        totalPage={res.totalPages}
        pageIndex={page}
      />

      <CustomBottomSheet
        bottomSheetRef={bottomSheetRef}
        text="Services"
        height={630}
      >
        <ServiceForm
          // hours
          hours={hours}
          setHours={setHours}
          //minutes
          minutes={minutes}
          setMinutes={setMinutes}
          // option data
          option={option}
          optionMinutes={optionMinutes}
          //form
          formData={formData}
          setFormData={setFormData}
          //actions
          handleSave={handleSave}
          handleDelete={() => handleDetale()}
          defaultData={defaultData}
          //loaders
          deleteHook={deleteHook}
          serviceHook={serviceHook}
        />
      </CustomBottomSheet>
    </>
  );
};
