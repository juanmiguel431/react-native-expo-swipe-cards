import React from 'react';
import { View, Animated } from 'react-native';
import { Data } from '../models';

type DeckProps = {
  data: Data[];
  renderCard: (item: Data) => React.ReactNode;
}

const Deck: React.FC<DeckProps> = ({ data, renderCard }) => {
  return (
    <View>
      {data.map(item => renderCard(item))}
    </View>
  );
};

export default Deck;
