import { TeamMemberService } from "../services/TeamMember/TeamMember";
import { createContext, useContext, useEffect, useState } from "react";
import { CMSServices } from "../services/CMS";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Start with true to indicate loading
  const [rolesAndPermissions, setRolesAndPermissions] = useState({});
  const [CMSData, setCMSData] = useState({});

  const [reloadData, setreloadData] = useState(1);
  const reload = () => {
    setreloadData(old => old + 1);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userDataPromise = TeamMemberService.getMe();
        // Fetch CMS data
        const cmsDataPromise = CMSServices.getCMS();

        // Wait for both promises to resolve
        const [userData, cmsData] = await Promise.all([userDataPromise, cmsDataPromise]);

        if (!userData.success) {
          console.error("Error fetching user data:", userData.error);
          return;
        }
        setUser(userData.data.user);
        setRolesAndPermissions(userData.data.rolesAndPermissions);

        setCMSData(cmsData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(true); // Set isLoading to false after both data fetches complete
      }
    };

    fetchData();
  }, [reloadData]);

  const value = {
    CMSData,
    user,
    setUser,
    isLoading,
    rolesAndPermissions,
    permissions: rolesAndPermissions[user?.role?.roleId] || [],

    reload
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
