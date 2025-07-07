import React from 'react';
import { View, StyleSheet } from 'react-native';

type CustomPaginationProps = {
  dotsLength: number;
  activeDotIndex: number;
};

const CustomCrouselPagination: React.FC<CustomPaginationProps> = ({ dotsLength, activeDotIndex }) => {
  return (
    <View style={styles.paginationContainer}>
      {Array.from({ length: dotsLength }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dotStyle,
            activeDotIndex === index ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#333',
    transform: [{ scale: 1 }],
    opacity: 1,
  },
  inactiveDot: {
    backgroundColor: '#aaa',
    transform: [{ scale: 0.6 }],
    opacity: 0.4,
  },
});


export default CustomCrouselPagination;