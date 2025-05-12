//@ts-nocheck

import React, { useRef } from "react";
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { brandColor } from "../../../constants/COLORS";
import { useTheme } from "../../../context/ThemeContext";

export default function TextEditorScreen({ setCaption, caption }:any) {
  const richText = useRef();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10 }}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.heading1,
              actions.setStrikethrough,
              actions.insertBulletsList,
              actions.insertOrderedList,
            ]}
            iconMap={{
              [actions.heading1]: ({ tintColor }:any) => (
                <Text style={{ color: tintColor }}>H1</Text>
              ),
            }}
            selectedIconTint="#ffffff"
            iconTint="#000000"
            selectedButtonStyle={{ backgroundColor: theme.brandColor }}
          />

          <RichEditor
            ref={richText}
            onChange={descriptionText => {
              console.log("descriptionText:", descriptionText);
              setCaption(descriptionText);
            }}
            androidLayerType="software"
            androidHardwareAccelerationDisabled

            initialHeight={200}
            initialContentHTML={caption}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
