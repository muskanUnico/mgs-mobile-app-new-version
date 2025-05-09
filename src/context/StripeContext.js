import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { loadStripe } from '@stripe/stripe-js';
import { StripeProvider as RNStripeProvider } from '@stripe/stripe-react-native';

import { stripeService } from "services"; // Ensure this service is compatible with React Native

const config = {
  api: {
    url: ""
  },
  stripe: {
    publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  }
};

const apiUrl = config.api.url;

// create context
export const StripeContext = React.createContext();

export const StripeProvider = ({ children }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState({});
  const [stripePromise, setStripePromise] = useState(null);
  const [data, setData] = useState({
    selectProduct: {
      fetch: false,
      data: {}
    }
  });

  useEffect(() => {
    setStripePromise(loadStripe(config.stripe.publicKey));
  }, []);

  const loadProducts = useCallback(() => {
    fetch(`${apiUrl}/v1/stripe/get-products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(response => response.json())
      .then(response => {
        setLoaded(true);
        setProducts(response.products);
      })
      .catch(err => {
        setLoaded(true);
      });
  }, []);

  const loadSubscriptions = useCallback(() => {
    stripeService.getSubscriptions().then((res) => {
      res.status && setSubscription(res.data);
    });
  }, []);

  useEffect(() => {
    loadSubscriptions();
    loadProducts();
  }, [loadSubscriptions, loadProducts]);

  const value = useMemo(() => {
    return ({
      products,
      subscription,
      data,
      setData
    });
  }, [data, products, subscription]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <StripeContext.Provider value={value}>
      <RNStripeProvider publishableKey={config.stripe.publicKey}>
        {children}
      </RNStripeProvider>
    </StripeContext.Provider>
  );
};
