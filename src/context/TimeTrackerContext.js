import moment from 'moment';
import { Alert } from 'react-native';
import { CalculateDuration } from '../utils/functions';
import { useFocusEffect } from '@react-navigation/native';
import { convertStringTimeToNumber } from '../utils/tools';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getItemFromLocalStorage, removeItemFromLocalStorage, setItemToLocalStorage } from '../helper/useLocalStorage';

const TimeContext = createContext();

export const useTimeTracker = () => {
    return useContext(TimeContext);
};

const parseJson = (item) => {
    try {
        return JSON.parse(item);
    } catch {
        return null;
    }
};

export const TimeProvider = ({ children }) => {
    const [select, setSelect] = useState();
    const [cnt, setCnt] = useState(1);

    const [store, setStore] = useState({
        startTime: "",
        endTime: "",
    });

    useFocusEffect(
        useCallback(() => {
            const init = async () => {
                const existingSelect = await getItemFromLocalStorage("timeTrackerSelect");
                setSelect(existingSelect);
            };
            init();
        }, [])
    );

    const [oldTime, setOldTime] = useState(moment());
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useFocusEffect(
        useCallback(() => {
            const initializeTime = async () => {
                const storedTime = await getItemFromLocalStorage("time");
                if (storedTime) {
                    setTime(parseJson(storedTime));
                }
            };
            initializeTime();
        }, [])
    );

    const [timerRunning, setTimerRunning] = useState(() => {
        const runningFlag = getItemFromLocalStorage("timerRunning");
        return runningFlag ? parseJson(runningFlag) : false;
    });

    const completedTimeInLocalStorage = parseJson(getItemFromLocalStorage('completedTime')) || {};
    const [completedTime, setCompletedTime] = useState(completedTimeInLocalStorage);

    const addCompletedAppointment = (id, startTime) => {
        const updatedData = {
            ...completedTime,
            [id]: [
                ...(completedTime[id] || []),
                {
                    appointmentId: select,
                    start_time: startTime,
                    end_time: moment().format("HH:mm:ss"),
                    duration: CalculateDuration(
                        convertStringTimeToNumber(moment(startTime, "HH:mm:ss").format("HH:mm")),
                        convertStringTimeToNumber(moment().format("HH:mm"))
                    ),
                },
            ],
        };
        setCompletedTime(updatedData);
        setItemToLocalStorage('completedTime', JSON.stringify(updatedData));
    };

    useFocusEffect(
        useCallback(() => {
            setItemToLocalStorage('completedTime', JSON.stringify(completedTime));
        }, [completedTime])
    );

    useEffect(() => {
        let intervalId;
        if (timerRunning) {
            intervalId = setInterval(() => {
                const latestTime = moment();
                const duration = moment.duration(latestTime.diff(oldTime));
                const newHours = Math.floor(duration.asHours());
                const newMinutes = duration.minutes();
                const newSeconds = duration.seconds();

                setTime({
                    hours: newHours % 24,
                    minutes: newMinutes,
                    seconds: newSeconds,
                });

                setItemToLocalStorage(
                    "time",
                    JSON.stringify({
                        hours: newHours % 24,
                        minutes: newMinutes,
                        seconds: newSeconds,
                    })
                );
            }, 1000);
        } else {
            removeItemFromLocalStorage("time");
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [timerRunning, oldTime]);

    const startTimer = () => {
        if (!select) {
            return Alert.alert("Pls select appointment!");
        }

        setOldTime(moment());
        setStore({
            startTime: moment().format("HH:mm:ss"),
            endTime: "",
            appointmentId: select,
        });
        setTimerRunning(true);
        setItemToLocalStorage("timerRunning", "true");
        setItemToLocalStorage("startTime", moment().format("HH:mm:ss"));
    };

    const stopTimer = async () => {
        setTimerRunning(false);
        setItemToLocalStorage("timerRunning", "false");
        const getStartTime = await getItemFromLocalStorage("startTime");
        const startTime = moment(getStartTime, "HH:mm:ss");
        const currentTime = moment();

        const duration = moment.duration(currentTime.diff(startTime));
        const endTime = startTime.clone().add(duration);
        const formattedEndTime = endTime.format("HH:mm:ss");

        setStore((prev) => ({
            ...prev,
            endTime: formattedEndTime,
        }));

        setCnt(cnt + 1);

        addCompletedAppointment(cnt, getStartTime);

        setTime({ hours: 0, minutes: 0, seconds: 0 });
        removeItemFromLocalStorage("time");
        removeItemFromLocalStorage("timeTrackerSelect");
        setSelect('');
        removeItemFromLocalStorage("startTime");
    };

    const formatTime = (time) => time.toString().padStart(2, "0");

    const value = {
        setSelect,
        store,
        setStore,
        select,
        formatTime,
        startTimer,
        stopTimer,
        time,
        timerRunning,
        completedTime,
        setCompletedTime,
    };

    return (
        <TimeContext.Provider value={value}>
            {children}
        </TimeContext.Provider>
    );
};
