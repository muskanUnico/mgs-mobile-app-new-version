// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { Alert, StyleSheet, Text, View } from "react-native";
// import { styles as externalStyles } from "../../../assets/css";
// import Button from "../../../components/elements/Button/Button";
// import StandardInput from "../../../components/elements/StandardInput/StandardInput";
// import Title from "../../../components/elements/Title/Title";
// import PaymentMethod from "../../../components/ui/PaymentMethod/PaymentMethod";
// import { useTheme } from "../../../context/ThemeContext";
// import {
//   collectManualPayment,
//   collectPaymentFromStripe,
// } from "../../../hooks/Payment";
// import GlobalLoader from "../../GlobalLoader/GlobalLoader";

// const Tips = ({ tips = [], setTips }) => {
//   const handleChange = (index, value) => {
//     let data = [...tips];
//     let item = data[index];
//     item.amount = Number(value);
//     setTips(data);
//   };

//   return (
//     <View style={styles.tipsContainer}>
//       {tips.map((tip, index) => (
//         <View key={index} style={{ marginHorizontal: 16 }}>
//           <Text style={[externalStyles.label, { marginTop: 12 }]}>
//             TIP ANY AMOUNT TO {tip.teamMemberName}:
//           </Text>
//           <StandardInput
//             placeholder="Amount"
//             keyboardType="numeric"
//             value={tip.amount}
//             onChangeText={(value) => handleChange(index, value)}
//           />
//         </View>
//       ))}
//     </View>
//   );
// };

// const CollectPaymentPage = ({
//   //   route,
//     // navigation,
//   customerId,
//   appointmentId,
//   amount,
//   appointmentData,
// }) => {
//   //   const customerId = customerId;
//   //   const appointmentId = appointmentId;
//   //   const appointmentData = appointmentData;
//   //   const amount = amount;
//   // const navigation = useNavigation();
//   const { theme } = useTheme();
//   const router = useRouter();
//   // console.log("customerId===>>>>", customerId)
//   // console.log("appointmentId===>>>>", appointmentId)
//   // console.log("amount===>>>>", amount)
//   // console.log("appointmentData===>>>>", appointmentData)

//   const defaultTips = appointmentData?.bookings?.reduce((acc, curr) => {
//     const existingMember = acc.find(
//       (member) => member.teamMemberId === curr.teamMemberId
//     );
//     if (!existingMember) {
//       acc.push({
//         teamMemberId: curr.teamMemberId,
//         teamMemberName: curr.teamMemberName,
//       });
//     }
//     return acc;
//   }, []);

//   const [tips, setTips] = useState(defaultTips);

//   console.log("tips ====>>>", tips);

//   let payTips = tips?.filter((tip) => tip?.amount > 0);
//   console.log("payTips ====>>>", payTips);

//   let payTipsAmount = payTips?.reduce((total, tip) => total + tip.amount, 0);
//   console.log("payTipsAmount ====>>>", payTipsAmount);

//   let finalAmount = amount + payTipsAmount;

//   console.log("finalAmount ====>>>", finalAmount);

//   const [paymentData, setPaymentData] = useState({});
//   const chargeOnlineHook = collectPaymentFromStripe();
//   const chargeManualHook = collectManualPayment();
//   const loading = chargeOnlineHook.loading || chargeManualHook.loading;

//   const handleChargePayment = async () => {
//     if (paymentData.payMethodType === "online") {
//       await chargeOnlineHook
//         .submit({
//           customerId: customerId,
//           amount: finalAmount,
//           appointmentId: appointmentId,
//           paymentType: "pending_amount",
//           paymentMethodId: paymentData.onlinePayment.paymentCardId,
//           tips: payTips,
//         })
//         .then((res) => {
//           console.log("res", res?.data) 
//           console.log("res", res?.data?.redirect_url);

//           // navigate("WebViewScreen", {
//           //   url: res?.data?.redirect_url,
//           //   data: res,
//           // });

//           router.push({
//             pathname: "/webViewscreen",
//             params: {
//               url: res?.data?.redirect_url,
//               data: JSON.stringify(res),
//             }
//           });
//         })
//         .catch((err) => {
//           Alert.alert(err.response?.data?.message);
//         });
//     } else if (paymentData.payMethodType === "manual") {
//       if (!paymentData.manualPayment.paymentMethod) {
//         return Alert.alert("Mode of Payment Required");
//       } else if (!paymentData.manualPayment.ref) {
//         return Alert.alert("Referance Number Required");
//       } else {
//         await chargeManualHook
//           .submit({
//             customerId: customerId,
//             appointmentId: appointmentId,
//             paymentType: "pending_amount",
//             payment: {
//               amount: paymentData.manualPayment.amount,
//               paymentMethod: paymentData.manualPayment.paymentMethod,
//               paymentRefNo: paymentData.manualPayment.ref,
//             },
//             tips: payTips,
//           })
//           .catch((err) => {
//             console.log(err.response?.data?.message);
//           })
//           .then((res) => {
//             // goBack()
//             router.back(); 
//           });
//       }
//     }
//   };

//   return (
//     <GlobalLoader>
//       <View
//         style={{ minHeight: "100%", backgroundColor: theme.brandGreyColor }}
//       >
//         <Title title="Collect Payment" />
//         <View style={{ marginHorizontal: 16, marginBottom: 12 }}>
//           <Tips tips={tips} setTips={setTips} />
//         </View>
//         <View style={{ marginHorizontal: 16 }}>
//           <PaymentMethod
//             customerId={customerId}
//             setData={setPaymentData}
//             amount={finalAmount}
//             islater={false}
//           />
//         </View>

