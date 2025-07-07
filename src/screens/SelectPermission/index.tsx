// react
import React, { useCallback, useEffect, useState } from "react";

// hooks
import { getPermissions } from "@/src/hooks/Permissions";
import { convertApiPermissionIntoApp } from "@/src/hooks/Role/SelectPermission";

// component
import PermissionSidebar from "./PermissionSidebar";

// api data
import CreatePermissionCard from "@/src/components/ui/Permissions/CreatePermissionCard";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { CustomPermission } from "@/src/interface/Role";
import { View } from "react-native";

// interface
interface SelectPermissionProps {
  data?: CustomPermission[];
  setData?: any;
  access: boolean;
  setAccess: any;
  defaultData?: any[];
}

const SelectPermission: React.FC<SelectPermissionProps> = ({
  data,
  setData,
  access,
  setAccess,
  defaultData,
}) => {
  // state
  const [selectedItem, setSelectedItem] = useState<CustomPermission | null>(
    null
  );
  const [isCardVisible, setCardVisible] = useState(true);
  const [permissions, setPermissions] = useState<CustomPermission[]>(
    data || []
  );

  // habdleItem
  const handleItemClick = (permissionId: string) => {
    const item = permissions.find((per) => per.id === permissionId) || null;
    setSelectedItem(item);
  };

  // update permission
  const updatePermissions = useCallback(
    (updatedPermissions: CustomPermission[]) => {
      setPermissions(updatedPermissions);
    },
    [setPermissions]
  );

  // handle set permission
  const handleSetPermissionActive = (permissionId: string) => {
    const updatedPermissions = permissions.map((permission) => {
      if (permission.id === permissionId) {
        permission.active = !permission.active;

        permission.roles = permission.roles.map((item) => ({
          ...item,
          selected: permission.active,
        }));
      }
      return permission;
    });
    updatePermissions([...updatedPermissions]);
  };

  // handle select role
  const handleSelectRole = (permissionId: string, role: string) => {
    const updatedPermissions = permissions.map((permission) => {
      if (permission.id === permissionId) {
        const updatedRoles = permission.roles.map((r) => {
          if (r.role === role) {
            r.selected = !Boolean(r.selected);
          }
          return r;
        });

        let active = permission.roles.every((item) => item.selected);
        return { ...permission, roles: updatedRoles, active };
      }
      return permission;
    });

    updatePermissions([...updatedPermissions]);
  };

  let permissionList = getPermissions();
  useEffect(() => {
    if (permissionList.data.length > 0 && permissions.length == 0) {
      const data = permissionList.data.map((item) => ({
        ...item,
        active: false,
        roles: item.roles.map((role) => ({ ...role, selected: false })),
      }));

      if (defaultData && defaultData?.length > 0) {
        let convertData = convertApiPermissionIntoApp({
          inputArray: defaultData,
          database: data,
        });
        updatePermissions(convertData);

        return;
      }

      updatePermissions(data);
    }
  }, [permissionList]);

  useEffect(() => {
    if (selectedItem) {
      handleItemClick(selectedItem.id);
    }

    let access =
      permissionList.data.length ==
      permissions.filter((per) => per.active).length;
    setAccess(access);

    setData && setData(permissions);
  }, [permissions]);

  //Access All logic
  useEffect(() => {
    if (access == true) {
      const updatedPermissions = permissions.map((permission) => {
        permission.active = access;
        permission.roles = permission.roles.map((item) => ({
          ...item,
          selected: access,
        }));
        return permission;
      });

      updatePermissions(updatedPermissions);
    }
  }, [access]);

  return (
    <GlobalLoader>
      {/* permission sidecard */}
      <PermissionSidebar
        permissions={permissions}
        selectedItem={selectedItem}
        handleItemClick={handleItemClick}
      />

      {/* permission card */}
      {selectedItem && isCardVisible && (
        <View>
          {/* create permission  */}
          <CreatePermissionCard
            permissionId={selectedItem.id}
            title={selectedItem.title}
            desc={selectedItem.desc}
            roles={selectedItem.roles}
            active={selectedItem.active}
            setActive={() => handleSetPermissionActive(selectedItem.id)}
            handleSelectRole={(role) => handleSelectRole(selectedItem.id, role)}
          />
        </View>
      )}
    </GlobalLoader>
  );
};

export default SelectPermission;
