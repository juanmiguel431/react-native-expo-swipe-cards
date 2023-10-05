import React, { useRef } from 'react';
import { View, Animated, PanResponder } from 'react-native';
import { Data } from '../models';

type DeckProps = {
  data: Data[];
  renderCard: (item: Data) => React.ReactNode;
}

const Deck: React.FC<DeckProps> = ({ data, renderCard }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      //onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }), // Works with this line. Why not with the line below

      onPanResponderMove: (e, gestureState) => {
        // pan.setValue({ x: gestureState.dx, y: gestureState.dy });
        const event = Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false });
        event(e, gestureState);
      },

      onPanResponderRelease: () => {
        // pan.extractOffset();
        Animated.spring(pan, { toValue: 0, useNativeDriver: false }).start();
      }
    })
  ).current;

  return (
    <Animated.View
      // style={pan.getLayout()}
      style={{ transform: [{translateX: pan.x}, {translateY: pan.y}], }}
      {...panResponder.panHandlers}>
      {data.map(item => renderCard(item))}
    </Animated.View>
  );
};

export default Deck;
