import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WebView as RNWebView } from "react-native-webview";
// import { navigate } from "../../utils/navigationServices";

const WebViewScreen = ({ route }: any) => {
  //   const { url, data } = route.params;
  const router = useRouter();

  const { url, data } = useLocalSearchParams();
  const parsedData = data ? JSON.parse(data as string) : null;
    const finalUrl = Array.isArray(url) ? url[0] : url;

  const appointmentId = parsedData?.data?.paymentIntent?.metadata?.appointmentId;
  console.log("url=====>>>>>>", finalUrl);
  console.log("appointmentId===================", appointmentId);
  const handleNavigationStateChange = (newNavState: any) => {
    const { url } = newNavState;
    console.log("newNavState", newNavState);
    if (url === finalUrl) {
      console.log("false pressses ");
    //   navigate("ViewAppointment", { id: appointmentId });
   router.push({
  pathname: "/viewAppointments",
  params: { id: appointmentId },
});
      return false;
    }
    console.log("true pressses ");
    return true;
  };

  return (
    <View style={{ flex: 1 }}>
      <RNWebView
        source={{ uri:finalUrl }}
        style={{ flex: 1 }}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        onShouldStartLoadWithRequest={(request) =>
          handleNavigationStateChange(request)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WebViewScreen;
