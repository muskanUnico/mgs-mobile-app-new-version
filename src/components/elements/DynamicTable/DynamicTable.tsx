import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Checkbox, DataTable } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";

interface TableCell {
  type: string | "custom";
  bold?: boolean;
  value: string | any;
}

interface TableRow {
  [key: string]: string | TableCell;
}

interface TableProps {
  data: TableRow[];
  columns: string[];
  defaultRowSelected?: number[];
  onRowSelect?: (selectedRows: number[]) => void;
  checkbox?: boolean;
}

const DynamicTable: React.FC<TableProps> = ({
  data,
  columns,
  defaultRowSelected = [],
  onRowSelect,
  checkbox,
}) => {
  const [selectedRows, setSelectedRows] =
    useState<number[]>(defaultRowSelected);

  useEffect(() => {
    setSelectedRows(defaultRowSelected);
  }, [defaultRowSelected]);

  const toggleRowSelection = (rowIndex: number) => {
    const updatedSelectedRows = selectedRows.includes(rowIndex)
      ? selectedRows.filter((index) => index !== rowIndex)
      : [...selectedRows, rowIndex];

    setSelectedRows(updatedSelectedRows);
    onRowSelect && onRowSelect(updatedSelectedRows);
  };

  const handleCheckAll = () => {
    const updatedSelectedRows =
      data.length !== selectedRows.length ? data.map((_, index) => index) : [];

    setSelectedRows(updatedSelectedRows);
    onRowSelect && onRowSelect(updatedSelectedRows);
  };
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <DataTable>
  
          <DataTable.Header>
                  
            {checkbox && (
              <DataTable.Title style={styles.checkboxTitle}>
                   <View style={styles.checkboxWrapper}>
                <Checkbox
                  status={
                    selectedRows.length === data.length
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={handleCheckAll}
                  color={theme.brandColor}
                />
                  </View>
              </DataTable.Title>
            )}

            {columns.map((column, index) => (
              <DataTable.Title key={index} >
                {column}
              </DataTable.Title>
            ))}
          
          </DataTable.Header>

          <ScrollView>
            {data.map((row, rowIndex) => (
              <DataTable.Row
                key={rowIndex}
                onPress={() => toggleRowSelection(rowIndex)}
                style={{
                  backgroundColor: selectedRows.includes(rowIndex)
                    ? "#ededed"
                    : "transparent",
                }}
              >
                {checkbox && (
                  <DataTable.Cell style={styles.checkboxCell}>
                    <Checkbox
                      status={
                        selectedRows.includes(rowIndex)
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => toggleRowSelection(rowIndex)}
                      color={theme.brandColor}
                    />
                  </DataTable.Cell>
                )}

                {Object.entries(row).map(([key, cell], cellIndex) => {
                  const isObject = typeof cell === "object";
                  const cellValue = isObject ? (cell as TableCell).value : cell;

                  return (
                    <DataTable.Cell key={cellIndex} style={styles.checkboxCell}>
                      <Text style={styles.cellText}>{cellValue}</Text>
                    </DataTable.Cell>
                  );
                })}
              </DataTable.Row>
            ))}
          </ScrollView>
        </DataTable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,

  },
  checkboxTitle: {
    width: 50,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    fontFamily: "Regular",
 
  },
  checkboxCell: {
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },
  cellText: {
    fontFamily: "Regular",
  },
  checkboxWrapper: {
  width: 40,
  height: 40,
},
});

export default DynamicTable;