//         <View style={styles.buttonContainer}>
//           <Button
//             title="Pay pending"
//             loading={loading}
//             onPress={handleChargePayment}
//           />
//         </View>
//       </View>
//     </GlobalLoader>
//   );
// };

// const styles = StyleSheet.create({
//   buttonContainer: {
//     marginTop: 20,
//     marginHorizontal: 20,
//   },
// });

// export default CollectPaymentPage;



import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View
} from "react-native";
import { styles as externalStyles } from "../../../assets/css";
import Button from "../../../components/elements/Button/Button";
import StandardInput from "../../../components/elements/StandardInput/StandardInput";
import Title from "../../../components/elements/Title/Title";
import PaymentMethod from "../../../components/ui/PaymentMethod/PaymentMethod";
import { useTheme } from "../../../context/ThemeContext";
import {
  collectManualPayment,
  collectPaymentFromStripe,
} from "../../../hooks/Payment";
import GlobalLoader from "../../GlobalLoader/GlobalLoader";

// ✅ TIPS COMPONENT
const Tips = ({ tips = [], setTips }) => {
  const handleChange = (index, value) => {
    const updatedTips = [...tips];
    updatedTips[index].amount = Number(value) ;
    setTips(updatedTips);
  };

  return (
    <View style={styles.tipsContainer}>
      {tips.map((tip, index) => (
        <View key={index} style={{ marginHorizontal: 16 }}>
          <Text style={[externalStyles.label, { marginTop: 12 }]}>
            TIP ANY AMOUNT TO {tip.teamMemberName}:
          </Text>
          <StandardInput
            placeholder="Amount"
            keyboardType="numeric"
            value={tip.amount?.toString() || ""}
            onChangeText={(value) => handleChange(index, value)}
          />
        </View>
      ))}
    </View>
  );
};

// ✅ MAIN PAYMENT PAGE
const CollectPaymentPage = ({
  customerId,
  appointmentId,
  amount,
  appointmentData,
}) => {
  const { theme } = useTheme();
  const router = useRouter();

  // ✅ Safe defaultTips initialization with amount
  const [tips, setTips] = useState(() => {
    return (
      appointmentData?.bookings?.reduce((acc, curr) => {
        const exists = acc.find(
          (member) => member.teamMemberId === curr.teamMemberId
        );
        if (!exists) {
          acc.push({
            teamMemberId: curr.teamMemberId,
            teamMemberName: curr.teamMemberName,
          });
        }
        return acc;
      }, []) ?? []
    );
  });

  // ✅ Tips Filtering & Total
  const payTips = tips.filter((tip) => tip.amount > 0);
  const payTipsAmount = payTips.reduce(
    (total, tip) => total + tip.amount,
    0
  );
  const finalAmount = amount + payTipsAmount;

  // ✅ Payment Handling
  const [paymentData, setPaymentData] = useState({});
  const chargeOnlineHook = collectPaymentFromStripe();
  const chargeManualHook = collectManualPayment();
  const loading = chargeOnlineHook.loading || chargeManualHook.loading;

  const handleChargePayment = async () => {
    if (paymentData.payMethodType === "online") {
      await chargeOnlineHook
        .submit({
          customerId,
          amount: finalAmount,
          appointmentId,
          paymentType: "pending_amount",
          paymentMethodId: paymentData.onlinePayment?.paymentCardId,
          tips: payTips,
        })
        .then((res) => {
          if (res?.data?.redirect_url) {
            router.push({
              pathname: "/webViewscreen",
              params: {
                url: res.data.redirect_url,
                data: JSON.stringify(res),
              },
            });
          }
        })
        .catch((err) => {
          Alert.alert(err.response?.data?.message || "Payment failed");
        });
    } else if (paymentData.payMethodType === "manual") {
      if (!paymentData.manualPayment?.paymentMethod) {
        return Alert.alert("Mode of Payment Required");
      }
      if (!paymentData.manualPayment?.ref) {
        return Alert.alert("Reference Number Required");
      }

      await chargeManualHook
        .submit({
          customerId,
          appointmentId,
          paymentType: "pending_amount",
          payment: {
            amount: paymentData.manualPayment.amount,
            paymentMethod: paymentData.manualPayment.paymentMethod,
            paymentRefNo: paymentData.manualPayment.ref,
          },
          tips: payTips,
        })
        .then(() => {
          router.back();
        })
        .catch((err) => {
          Alert.alert(err.response?.data?.message || "Manual payment failed");
        });
    }
  };

  return (
    <GlobalLoader>
      <View
        style={{ minHeight: "100%", backgroundColor: theme.brandGreyColor , marginBottom: 62}}
      >
        <Title title="Collect Payment" />
        <View style={{ marginHorizontal: 16, marginBottom: 12 }}>
          <Tips tips={tips} setTips={setTips} />
        </View>
        <View style={{ marginHorizontal: 16 }}>
          <PaymentMethod
            customerId={customerId}
            setData={setPaymentData}
            amount={finalAmount}
            islater={false}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Pay pending"
            loading={loading}
            onPress={handleChargePayment}
          />
        </View>
      </View>
    </GlobalLoader>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  tipsContainer: {
    paddingBottom: 8,
  },
});

export default CollectPaymentPage;
