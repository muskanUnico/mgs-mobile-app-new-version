import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../../components/elements/Button/Button";
import PermissionCard from "../../components/ui/Permissions/PermissionCard/PermissionCard";
import { FilterBorder, placeholderTextColor } from "../../constants/COLORS";
import { useTheme } from "../../context/ThemeContext";
import { getRoles } from "../../hooks/Role";

export const AllPermissions = ({ navigation }: any) => {
  const styles = useStyles();
  const roles = getRoles({ defaultParams: 1000 });

  const handleSearch = (value: string) => {
    roles.setparams((old: object) => {
      let query = { ...old, title: value };
      return query;
    });
  };

  return (
    <>
      <View style={{ marginHorizontal: 16, marginBottom: 12, marginTop: 4 }}>
        <Button
          title="Create Role"
          loading={false}
          onPress={() => 
            // navigation.navigate("create-permission")
             router.navigate("/(stack)/createPermission")
          }
        />
      </View>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={(text) => handleSearch(text)}
          value={roles?.params?.title || ""}
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
      {roles.data.map((item, index) => {
        return (
          <PermissionCard navigation={navigation} item={item} key={index} />
        );
      })}
    </>
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
      fontSize: 15,
      color: placeholderTextColor,
      paddingBottom: 20,
    },
  });
};
