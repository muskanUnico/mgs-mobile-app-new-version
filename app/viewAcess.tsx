import React from "react";
import {
  SafeAreaView,
  ScrollView,
  ImageBackground,
  View,
  StyleSheet,
} from "react-native";
import ViewAccess from "@/src/features/TeamMember/ViewAccess/ViewAccess";
import Title from "@/src/components/elements/Title/Title";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { useLocalSearchParams } from "expo-router";

export const ViewAccessScreen = ({ navigation, route }: any) => {
    const { roleId } = useLocalSearchParams();
  return (
    <GlobalLoader>
      <ImageBackground
        source={require("@/src/assets/images/cc.png")}
        style={styles.backgroundImage}
      />
      <ScrollView>
        <Title navigation={navigation} title="View Access" />
        <View style={{ marginHorizontal: 8 }}>
          <ViewAccess navigation={navigation} route={route} roleId={roleId}/>
        </View>
      </ScrollView>
    </GlobalLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    // top: 0,
    // left: 0,
    width: "100%",
    height: "65%",
    resizeMode: "cover",
    opacity: 0.2,
    // backgroundColor: "white",
  },
});

export default ViewAccessScreen;
