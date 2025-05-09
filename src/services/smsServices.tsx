import fetcher from "../helper/fetcher";

const sendSMS = (body: any) => {
  return fetcher.post(`/message/send`, body).then((response) => {
    return response.data;
  });
};

const getSMS = (params: any) => {
  return fetcher.get(`/message/history`, { params }).then((response) => {
    return response.data;
  });
};

export const SMSService = {
  getSMS,
  sendSMS,
};
