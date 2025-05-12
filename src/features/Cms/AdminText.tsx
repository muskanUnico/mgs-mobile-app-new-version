import { useManageCMS } from "../../hooks/CMS";
import { Alert, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { styles as externalStyles } from "../../assets/css";
import Button from "../../components/elements/Button/Button";
import StandardInput from "../../components/elements/StandardInput/StandardInput";
import CustomColorPicker from "../../components/elements/ColorPicker/ColorPicker";

const AdminText = () => {
  const manageCreateCMS = useManageCMS();
  const { CMSData } = useAuth();
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);

  // state
  const [admin, setAdmin] = useState(CMSData.admin.text);

  const [colors, setColors] = useState({
    secondary: "#00FF00",
    tertiary: "#0000FF",
  });

  useEffect(() => {
    setColors({
      secondary: CMSData.admin.secondary,
      tertiary: CMSData.admin.tertiary,
    });
  }, [CMSData]);

  const handleSubmit = () => {
    if (!admin?.trim()) {
      Alert.alert("Admin Lebal Required");
    } else {
      manageCreateCMS.handleCreate({
        admin: {
          text: admin,
          secondary: colors.secondary,
          tertiary: colors.tertiary,
        },
      });
    }
  };

  return (
    <View style={[externalStyles.pinkcard, { paddingVertical: 24 }]}>
      <Text
        style={[externalStyles.iconColorStyle, { color: theme.brandColor }]}
      >
        ADMIN LABEL HEADER
      </Text>
      <View style={{ paddingVertical: 12 }}>
        <StandardInput
          placeholder=" text"
          label="Label"
          value={admin}
          onChangeText={setAdmin}
          editable={true}
        />
      </View>
      <Text
        style={[externalStyles.iconColorStyle, { color: theme.brandColor }]}
      >
        ADMIN LABEL COLOR
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 16,
        }}
      >
        {Object.entries(colors).map(([key, color]) => (
          <CustomColorPicker
            key={key}
            handleSelectedColor={(newColor: any) =>
              setColors((prevColors) => ({ ...prevColors, [key]: newColor }))
            }
            selectedColor={color}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            setShowModal={setShowModal}
            showModal={showModal}
          />
        ))}
      </View>
      <Button
        loading={manageCreateCMS.loading}
        onPress={handleSubmit}
        title="UPDATE HEADING"
      />
    </View>
  );
};

export default AdminText;
