import { Text } from "react-native";
import React from "react";
import { useAuth } from "../context/AuthContext";

export function PermissionAccess({
  requiredPermissions = [],
  matchPermissions = [],
  children,
  RenderError = () => null,
}) {
  const { permissions } = useAuth();

  // Check if the user has the required permissions
  const hasPermission = requiredPermissions.length > 0 && requiredPermissions.every(permission =>
    permissions.includes(permission)
  );
  const matchPermission = matchPermissions.some(permission =>
    permissions.includes(permission)
  );

  return hasPermission || matchPermission ? <>{children}</> : <RenderError />;
}


export const SecurePageByPackage = (WrappedComponent, requiredPermissions) => {
  return function SecurePageWrapper(props) {
    const { user, rolesAndPermissions } = useAuth();
    const userRole = user?.role?.roleId || '';
    const permissions = rolesAndPermissions[userRole] || [];

    // Check if the user has the required permissions
    const hasPermission = requiredPermissions.every(permission =>
      permissions.includes(permission)
    );


    if (hasPermission) {
      return <WrappedComponent {...props} />;
    } else {
      return <Text>Insufficient Permissions</Text>;
    }
  };
};
