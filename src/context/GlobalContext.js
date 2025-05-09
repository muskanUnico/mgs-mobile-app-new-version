
import { CMSServices } from '../services/CMS';
// GlobalContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

export const useGlobal = () => {
    return useContext(GlobalContext);
};

export const useSnackbar = () => {
    const { snackbar, setSnackbar } = useGlobal();

    const SnackbarHandler = (open, type, message) => {
        setSnackbar((old) => ({ ...old, open, message, type }));
    }

    return {
        SnackbarHandler,
        snackbar,
        setSnackbar
    }
}

export const GlobalProvider = ({ children }) => {
    const [data, setData] = useState({});
    const [page, setPage] = useState({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: "",
        message: ""
    });

    // CMS Logic 
    const [CMSdata, setCMSData] = useState({})
    useEffect(() => {
        CMSServices.getCMS()
            .then((res) => {
                setCMSData(res.data)
            })
    }, [])

    let value = {
        data, setData,
        page, setPage,
        snackbar, setSnackbar,
        sidebar,
        setCMSData, CMSdata
    };
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};
