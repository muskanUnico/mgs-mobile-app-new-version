import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomPagination from "../../../components/elements/CustomPagination/CustomPagination";
import Loader from "../../../components/elements/Loader/Loader";
import CustomerCard from "../../../components/ui/Customer/CustomerCard/CustomerCard";
import {
  FilterBorder,
  placeholderTextColor,
} from "../../../constants/COLORS";
import { useTheme } from "../../../context/ThemeContext";
import { getCustomers } from "../../../hooks/Customer";
import { PermissionAccess } from "../../../middleware/PermissionAccess";

export const ViewCustomers = () => {
  const styles = useStyles();
  const customers = getCustomers({ defaultParams: 1000 });
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    customers.setparams((oldParams: any) => ({ ...oldParams, name: value }));
  };
  return (
    <View>
      {customers.loading ? (
        <Loader />
      ) : (
        <View>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Search"
              onChangeText={handleSearch}
              value={searchValue}
              style={styles.searchBar}
              inputStyle={styles.searchInput}
              icon={() => (
                <MaterialCommunityIcon
                  name="magnify"
                  style={{ color: placeholderTextColor }}
                  size={24}
                />
              )}
              placeholderTextColor={placeholderTextColor}
            />
          </View>
          <PermissionAccess requiredPermissions={["view_customers"]}>
            {customers.data.map((item, index) => {
              return <CustomerCard item={item} key={index} index={index} />;
            })}

            <CustomPagination
              totalPage={customers.res.totalPages}
              pageIndex={customers.res.page}
              gotoPage={customers.setPage}
            />
          </PermissionAccess>
        </View>
      )}
    </View>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    searchContainer: {
      marginBottom: 5,
      marginHorizontal: 16,
    },
    searchBar: {
      borderRadius: 20,
      borderWidth: 1,
      backgroundColor: theme.brandWhiteColor,
      borderColor: FilterBorder,
      height: 40,
    },
    searchInput: {
      fontSize: 14,
      color: placeholderTextColor,
      paddingBottom: 20,
      fontFamily: "Regular",
    },
  });
};
export default ViewCustomers;
