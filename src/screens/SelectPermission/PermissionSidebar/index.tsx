import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

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
          className={`StaffMemberCss p-2 ${
            selectedItem?.id === item.id ? "bg-blue-200" : ""
          }`}
          key={item.id}
        >
          <View className="flex flex-row items-center">
            <Icon
              name={iconMap[item.icon] || "group"}
              size={25}
              color={item.iconColor}
            />
            <Text className="ml-2 text-sm " style={{ fontFamily: "BoldText" }}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PermissionSidebar;
