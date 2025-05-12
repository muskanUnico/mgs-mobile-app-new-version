// react
import Loader from "../../../elements/Loader/Loader";
import React, { useEffect, useState } from "react";
// mui
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import AddPaymentCard from "../AddPaymentCard/AddPaymentCard";
import { getSavedCards } from "../../../../hooks/Customer";
import { useTheme } from "../../../../context/ThemeContext";

function CollectOnline({ customerId, setData }: any) {
  const cards = getSavedCards(customerId);

  //handle select card
  const [selectCard, setselectCard] = useState("");

  //payment type
  const [paymentType, setPaymentType] = useState("cards");

  const handleSelectCard = (id: string) => {
    setselectCard(id);
    setPaymentType("cards");
  };

  useEffect(() => {
    if (paymentType == "new") {
      setselectCard("");
    }
  }, [paymentType]);

  useEffect(() => {
    if (setData) {
      setData({
        paymentCardId: selectCard,
        paymentType,
      });
    }
  }, [paymentType, selectCard]);
  const { theme } = useTheme();

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#D1D5DB",
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 20,
      }}
    >
      <View style={{ paddingBottom: 16 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#f59b90",
            fontFamily: "BoldText",
          }}
        >
          SELECT A PAYMENT METHOD
        </Text>
      </View>

      {cards.loading ? (
        <Loader />
      ) : (
        cards.data.map(({ id, card }) => {
          return (
            <View key={id}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value="Manual TRX"
                  status={selectCard == id ? "checked" : "unchecked"}
                  onPress={() => handleSelectCard(id)}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 12,
                      backgroundColor: "#63b3ed",
                      borderRadius: 6,
                      color: "white",
                      fontFamily: "BoldText",
                    }}
                  >
                    {card.brand}
                  </Text>
                  <Text style={{ paddingLeft: 8, fontFamily: "BoldText" }}>
                    {card.brand} *****{card.last4}
                  </Text>
                </View>
              </View>

              <View style={{ paddingVertical: 16 }}>
                <Text style={{ fontFamily: "Regular" }}>
                  Expires: {card.exp_month}/{card.exp_year}
                </Text>
              </View>
            </View>
          );
        })
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginVertical: 8,
        }}
      >
        <RadioButton
          value="Add Payment Method"
          status={paymentType === "new" ? "checked" : "unchecked"}
          onPress={() => setPaymentType("new")}
          color={theme.brandColor}
        />
        <Text style={{ fontFamily: "BoldText" }}>Add Payment Method</Text>
      </View>

      {paymentType == "new" && (
        <AddPaymentCard
          customerId={customerId}
          refresh={() => {
            cards.refetch();
            setPaymentType("cards");
          }}
        />
      )}
    </View>
  );
}

export default CollectOnline;
