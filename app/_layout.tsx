import Loader from "@/src/components/elements/Loader/Loader";
import { brandColor } from "@/src/constants/COLORS";
import { TimeProvider } from "@/src/context/TimeTrackerContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DrawerContent from "../src/components/ui/DrawerContent/DrawerContent";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { ThemeProvider } from "../src/context/ThemeContext";
import Header from "@/src/components/ui/Header/Header";

function AuthenticatedDrawer({ user }: { user: any }) {
  return (
        <Drawer
          screenOptions={{
            lazy:true,
            headerShown: true,
            header: (props) => <Header {...props} />,
            drawerStyle: { backgroundColor: brandColor, width: "74%" },
          }}
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen
            name="(tabs)"
            options={{
              headerShown: true,
            }}
          />
            <Drawer.Screen name="(stack)" options={{ headerShown: true}} />
        </Drawer>
  );
}





// Separate this from RootLayout — it will be wrapped by AuthProvider
function RootLayoutInner() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../src/assets/fonts/Poppins-Regular.ttf"),
  });

  const { user, isLoading } = useAuth();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    if (fontsLoaded && isLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoading]);

  if (!fontsLoaded || !isLoading) return <Loader />;

  return !user ? (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
    </Stack>
  ) : (
    <>
      <AuthenticatedDrawer user={user} />
      <StatusBar style="dark" backgroundColor={brandColor} />
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AutocompleteDropdownContextProvider>
          <AuthProvider>
            <ThemeProvider>
              <TimeProvider>
                <RootLayoutInner />
              </TimeProvider>
            </ThemeProvider>
          </AuthProvider>
        </AutocompleteDropdownContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
