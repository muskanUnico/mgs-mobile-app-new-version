import React, { useState } from 'react';
import { PaymentService } from '../../../services';
import { getSingleCustomer } from '../../../hooks/Customer';
import Button from "../../../components/elements/Button/Button";
import { CardField, useStripe, StripeProvider } from '@stripe/stripe-react-native';
import { View, Text, TextInput, ActivityIndicator, StyleSheet, Alert } from 'react-native';

const config = {
  stripe: {
    publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  }
};

const PaymentAddress = () => {
  const { createPaymentMethod } = useStripe();

  const handleSubmit = async ({ email, name, country, line1 }) => {
    const { paymentMethod, error } = await createPaymentMethod({
      paymentMethodType: 'Card',
      billingDetails: {
        email,
        name,
        address: {
          country,
          line1
        }
      }
    });

    return { paymentMethod, error };
  };

  return handleSubmit;
};

const AddNewPaymentCard = ({ customerId, refresh, setOpen }) => {
  const alert = {
    SnackbarHandler: () => { }
  };

  const findCustomer = getSingleCustomer(customerId);
  const customer = findCustomer.data?.customer;

  const [address, setAddress] = useState("");
  const payment = PaymentAddress();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!address) return Alert.alert("Address is required!");

    setLoading(true);

    const { error, paymentMethod } = await payment({ email: customer?.email, name: customer?.name, country: "CA", line1: address });
    if (error?.message) {
      setLoading(false);
      return Alert.alert(error.message);
    }

    const res = await PaymentService.addNewPaymentCard({
      customerId: customerId,
      paymentMethodId: paymentMethod.id
    }).finally(() => {
      setLoading(false);
      setOpen(false)
    });
    if (!res?.success) return;

    Alert.alert(res.message);

    refresh && refresh();
  };

  return (

    <View>
      <Text style={styles.label}>Card Number</Text>
      <CardField
        postalCodeEnabled={false}
        placeholder={{ number: '4242 4242 4242 4242' }}
        style={styles.cardContainer}
      />

      <TextInput
        style={styles.input}
        placeholder='Address'
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Button title="Submit" onPress={handleSubmit} />

        )}
      </View>
    </View>
  );
};

const AddNewPaymentCardDefault = ({ customerId, refresh, setOpen }) => (
  <StripeProvider publishableKey={config.stripe.publicKey}>
    <AddNewPaymentCard  setOpen={setOpen} customerId={customerId} refresh={refresh} />
  </StripeProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  form: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333'
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#e6e6e6',
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    fontFamily: "Regular"
  },
  card: {
    backgroundColor: '#fff',
    textColor: '#000'
  },
  cardContainer: {
    height: 50,
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center'
  }
});

export default AddNewPaymentCardDefault;
