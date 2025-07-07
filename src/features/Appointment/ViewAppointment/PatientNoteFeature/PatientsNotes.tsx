//@ts-nocheck
import React from "react";
import { View } from "react-native";
import Loader from "../../../../components/elements/Loader/Loader";
import PatientNote from "../../../../components/ui/Appointment/ViewAppointment/PatientNote/PatientNote";
import { getPatientNotes } from "../../../../hooks/Appointment";

const PatientsNotes = ({ customerId, id, navigation }: any) => {
  const { data, getloading } = getPatientNotes({ customerId: customerId });

  const defaultData = [
    { title: "area-tested" },
    { title: "spot-size" },
    { title: "energy-pluse" },
    { title: "offpluse" },
    { title: "dcd" },
  ];

  const defaultIcons = [
    { icon: "map", color: "#F08080" },
    { icon: "expand", color: "#87CEFA" },
    { icon: "cogs", color: "#9370DB" },
    { icon: "signal", color: "#FFB6C1" },
    { icon: "hourglass", color: "#848484" },
  ];

  return (
    <>
      {getloading ? (
        <Loader />
      ) : (
        <View style={{ marginTop: 8 , marginHorizontal:28}}>
          {data.results.map((item, index) => {
            const defaultDataShow = [
              {
                title: defaultData.map((item) => item.title),
                icon: defaultIcons.map((item) => item.icon),
                des: item.data.map((item) => item.desc),
              },
            ];
            return (
              <PatientNote
                navigation={navigation}
                index={index}
                defaultIcons={defaultIcons}
                defaultDataShow={defaultDataShow}
                key={index}
                item={item}
                appointmentId={id}
              />
            );
          })}
        </View>
      )}
    </>
  );
};

export default PatientsNotes;
