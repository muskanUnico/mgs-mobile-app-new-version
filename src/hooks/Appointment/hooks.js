import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { navigate } from 'expo-router/build/global-state/routing';
import { useRouter } from 'expo-router';
import {
    iconColor1,
    iconColor2,
    iconColor3,
    iconColor5,
    iconColor6,
    iconColor7,
    redLabelColor
} from "../../constants/COLORS";
import { addTimeInTime } from "../../utils/tools";

const iconsMap = {
    CheckCircle: 'checkmark-circle-outline',
    Cancel: 'close-circle-outline',
    Update: 'sync',
    Description: 'document',
    Delete: 'trash',
    Message: 'chatbubbles',
    HourglassEmpty: 'hourglass-outline',
    AttachMoney: 'cash',
    Receipt: 'receipt',
    QueryBuilderIcon: 'time',
};

const CustomIcon = ({ name, size = 24, color = 'black' }) => {
    const iconName = iconsMap[name] || 'help-circle-outline';

    if (name === 'QueryBuilderIcon') {
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
    } else {
        return <Ionicons name={iconName} size={size} color={color} />;
    }
};


export function getTeamMemberRequirements(inputServices) {
    return inputServices.reduce((members, service) => {
        const index = members.findIndex((mem) => mem.teamMemberId == service.teamMember.id);

        if (index !== -1) {
            members[index].minutesRequirement += service.duration;
        } else {
            members.push({
                teamMemberId: service.teamMember.id,
                minutesRequirement: service.duration,
            });
        }

        return members.sort((a, b) => b.minutesRequirement - a.minutesRequirement);
    }, []);
}


export function generateBookingResponse(arrA, arrB) {
    return arrB.map(({ id: serviceId, duration, teamMember: { id: teamMemberId } }) => {
        const { start_time, end_time } = arrA.find(a => a.teamMemberId == teamMemberId && a.minutes == duration) || {};
        return start_time ? { serviceId, teamMemberId, start_time, end_time } : null;
    }).filter(Boolean);
}

/**
 * Formats the input data for services based on selected data and final response.
 * @param {Object} inputData - The input data containing tableselectedData and finalResponse.
 * @param {Array} inputData.tableselectedData - Selected data for services.
 * @param {Object} inputData.finalResponse - Final response containing schedule data.
 * @returns {Array} - Formatted array of services.
 * 
 */
export function formatServicesData({ tableselectedData = [], finalResponse = {} } = {}) {
    // Result array to store formatted services
    const result = [];

    // Sort tableselectedData based on duration in descending order
    [...tableselectedData]
        .sort((a, b) => b.duration - a.duration)
        .forEach((service) => {
            // Destructure service object to get required properties
            const { id: serviceId, teamMember, duration, price } = service;

            // Get teamMemberId from teamMember object (assuming it's always available)
            const teamMemberId = teamMember?.id;

            // Find teamMemberSchedule in finalResponse.data based on teamMemberId
            const teamMemberSchedule = finalResponse.data.find(
                (schedule) => schedule.teamMemberId === teamMemberId
            );

            // Determine the start_time based on whether result array is empty
            let getTeamResult = result.filter((res) => res.teamMemberId == teamMemberId);
            const start_time = getTeamResult.length > 0 ? getTeamResult[getTeamResult.length - 1]?.end_time || teamMemberSchedule?.start_time : teamMemberSchedule?.start_time;

            // Push the formatted service object into the result array
            result.push({
                serviceId,
                teamMemberId,
                start_time,
                end_time: addTimeInTime(start_time, duration),
                price: Number(price),
            });
        });

    // Return the formatted result array
    return result;
}


