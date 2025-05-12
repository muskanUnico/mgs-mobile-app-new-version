import React, { useEffect, useState } from "react";
import { addAllNotes } from "../../../../hooks/Appointment";
import EditComment from "../../../../components/ui/Appointment/ViewAppointment/EditComment/EditComment";

const EditCommentFeature = ({ route, navigation }: any) => {
  const { submit, loading, setLoading } = addAllNotes();

  // state store form data
  const [appointment, setAppointment] = useState();
  const [formData, setFormData] = useState({
    areaTested: "",
    spotSize: "",
    energyPulse: "",
    numOfPulse: "",
    dcdSprayDelay: "",
    adminComment: "",
    customerComment: "",
  });

  // use to set item data
  useEffect(() => {
    const data = route.params.item.data.reduce((acc: any, it: any) => {
      acc[it.title] = it.desc;
      return acc;
    }, {});

    setFormData({
      areaTested: data["area-tested"],
      spotSize: data["spot-size"],
      energyPulse: data["energy-pluse"],
      numOfPulse: data["offpluse"],
      dcdSprayDelay: data["dcd"],
      adminComment: route.params.item.adminDescription,
      customerComment: route.params.item.description,
    });
    setAppointment(route.params.item.appointmentId);
  }, [route.params.item]);

  // formate data for api
  let inputdata = {
    description: formData.customerComment,
    adminDescription: formData.adminComment,
    data: [
      {
        title: "area-tested",
        desc: formData.areaTested,
      },
      {
        title: "spot-size",
        desc: formData.spotSize,
      },
      {
        title: "energy-pluse",
        desc: formData.energyPulse,
      },
      {
        title: "offpluse",
        desc: formData.numOfPulse,
      },
      {
        title: "dcd",
        desc: formData.dcdSprayDelay,
      },
    ],
  };

  // handle save
  const handleSave = async () => {
    submit(appointment, inputdata)
      .then((res) => {
        if (res?.success) {
          navigation.navigate("ViewAppointment", { id: appointment });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <EditComment
      formData={formData}
      setFormData={setFormData}
      handleSave={handleSave}
      loading={loading}
      navigation={navigation}
    />
  );
};

export default EditCommentFeature;
