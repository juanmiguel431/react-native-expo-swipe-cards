import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

const Ball: React.FC = () => {
  const [position, setPosition] = useState<Animated.ValueXY | null>(null);

  useEffect(() => {
    const position = new Animated.ValueXY({ x: 0, y: 0 });
    setPosition(position);

    Animated.spring(position, {
      toValue: { x: 200, y: 500 },
      useNativeDriver: false
    }).start();
  }, []);

  return (
    <Animated.View style={position?.getLayout()} >
      <View style={styles.ball}/>
    </Animated.View>
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
