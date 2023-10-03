import { StyleSheet, View } from 'react-native';
import React from 'react';

const Ball: React.FC = () => {
  return (
    <View style={styles.ball} />
  );
};

const styles = StyleSheet.create({
  ball: {
    borderColor: 'black',
    borderRadius: 30,
    borderWidth: 30,
    height: 60,
    width: 60
  }
});

export default Ball;
