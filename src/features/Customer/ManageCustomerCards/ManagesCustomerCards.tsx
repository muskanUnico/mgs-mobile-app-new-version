import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AddCards from "../../../components/ui/Customer/AddCards/AddCards";
import { getSavedCards } from "../../../hooks/Customer";
import { useDeleteCard } from "../../../hooks/TeamMembers";
import WarningModal from "../../../components/elements/WarningModal/WarningModal";
import AddNewPaymentCardModal from "../../../features/Payment/AddNewPaymentCard/Model";

const ManagesCustomerCards = ({ customerId }: any) => {
  const savedCardHook = getSavedCards(customerId);
  const savedCard = savedCardHook.data;
  
  const [addNewCardModel, setaddNewCardModel] = useState(false);
  const [open, setOpen] = useState(false);
  const [paymentMethodId, setPaymentId] = useState("");
  const { handleDeleteCard } = useDeleteCard(setOpen);

  const handleDelete = (id: string) => {
    setPaymentId(id);
    setOpen(true);
  };

  const handleFirst = () => {
    setOpen(false);
    handleDeleteCard({
      paymentMethodId: paymentMethodId,
      customerId,
    });
    savedCardHook.refetch();
  };

  const handleAddCard = () => {
    setaddNewCardModel(!addNewCardModel);
  };

  useEffect(()=>{
    savedCardHook.refetch();
  }, [addNewCardModel])

  return (
    <View>
      <AddCards
        savedCard={savedCard}
        handleDelete={handleDelete}
        handleAddCard={handleAddCard}
      />

      <AddNewPaymentCardModal
        customerId={customerId}
        open={addNewCardModel}
        setOpen={setaddNewCardModel}
      />

      <WarningModal
        modalVisible={open}
        setModalVisible={() => setOpen(false)}
        handleLeftbtn={handleFirst}
        title="Sure! You want to delete this card"
        rightBtnName={"Submit"}
        leftBtnName={"Cancel"}
        handleRightbtn={() => setOpen(false)}
      />
    </View>
  );
};

export default ManagesCustomerCards;
