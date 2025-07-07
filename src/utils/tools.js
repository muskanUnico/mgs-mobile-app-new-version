import _ from "lodash";
import moment from "moment";
import { StyleSheet, Text } from "react-native";
import { Chip } from "react-native-paper";
import {
  blueLabelColor,
  brandBlackColor,
  greenColor,
  greenDimColor,
  maroonLabelColor,
  orangeColor,
  purpleColor,
  redLabelColor,
  yellowLabelColor,
} from "../constants/COLORS";

export function formatMinutesToHoursAndMinutes(minutes) {
  const duration = moment.duration(minutes, "minutes");
  const hours = duration.hours();
  const remainingMinutes = duration.minutes();
  const formattedTime = `${hours} hr ${remainingMinutes} min`;
  return formattedTime;
}

export function stringToSlug(inputString) {
  return inputString.toLowerCase().replace(/\s+/g, "-");
}

export function removeEmptyValues(obj) {
  const result = {};
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      result[key] = obj[key];
    }
  }
  return result;
}

export function getInitialLetter(name) {
  const nameParts = name.split(" ");
  let final = "";

  if (nameParts.length > 1) {
    const firstLetter = nameParts[0]?.charAt(0);
    const secLetter = nameParts[1]?.charAt(0);
    final = firstLetter + secLetter;
  } else {
    // If there is only one name part, use the first letter of that part
    final = name.charAt(0);
  }

  const capitalizedInitial = final?.toUpperCase();
  return capitalizedInitial;
}

export function convertSchedule(input) {
  const output = {};
  if (input?._id) {
    delete input["_id"];
  }

  for (const day in input) {
    const schedule = input[day];

    if (schedule?.length > 0) {
      output[day.substring(0, 3).toLocaleUpperCase()] = schedule.map((slot) => {
        const startTime = formatTime(slot.start_time);
        const endTime = formatTime(slot.end_time);
        return `${startTime} to ${endTime}`;
      });
    } else {
      output[day.substring(0, 3).toLocaleUpperCase()] = [];
    }
  }

  return output;
}

