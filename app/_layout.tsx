import {
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DrawerContent from "../src/components/ui/DrawerContent/DrawerContent";
import { AuthProvider, useAuth } from "../src/context/AuthContext";



// Auth-aware drawer setup
function AuthenticatedDrawer() {
  const { user, isLoading } = useAuth();

  if (!isLoading) {
    // Auth is still loading
    return null; // Or show splash screen
  }

  return (
    <Drawer
      screenOptions={{ headerShown: true }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      {!user ? (
        <>
          <Drawer.Screen name="index" options={{ headerShown: false }} />
          <Drawer.Screen name="+not-found"/>
        </>
      ) : (
        <>
          <Drawer.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* Add other private screens here if needed */}
        </>
      )}
    </Drawer>
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
        <AuthProvider>
          <ThemeProvider value={DefaultTheme}>
            <AuthenticatedDrawer />
          </ThemeProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}











// export default function RootLayout() {
//   const [loaded] = useFonts({
//     SpaceMono: require("../src/assets/fonts/Poppins-Regular.ttf"),
//   });

//   if (!loaded) {
//     return null;
//   }

  
 

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaProvider >
//         <ThemeProvider value={DefaultTheme}    >
//           <Drawer
//             screenOptions={{ headerShown: true}}
//             drawerContent={(props) => <DrawerContent {...props}
//             />}
//           >
//                  <Drawer.Screen name="index" options={{ headerShown: false }} />
//           </Drawer>
//         </ThemeProvider>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// }
  