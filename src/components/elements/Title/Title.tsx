import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

const Title = ({ title }: { title: string }) => {

  const { theme } = useTheme();
  const navigation = useNavigation();

const route = useRoute();
const lastScreen = (route.params as { fromScreen?: string } | undefined)?.fromScreen || 'Home';

  return (
    <View
    style={[
      {
        paddingBottom: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      },
      { backgroundColor: theme.brandColor },
    ]}
  >
      {/* icon  onPress */}
      <TouchableOpacity
        style={{ position: "absolute", left: 16 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back-outline" size={24} color="white" />
      </TouchableOpacity>

      <Text
        style={{
          color: "white",

          fontSize: 18,
          flexWrap: "wrap",
          textShadowColor: "black",
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 4,
          paddingTop: 15,
          fontFamily: "BoldText"

        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default Title;
