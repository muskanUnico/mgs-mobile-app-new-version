import React from "react";
import { View } from "react-native";
import { styles as externalStyles } from "../../../../assets/css";
import StandardInput from "../../../../components/elements/StandardInput/StandardInput";

interface FormData {
  name: string;
  telephone: string;
  email: string;
  teamMemberId: string;
  color: string;
}

interface CreateMemberFormProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
}

const CreateMemberForm: React.FC<CreateMemberFormProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <View style={[externalStyles.container, { marginBottom: 16 }]}>
      <View style={{ marginVertical: 12 }}>
        <StandardInput
          placeholder="Name"
          value={formData.name}
          onChangeText={(text: string) =>
            setFormData((oldData) => ({ ...oldData, name: text }))
          }
          label="Name"
        />
      </View>
      <View style={{ marginVertical: 12 }}>
        <StandardInput
          placeholder="+91 90xxxxxxxx"
          value={formData.telephone}
          onChangeText={(text: string) =>
            setFormData((oldData) => ({ ...oldData, telephone: text }))
          }
          label="Phone number"
        />
      </View>
      <View style={{ marginVertical: 12 }}>
        <StandardInput
          placeholder="Enter your email address"
          value={formData.email}
          onChangeText={(text: string) =>
            setFormData((oldData) => ({ ...oldData, email: text }))
          }
          label="Email"
        />
      </View>
      <View style={{ marginTop: 12 }}>
        <StandardInput
          placeholder="Team member Id (optional)"
          value={formData.teamMemberId}
          onChangeText={(text: string) =>
            setFormData((oldData) => ({ ...oldData, teamMemberId: text }))
          }
          label="Team Member ID"
        />
      </View>
    </View>
  );
};

export default CreateMemberForm;
