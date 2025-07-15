import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Title from "../../../../../components/elements/Title/Title";
import Button from "../../../../elements/Button/Button";
import CustomTextArea from "../../../../elements/CustomTextArea/CustomTextArea";
import CustomInput from "../../../../elements/Input";

const ScreenHeight = Dimensions.get("window").height;

interface EditCommentProps {
  formData: {
    areaTested: string;
    spotSize: string;
    energyPulse: string;
    numOfPulse: string;
    dcdSprayDelay: string;
    adminComment: string;
    customerComment: string;
  };
  setFormData: ({}: any) => void;
  handleSave: () => void;
  loading: boolean;
  navigation: any;
}

const EditComment = ({
  formData,
  setFormData,
  handleSave,
  loading,
  navigation,
}: EditCommentProps) => {
  return (
    <>
      <View style={styles.background}>
        <Title title=" Edit Patient Notes" navigation={navigation} />

        <View style={styles.spacing}>
          <View style={styles.verticalPadding}>
            <CustomInput
              placeholder="Area Tested"
              value={formData.areaTested}
              onChangeText={(text) =>
                setFormData({ ...formData, areaTested: text })
              }
              label="Area Tested"
            />
          </View>
          <View style={styles.verticalPadding}>
            <CustomInput
              placeholder="Spot Size(mm)"
              value={formData.spotSize}
              onChangeText={(text) =>
                setFormData({ ...formData, spotSize: text })
              }
              label="Spot Size(mm)"
            />
          </View>
          <View style={styles.verticalPadding}>
            <CustomInput
              placeholder="Energy/Pulse Width(J/cm2 & ms)"
              value={formData.energyPulse}
              onChangeText={(text) =>
                setFormData({ ...formData, energyPulse: text })
              }
              label="Energy/Pulse Width(J/cm2 & ms)"
            />
          </View>
          <View>
            <CustomInput
              placeholder="# of Pulse"
              value={formData.numOfPulse}
              onChangeText={(text) =>
                setFormData({ ...formData, numOfPulse: text })
              }
              label="# of Pulse"
            />
          </View>
          <View style={styles.verticalPadding}>
            <CustomInput
              placeholder="DCD Spray/Delay"
              value={formData.dcdSprayDelay}
              onChangeText={(text) =>
                setFormData({ ...formData, dcdSprayDelay: text })
              }
              label="DCD Spray/Delay"
            />
          </View>
          <View style={styles.verticalPadding}>
            <CustomTextArea
              placeholder="Admin Comment"
              label="Admin Comment"
              value={formData.adminComment}
              onChangeText={(text: any) =>
                setFormData({ ...formData, adminComment: text })
              }
              style={styles.customContainer}
            />
          </View>
          <View>
            <CustomTextArea
              placeholder="Customer Comment"
              label="Customer Comment"
              value={formData.customerComment}
              onChangeText={(text: any) =>
                setFormData({ ...formData, customerComment: text })
              }
              style={styles.customText}
            />
          </View>

          <View style={styles.spacing2}>
            <Button title="Save" loading={loading} onPress={handleSave} />
          </View>
        </View>
      </View>
    </>
  );
};

export default EditComment;
const styles = StyleSheet.create({
  background: {
    backgroundColor: "#fff8f5",
    height: "100%",
    paddingBottom: 226,
  },
  spacing: {
    paddingHorizontal: 24,
    gap: 16,
    paddingTop: 20,
  },
  verticalPadding: {
    paddingVertical: 4,
  },
  spacing2: {
    paddingVertical: 8,
    marginHorizontal: 12,
  },
  customText: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "#bcbcbc",
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  customContainer: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: "#bcbcbc",
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});
