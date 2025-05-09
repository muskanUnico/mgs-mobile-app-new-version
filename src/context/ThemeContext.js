// themeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

//global colors
import * as global from "../constants/COLORS";
import { useAuth } from './AuthContext';

const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({ ...global });
    const { CMSData } = useAuth()


    useEffect(() => {
        if (!CMSData?.colors) return;

        setTheme((old) => ({
            ...old,
            ...(CMSData.colors.brand && { brandColor: CMSData.colors.brand }),
            ...(CMSData.colors.pastel && { brandPastelColor: CMSData.colors.pastel }),
            ...(CMSData.colors.white && { brandWhiteColor: CMSData.colors.white }),
            ...(CMSData.colors.black && { brandBlackColor: CMSData.colors.black }),
            ...(CMSData.colors.gray && { brandGreyColor: CMSData.colors.gray }),
        }));
    }, [CMSData])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
