const moment = require('moment');
import { convertStringTimeToNumber } from "./tools";

export const DefaultSelected = (data) => {
    return data.reduce((result, current, index) => {
        if (current.status == "pending") {
            result[index] = 'pending';
        } else {
            result[index] = 'completed';
        }
        return result;
    }, {});
}

export const TotalTip = (arr) => {
    let tipSum = arr?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.amount;
    }, 0);

    return tipSum
}

export const CalculateDuration = (startTime, endTime) => {
    // Convert start and end times to minutes
    const startHour = Math.floor(startTime / 100);
    const startMinute = startTime % 100;
    const endHour = Math.floor(endTime / 100);
    const endMinute = endTime % 100;

    // Calculate total minutes for start and end times
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    // Calculate the duration
    let duration;
    if (endTotalMinutes < startTotalMinutes) {
        // If end time is earlier than start time, it crosses midnight
        duration = (24 * 60 - startTotalMinutes) + endTotalMinutes;
    } else {
        // If end time is after start time, calculate duration normally
        duration = endTotalMinutes - startTotalMinutes;
    }

    return isNaN(duration) ? 0 : duration;
}

export const totalRevenueChartFormateData = (inputData, type) => {
    const result = [];
    let sum = 0;

    if (type) {
        inputData.forEach((x, index) => {
            sum += x.totalRevenue;

            const currentMonth = moment(x.date).format('MMMM');
            const nextMonth = index + 1 < inputData.length ? moment(inputData[index + 1].date).format('MMMM') : null;

            if (currentMonth !== nextMonth || index === inputData.length - 1) {
                result.push({
                    value: sum,
                });
                sum = 0;
            }
        });
    } else {
        inputData.forEach((x) => {
            result.push({
                value: x.totalRevenue,
            });
        })
    }

    return result;
};

export const totalExpenseChartFormateData = (inputData, type) => {
    const result = [];
    let sum = 0;

    if (type) {
        inputData.forEach((x, index) => {
            sum += x.totalExpense;

            const currentMonth = moment(x.date).format('MMMM');
            const nextMonth = index + 1 < inputData.length ? moment(inputData[index + 1].date).format('MMMM') : null;

            if (currentMonth !== nextMonth || index === inputData.length - 1) {
                result.push({
                    value: sum,
                });
                sum = 0;
            }
        });
    } else {
        inputData.forEach((x) => {
            result.push({
                value: x.totalExpense
            });
        });
    }
    return result;
};

export const ProfitChartFormateData = (inputData, type) => {
    const result = [];
    let sum = 0;
    let cnt = 0;

    if (type) {
        inputData.forEach((x, index) => {
            sum += x.totalRevenue;
            cnt += x.totalExpense;

            const currentMonth = moment(x.date).format('MMMM');
            const nextMonth = index + 1 < inputData.length ? moment(inputData[index + 1].date).format('MMMM') : null;

            if (currentMonth !== nextMonth || index === inputData.length - 1) {
                result.push({
                    Profit: (sum - cnt)
                });
                sum = 0;
                cnt = 0;
            }
        });
    } else {
        inputData.forEach((x) => {
            sum += x.totalRevenue;
            cnt += x.totalExpense;

            result.push({
                Profit: (sum - cnt)
            });
            sum = 0;
            cnt = 0;

        });
    }

    return result;
};

export const currentMonthChartFormateData = (inputData, type) => {
    const result = [];

    if (type) {
        inputData.forEach((x, index) => {
            const currentMonth = moment(x.date).format('MMMM');
            const nextMonth = index + 1 < inputData.length ? moment(inputData[index + 1].date).format('MMMM') : null;

            if (currentMonth !== nextMonth || index === inputData.length - 1) {
                result.push(currentMonth);
            }
        });

    } else {
        inputData.forEach((x) => {
            const currentMonth = moment(x.date).format('Do MMM YYYY');
            result.push(currentMonth);

        });
    }

    return result;
};

export const formateSalesChartData = (inputData, type) => {
    const result = [];

    if (type === "monthly") {
        Object.keys(inputData).forEach(date => {
            result.push({
                label: moment(date).format('D MMM YYYY'),
                value: inputData[date]
            });
        });
    } else {
        const monthlyData = Object.entries(inputData).reduce((acc, [date, value]) => {
            const month = moment(date).format('MMMM');
            acc[month] = (acc[month] || 0) + value;
            return acc;
        }, {});

        Object.entries(monthlyData).forEach(([month, value]) => {
            result.push({
                label: month,
                value: value.toFixed()
            });
        });
        return result;
    }
}

export const convertDataFormat = (originalData, userId) => {
    const formateData = {
        teamMemberId: userId,
        date: new Date(),
        hours: []
    };

    for (const [teamMemberId, appointments] of Object.entries(originalData)) {
        for (const appointment of appointments) {
            const startTime = convertStringTimeToNumber(moment(appointment.start_time, "HH:mm:ss").format("HH:mm"));
            const endTime = convertStringTimeToNumber(moment(appointment.end_time, "HH:mm:ss").format("HH:mm"));
            const duration = appointment.duration;

            formateData.hours.push({
                startTime,
                endTime,
                workedType: "Appointment",
                reference: teamMemberId,
                duration
            });
        }
    }

    formateData.hours.sort((a, b) => a.startTime - b.startTime);

    return formateData;
};

export const formateDataForPieChart = (data, color) => {
    let pieChart = [];
    for (let i = 0; i < data.length; i++) {
        let x = data[i];
        pieChart.push({ value: x.count, color: color[i] });
    }

    return pieChart;
}

