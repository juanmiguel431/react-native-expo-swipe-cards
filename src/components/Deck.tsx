import React, { useCallback, useRef } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';
import { Data } from '../models';

type DeckProps = {
  data: Data[];
  renderCard: (item: Data) => React.ReactNode;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

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

  const getCardStyle = useCallback(() => {
    const width = SCREEN_WIDTH * 1.5;

    const rotate = pan.x.interpolate({
      inputRange: [-width, 0, width],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    //pan.getLayout() returns an object like { left: 0, top: 0 }
    //rotate return an amount of degrees like 45deg

    return { left: pan.x, transform: [{ rotate }] }; // This will prevent the movement in Y axis.

    // return { left: pan.x, top: pan.y, transform: [{ rotate }] };
    // return { transform: [{ rotate: rotate }, { translateX: pan.x }, { translateY: pan.y }] };
    // return { ...pan.getLayout(), transform: [{ rotate: rotate }] };
    // return { transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate: rotate }], }
  }, [pan]);

  return (
    <View>
      {data.map((item, index) => {
        if (index === 0) {
          return (
            <Animated.View
              key={item.id}
              style={getCardStyle()}
              {...panResponder.panHandlers}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }

        return renderCard(item);
      })}
    </View>
  );
};

export default Deck;
