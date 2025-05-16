import Header from "@/src/components/ui/Header/Header";
import { brandColor } from "@/src/constants/COLORS";
import { TimeProvider } from "@/src/context/TimeTrackerContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DrawerContent from "../src/components/ui/DrawerContent/DrawerContent";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { ThemeProvider } from "../src/context/ThemeContext";


function AuthenticatedDrawer() {
  const { user, isLoading } = useAuth();

  if (!isLoading) {
    return null; 
  }

  return !user ? (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />

    </Stack>
  ) : (
    <>
      <Drawer
        screenOptions={{ header: (props) => <Header {...props} />,
        headerShown: true,drawerStyle:{backgroundColor: brandColor, width: "74%"}}}
        
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="(tabs)" options={{
         headerShown:true
         }} />
      </Drawer>
    </>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../src/assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
       <SafeAreaProvider>
        <AutocompleteDropdownContextProvider >
          <AuthProvider>
            <ThemeProvider>
              <TimeProvider>
              <AuthenticatedDrawer />
              </TimeProvider>
            </ThemeProvider>
          </AuthProvider>
        </AutocompleteDropdownContextProvider>
        <StatusBar style="dark" backgroundColor= {brandColor}/>
        </SafeAreaProvider>
      </GestureHandlerRootView>
  );
}

