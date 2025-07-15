// @ts-nocheck
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { getAppointmentById } from "../../hooks/Appointment";
import {
  calculateAmounts,
  formatServicesData,
  getTeamMemberRequirements,
  validateBookingData,
} from "../../hooks/Appointment/hooks";
import { getCouponDiscountPrice } from "../../hooks/Coupon";
import {
  collectLater,
  collectManualPayment,
  collectPaymentFromStripe,
} from "../../hooks/Payment";
import { convertNumberToStringTime, isChanged } from "../../utils/tools";
import { callAvailabilityService, createCustomAvailability } from "./";

const useAppointmentFlow = (defaultAppointmentId = "") => {
  const { CMSData } = useAuth();
  const [Loading, setLoading] = useState(defaultAppointmentId ? "wait" : "");

  const [API_RUN, SET_API_RUN] = useState(false);
  const [clientInfoData, SetClientInfoData] = useState<any>();
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: new Date(),
    time: "12:00",
  });
  const [tableselectedData, setTableselectedData] = useState<any[]>([]);
  const [discount, setDiscount] = useState({
    tax: 0,
    total: 0,
    subtotal: 0,
    discount: 0,
  });
  const [manageDiscount, setManageDiscount] = useState({
    code: "",
    custom: {
      customType: "",
      customValue: 0,
    },
  });

  const [memberResponse, setMemberResponse] = useState<BestTimeSlotResponse>({
    sortedResponse: {},
    bestTimeSlots: [],
    error: [],
  });

  const [finalResponse, setFinalResponse] = useState<any>();
  const [Next, SetNext] = useState(false);
  const [errors, setErrors] = useState([]);
  const [appointmentRes, setAppointmentRes] = useState();
  const [paymentData, setPaymentData] = useState({});

  // Default appointment ID
  const response = getAppointmentById(defaultAppointmentId);

  // update logic
  const [oldData, setOldData] = useState({});
  let latestData = {
    clientInfoData,
    appointmentDetails,
    tableselectedData: tableselectedData.map((book) => ({
      ...book,
      teamMemberName: book?.teamMember?.name,
    })),
    discount,
  };

  // Deep copy of the latestData object
  const isAnythingChanged = isChanged(oldData, latestData);

  const updatedKeys = React.useMemo(() => {
    let keys = ["teamMemberName", "duration", "date", "time", "total"];
    if (!defaultAppointmentId) return keys;

    let updatedValue = JSON.stringify(isAnythingChanged);
    return keys.filter((key) => updatedValue.includes(key));
  }, [isAnythingChanged]);

  //coupon
  const coupon = getCouponDiscountPrice();
  // Fetch appointment data when component mounts

  useFocusEffect(
    useCallback(() => {
      if (response.loading) return;
      if (!response.loading) setLoading("");

      if (response?.data) {
        const run = async () => {
          const defaultAppointmentData = response.data;

          if (defaultAppointmentData?.discount?.code) {
            let res = await coupon.submit({
              couponCode: defaultAppointmentData.discount.code,
              totalPrice: defaultAppointmentData.amount.subtotal,
              force: true,
            });

            if (res.discountedPrice) {
              setManageDiscount((old) => ({
                ...old,
                code: defaultAppointmentData.discount.code,
                discountType: res.coupon.discountType,
                discountValue: res.coupon.discountValue,
              }));
            }
          }

          // Set default state based on fetched appointment data
          const data = {
            clientInfoData: {
              title: defaultAppointmentData?.customerId?.name,
              value: defaultAppointmentData?.customerId?.id,
              data: {
                email: defaultAppointmentData?.customerId?.email,
                phone: defaultAppointmentData?.customerId?.telephone,
              },
              email: defaultAppointmentData?.customerId?.email,
              phone: defaultAppointmentData?.customerId?.telephone,
            },
            appointmentDetails: {
              date: new Date(defaultAppointmentData?.date)
                .toISOString()
                .split("T")[0],
              time: convertNumberToStringTime(
                defaultAppointmentData.start_time_range
              ), // You may need to extract time from your data
            },
            tableselectedData: defaultAppointmentData.bookings.map(
              (booking) => ({
                service: booking.serviceName,
                price: String(booking.amount.subtotal),
                duration: booking.minutes,
                id: booking.serviceId,
                teamMember: {
                  id: booking.teamMemberId,
                  name: booking.teamMemberName,
                },
                teamMemberName: booking.teamMemberName,
              })
            ),
            discount: {
              subtotal: defaultAppointmentData.amount.subtotal,
              discount: defaultAppointmentData.amount.discount,
              tax: defaultAppointmentData.amount.tax,
              total: defaultAppointmentData.amount.total.toFixed(2),
            },
          };

          SetClientInfoData(data.clientInfoData);
          setAppointmentDetails(data.appointmentDetails);
          setTableselectedData(data.tableselectedData);
          setDiscount(data.discount);
          setManageDiscount((old) => ({
            ...old,
            ...defaultAppointmentData.discount,
          }));
          // Other state updates based on your data structure

          setOldData(data);
        };
        run();
      }
    }, [response.loading, response.data])
  );

  const find = async () => {
    if (tableselectedData.length == 0) {
      return setErrors((old) => [...old, "Please select service."]);
    }
    setLoading("find");
    const teamMembers = getTeamMemberRequirements(tableselectedData);

    const body = {
      targetDate: appointmentDetails.date,
      start_time: appointmentDetails.time,
      teamMembers,
      services: tableselectedData.map((item, index) => ({
        teamMemberId: item.teamMember.id,
        serviceId: item.id,
      })),
    };

    await callAvailabilityService(body, setMemberResponse);
    SET_API_RUN(true);
    setLoading("");
    setErrors([]);
  };

  const next = async () => {
    setLoading("next");

    // Filter available and not available team members
    const teamMembers = getTeamMemberRequirements(tableselectedData);
    const availMember = teamMembers.filter(
      (mem: any) =>
        !memberResponse.error.some(
          (err: any) => mem.teamMemberId == err.memberId
        )
    );
    const notAvailMember = teamMembers.filter((mem: any) =>
      memberResponse.error.some((err: any) => mem.teamMemberId == err.memberId)
    );

    // Prepare request body for availability service
    const body = {
      targetDate: appointmentDetails.date,
      start_time: appointmentDetails.time,
      teamMembers: availMember,
      services: tableselectedData.map((item, index) => ({
        teamMemberId: item.teamMember.id,
        serviceId: item.id,
      })),
    };

    // Call availability service and get time slots
    const responseAvail = await callAvailabilityService(body, setFinalResponse);
    const timeSlots = responseAvail.bestTimeSlots.concat(
      notAvailMember.map((mem: any) => ({
        teamMemberId: mem.teamMemberId,
        minutes: mem.minutesRequirement,
      }))
     ) || [];

    if (timeSlots.length === 0) {
      Alert.alert(
        "No time slots available",
        "Please try a different time or service."
      );
      setLoading("");
      return;
    }

    // Create custom availability
    const res = await createCustomAvailability({
      timeSlots,
      start_time: appointmentDetails.time,
    });

    // Validate customer booking data
    const validate = {
      customer: clientInfoData?.email,
      teamMemberId: teamMembers[0]?.teamMemberId,
      date: appointmentDetails.date,
      bookings: formatServicesData({ tableselectedData, finalResponse: res }),
    };

    const validateBooking = validateBookingData(validate);

    // Handle validation results
    if (!validateBooking.isValid) {
      setErrors(validateBooking.errors);
    } else {
      // Set final response data
      setFinalResponse({
        customerId: clientInfoData?.value,
        new_customer: {
          name: clientInfoData.title,
          email: clientInfoData.email,
          telephone: clientInfoData.phone,
        },
        teamMemberId: teamMembers[0]?.teamMemberId,
        date: appointmentDetails.date,
        bookings: formatServicesData({ tableselectedData, finalResponse: res }),
      });

      // Proceed to the next step
      SetNext(true);
      setErrors([]);
    }

    // Reset loading state
    setLoading("");
  };

  //update next function only for price update
  const updateNext = async () => {
    setLoading("next");

    //only update price
    let bookings = response?.data?.bookings?.map((old) => {
      let updatedData = tableselectedData.find(
        (sel) => sel.id == old.serviceId
      );
      if (updatedData) {
        return {
          serviceId: old.serviceId,
          teamMemberId: old.teamMemberId,
          start_time: old.start_time,
          end_time: old.end_time,
          price: Number(updatedData.price),
        };
      }
    });

    const final = {
      customerId: clientInfoData?.value,
      teamMemberId: latestData.tableselectedData[0]?.id,
      date: appointmentDetails.date,
      bookings: bookings,
    };

    setFinalResponse(final);
    SetNext(true);
    setErrors([]);
    setLoading("");
  };

  useFocusEffect(
    useCallback(() => {
      calculateAmounts({
        bookings: tableselectedData,
        manageDiscount: manageDiscount,
        dynamicTax: CMSData.tax || 0,
      }).then((amount) => {
        let check = parseInt(amount.total);
        if (check < 0) {
          Alert.alert("Amount shouild not Negative");
          return;
        }
        setDiscount(amount);
      });
    }, [tableselectedData, manageDiscount])
  );

  useFocusEffect(
    useCallback(() => {
      SET_API_RUN(false);
      SetNext(false);
    }, [tableselectedData, appointmentDetails, clientInfoData])
  );

  const previewData = React.useMemo(() => {
    const client = {
      id: clientInfoData?.value || "",
      name: clientInfoData?.title || "",
      email: clientInfoData?.email || "",
      phone: clientInfoData?.phone || "",
    };

    const bookings =
      tableselectedData.length == finalResponse?.bookings?.length
        ? tableselectedData.map((service) => {
            const { start_time, end_time } =
              finalResponse?.bookings?.find(
                (book: any) => book.serviceId == service.id
              ) || {};

            return {
              ...service,
              time: {
                start_time,
                end_time,
              },
            };
          })
        : [];

    return {
      client,
      bookings,
      amount: discount,
    };
  }, [API_RUN, Next, finalResponse]);

  const chargeOnlineHook = collectPaymentFromStripe();
  const chargeManualHook = collectManualPayment();
  const chargeLaterHook = collectLater();

  const handleChargePayment = async () => {
    if (!appointmentRes) return;
    setLoading("submit");

    try {
      if (paymentData.payMethodType == "online") {
        const chargeOnline = await chargeOnlineHook.submit({
          customerId: appointmentRes.customerId,
          amount: appointmentRes.amount.total,
          appointmentId: appointmentRes.id,
          paymentType: "full",
          paymentMethodId: paymentData.onlinePayment.paymentCardId,
        });
      } else if (paymentData.payMethodType == "manual") {
        const paymentType =
          appointmentRes.amount.total == paymentData.manualPayment.amount
            ? "full"
            : "advance";

        const chargeManual = await chargeManualHook.submit({
          customerId: appointmentRes.customerId,
          appointmentId: appointmentRes.id,
          paymentType: paymentType,
          payment: {
            amount: paymentData.manualPayment.amount,
            paymentMethod: paymentData.manualPayment.paymentMethod,
            paymentRefNo: paymentData.manualPayment.ref,
          },
        });
      } else if (paymentData.payMethodType == "later") {
        const chargeManual = await chargeLaterHook.submit({
          customerId: appointmentRes.customerId,
          appointmentId: appointmentRes.id,
        });
      }
    } catch (error) {
      setLoading("");
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleChargePayment();
    }, [appointmentRes])
  );

  return {
    wait: Loading == "wait",
    isUpdate: defaultAppointmentId && Object.keys(isAnythingChanged).length > 0,
    updatedKeys: updatedKeys,
    updateNext,

    API_RUN,
    clientInfoData,
    SetClientInfoData,
    appointmentDetails,
    setAppointmentDetails,
    tableselectedData,
    setTableselectedData,

    discount,
    manageDiscount,
    setManageDiscount,

    Loading,
    setLoading,
    memberResponse,
    finalResponse,
    Next,
    SetNext,
    errors,
    setErrors,
    appointmentRes,
    setAppointmentRes,
    paymentData,
    setPaymentData,
    find,
    next,
    previewData,
  };
};

export default useAppointmentFlow;
