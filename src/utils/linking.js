import * as Linking from 'expo-linking';
import { useEffect } from 'react';
const prefix = Linking.createURL('/');
export const linking = {
  prefixes: [
    'https://app.letscollab.io',
    'https://*.letscollab.io',
    'letscollab://',
    prefix,
  ],
  config: {
    screens: {
      Login: {
        path: 'login',
      },
      SetPassword: 'setpassword',
      home: {
        screens: {
          Bottom: {
            screens: {
              Home: 'home',
              Profile: 'profile/:id',
              AllAppointment: {
                path: 'appointment'
              },
              ViewAppointment: {
                path: 'appointment/view/:id'
              },
              CreateAppointment: 'appointment/create',
              EditAppointment: 'appointment/edit/:appointmentId',
              ApprovedAppointment: 'appointment/approved',
              RescheduleRequest: 'appointment/reschedule',
              ViewTeamMember: 'team-member/view/:memberId',
              viewinvoice: "payments/view-invoice/:paymentId",
              CustomerDetails: "customers/:customerId",
              AllPermissions: "permissions"
            },
          },
        },
      },
    },
  },
};


