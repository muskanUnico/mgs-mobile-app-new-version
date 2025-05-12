//@ts-nocheck
import AdminText from "./AdminText";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { brandColor } from "../../constants/COLORS";
import { useAuth } from "../../context/AuthContext";
import { useGetCMS, useManageCMS } from "../../hooks/CMS";
import Button from "../../components/elements/Button/Button";
import { styles as externalStyles } from "../../assets/css";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { useTheme } from "../../context/ThemeContext";

const Logofeature = () => {
  const { theme } = useTheme();
  const { data } = useGetCMS();
  const manageCreateCMS = useManageCMS();
  const [logo, setLogo] = useState<string | null>(data?.logo);
  const [show, setShow] = useState(data?.logo);

  useEffect(() => {
    setShow(data?.logo);
  }, [data]);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
    })();
  }, []);

  const handleFileChange = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    };

    const response = await ImagePicker.launchImageLibraryAsync(options);

    if (response.canceled) {
    } else if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];

      setShow(asset.uri);
      // Read the image file as a base64 string
      const base64 = await FileSystem.readAsStringAsync(asset.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setLogo(base64);
    }
  };

  const handleSubmit = () => {
    if (!logo) {
      Alert.alert("Logo Required");
    } else {
      manageCreateCMS.handleCreate({ logo });
    }
  };

  return (
    <>
      <View style={[externalStyles.pinkcard, { paddingVertical: 24 }]}>
        <Text
          style={[externalStyles.iconColorStyle, { color: theme.brandColor }]}
        >
          LOGO
        </Text>
        <TouchableOpacity
          onPress={handleFileChange}
          style={[styles.dragDrop, { marginVertical: 12 }]}
        >
          <Text style={{ fontFamily: "BoldText", paddingVertical: 8 }}>
            Click to Upload
          </Text>
        </TouchableOpacity>
        <View style={styles.logoPreview}>
          {logo && (
            <>
              <TouchableOpacity
                onPress={() => setLogo(null)}
                style={styles.closeButton}
              >
                <MaterialIcons name="cancel" size={24} color="black" />
              </TouchableOpacity>
              <Image source={{ uri: show }} style={styles.logoImage} />
            </>
          )}
        </View>
        <View style={{ marginTop: 12 }}>
          <Button
            onPress={handleSubmit}
            loading={manageCreateCMS.loading}
            title="UPDATE LOGO"
          />
        </View>
      </View>
      <AdminText />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  dragDropContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  dragDrop: {
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
    // marginRight: 10,
  },
  logoPreview: {
    backgroundColor: "white",
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    minHeight: 150,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  logoImage: {
    width: 180,
    height: 150,
  },
});

export default Logofeature;
