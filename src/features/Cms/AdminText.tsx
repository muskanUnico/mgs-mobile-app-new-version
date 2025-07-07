import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, Text, View } from "react-native";
import { styles as externalStyles } from "../../assets/css";
import Button from "../../components/elements/Button/Button";
import CustomColorPicker from "../../components/elements/ColorPicker/ColorPicker";
import StandardInput from "../../components/elements/StandardInput/StandardInput";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useManageCMS } from "../../hooks/CMS";

const AdminText = () => {
  const manageCreateCMS = useManageCMS();
  const { CMSData } = useAuth();
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);

  // state
 const [admin, setAdmin] = useState(() => CMSData?.admin?.text || "");

  const [colors, setColors] = useState({
    secondary: "#00FF00",
    tertiary: "#0000FF",
  });

  useFocusEffect(
    useCallback(() => {
      if (!CMSData?.admin) return;

      setColors({
        secondary: CMSData.admin.secondary || "#00FF00",
        tertiary: CMSData.admin.tertiary || "#0000FF",
      });
    }, [CMSData])
  );

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
