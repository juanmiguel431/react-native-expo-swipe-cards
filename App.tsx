import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import Ball from './src/components/Ball';
import Deck from './src/components/Deck';
import { Data } from './src/models';
import { useCallback } from 'react';
import { Card, Button } from '@rneui/themed';

const DATA: Data[] = [
  { id: 1, text: 'Card #1', uri: 'https://images.unsplash.com/photo-1575688005938-aad990594722?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80' },
  { id: 2, text: 'Card #2', uri: 'https://images.unsplash.com/photo-1608605120319-ccfcacb4c250?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80' },
  { id: 3, text: 'Card #3', uri: 'https://images.unsplash.com/photo-1612093782370-6d055b5c9c52?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=932&q=80' },
  { id: 4, text: 'Card #4', uri: 'https://images.unsplash.com/photo-1517638083100-3f5eb3055a8d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80' },
  { id: 5, text: 'Card #5', uri: 'https://images.unsplash.com/photo-1608605026308-29b743cc156e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80' },
  { id: 6, text: 'Card #6', uri: 'https://images.unsplash.com/photo-1602832307883-bdaef89f87fe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=888&q=80' },
  { id: 7, text: 'Card #7', uri: 'https://images.unsplash.com/photo-1524527847659-de3af4eff838?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80' },
  { id: 8, text: 'Card #8', uri: 'https://images.unsplash.com/photo-1603348929190-0257ea827c97?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80' },
];

export default function App() {

  const renderCard = useCallback( (item: Data) => {
    return (
      <Card key={item.id}>
        <Card.Title>{item.text}</Card.Title>
        <Card.Image style={{ padding: 0 }} source={{ uri: item.uri, }}/>
        <Text >I can customize the card further.</Text>
        <Button
          title="View Now!"
          icon={{ name: 'code', color: 'white' }}
          buttonStyle={{ backgroundColor: '#03A9F4' }}
        />
      </Card>
    );
  }, []);

  return (
    <View style={styles.container}>
      <Deck
        data={DATA}
        renderCard={renderCard}
      />
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
