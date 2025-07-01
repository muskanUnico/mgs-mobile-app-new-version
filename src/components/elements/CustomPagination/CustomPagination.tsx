import React, { useCallback } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

function CustomPagination({ gotoPage, totalPage, pageIndex }: any) {
  const { theme } = useTheme();
  const renderPageLinks = useCallback(() => {
    if (totalPage === 0 || isNaN(pageIndex)) return null;
    const visiblePageButtonCount = 5;

    let numberOfButtons =
      totalPage < visiblePageButtonCount ? totalPage : visiblePageButtonCount;

    const pageIndices = [pageIndex];

    numberOfButtons--;

    [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
      const pageNumberBefore = pageIndices[0] - 1;
      const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
      if (
        pageNumberBefore >= 1 &&
        (itemIndex < numberOfButtons / 2 || pageNumberAfter > totalPage - 1)
      ) {
        pageIndices.unshift(pageNumberBefore);
      } else {
        pageIndices.push(pageNumberAfter);
      }
    });

    return pageIndices.map((pageIndexToMap) => (
      <TouchableOpacity
        key={pageIndexToMap}
        onPress={() => gotoPage(pageIndexToMap)}
        style={{
          backgroundColor:
            pageIndex === pageIndexToMap ? theme.brandBlackColor : "white",
          borderRadius: 8,
          paddingHorizontal: 10,
          paddingVertical: 2,
          marginTop: 5,
          marginLeft: 6,
          borderColor: theme.brandBlackColor,
          height: 25,
        }}
      >
        <Text
          style={{
            color:
              pageIndex === pageIndexToMap ? "white" : theme.brandBlackColor,
            fontFamily: "BoldText",
          }}
        >
          {pageIndexToMap}
        </Text>
      </TouchableOpacity>
    ));
  }, [totalPage, pageIndex]);

  return (
    <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 30 }}>
      <FlatList
        data={renderPageLinks()}
        renderItem={({ item }) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default CustomPagination;
