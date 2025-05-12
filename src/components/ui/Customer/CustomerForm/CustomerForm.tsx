import React from "react";
import { View } from "native-base";
import { StyleSheet, Text } from "react-native";
import SingleDatePicker from "../../../../components/elements/SingleDatePicker/SingleDatePicker";
import { styles as externalStyles } from "../../../../assets/css";
import StandardInput from "../../../../components/elements/StandardInput/StandardInput";

const CustomerForm = ({ setFromData, formData }: any) => {
  return (
    <View style={styles.spacedContainer}>
      <View style={styles.verticalSpacing}>
        <StandardInput
          placeholder="Full Name"
          label="Full Name"
          onChangeText={(text: any) => setFromData({ ...formData, name: text })}
          value={formData.name}
        />
      </View>

      <View style={styles.topBottomSpacing}>
        <StandardInput
          placeholder="Phone Number"
          label="Phone Number"
          onChangeText={(text: any) =>
            setFromData({ ...formData, telephone: text })
          }
          value={formData.telephone}
        />
      </View>

      <View style={styles.verticalSpacing2}>
        <StandardInput
          placeholder="Email"
          label="Email Address"
          onChangeText={(text: any) =>
            setFromData({ ...formData, email: text })
          }
          value={formData.email}
        />
      </View>

      <View style={styles.customSpacing}>
        <StandardInput
          placeholder="Address"
          label="Address"
          onChangeText={(text: any) =>
            setFromData({ ...formData, address: text })
          }
          value={formData.address}
        />
      </View>

      <View style={styles.verticalSpacing2}>
        <StandardInput
          placeholder="Reference ID"
          label="Reference ID"
          onChangeText={(text: any) =>
            setFromData({ ...formData, RefId: text })
          }
          value={formData.RefId}
        />
      </View>
      <View style={styles.spacedRowLayout}>
        <Text style={[externalStyles.label, styles.rightSpacing]}>
          Birthday :
        </Text>
        <SingleDatePicker
          date={formData.dob}
          setDate={(date: any) =>
            setFromData((pre: any) => ({ ...pre, dob: date }))
          }
        />
      </View>
    </View>
  );
};

export default CustomerForm;
const styles = StyleSheet.create({
  spacedContainer: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  verticalSpacing: {
    marginVertical: 8,
  },
  topBottomSpacing: {
    marginTop: 16,
    marginBottom: 8,
  },
  spacedRowLayout: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  rightSpacing: {
    marginRight: 16,
  },
  verticalSpacing2: {
    marginTop: 16,
    marginBottom: 8,
  },
  customSpacing: {
    marginTop: 16,
    marginBottom: 8,
  },
});
