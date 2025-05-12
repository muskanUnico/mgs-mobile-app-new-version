import React, { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import Button from "../../../../components/elements/Button/Button";
import { styles as externalStyles } from "../../../../assets/css";
import { manageNotes } from "../../../../hooks/Customer";
import CustomHeading from "../../../../components/elements/CustomHeading/CustomHeading";
import { borderColor } from "../../../../constants/COLORS";

const AddNotes = ({ data }: any) => {
  const manageNotesHooks = manageNotes(data?.id);

  const [description, setDescription] = useState(
    data?.notes?.description || ""
  );

  const handleSave = () => {
    manageNotesHooks.submit({ description });
  };

  return (
    <View style={[externalStyles.card]}>
      <View>
        <CustomHeading iconName="sticky-note" text="Add/Edit Notes" />

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: borderColor,
            borderRadius: 18,
            padding: 10,
            textAlignVertical: "top",
            fontFamily: "Regular"

          }}
          placeholder="Notes"
          numberOfLines={5}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <View style={{ paddingTop: 12 ,marginBottom: 8}} >
          <Button title={"Save"} loading={manageNotesHooks.loading} onPress={handleSave} />
        </View>
      </View>
    </View>
  );
};
export default AddNotes;
