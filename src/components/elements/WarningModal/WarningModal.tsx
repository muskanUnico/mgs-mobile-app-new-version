import { Entypo } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";

interface WarningModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  title: string;
  handleLeftbtn: () => void;
  handleRightbtn: () => void;
  rightBtnName: string;
  leftBtnName: string;
  loading?: boolean;
}

const WarningModal = ({
  modalVisible,
  setModalVisible,
  title,
  handleRightbtn,
  handleLeftbtn,
  rightBtnName,
  leftBtnName,
  loading,
}: WarningModalProps) => {
  const styles = useStyles();
  const { theme } = useTheme();

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
          <View style={styles.whiteBackground}>
            {/* 
                    close Icons
            */}

            <View style={styles.flexRowEnd}>
              <Entypo
                onPress={() => setModalVisible(false)}
                size={30}
                style={styles.textStyle}
                name="cross"
              />
            </View>

            <View style={styles.modalContent}>
              {/* 
                    warning Icons
              */}

              <View style={{ alignItems: "center" }}>
                <AntDesign name="warning" size={50} color="black" />
              </View>

              {/* 
                    title added dynamic
              */}

              <Text style={[styles.centerItems, { fontFamily: "BoldText" }]}>
                {title}
              </Text>

              {/* 
                    button Name added dynamic
              */}

              <View style={styles.flexRowCenter}>
                <TouchableOpacity
                  onPress={() => handleLeftbtn()}
                  style={[styles.leftBtnName, styles.container2]}
                >
                  {loading && <ActivityIndicator size="small" color="white" />}
                  <Text style={styles.closeButtonText}>{rightBtnName} </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.rightBtnName}
                  onPress={() => handleRightbtn()}
                >
                  <Text style={styles.closeButtonText}> {leftBtnName}</Text>
                </TouchableOpacity>
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
    container2: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
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
      fontFamily: "BoldText",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
      paddingTop: 10,
      width: 300,
    },
    rightBtnName: {
      backgroundColor: theme.brandBlackColor,
      paddingHorizontal: 10,
      borderRadius: 5,
      paddingVertical: 5,
      fontFamily: "BoldText",
    },
    leftBtnName: {
      backgroundColor: "red",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      fontFamily: "BoldText",
    },
    closeButtonText: {
      color: theme.brandWhiteColor,
      fontFamily: "BoldText",
    },
    whiteBackground: {
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
    },
    flexRowEnd: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    textStyle: {
      fontSize: 20,
    },
    centerItems: {
      alignItems: "center",
    },
    flexRowCenter: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 32, // Tailwind's pt-8 is approx 32px
      gap: 12, // Tailwind's gap-3 is approx 12px
    },
  });
};
export default WarningModal;
