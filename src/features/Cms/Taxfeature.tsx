import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { styles as externalStyles } from "../../assets/css";
import Button from "../../components/elements/Button/Button";
import StandardInput from "../../components/elements/StandardInput/StandardInput";
import { useGetCMS, useManageCMS } from "../../hooks/CMS";

const Taxfeature = () => {
  const { data } = useGetCMS();
  const { handleCreate, loading } = useManageCMS();
  const [tax, setTax] = useState<number>(0);

  useEffect(() => {

    if (!data?.tax) return;
    setTax(data.tax);
  }, [data]);

  const handleSubmit = () => {
    const newTax = {
      tax: parseInt(String(tax)),
    };

    if (isNaN(newTax.tax)) {
      Alert.alert("Tax required");
    } else {
      handleCreate(newTax);
    }
  };

  return (
    <>
      <View style={[externalStyles.pinkcard, { paddingVertical: 24 }]}>
        <View style={{ paddingBottom: 24 }}>
          <StandardInput
            placeholder="Tax"
            label="Tax"
            value={tax.toString()}
            onChangeText={setTax}
            editable={true}
          />
        </View>

        <Button title="UPDATE TAX" loading={loading} onPress={handleSubmit} />
      </View>
    </>
  );
};

export default Taxfeature;
