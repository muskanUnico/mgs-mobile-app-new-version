import Button from "@/src/components/elements/Button/Button";
import CustomInput from "@/src/components/elements/Input";
import { useAuth } from "@/src/context/AuthContext";
import { useGetSMS, useSendSMS } from "@/src/hooks/smsHooks";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface Message {
  text: string;
  sender: string;
  time: string;
  type: "received" | "sent" | "appointment";
  phone?: string;
  icon: boolean;
  title?: string;
  teamMemberId?: string;
  client?: string;
}

const SMSScreen = ({ route }: any) => {
  //   const ap = route.params.getAppointment;

  const { getAppointment } = useLocalSearchParams();
  const ap = getAppointment ? JSON.parse(getAppointment as string) : null;
  const { user } = useAuth();
  const { msg, setPage, loading, params } = useGetSMS(
    ap?.paymentId?.customerId || ""
  );
  const { handleSendSMS } = useSendSMS();
  //   const { msg, setPage, loading, params } = useGetSMS(ap?.paymentId.customerId);
  //   const { handleSendSMS } = useSendSMS();

  //   const {  msg, setPage, loading, params } = useLocalSearchParams();

  const transformData = (): Message[] => {
    return msg.data.map((item: any) => {
      let type: "received" | "sent" | "appointment" =
        item.customer == ap?.paymentId?.customerId
          ? "sent"
          : user.id
          ? "sent"
          : "appointment";

      return {
        text: item.payload?.content,
        sender: item.sender?.name,
        time:
          new Date(item.createdAt).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }) +
          " on " +
          new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        type: type!,
        // phone: item.to,
        icon: true,
      };
    });
  };

  const chatContainerRef = useRef(null);
  const [state, setState] = useState({
    refreshing: false,
    showPopup: false,
    newMessage: "",
    messages: [],
    loadingMore: false,
  });

  useEffect(() => {
    updateState({ messages: transformData() });
  }, [msg]);

  const { refreshing, showPopup, newMessage, messages, loadingMore } = state;

  const updateState = (data: any) => {
    setState((prevState) => ({ ...prevState, ...data }));
  };

  // const onRefresh = useCallback(() => {
  //   updateState({ refreshing: true });
  //   setTimeout(() => {
  //     updateState({ refreshing: false });
  //   }, 1000);
  // }, []);

  const modalVisibleData =
    ap.bookings?.map((item: any) => ({
      title: item.serviceName,
      client: item.teamMemberName,
      teamMemberId: item.teamMemberId,
    })) || [];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      updateState({
        messages: [
          ...messages,
          {
            text: newMessage,
            sender: "You",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            type: "sent",
            icon: false,
          },
        ],
      });
      handleSendSMS({
        type: "text",
        senderId: user.id,
        name: user.name,
        customerId: ap?.paymentId.customerId,
        payload: {
          content: newMessage,
        },
      });
      updateState({ newMessage: "" });
    }
  };

  const handleAddAppointment = (appointment: any) => {
    updateState({
      messages: [
        ...messages,
        {
          type: "appointment",
          title: appointment.title,
          client: appointment.client,
          icon: true,
        },
      ],
      showPopup: false,
    });
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      //@ts-ignore
      chatContainerRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const loadMoreMessages = () => {
    if (!loadingMore && !loading) {
      updateState({ loadingMore: true });
      setPage(params.page + 1);
      updateState({ loadingMore: false });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        position: "relative",
        bottom:10,
        backgroundColor: "white",
        paddingBottom: 40,

      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1}}
      keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 95}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, paddingBottom: 0 }}>
            <ScrollView
              ref={chatContainerRef}
               contentContainerStyle={{ padding: 16, paddingBottom: 10 }} 
                keyboardShouldPersistTaps="handled"
              // refreshControl={
              //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              // }
              onScroll={({ nativeEvent }) => {
                if (nativeEvent.contentOffset.y <= 0 && !loading) {
                  loadMoreMessages();
                }
              }}
              scrollEventThrottle={400}
              style={{
                flex: 1,
                backgroundColor: "#f3f4f6",
              }}
            >
              
              {messages.map((message: any, index: number) => (
                <View
                  key={index}
                  style={{
                    marginBottom: 16,
                    flexDirection: "row",
                    justifyContent:
                      message.type === "sent"
                        ? "flex-end"
                        : message.type === "appointment"
                        ? "center"
                        : "flex-start",
                  }}
                >
                  {message.type === "appointment" ? (
                    <View
                      style={{
                        marginTop: 16,
                        borderTopWidth: 1,
                        borderTopColor: "#d1d5db",
                        paddingTop: 16,
                        // marginBottom: 28,
                        borderRadius: 8,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          borderWidth: 1,
                          borderColor: "gray",
                          borderRadius: 8,
                          justifyContent: "center",
                          marginHorizontal: 32,
                          padding: 16,
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            alignItems: "center",
                            marginBottom: 8,
                          }}
                        >
                          <View
                            style={{
                              borderRadius: 8,
                              backgroundColor: "#E5E7EB",
                              padding: 8,
                              marginRight: 12,
                            }}
                          >
                            <Feather name="calendar" size={20} color="black" />
                          </View>
                          <View>
                            <Text
                              style={{
                                fontSize: 14,
                                color: "#374151",
                                fontWeight: "bold",
                              }}
                            >
                              {message.title}
                            </Text>
                            <Text style={{ fontSize: 12, color: "#6B7280" }}>
                              {message.client}
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity>
                          <Text
                            style={{
                              textAlign: "center",
                              color: "#2563EB",
                              textDecorationLine: "underline",
                            }}
                          >
                            View appointment
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={[
                        {
                          paddingTop: 8,
                          paddingBottom: 4,
                          paddingLeft: 8,
                          paddingRight: 20,
                          borderRadius: 12,
                          shadowColor: "white",
                          shadowOpacity: 0.8,
                          shadowRadius: 10,
                        },
                        message.type === "sent"
                          ? { backgroundColor: "#6B7280", color: "white" }
                          : { backgroundColor: "white", color: "#4B5563" },
                      ]}
                    >
                      {message.icon && message.type !== "appointment" && (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                          }}
                        >
                          <View
                            style={{
                              borderRadius: 8,
                              backgroundColor: "#E5E7EB",
                              padding: 4,
                              marginRight: 12,
                            }}
                          >
                            <MaterialIcons
                              name="message"
                              size={15}
                              color="black"
                            />
                          </View>
                          <View>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "bold",
                                color: "white",
                              }}
                            >
                              {message.sender}
                            </Text>
                          </View>
                        </View>
                      )}
                      <Text
                        style={[
                          { fontSize: 12 },
                          message.type === "sent"
                            ? { color: "white" }
                            : { backgroundColor: "white", color: "#4B5563" },
                        ]}
                      >
                        {message.text}
                      </Text>
                      <Text
                        style={{ marginTop: 4, fontSize: 12, color: "white" }}
                      >
                        {message.time}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
             
             
            </ScrollView>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 16,
                paddingTop: 8,
                // position: "absolute",
                // bottom: 28
              }}
            >
              <View>
                <Entypo
                  name="plus"
                  size={24}
                  color="black"
                  onPress={() => updateState({ showPopup: !showPopup })}
                />
              </View>

              <View style={{ width: "60%" }}>
                <CustomInput
                  placeholder="Type a message"
                  value={newMessage}
                  onChangeText={(text) => updateState({ newMessage: text })}
                />
              </View>
              <View style={{ width: "25%" }}>
                <Button title=" Send" onPress={handleSendMessage} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <Modal
        visible={showPopup}
        transparent={true}
        animationType="slide"
        onRequestClose={() => updateState({ showPopup: false })}
      >
        <View
          style={{
            position: "absolute",
            bottom: 28,
            left: 4,
            backgroundColor: "white",
            borderRadius: 8,
            padding: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 8 }}>
            Select an Appointment
          </Text>
          <ScrollView>
            {modalVisibleData.map((appointment: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: "transparent",
                }}
                onPress={() => handleAddAppointment(appointment)}
              >
                <Text style={styles.text}>{appointment.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default SMSScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
  },
});
