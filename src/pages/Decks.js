import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native';
import Deck from './Deck';
import { getDecks, getDeck, saveDeckTitle } from '../utils/api';

class Decks extends Component {
  static navigationOptions = {
    title: 'Decks',
    headerLeft: null,
  }

  state = {
    decks: [],
    deck: {},
    loading: true,
    refreshing: false,
  }

  componentWillMount() {
    this.onRefreshDecks()
  }

  onRefreshDecks = () => {
    this.setState({ refreshing: true })
    this.loadDecks()
    this.setState({ refreshing: false })
  }

  loadDecks = () => {
    getDecks().then(res => this.setState({ decks: res, loading: false }));
  }

  openDeck = (id, deck) => {
    getDeck(id)
    this.props.navigation.navigate('Deck', { deck })
    AsyncStorage.setItem('@flashcards:deck', id)
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefreshDecks}
          />
        }>
          {this.state.loading
            ? <ActivityIndicator />
            : this.state.decks === null
              ? <View>
                  <Text style={styles.text}>Nenhum deck encontrado!</Text>
                  <Text style={styles.text}>Puxe a tela para carregar os decks!</Text>
                </View>
              : Object.keys(this.state.decks).map(deck => (
              <View key={deck}>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => this.openDeck(deck, this.state.decks[deck])}
                >
                  <Text style={{ fontSize: 24, fontWeight: 'bold'}}>{deck}</Text>
                  <Text style={{ fontSize: 16, opacity: 0.6 }}>{this.state.decks[deck].questions.length} cards</Text>
                </TouchableOpacity>
              </View>
            ))
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    borderBottomWidth: 1
  },
});

export default Decks;
