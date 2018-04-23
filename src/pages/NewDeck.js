import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { saveDeckTitle, getDeck } from '../utils/api';

class NewDeck extends Component {
  static navigationOptions = {
    title: 'New Deck',
    headerLeft: null,
  }

  state = {
    title: '',
  }

  addAndSaveDeck = (title) => {
    saveDeckTitle(title)
      .then(() => {
        getDeck(title)
          .then((deck) => {
            this.props.navigation.dispatch(NavigationActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({ routeName: 'Home'}),
                NavigationActions.navigate({ routeName: 'Deck', params: {deck}})
              ]
            }))
            AsyncStorage.setItem('@flashcards:deck', id)
          })
      })




    this.setState({ title: '' })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Deck title"
            value={this.state.title}
            onChangeText={(title) => this.setState({ title })}
          />
        </View>
        <TouchableOpacity
          style={styles.submit}
          onPress={() => this.addAndSaveDeck(this.state.title)}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 20}}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 52,
    padding: 20,
    textAlign: 'center',
    marginBottom: 40,
  },
  inputView: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  input: {
    fontSize: 24,
    width: Dimensions.get('window').width - 60,
    borderBottomWidth: 1,
  },
  submit: {
    marginTop: 60,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 50
  }
});

//make this component available to the app
export default NewDeck;
