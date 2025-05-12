import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";

const GlobalLoader = ({ children }: any) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {!refreshing && children}
    </ScrollView>
  );
};

export default GlobalLoader;
