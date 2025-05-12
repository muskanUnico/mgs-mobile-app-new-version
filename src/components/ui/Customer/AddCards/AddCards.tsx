import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { styles as externalStyles } from "../../../../assets/css";
import CustomHeading from "../../../../components/elements/CustomHeading/CustomHeading";

const AddCards = ({ handleDelete, handleAddCard, savedCard }: any) => {
  return (
    <>
      <View style={[externalStyles.card]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 8,
          }}
        >
          <CustomHeading iconName="credit-card" text=" Card on File" />

          <TouchableOpacity onPress={handleAddCard}>
            <AntDesign name="pluscircleo" size={19} color="#3498db" />
          </TouchableOpacity>
        </View>

        <Divider />

        {savedCard.map((item: any, index: number) => {
          return (
            <View key={index} style={styles.container}>
              <View style={styles.layout}>
                <Text
                  style={{
                    opacity: 0.5,
                    borderWidth: 2,
                    padding: 8,
                    borderRadius: 2,
                    fontFamily: "BoldText",
                  }}
                >
                  visa
                </Text>
                <View style={styles.paddingLeft}>
                  <Text style={[externalStyles.label]}>
                    End in {item.card.last4}
                  </Text>
                  <Text style={[externalStyles.content]}>
                    {" "}
                    {item.card.exp_month}/{item.card.exp_year}
                  </Text>
                </View>
              </View>

              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={[styles.redText, { fontFamily: "BoldText" }]}>
                  <AntDesign name="delete" size={19} color="red" />
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default AddCards;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  layout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  paddingLeft: {
    paddingLeft: 8,
  },
  redText: {
    color: "red",
  },
});
