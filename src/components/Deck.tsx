import React, { useCallback, useRef } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';
import { Data } from '../models';

type DeckProps = {
  data: Data[];
  renderCard: (item: Data) => React.ReactNode;
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.65 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

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

      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          // pan.extractOffset(); // Keep the object in the place that you want.
          Animated.spring(pan, { toValue: 0, useNativeDriver: false }).start(); // Return to the original position.
        }
      }
    })
  ).current;

  const onSwipeComplete = useCallback((direction: 'left' | 'right') => {
    console.log(direction);
  }, []);

  const forceSwipe = useCallback((direction: 'left' | 'right') => {
    const dir = direction === 'left' ? -1 : 1;
    Animated.timing(pan, { toValue: { x: SCREEN_WIDTH * dir, y: 0 }, duration: SWIPE_OUT_DURATION, useNativeDriver: false }).start(() => {
      onSwipeComplete(direction);
    });
  }, [pan, onSwipeComplete]);


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