export function validateBookingData(data) {
    const errors = [];

    if (!data.customer) {
        errors.push("customer is missing");
    }

    if (!data.teamMemberId) {
        errors.push("teamMemberId is missing");
    }

    if (!data.date) {
        errors.push("date is missing");
    }

    if (!data.bookings || data.bookings.length === 0) {
        errors.push("bookings array is missing or empty");
    } else {
        data.bookings.forEach((booking, index) => {
            if (!booking.serviceId) {
                errors.push(`serviceId is missing for booking ${index + 1}`);
            }

            if (!booking.teamMemberId) {
                errors.push(`teamMemberId is missing for booking ${index + 1}`);
            }

            if (!booking.start_time || !booking.end_time) {
                errors.push(`start_time or end_time is missing for booking ${index + 1}`);
            }

            if (!booking.price) {
                errors.push(`price is missing for booking ${index + 1}`);
            }
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}


export async function calculateAmounts({ bookings = [], manageDiscount, dynamicTax }) {

    const subtotalPromises = bookings.map(async (booking) => {
        return Number(booking.price);
    });

    const subtotalValues = await Promise.all(subtotalPromises);
    const subtotal = subtotalValues.reduce((total, value) => total + value, 0);


    if (subtotal == 0) return {
        subtotal: 0,
        discount: 0,
        tax: 0,
        total: 0
    };


    let discount = 0;

    if (manageDiscount?.code) {
        let discountedPrice = 0;

        if (manageDiscount.discountType == 'percentage') {
            discountedPrice = (subtotal * manageDiscount.discountValue) / 100;
        } else if (manageDiscount.discountType == 'fixed') {
            discountedPrice = manageDiscount.discountValue;
        }

        discount += discountedPrice;
    }

    if (manageDiscount?.custom?.customType) {
        const { customType, customValue } = manageDiscount?.custom;

        let discountedPrice = 0;

        if (customType == 'percentage') {
            discountedPrice = (subtotal * customValue) / 100;
        } else if (customType == 'fixed') {
            discountedPrice = customValue;
        }

        discount += discountedPrice;
    }

    let total = subtotal - discount;
    let tax = (total * dynamicTax) / 100;
    total += tax;

    return {
        subtotal,
        discount,
        tax,
        total: Number(total).toFixed(2)
    };
}


const getColorByTeamMember = (memberId) => {
    const members = JSON.parse(localStorage.getItem("members-color")) || {};
    return members[memberId];
}

export const formatAppointmentDataIntoCalander = (appointments = []) => {
    let events = [];

    appointments.forEach((booking) => {
        booking?.bookings?.forEach((bookingData) => {
            const startDate = new Date(booking.date);
            const startTime = bookingData.start_time;
            startDate.setHours(Math.floor(startTime / 100), startTime % 100, 0, 0);

            const endDate = new Date(booking.date);
            const endTime = bookingData.end_time;
            endDate.setHours(Math.floor(endTime / 100), endTime % 100, 0, 0);

            const eventData = {
                title: booking?.name,
                start: startDate,
                end: endDate,
                description: 'This is a cool event',

                data: {
                    id: bookingData._id,
                    other: booking
                },
                groupId: booking.teamMemberId?.id || booking.teamMemberId,
                backgroundColor: getColorByTeamMember(bookingData.teamMemberId)
            };

            events.push(eventData);
        });
    });

    return events;
}

export const appointmentActionOptions = (appointmentStatus, pendingPayment = true, notes = false, permissions = [], data, isTimeTracker) => {
    const isUnapprovedStatus = ["unapproved"].includes(appointmentStatus);
    const isNotCompletedRejectedCancelledStatus = !["completed", "rejected", "cancelled"].includes(appointmentStatus);

    let options = [
        {
            title: "SMS",
            line: false,
            icon: <CustomIcon name="Message" color={iconColor1} size={19} />,
            id: "sms",
            url: true
        },
        {
            title: "View Invoice",
            line: false,
            icon: <CustomIcon name="Receipt" color={iconColor1} size={19} />,
            id: "view-invoice",
            url: true
        },
        {
            title: "Patient Notes",
            line: true,
            color: !notes ? "red" : "",
            icon: <CustomIcon name="Description" color={iconColor5} size={19} />,
            id: "view-notes",
            url: true
        },
        {
            title: "Delete Appointment", line: false, icon: <CustomIcon name="Delete" color={redLabelColor} size={19}
            />, id: "delete-appointment", modal: { title: "Sure! You Want to Delete the Appointment", firstBtn: "Delete", secBtn: "No, Cancel" }
        }
    ];

    pendingPayment && isNotCompletedRejectedCancelledStatus && options.unshift({
        title: " Collect Payment", line: false, icon: <CustomIcon name="AttachMoney" color={iconColor3} size={19}
        />, id: "collect-payment"
    });


    if (isNotCompletedRejectedCancelledStatus) {
        options.unshift(
            {
                title: " Cancel Appointment",
                line: true,
                icon: <CustomIcon name="Cancel" color={redLabelColor} size={19}
                />,
                id: "cancel",
                modal: { title: "Are you sure! you want to cancel appointment ?", firstBtn: "Yes", secBtn: "No" }
            },
            {
                title: " Reschedule Appointment", line: false, icon: <CustomIcon name="Update" color={iconColor2} size={19}
                />, id: "reschedule", url: true
            },
            {
                title: " Reschedule Request", line: true, icon: <CustomIcon name="HourglassEmpty" color={iconColor6} size={19}
                />, id: "reschedule-request", url: true
            }
        );
    }

    if (isUnapprovedStatus) {
        options.unshift({
            title: " Approve / Reject",
            line: true,
            icon: <CustomIcon name="CheckCircle" color={iconColor7} size={19}
            />,
            id: "approve-reject",
            modal: { title: "You Want to Approve or Reject the Appointment", firstBtn: "Approve", secBtn: "Reject" }
        });
    }

    // if (moment(data?.date).isSame(moment(), 'day') && isTimeTracker) {
    //     options.unshift({
    //         title: "Start Time Tracker",
    //         line: true,
    //         icon: <CustomIcon name="CheckCircle" color={iconColor8} size={19}
    //         />,
    //         id: "Tracker",
    //     });
    // }

    return options.filter((i) => {
        if (i.id == "approve-reject") return permissions.includes("approve_reject_appointment");
        if (i.id == "cancel") return permissions.includes("cancel_appointment");
        if (i.id == "reschedule") return permissions.includes("edit_appointments");
        if (i.id == "delete-appointment") return permissions.includes("delete_appointments");

        //payments
        if (i.id == "collect-payment") return permissions.includes("collect_payments");
        if (i.id == "view-invoice") return permissions.includes("view_invoice");

        return true;
    });
};

export const handleApppointmentAction = (appointmentId, actionItem, paymentId) => {
    if (actionItem?.modal) {
        return {
            open: true,
            title: actionItem?.modal.title,
            btnfirst: actionItem?.modal.firstBtn,
            btnsec: actionItem?.modal.secBtn,
            appointmentId,
            actionId: actionItem.id,
        };
    }

    if (actionItem?.url) {
        handleActionUrl(appointmentId, actionItem.id, paymentId);
    }

    return null;
};

export const handleActionUrl = (appointmentId, actionId, paymentId) => {
    const router = useRouter();
    switch (actionId) {
        case "reschedule":
            return navigate("editappointment", { id: appointmentId });
        case "reschedule-request":
            return navigate("rescheduleRequest", { id: appointmentId });
        case "view-invoice":
             return router.push({ pathname: "/viewInvoice", params: { paymentId } });
            // return navigate("viewInvoice", { paymentId: paymentId });;
        case "view-notes":
            return navigate("ViewAppointment", { id: appointmentId, selectedTab: 1 });
        // Add more cases as needed
        default:
            return null;
    }
};
  

// const handleActionUrl = useHandleActionUrl();
//   handleActionUrl(appointmentId, actionId, paymentId);

// export const useHandleActionUrl = () => {
//   const router = useRouter();

//   return (appointmentId, actionId, paymentId) => {
//     switch (actionId) {
//       case "reschedule":
//         return router.push({ pathname: "/editappointment", params: { id: appointmentId } });
//       case "reschedule-request":
//         return router.push({ pathname: "/rescheduleRequest", params: { id: appointmentId } });
//       case "view-invoice":
//         return router.push({ pathname: "/viewInvoice", params: { paymentId } });
//       case "view-notes":
//         return router.push({ pathname: "/viewAppointments", params: { id: appointmentId, selectedTab: 1 } });
//       default:
//         return null;
//     }
//   };
// };



export function formatAppointmentIntoConfirmAppointmentHook(originalData) {
    const {
        customerId,
        date,
        start_time_range,
        end_time_range,
        bookings,
        amount,
        paymentId,
    } = originalData;

    const client = {
        id: customerId?.id,
        name: customerId.name,
        email: customerId.email,
        phone: customerId.telephone, // You may need to add the phone property based on your data
    };

    const transformedBookings = bookings.map((booking) => ({
        id: booking?._id,
        service: booking.serviceName,
        teamMember: {
            name: booking.teamMemberName
        },
        price: booking.amount.total.toString(),
        duration: booking.minutes,
        time: {
            start_time: booking.start_time,
            end_time: booking.end_time,
        },
    }));

    const transformedAmount = {
        tax: amount.tax,
        total: amount.total,
        subtotal: amount.subtotal,
        discount: amount.discount,
    };

    return {
        data: {
            client,
            bookings: transformedBookings,
            amount: transformedAmount,
        },
        setPaymentData: undefined, // You may need to add your logic here
    };
}


export function AppointmentPayment(payment = {}) {
    let paidAmount = (payment.advancePayment?.amount || 0) + (payment.payments?.reduce((acc, pay) => acc + pay.amount, 0) || 0) + (payment.payment?.paymentStatus == "paid" ? payment.payment.amount : 0);
    let unpaidAmount = (payment.payment?.paymentStatus == "pending" ? payment.payment.amount : 0);

    return {
        paidAmount,
        unpaidAmount
    }
}