export const formateDataForPieChartInAccountPage = (data, type, color) => {
    let pieChart = [];
    for (let i = 0; i < data.length; i++) {
        let x = data[i];
        if (type == 'gross') {
            pieChart.push({ id: i, value: x.total, label: x.serviceName, color: color[i] });
        } else if (type == "member") {
            pieChart.push({ id: i, value: x.count, label: x.teamMember.teamMemberName, color: color[i] });
        }
    }

    return pieChart;
}

export const getCountAppointmentMonthWise = (appointments) => {
    let monthCounts = {}; // Object to store month-wise appointment counts

    // Iterate through appointments
    appointments.forEach((appointment) => {
        // Extract the month name from the appointment's date
        const monthName = moment(appointment.date).format("MMMM");

        // Increment the count for the current month or initialize it to 1 if not present
        monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
    });

    // Convert monthCounts object to an array of objects with label and value
    let ans = Object.keys(monthCounts).map(monthName => ({
        label: monthName,
        value: monthCounts[monthName]
    }));

    return ans;
};


export const generateHoursArray = (numHours) => {
    const hoursArray = [];

    for (let i = 0; i <= numHours; i++) {
        hoursArray.push({
            label: `${i} Hours`,
            value: i.toString(),
        });
    }

    return hoursArray;
}

export const convertNumberToStringTime = (number) =>
    `${String(number).padStart(4, "0").slice(0, 2)}:${String(number)
        .padStart(4, "0")
        .slice(2)}`;

export function convertToISOFormat(dateTimeObj) {
    const { date, time } = dateTimeObj;

    // Check if time is a string, convert to number if necessary
    let timeNumber;
    if (typeof time === 'string') {
        timeNumber = convertStringTimeToNumber(time);
    } else if (typeof time === 'number') {
        timeNumber = time;
    } else {
        throw new Error('Invalid time format');
    }

    // Extract hours and minutes from the time number
    const hours = Math.floor(timeNumber / 100);
    const minutes = timeNumber % 100;

    // Wrap date into a Moment.js object
    let formatDate = new Date(date);
    formatDate.setHours(hours);
    formatDate.setMinutes(minutes);

    return formatDate.toISOString()
}

export const generateUniqueColor = (existingColors = new Set()) => {
    const letters = '0123456789ABCDEF';
    let color;
    do {
        color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
    } while (existingColors.has(color));

    existingColors.add(color);
    return color;
};

export const generateColorArray = (count, notShouldBe) => {
    const colorArray = [];
    const existingColors = new Set(notShouldBe ? [notShouldBe] : []);

    while (colorArray.length < count) {
        let color = generateUniqueColor(existingColors);
        colorArray.push({ color, check: false });
    }

    return colorArray;
};

export const convertAppointmentsToMarkedDates = (appointments) => {
    const markedDates = {};

    appointments.forEach((item) => {
        const date = item.date.split("T")[0];

        markedDates[date] = {
            marked: true,
            label: item,
        };
    });

    return markedDates;
}


export const convertDatesToMarkedFormat = (data) => {
    const colors = {
        "pending": "#F98917",
        "approved": "green"
    };

    const markedDates = {};

    data.forEach(item => {
        if (item.status === 'rejected') return;

        const status = item.status;
        const color = colors[status] || '#000000';
        const dates = item.dates;

        dates.forEach((dateStr, index) => {
            const date = dateStr.split('T')[0];

            if (!markedDates[date]) {
                markedDates[date] = { periods: [] };
            }

            let period = { startingDay: false, endingDay: false, color: color };

            // For single dates
            if (item.dateType === "single") {
                period.startingDay = true;
                period.endingDay = true;
            } else {
                if (index === 0) {
                    period.startingDay = true;
                }
                if (index === dates.length - 1) {
                    period.endingDay = true;
                }
            }

            markedDates[date].periods.push(period);
        });
    });
    return markedDates;
}

export const transformViewInvoiceData = (input) => {
    const {
        appointmentId,
        createdAt,
        customerId,
        id,
        invoiceDate,
        invoiceNo,
        paymentId,
        updatedAt,
    } = input;

    return {
        amount: {
            discount: appointmentId.amount.discount,
            subtotal: appointmentId.amount.subtotal,
            tax: appointmentId.amount.tax,
            total: appointmentId.amount.total,
        },
        bookings: appointmentId.bookings.map((booking) => ({
            _id: booking._id,
            amount: {
                discount: booking.amount.discount,
                subtotal: booking.amount.subtotal,
                total: booking.amount.total,
            },
            end_time: booking.end_time,
            minutes: booking.minutes,
            serviceId: booking.serviceId,
            serviceName: booking.serviceName,
            start_time: booking.start_time,
            teamMemberId: booking.teamMemberId,
            teamMemberName: booking.teamMemberName,
        })),
        createdAt: appointmentId.createdAt,
        customerId: {
            email: customerId.email,
            id: customerId.id,
            name: customerId.name,
        },
        date: appointmentId.date,
        email: customerId.email,
        end_time_range: appointmentId.end_time_range,
        id: appointmentId.id,
        name: customerId.name,
        notes: false,
        paymentId: {
            advancePayment: paymentId.advancePayment,
            amount: paymentId.amount,
            appointmentId: paymentId.appointmentId,
            createdAt: paymentId.createdAt,
            customerId: paymentId.customerId,
            id: paymentId.id,
            payment: paymentId.payment,
            paymentStatus: paymentId.paymentStatus,
            paymentType: paymentId.paymentType,
            payments: paymentId.payments,
            tips: paymentId.tips,
            updatedAt: paymentId.updatedAt,
        },
        reschedule: undefined,
        start_time_range: appointmentId.start_time_range,
        status: appointmentId.status,
        updatedAt: appointmentId.updatedAt,
    };
};

export const formatCardCount = (count) => {
    if (count >= 1000) {
        return new Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short' }).format(count);
    } else {
        return count?.toString();
    }
};

