import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 5,
    marginBottom: 9,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  pinkcard: {
    paddingHorizontal: 12,
    marginTop: 5,
    marginBottom: 8,
    backgroundColor: "#fff8f5",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  container: {
    paddingHorizontal: 10,
    marginHorizontal: 8,
    fontFamily: "BoldText"

  },
  filterContainer: {
    padding: 8,
    backgroundColor: "#ffffff",
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    marginHorizontal: 16,
    borderRadius: 20,
    fontFamily: "BoldText"

  },
  label: {
    color: "#43484e",
    
    fontSize: 12,
    fontFamily: "BoldText"


  },
  content: {
    fontSize: 13,
    fontFamily: "Regular",

  },
  description: {
    fontSize: 13,
    marginBottom: 8,
    color: '#6B7280',
    fontFamily: "Regular",

  },
  BlueText: {
    fontSize: 13,
    color: "#4299e1",
    fontFamily: "Regular",
    textDecorationLine: "underline",


  },
  iconStyle: {
    fontSize: 19,
    color: "#848484",
    marginRight: 8,

  },
  iconColorStyle: {
    fontSize: 15,
    marginRight: 8,
    fontFamily: "BoldText"

  },
  greenText: {
    fontSize: 13,
    color: "#059669",
    
    fontFamily: "BoldText",

  },
  globalFontLight: {
    fontFamily: "Regular",
    fontSize: 13,

  },
  globalFontBold: {
    fontFamily: "BoldText",
    fontSize: 13,
  },
  globalFont: {
    fontFamily: "InterBlack",
  }
});