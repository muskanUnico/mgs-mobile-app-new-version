import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useFonts } from "expo-font";
import { useEffect } from "react";
import Entypo from '@expo/vector-icons/Entypo';

let customFonts = {
    // InterBlack: require("../assets/fonts/Inter-Medium.ttf"),
    // CretypeCaros: require("../assets/fonts/cretype-Caros.otf"),
    // CretypeCarosBold: require("../assets/fonts/cretype-Caros-Bold.otf"),
   Regular: require("../assets/fonts/Poppins-Regular.ttf"),
  BoldText: require("../assets/fonts/Poppins-SemiBold.ttf"),

    // Super: require("../assets/fonts/Super.ttf"),
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export const LoadFonts = () => {
    const [isLoaded] = useFonts(customFonts);

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync(Entypo.font);
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } 
        }

        prepare();
    }, []);

    if (isLoaded) {
        SplashScreen.hideAsync();
    }
}