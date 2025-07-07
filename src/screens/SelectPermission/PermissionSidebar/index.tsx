import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StyleSheet } from "react-native";
// interface
interface Permission {
  icon: string;
  iconColor?: string;
  title: string;
  desc: string;
  roles: Role[];
  id: string;
  active: boolean;
}

interface Role {
  title: string;
  role: string;
  _id: string;
  selected: boolean;
}

interface PermissionSidebarProps {
  permissions: Permission[];
  selectedItem: Permission | null;
  handleItemClick: (id: string) => void;
}

const PermissionSidebar: React.FC<PermissionSidebarProps> = ({
  permissions,
  selectedItem,
  handleItemClick,
}) => {
  const iconMap: { [key: string]: string } = {
    Group: "group",
    LocalOffer: "local-offer",
    Event: "event",
    AttachMoney: "attach-money",
    Lock: "lock",
    EventNote: "event-note",
    Receipt: "receipt",
    Payment: "payment",
    GroupAdd: "group-add",
  };

  return (
    <View>
      {permissions.map((item) => (
        <TouchableOpacity
          onPress={() => handleItemClick(item.id)}
          style={[
            styles.item,
            selectedItem?.id === item.id && styles.selectedItem,
          ]}
          key={item.id}
        >
          <View style={styles.row}>
            <Icon
              name={iconMap[item.icon] || "group"}
              size={25}
              color={item.iconColor}
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PermissionSidebar;

const styles = StyleSheet.create({
  item: {
    padding: 8, // Tailwind `p-2`
  },
  selectedItem: {
    backgroundColor: "#bfdbfe", // Tailwind `bg-blue-200`
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 8, // Tailwind `ml-2`
    fontSize: 14, // Tailwind `text-sm`
    fontFamily: "BoldText",
  },
});
