import 'dotenv/config';

export default {
  expo: {
    name: 'MyApp',
    slug: 'my-app',
    version: '1.0.0',
    sdkVersion: '53.0.0',
    extra: {
      stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    },
  },
};