export function formatTime(time) {
  const hours = Math.floor(time / 100);
  const minutes = time % 100;
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes} ${period}`;
}

export const convertStringTimeToNumber = (time = "") =>
  Number(time.replace(":", ""));

export const convertNumberToStringTime = (number) =>
  `${String(number).padStart(4, "0").slice(0, 2)}:${String(number)
    .padStart(4, "0")
    .slice(2)}`;

export const areAllElementsUnique = (arr) => new Set(arr).size == arr.length;

export const chips = (item, date) => {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const itemDate = new Date(date);
  itemDate.setHours(0, 0, 0, 0);

  const daysUntilItem = Math.floor(
    (itemDate - todayDate) / (1000 * 60 * 60 * 24)
  );

  const styles = StyleSheet.create({
    chip: {
      borderRadius: 20,
      margin: 4,
    },
    chipText: {
      fontSize: 12,
      fontFamily: "BoldText",
    },
  });

  if (item?.status === "rejected") {
    return (
      <Chip style={[styles.chip, { backgroundColor: redLabelColor }]}>
        <Text style={[styles.chipText, { color: "white" }]}>REJECTED</Text>
      </Chip>
    );
  } else if (item?.status === "reschedule") {
    return (
      <Chip style={[styles.chip, { backgroundColor: orangeColor }]}>
        <Text style={[styles.chipText, { color: "black" }]}>RESCHEDULE</Text>{" "}
      </Chip>
    );
  } else if (item?.status === "cancelled") {
    return (
      <Chip style={[styles.chip, { backgroundColor: brandBlackColor }]}>
        <Text style={[styles.chipText, { color: "white" }]}>CANCELLED</Text>
      </Chip>
    );
  } else if (item?.status === "unapproved") {
    if (itemDate < todayDate) {
      return (
        <>
          <Chip style={[styles.chip, { backgroundColor: yellowLabelColor }]}>
            <Text style={[styles.chipText, { color: "black" }]}>
              UNAPPROVED
            </Text>
          </Chip>
          <Chip style={[styles.chip, { backgroundColor: purpleColor }]}>
            <Text style={[styles.chipText, { color: "black" }]}>PAST</Text>
          </Chip>
        </>
      );
    } else {
      return (
        <Chip style={[styles.chip, { backgroundColor: yellowLabelColor }]}>
          <Text style={[styles.chipText, { color: "black" }]}>UNAPPROVED</Text>{" "}
        </Chip>
      );
    }
  } else if (item?.status === "change_request") {
    return (
      <Chip
        label="CHANGE REQUEST"
        style={[styles.chip, { backgroundColor: maroonLabelColor }]}
      >
        <Text style={[styles.chipText, { color: "black" }]}>
          CHANGE REQUEST
        </Text>
      </Chip>
    );
  } else if (item?.status === "completed") {
    return (
      <Chip style={[styles.chip, { backgroundColor: blueLabelColor }]}>
        <Text style={[styles.chipText, { color: "black" }]}>COMPLETED</Text>
      </Chip>
    );
  } else if (
    item?.status === "approved" ||
    item?.status === "confirmed" ||
    item?.status === "unapproved"
  ) {
    if (itemDate.getTime() == todayDate.getTime()) {
      if (item?.status === "confirmed") {
        return (
          <>
            <Chip style={[styles.chip, { backgroundColor: greenColor }]}>
              <Text style={[styles.chipText, { color: "black" }]}>TODAY</Text>
            </Chip>
            <Chip style={[styles.chip, { backgroundColor: greenDimColor }]}>
              <Text style={[styles.chipText, { color: "black" }]}>
                CONFIRMED
              </Text>
            </Chip>
          </>
        );
      } else {
        return (
          <>
            <Chip style={[styles.chip, { backgroundColor: greenColor }]}>
              <Text style={[styles.chipText, { color: "white" }]}>TODAY</Text>
            </Chip>
            <Chip style={[styles.chip, { backgroundColor: redLabelColor }]}>
              <Text style={[styles.chipText, { color: "white" }]}>
                CONF.PENDING
              </Text>{" "}
            </Chip>
            {/* <ConfirmYourAppointment open={open} setOpen={setOpen} appointmentId={item.id} /> */}
          </>
        );
      }
    } else if (daysUntilItem >= 0 && daysUntilItem <= 7) {
      if (item?.status === "confirmed") {
        return (
          <>
            <Chip style={[styles.chip, { backgroundColor: orangeColor }]}>
              <Text style={[styles.chipText, { color: "black" }]}>
                THIS WEEK
              </Text>
            </Chip>
            <Chip style={[styles.chip, { backgroundColor: greenColor }]}>
              <Text style={[styles.chipText, { color: "black" }]}>
                CONFIRMED
              </Text>
            </Chip>
          </>
        );
      } else {
        return (
          <>
            <Chip style={[styles.chip, { backgroundColor: orangeColor }]}>
              <Text style={[styles.chipText, { color: "black" }]}>
                THIS WEEK
              </Text>{" "}
            </Chip>
            <Chip style={[styles.chip, { backgroundColor: redLabelColor }]}>
              <Text style={[styles.chipText, { color: "white" }]}>
                CONF.PENDING
              </Text>{" "}
            </Chip>
            {/* <ConfirmYourAppointment appointmentId={item.id} open={open} setOpen={setOpen} /> */}
          </>
        );
      }
    } else if (
      itemDate.getMonth() === todayDate.getMonth() &&
      itemDate.getFullYear() === todayDate.getFullYear()
    ) {
      return (
        <Chip style={[styles.chip, { backgroundColor: yellowLabelColor }]}>
          <Text style={[styles.chipText, { color: "black" }]}>THIS MONTH</Text>
        </Chip>
      );
    } else if (itemDate < todayDate) {
      return (
        <Chip style={[styles.chip, { backgroundColor: blueLabelColor }]}>
          <Text style={[styles.chipText, { color: "black" }]}>PAST</Text>
        </Chip>
      );
    } else if (itemDate > todayDate) {
      return (
        <Chip style={[styles.chip, { backgroundColor: purpleColor }]}>
          <Text style={[styles.chipText, { color: "black" }]}>UPCOMING</Text>{" "}
        </Chip>
      );
    }
  } else if (item.paymentStatus == "pending") {
    return (
      <Chip style={[styles.chip, { backgroundColor: redLabelColor }]}>
        <Text style={[styles.chipText, { color: "white" }]}>PENDING</Text>{" "}
      </Chip>
    );
  } else if (item.paymentStatus == "paid") {
    return (
      <Chip style={[styles.chip, { backgroundColor: greenColor }]}>
        <Text style={[styles.chipText, { color: "white" }]}>PAID</Text>{" "}
      </Chip>
    );
  } else if (item.paymentStatus == "refunded") {
    return (
      <Chip style={[styles.chip, { backgroundColor: brandBlackColor }]}>
        <Text style={[styles.chipText, { color: "white" }]}>REFUNDED</Text>
      </Chip>
    );
  }
};

export function formatDateTable(date, start, end) {
  // Check if start and end are numbers
  if (typeof start !== "number" || typeof end !== "number") {
    // throw new Error('start and end should be numbers');
    return;
  }

  const startDate = moment(date);

  // Convert start and end to strings in HHMM format
  const startString = String(start).padStart(4, "0");
  const endString = String(end).padStart(4, "0");

  startDate.set({
    hour: Number(startString.slice(0, 2)),
    minute: Number(startString.slice(2)),
  });

  const endDate = moment(date);
  endDate.set({
    hour: Number(endString.slice(0, 2)),
    minute: Number(endString.slice(2)),
  });

  const formattedDate = startDate.format("DD MMM YYYY");
  const formattedStartTime = startDate.format("hh:mm A");
  const formattedEndTime = endDate.format("hh:mm A");

  return (
    <>
      {`${formattedDate} |`}
      {` ${formattedStartTime} - ${formattedEndTime} MDT`}
    </>
  );
}

export function formatTimeRange(start, end) {
  const startHour = Math.floor(start / 100);
  const startMinute = start % 100;
  const endHour = Math.floor(end / 100);
  const endMinute = end % 100;

  const startTime = new Date();
  startTime.setHours(startHour, startMinute);
  const endTime = new Date();
  endTime.setHours(endHour, endMinute);

  const formatOptions = { hour: "numeric", minute: "2-digit", hour12: true };

  const formattedStartTime = startTime.toLocaleTimeString(
    "en-US",
    formatOptions
  );
  const formattedEndTime = endTime.toLocaleTimeString("en-US", formatOptions);

  return `${formattedStartTime} - ${formattedEndTime} MDT`;
}

export function convertOppositeOfMinutesOrTime(input) {
  if (typeof input == "number") {
    // Convert minutes to 24-hour format
    const hours = Math.floor(input / 60)
      .toString()
      .padStart(2, "0");
    const minutes = (input % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else if (typeof input == "string") {
    // Parse 24-hour format to minutes
    const [hours, minutes] = input.split(":").map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      return hours * 60 + minutes;
    }
  }

  // Return an error message if the input is not valid
  return "Invalid input";
}

export function addTimeInTime(initialTime, secondsToAdd) {
  const totalSeconds =
    Math.floor(initialTime / 100) * 60 + (initialTime % 100) + secondsToAdd;
  const resultTime = Math.floor(totalSeconds / 60) * 100 + (totalSeconds % 60);
  return resultTime;
}

export function isChanged(object, base) {
  function changes(object, base) {
    return _.transform(object, function (result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }

  return changes(object, base);
}

export function formatDateforHeader(date, start, end) {
  // Check if start and end are numbers
  if (typeof start !== "number" || typeof end !== "number") {
    throw new Error("start and end should be numbers");
  }

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const startDate = new Date(date);

  // Convert start and end to strings in HHMM format
  const startString = String(start).padStart(4, "0");
  const endString = String(end).padStart(4, "0");

  startDate.setHours(
    Number(startString.slice(0, 2)),
    Number(startString.slice(2))
  );
  const endDate = new Date(date);
  endDate.setHours(Number(endString.slice(0, 2)), Number(endString.slice(2)));

  const formattedDate = startDate.toLocaleDateString("en-US", dateOptions);
  const formattedStartTime = startDate.toLocaleTimeString("en-US", timeOptions);
  const formattedEndTime = endDate.toLocaleTimeString("en-US", timeOptions);

  return (
    <>
      {`${formattedDate}`}
      {` ${formattedStartTime} - ${formattedEndTime} MDT`}
    </>
  );
}

export const LeaveCalenderChips = (item) => {
  const styles = StyleSheet.create({
    chip: {
      borderRadius: 20,
    },
    chipText: {
      fontSize: 12,
      fontFamily: "BoldText",
    },
  });

  if (item.status === "rejected") {
    return (
      <Chip style={[styles.chip, { backgroundColor: redLabelColor }]}>
        <Text style={[styles.chipText, { color: "white" }]}>REJECTED</Text>
      </Chip>
    );
  } else if (item.status === "approved") {
    return (
      <Chip style={[styles.chip, { backgroundColor: greenColor }]}>
        <Text style={[styles.chipText, { color: "white" }]}>APPROVED </Text>
      </Chip>
    );
  } else if (item.status === "pending") {
    return (
      <Chip style={[styles.chip, { backgroundColor: blueLabelColor }]}>
        <Text style={[styles.chipText, { color: "black" }]}>PENDING </Text>
      </Chip>
    );
  }
  return null;
};

export const getTotalDaysBetweenDates = (start, end) => {
  var date1 = new Date(start);
  var date2 = new Date(end);

  // Calculate the difference in milliseconds
  var differenceInMilliseconds = Math.abs(date2 - date1);

  // Convert milliseconds to days
  var differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return differenceInDays + 1;
};

export const getLastDate = (type) => {
  if (type.toLowerCase() == "none" || type == "") {
    return "";
  } else {
    const currentDate = new Date();
    switch (type.toLowerCase()) {
      case "monthly":
        currentDate.setMonth(currentDate.getMonth() - 1);
        break;
      case "biyearly":
        currentDate.setMonth(currentDate.getMonth() - 6);
        break;
      case "yearly":
        currentDate.setFullYear(currentDate.getFullYear() - 1);
        break;
      default:
        throw new Error(
          "Invalid type. Please provide Monthly, Biyearly, Yearly, or None."
        );
    }

    const dd = String(currentDate.getDate()).padStart(2, "0");
    const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
    const yyyy = currentDate.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  }
};

export function formatDateForFilter(inputTimestamp) {
  if (inputTimestamp != null) {
    const date = new Date(inputTimestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }
}

export function getAllDatesBetween(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Array to store the dates
  const datesArray = [];

  // Loop through the dates from start to end, inclusive
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    datesArray.push(new Date(date));
  }

  return datesArray;
}

export const transformData = (data2) => {
  const transformedData = {
    amount: data2.amount,
    bookings: data2.appointmentId.bookings,
    createdAt: data2.appointmentId.createdAt,
    customerId: {
      email: data2.appointmentId.customerId.email,
      id: data2.appointmentId.customerId._id,
      name: data2.appointmentId.customerId.name,
    },
    date: data2.appointmentId.date,
    email: data2.appointmentId.customerId.email,
    end_time_range: data2.appointmentId.end_time_range,
    id: data2.appointmentId._id,
    name: data2.appointmentId.customerId.name,
    notes: false,
    paymentId: {
      amount: data2.amount,
      appointmentId: data2.appointmentId._id,
      createdAt: data2.createdAt,
      customerId: data2.customerId,
      id: data2._id,
      payment: data2.payment,
      paymentStatus: data2.paymentStatus,
      paymentType: data2.paymentType,
      payments: data2.payments,
      tips: data2.tips,
      updatedAt: data2.updatedAt,
    },
    reschedule: undefined,
    start_time_range: data2.appointmentId.start_time_range,
    status: data2.appointmentId.status,
    updatedAt: data2.appointmentId.updatedAt,
  };
  return transformedData;
};

export const extractPathFromUrl = (url) => {
  const baseUrl = "https://admin-mgs.vercel.app/";

  if (url.startsWith(baseUrl)) {
    return url.slice(baseUrl.length);
  }

  return "";
};
const decodeHtmlEntities = (str) => {
  return str
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/g, "'");
};

export const cleanText = (html) => {
  if (!html) return "";

  let text = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, ""); 

  text = decodeHtmlEntities(text);

  text = text.replace(/\n{11,}/g, "\n\n\n\n\n\n\n\n\n\n");

  return text;
};