import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import moment from "moment";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { styles as externalStyles } from "../../../../assets/css";
import CustomHeading from "../../../../components/elements/CustomHeading/CustomHeading";
import { getPaymentHistory } from "../../../../hooks/Customer";

const CustomerActivity = ({ customerId }: any) => {
  const payments = getPaymentHistory(customerId);
  const router = useRouter();
  return (
    !payments.loading &&
    payments.data?.results?.length > 0 && (
      <>
        <View style={[externalStyles.card]}>
          <CustomHeading iconName="tasks" text="Activity" />
          <Divider style={styles.verticalSpacing} />

          {payments.data?.results?.map((item: any, index: number) => {
            const formattedDate = moment(item?.date).format("lll");
            const deposit = item?.advancePayment;
            return (
              <>
                <View key={index}>
                  <View style={[{ flex: 1 }, styles.rowLayout]}>
                    <View style={styles.rowCenterLayout}>
                      <View style={styles.container}>
                        <MaterialCommunityIcons
                          name="book"
                          size={20}
                          color="white"
                        />
                      </View>

                      <View style={styles.paddingLeft}>
                        <View style={[{ flex: 1 }, styles.centerLayout]}>
                          <Text
                            style={[styles.marginRight, externalStyles.label]}
                          >
                            ${item.amount.total} Purchase
                            {deposit && (
                              <Text
                                style={[
                                  styles.textStyle,
                                  { fontFamily: "BoldText" },
                                ]}
                              >
                                ${deposit.amount} Deposit
                              </Text>
                            )}
                          </Text>

                          {item.paymentStatus == "paid" ? (
                            <Text style={[externalStyles.greenText]}>PAID</Text>
                          ) : item.paymentStatus == "pending" ? (
                            <Text
                              style={[
                                styles.textStyle2,
                                { fontFamily: "BoldText" },
                              ]}
                            >
                              PENDING
                            </Text>
                          ) : (
                            <Text
                              style={[
                                styles.textStyle,
                                { fontFamily: "Regular" },
                              ]}
                            >
                              ({item.paymentStatus})
                            </Text>
                          )}
                        </View>

                        <Text style={[externalStyles.content]}>
                          {formattedDate}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        // navigate("viewinvoice", {
                        //   paymentId: item?.appointmentId.paymentId,
                        // })
                       router.push({
  pathname: "/(stack)/viewInvoice",
  params: {
    paymentId: item?.appointmentId?.paymentId}
  })
            
}>
                      <MaterialIcons
                        name="arrow-forward-ios"
                        style={[externalStyles.iconStyle]}
                      />
                    </TouchableOpacity>
                  </View>
                  <Divider style={styles.verticalSpacing} />
                </View>
              </>
            );
          })}

          {payments.showLoadMore && (
            <Text
              style={[externalStyles.BlueText, styles.margin]}
              onPress={payments.loadMore}
            >
              See More
            </Text>
          )}
        </View>
      </>
    )
  );
};

export default CustomerActivity;
const styles = StyleSheet.create({
  verticalSpacing: {
    marginVertical: 4,
  },
  rowLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  rowCenterLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: 4,
    backgroundColor: "blue",
    borderRadius: 4,
  },
  paddingLeft: {
    paddingLeft: 8,
  },
  centerLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle2: {
    fontSize: 12,
    fontWeight: "800",
    color: "red",
  },
  textStyle: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  margin: {
    marginBottom: 12,
    marginTop: 4,
  },
  marginRight: {
    marginRight: 8,
  },
});
