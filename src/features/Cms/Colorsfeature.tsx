import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import type { returnedResults } from "reanimated-color-picker";
import ColorPicker, {
  colorKit,
  HueSlider,
  OpacitySlider,
  Panel1,
  PreviewText,
  Swatches,
} from "reanimated-color-picker";
import { styles as externalStyles } from "../../assets/css";
import Button from "../../components/elements/Button/Button";
import { useAuth } from "../../context/AuthContext";
import { useManageCMS } from "../../hooks/CMS";

const Colorsfeature = () => {
  const { CMSData } = useAuth();
  const { handleCreate, loading } = useManageCMS();
  const [showModal, setShowModal] = useState(false);
  const [selectkey, setSelectkey] = useState("");

  const [colors, setColors] = useState({
    white: "#ffffff",
    grey: "#cccccc",
    pastel: "#f0f0f0",
    black: "#000000",
    brand: "#ff0000",
  });

 useFocusEffect(
  useCallback(() => {
    if (!CMSData?.colors?.white) return;

    setColors(CMSData.colors);
  }, [CMSData])
);

  const handleReset = () => {
    handleCreate({
      colors: {
        white: null,
        grey: null,
        pastel: null,
        black: null,
        brand: null,
      },
    });
  };

  const customSwatches = new Array(6)
    .fill("#fff")
    .map(() => colorKit.randomRgbColor().hex());

  const onColorSelect = (colord: returnedResults) => {
    setColors((prevColors) => ({
      ...prevColors,
      [selectkey]: colord.hex,
    }));
  };

  const handle = (key: string) => {
    setSelectkey(key);
    setShowModal(true);
  };

  return (
    <>
      <View style={[externalStyles.card]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          {Object.entries(colors).map(([key, color]) => (
            <View key={key} style={{ marginRight: 12 }}>
              <Pressable
                style={styles.colorCircleContainer}
                onPress={() => handle(key)}
              >
                <View
                  style={[styles.colorCircle, { backgroundColor: color }]}
                />
                <Text style={styles.colorText}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
              </Pressable>
              <Modal
                onRequestClose={() => setShowModal(false)}
                visible={showModal}
                animationType="slide"
              >
                <Animated.View style={[styles.container]}>
                  <View style={styles.pickerContainer}>
                    <ColorPicker
                      value={color}
                      sliderThickness={25}
                      thumbSize={24}
                      thumbShape="circle"
                      onChange={onColorSelect}
                      boundedThumb
                    >
                      <Panel1 style={styles.panelStyle} />
                      <HueSlider style={styles.sliderStyle} />
                      <OpacitySlider style={styles.sliderStyle} />
                      <Swatches
                        style={styles.swatchesContainer}
                        swatchStyle={styles.swatchStyle}
                        colors={customSwatches}
                      />
                      <View style={styles.previewTxtContainer}>
                        <PreviewText style={{ color: "#707070" }} />
                      </View>
                    </ColorPicker>
                  </View>
                  <Pressable
                    style={styles.closeButton}
                    onPress={() => setShowModal(false)}
                  >
                    <Text
                      style={{
                        color: "#707070",
                        fontFamily: "BoldText",
                      }}
                    >
                      Close
                    </Text>
                  </Pressable>
                </Animated.View>
              </Modal>
            </View>
          ))}
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
        >
          <Button
            title="save changes"
            onPress={() => handleCreate({ colors })}
            loading={loading}
          />

          <View style={{ marginLeft: 8 }}>
            <Button
              title="reset changes"
              loading={false}
              onPress={handleReset}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  colorCircleContainer: {
    alignItems: "center",
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000000", // Default color black
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  colorText: {
    color: "#707070",

    textAlign: "center",
    fontFamily: "BoldText",
  },
  pickerContainer: {
    alignSelf: "center",
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  panelStyle: {
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sliderStyle: {
    borderRadius: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  previewTxtContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#bebdbe",
    fontFamily: "BoldText",
  },
  swatchesContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#bebdbe",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  closeButton: {
    position: "absolute",
    bottom: 10,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Colorsfeature;
