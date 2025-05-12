import {
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import DrawerContent from "../src/components/DrawerContent";
import DrawerContent from "../src/components/ui/DrawerContent/DrawerContent";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../src/assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider >
        <ThemeProvider value={DefaultTheme}    >
          <Drawer
            screenOptions={{ headerShown: true}}
            drawerContent={(props) => <DrawerContent {...props}
            />}
          >
                 <Drawer.Screen name="index" options={{ headerShown: false }} />
          </Drawer>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
