import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity, Dimensions } from 'react-native';

class QuizResult extends Component {
  state = {
    correct: '',
    incorrect: '',
  }

  componentWillMount() {
    const correct = AsyncStorage.getItem('@flashcards:quizCorrect')
      .then(res => this.setState({ correct: res }))
    const incorrect = AsyncStorage.getItem('@flashcards:quizIncorrect')
      .then(res => this.setState({ incorrect: res }))
  }

  resetQuiz = () => {
    AsyncStorage.setItem('@flashcards:quizCorrect', JSON.stringify(0))
    AsyncStorage.setItem('@flashcards:quizIncorrect', JSON.stringify(0))
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text style={[styles.text, { color: '#0F7F12'}]}>Correct questions</Text>
          <Text style={styles.number}>{this.state.correct}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={[styles.text, { color: '#D22A25'}]}>Incorrect questions</Text>
          <Text style={styles.number}>{this.state.incorrect}</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
          style={styles.buttonDecks}
            onPress={() => this.props.navigation.navigate('Decks')}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 22 }}>Decks</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.buttonReset}
            onPress={() => this.resetQuiz()}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 22 }}>Reset Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  number: {
    fontSize: 32,
    marginTop: 10,
  },
  button: {
    flex: 2,
  },
  buttonDecks: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    height: 60,
    width: Dimensions.get('window').width - 160,
    backgroundColor: '#000000',
    marginBottom: 20,
  },
  buttonReset: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    height: 60,
    width: Dimensions.get('window').width - 160,
    backgroundColor: '#000000',
  },
});

export default QuizResult;
