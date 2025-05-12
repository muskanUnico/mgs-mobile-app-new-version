import moment from "moment";

type InputData = {
    [day: string]: {
        available: boolean;
        timeslot: Array<{
            start_time: any;
            end_time: any;
        }>;
    };
};

type OutputData = {
    [day: string]: Array<{
        start_time: number;
        end_time: number;
    }>;
};

export const convertTimes = (input: InputData): OutputData => {
    const output: OutputData = {};

    for (const day in input) {
        const dayData = input[day];

        if (dayData.available) {
            output[day] = dayData.timeslot.map((slot) => ({
                start_time: moment(slot.start_time).hour() * 100 + moment(slot.start_time).minute(),
                end_time: moment(slot.end_time).hour() * 100 + moment(slot.end_time).minute(),
            }));
        } else {
            output[day] = [];
        }
    }

    return output;
};
