import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params.deck
    return {
      title
    }
  }

  render() {
    const { title, questions } = this.props.navigation.state.params.deck
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={ styles.title }>
          <Text style={{ fontSize: 42, fontWeight: 'bold'}}>{title}</Text>
          <Text style={{ fontSize: 24, opacity: 0.6 }}>{questions.length} cards</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.buttonAddCard}
            onPress={() => navigate('AddCard', { title }) }
          >
            <Text style={{ fontSize: 22 }}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStart}
            onPress={() => navigate('Quiz', {questions})}
          >
            <Text style={{ fontSize: 22, color: '#FFFFFF' }}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    alignItems: 'center',
  },
  buttonAddCard: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    height: 60,
    width: Dimensions.get('window').width - 160,
    marginBottom: 20,
  },
  buttonStart: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    height: 60,
    width: Dimensions.get('window').width - 160,
    backgroundColor: '#000000',
  }
});

export default Deck;
