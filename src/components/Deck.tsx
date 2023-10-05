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
      onPanResponderMove: (e, gestureState) => {
        pan.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: () => {}
    })
  ).current;

  return (
    <Animated.View
      style={pan.getLayout()}
      {...panResponder.panHandlers}>
      {data.map(item => renderCard(item))}
    </Animated.View>
  );
};

export default Deck;
