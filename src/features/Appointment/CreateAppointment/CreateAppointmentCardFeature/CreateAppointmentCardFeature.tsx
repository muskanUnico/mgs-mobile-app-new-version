//@ts-nocheck
import moment, { min } from "moment";
import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
// hooks
import { getServices } from "../../../../hooks/Services";
import { getTeamMembers } from "../../../../hooks/TeamMembers";
// component
import { styles as externalStyles } from "../../../../assets/css";
import CustomHeading from "../../../../components/elements/CustomHeading/CustomHeading";
import DropdownWithSearch from "../../../../components/elements/DropdownWithSearch/DropdownWithSearch";
import AddDiscount from "../../../../components/ui/Appointment/CreateAppointment/AddDiscount/AddDiscount";
import CalculateTotal from "../../../../components/ui/Appointment/CreateAppointment/CalculateTotal/CalculateTotal";
import SelectTeamMember from "../../../../components/ui/Appointment/CreateAppointment/SelectTeamMember/SelectTeamMember";
import CreateAppointmentCard from "../../../../components/ui/Appointment/CreateAppointment/CreateAppointmentCard/CreateAppointmentCard";

const CreateAppointmentCardFeature = ({
  setTableselectedData,
  tableselectedData,
  discount,
  setManageDiscount,
  manageDiscount,
}: any) => {
  const bottomSheetRef = useRef<any>(null);
  const [selectedTeamMember, setSelectTeamMember] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const [index, setIndex] = useState(-1);
  const [store, setStore] = useState({
    value: "",
  });

  // custom hooks for integration
  const serviceApi = getServices(100);
  const teamMemberApi = getTeamMembers();

  //service
  const serviceList = serviceApi.data.map((item) => ({
    value: item?.id,
    label: item.title,
    price: item.price,
    duration: item.duration,
  }));

  //team member
  let memberList = teamMemberApi.data.map((item) => ({
    id: item?.id,
    name: item.name,
    services: item.services,
    staffHours: item.staffHours,
  }));

  //team member modal
  const [memberModal, setmemberModal] = useState({
    open: false,
    list: [],
    serviceId: "",
    index: null,
    data: {},
  });

  let getTeamMemberByService = React.useCallback(
    (serviceId: string) => {
      let result: any = [];

      memberList
        .filter((member) => member.staffHours?.onlineBooking)
        .forEach((member) => {
          const servicesMatched = member.services.includes(serviceId);

          if (servicesMatched) {
            const memberInfo = {
              name: member.name,
              id: member?.id,
            };
            result.push(memberInfo);
          }
        });

      return result;
    },
    [memberList]
  );

  const handleSelectTeamMember = () => {
    const teamMember = memberModal.list.find(
      (member) => member?.value == selectedTeamMember
    );

    if (!teamMember) {
      console.error("Team member not found.");
      return;
    }

    const updatedData = tableselectedData.map((item) => {
      if (item.service === store.value.label) {
        return {
          ...item,
          teamMember: {
            id: teamMember.value,
            name: teamMember.label,
          },
        };
      }
      return item;
    });

    setTableselectedData(updatedData);

    setmemberModal({
      ...memberModal,
      open: false,
    });
    setSelectTeamMember();
  };

  useEffect(() => {
    if (!selectedTeamMember) return;
    const isValueUnique = !tableselectedData.some(
      (item) => item.service === store?.value?.label
    );

    if (isValueUnique) {
      const teamMember = memberModal.list.find(
        (member) => member?.value == selectedTeamMember
      );
      const saved = {
        duration: store.value?.duration,
        id: store?.value?.value,
        price: store?.value?.price,
        service: store?.value?.label,
        teamMember: {
          id: teamMember?.value,
          name: teamMember?.label,
        },
      };
      setTableselectedData((prevData) => [...prevData, saved]);
    }
  }, [selectedTeamMember]);

  useEffect(() => {
    if (store?.value === "") return;

    // Check if store.value already exists in tableselectedData
    const isValueUnique = !tableselectedData.some(
      (item) => item.service === store?.value?.label
    );

    if (isValueUnique) {
      const list = getTeamMemberByService(store.value?.value).map((i: any) => ({
        label: i.name,
        value: i.id,
      }));

      setmemberModal({
        open: true,
        list: list,
        serviceId: store.value?.label,
        index: null,
      });
    }
  }, [store?.value]);

  // handle change selected service item
  const handleChangeSelectedItem = (index: number, value: object) => {
    const latestArray = [...tableselectedData];
    latestArray[index] = {
      ...latestArray[index],
      ...value,
    };

    setTableselectedData(latestArray);
  };

  // handle remove card
  const handleRemoveCard = (id: number) => {
    const updatedAppointments = tableselectedData.filter(
      (item) => item?.id !== id
    );
    setTableselectedData(updatedAppointments);
  };

  const handleTeamMember = (_, index) => {
    const item = tableselectedData[index];
    const list = getTeamMemberByService(item?.id).map((i: any) => ({
      label: i.name,
      value: i.id,
    }));
    setmemberModal({
      open: true,
      list: list,
      serviceId: item?.id,
      index: index,
    });
    setStore({
      value: {
        duration: item.duration,
        price: item.price,
        label: item.service,
        value: item.id,
      },
    });
  };

  const onChange = (hourstime: any, minuteTime: any) => {
    const updatedTableselectedData = [...tableselectedData];

    updatedTableselectedData[index] = {
      ...updatedTableselectedData[index],
      duration: parseInt(hourstime) * 60 + parseInt(minuteTime),
    };
    setTableselectedData(updatedTableselectedData);
  };

  return (
    <>
      <View style={[externalStyles.container, { paddingBottom: 64 }]}>
        <View style={{ marginHorizontal: 8, marginBottom: 8 }}>
          <CustomHeading
            text="Selected Appointment Details"
            iconName="wpforms"
          />
        </View>
        <View style={{ marginTop: 8, marginHorizontal: 4 }}>
          {tableselectedData.length > 0 &&
            tableselectedData.map((item, index) => {
              return (
                <CreateAppointmentCard
                  key={index}
                  handleRemoveCard={() => handleRemoveCard(item?.id)}
                  item={item}
                  handleTeamMember={handleTeamMember}
                  index={index}
                  setIndex={setIndex}
                  handleChangeSelectedItem={handleChangeSelectedItem}
                  onChange={onChange}
                  showPicker={showPicker}
                  setShowPicker={setShowPicker}
                />
              );
            })}
        </View>

        <View style={{ marginTop: 16, marginHorizontal: 8 }}>
          <CustomHeading text="Add services" iconName="plus" />

          <View style={{ marginBottom: 16, marginTop: 12 }}>
            <DropdownWithSearch
              data={serviceList}
              setValue={(val) => setStore((pre) => ({ ...pre, value: val }))}
              value={store.value}
            />
          </View>
        </View>

        <View>
          <View style={{ marginBottom: 16, marginHorizontal: 8 }}>
            <Text
              onPress={() => bottomSheetRef.current.open()}
              style={{ color: "#60A5FA", fontSize: 13, fontFamily: "BoldText" }}
            >
              Add Discount
            </Text>
            <AddDiscount
              bottomSheetRef={bottomSheetRef}
              data={discount}
              setData={setManageDiscount}
              defaultData={manageDiscount}
            />
          </View>

          <View style={{ marginBottom: 16, marginHorizontal: 4 }}>
            <CalculateTotal data={discount} />
          </View>
        </View>

        {memberModal.open && (
          <SelectTeamMember
            // modal open
            setOpen={(e: any) => setmemberModal({ ...memberModal, open: e })}
            open={memberModal.open}
            // function
            submit={handleSelectTeamMember}
            // store data
            data={selectedTeamMember}
            setData={(val) => setSelectTeamMember(val)}
            //list team members
            options={memberModal.list}
          />
        )}
      </View>
    </>
  );
};

export default CreateAppointmentCardFeature;
