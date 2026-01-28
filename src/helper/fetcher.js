import axios from "axios";
import { getItemFromLocalStorage } from "./useLocalStorage";

// const apiUrl = process.env.BACKEND_URL;
const apiUrl = "http://192.0.0.2:5001/api/v1/admin";
export const apiUrlFCM = "http://192.0.0.2:5001/api/v1/";
// const apiUrl = "https://octopus-app-t4kn9.ondigitalocean.app/api/v1/admin";   
// const apiUrl = "https://api-v1.mygirlsouz.com/api/v1/admin";
// const apiUrl = "https://octopus-app-t4kn9.ondigitalocean.app/api/v1/admin";     

const fetcher = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});


// Add a response interceptor
fetcher.interceptors.request.use(
    async function (config) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        let user = await getItemFromLocalStorage("user");
        // console.log("Logged User name >>>> ", user.jwt.token)
        config.headers.Authorization = `Bearer ${user?.jwt?.token}`;

        return config;
    },
    function (error) {
        console.log("Error >>>> ", error);
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default fetcher;


