import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Button from "../components/elements/Button/Button";
import CustomModal from "../components/elements/CustomModal/CustomModal";

const TrackerCustomDuration = ({
  modal,
  setModal,
  handleSaveDuration,
  setSelectedMinute,
  setSelectedHour,
  selectedMinute,
  selectedHour,
}) => {
  const formatNumber = (number) => number.toString().padStart(2, "0");

  const hours = Array.from({ length: 13 }, (_, i) => formatNumber(i));
  const minutes = Array.from({ length: 60 }, (_, i) => formatNumber(i * 1));

  const renderHourItem = ({ item: hour }) => (
    <TouchableOpacity
      onPress={() => setSelectedHour(hour)}
      style={styles.touchable}
    >
      <Text
        style={[
          styles.pickerItem,
          selectedHour === hour && styles.selectedItem,
        ]}
      >
        {hour}
      </Text>
    </TouchableOpacity>
  );

  const renderMinuteItem = ({ item: minute }) => (
    <TouchableOpacity
      onPress={() => setSelectedMinute(minute)}
      style={styles.touchable}
    >
      <Text
        style={[
          styles.pickerItem,
          selectedMinute === minute && styles.selectedItem,
        ]}
      >
        {minute}
      </Text>
    </TouchableOpacity>
  );

  return (
    <CustomModal
      modalVisible={modal}
      text="Pick Duration"
      setModalVisible={setModal}
    >
      <View style={styles.pickerContainer}>
        <FlatList
          data={hours}
          renderItem={renderHourItem}
          keyExtractor={(item) => item}
          style={styles.flatList}
          contentContainerStyle={styles.scrollContainer}
        />
        <Text style={styles.separator}>:</Text>
        <FlatList
          data={minutes}
          renderItem={renderMinuteItem}
          keyExtractor={(item) => item}
          style={styles.flatList}
          contentContainerStyle={styles.scrollContainer}
        />
      </View>

      <View>
        <Button title="Save" onPress={handleSaveDuration} />
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 100,
  },
  flatList: {
    height: 150,
    width: 50,
  },
  scrollContainer: {
    justifyContent: "center",
  },
  touchable: {
    alignItems: "center",
    paddingVertical: 10,
  },
  pickerItem: {
    fontSize: 18,
    color: "black",
  },
  selectedItem: {
    fontWeight: "bold",
    color: "blue",
  },
  separator: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default TrackerCustomDuration;
