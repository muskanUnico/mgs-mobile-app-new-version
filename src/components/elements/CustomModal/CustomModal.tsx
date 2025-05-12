import { Entypo } from "@expo/vector-icons";
import { View, Modal, StyleSheet, Text } from "react-native";
import { Divider } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";

interface CustomModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  children: any;
  text: string;
}

const CustomModal = ({
  modalVisible,
  setModalVisible,
  children,
  text,
}: CustomModalProps) => {
  const { theme } = useTheme();
  const styles = useStyles();
  return (
    <View style={styles.container}>
      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.boxStyle}>
            <View style={styles.cardStyle}>
              <View style={styles.rowStyle}>
                <Text
                  style={[
                    {
                      fontSize: 16,
                      color: theme.brandColor,
                      fontFamily: "BoldText",
                    },
                    styles.uppercaseText,
                  ]}
                >
                  {text}
                </Text>
                <Entypo
                  onPress={() => setModalVisible(false)}
                  size={28}
                  tyle={styles.textSize15}
                  name="cross"
                  color="#43484e"
                />
              </View>
              <Divider style={styles.marginBottom3} />

              <View style={[styles.modalContent, styles.paddingStyle]}>
                {children}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    uppercaseText: {
      textTransform: "uppercase",
      marginLeft: 16,
    },
    marginBottom3: {
      marginBottom: 12,
    },
    paddingStyle: {
      paddingHorizontal: 12, 
      paddingVertical: 8, 
      paddingBottom: 16, 
    },
    rowStyle: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 8, 
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      padding: 10,
      backgroundColor: "blue",
      borderRadius: 5,
    },
    buttonText: {
      color: theme.brandWhiteColor,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: 300,
    },
    cardStyle: {
      backgroundColor: "#fff8f5",
      borderRadius: 10, 
      margin: 8, 
      borderWidth: 1, 
      borderColor: "#bcbcbc",
    },
    rightBtnName: {
      backgroundColor: "red",
      paddingHorizontal: 10,
      borderRadius: 5,
      paddingVertical: 5,
    },
    leftBtnName: {
      backgroundColor: "red",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    closeButtonText: {
      color: theme.brandWhiteColor,
    },
    boxStyle: {
      backgroundColor: "#ffffff",
      borderRadius: 10, 
      borderWidth: 1, 
      borderColor: "#bcbcbc",
    },
    textSize15: {
      fontSize: 15,
    },
  });
};

export default CustomModal;
