import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { MaterialIcons } from "@expo/vector-icons";

interface LongMenuProps {
  options: any;
  handleOptions?: any;
}

export default function LongMenu({ options, handleOptions }: LongMenuProps) {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Menu
        visible={visible}
        anchor={
          <View>
            <MaterialIcons
              onPress={showMenu}
              name="more-vert"
              size={20}
              color="black"
            />
          </View>
        }
        onRequestClose={hideMenu}
      >
        {options.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <MenuItem
              onPress={() => {
                hideMenu();
                handleOptions(item);
              }}
            >
              <View style={styles.flexStyle}>
                <Text style={[{ fontFamily: "BoldText" }, styles.textStyle]}>
                  {" "}
                  {item?.icon}
                </Text>
                <View style={styles.marginLeftSmall}>
                  <Text style={[{ fontFamily: "Regular" }, styles.smallText]}>
                    {item?.title}
                  </Text>
                </View>
              </View>
            </MenuItem>
            {item.line && <MenuDivider />}
          </React.Fragment>
        ))}
      </Menu>
    </View>
  );
}
const styles = StyleSheet.create({
  flexStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 12,
  },
  marginLeftSmall: {
    marginLeft: 8,
  },
  smallText: {
    fontSize: 12,
  },
});
