//@ts-nocheck
import React from "react";
import { Dimensions, SafeAreaView, View } from "react-native";
// component
import Button from "@/src/components/elements/Button/Button";
import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import NotificationCard from "@/src/features/Notification/NotificationCard";
import NotificationHeader from "@/src/features/Notification/NotificationHeader";
import { getAllNotification, markAsRead } from "@/src/hooks/Notification";

const Notification = () => {
  const { loading, res, data, refetch, params, setPage } = getAllNotification();
  const markAsReadHook = markAsRead();

  const handleMarkAsRead = async (item: any) => {
    const url = item.payload.url;

    // navigate
    // if (extractPathFromUrl(url) == "manage-appointment") {
    //   navigate("ViewAppointment", { id: item?._id });
    // }

    await markAsReadHook.submit(item?._id);
    refetch();
  };

  const handleLoadMore = async () => {
    if (loading || params.page >= res.pageSize) return;

    setPage(params.page + 1);
  };
  const { theme } = useTheme();
  const screenHeight =  Dimensions.get('window').height;
  const ScreenWidth =  Dimensions.get('window').height;
  return (
    <GlobalLoader>
      <NotificationHeader currentPage={params?.page} refresh={refetch} />

      <SafeAreaView style={{ backgroundColor: theme.brandGreyColor, flex: 1 }}>
        {data.map((item) => {
          return (
            <NotificationCard
              key={item._id}
              data={item}
              onPress={() => handleMarkAsRead(item)}
            />
          );
        })}
      </SafeAreaView>

      {!loading && (
        <View
          style={{
            width:ScreenWidth*0.14,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: screenHeight * 0.04,
          }}
        >
          <Button title="Load More" onPress={handleLoadMore} />
        </View>
      )}
    </GlobalLoader>
  );
};

const Index = () => {
  return (
    <GlobalLoader>
      <Notification />
    </GlobalLoader>
  );
};

export default Index;
