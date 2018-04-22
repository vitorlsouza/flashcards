import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';

class Quiz extends Component {

  state = {
    show: 'question',
    numQuestion: 1,
    correct: 0,
    incorrect: 0,
  }

  componentDidMount() {
    console.tron.log(this.state.correct)
    AsyncStorage.setItem('@flashcards:quizCorrect', JSON.stringify(this.state.correct))
    AsyncStorage.setItem('@flashcards:quizIncorrect', JSON.stringify(this.state.incorrect))
  }

  showAnswer = () => {
    this.setState({ show: 'answer' })
  }

  showQuestion = () => {
    this.setState({ show: 'question' })
  }

  questionCorrect = (question, max) => {
    if (question < max) {
      this.setState({ numQuestion: question + 1, correct: this.state.correct + 1 })
      setTimeout(() => {
        AsyncStorage.setItem('@flashcards:quizCorrect', JSON.stringify(this.state.correct))
      }, 400)
    }
    if (question === max) {
      this.setState({ correct: this.state.correct + 1 })
      setTimeout(() => {
        AsyncStorage.setItem('@flashcards:quizCorrect', JSON.stringify(this.state.correct))
          .then(() => {
            this.props.navigation.navigate('QuizResult')
            this.setState({ numQuestion: 1, correct: 0, incorrect: 0 })
          })
      }, 200)
    }
  }

  questionIncorrect = (question, max) => {
    if (question < max) {
      this.setState({ numQuestion: question + 1, incorrect: this.state.incorrect + 1 })
      setTimeout(() => {
        AsyncStorage.setItem('@flashcards:quizIncorrect', JSON.stringify(this.state.incorrect))
      }, 400)
    }
    if (question === max) {
      this.setState({ incorrect: this.state.incorrect + 1 })
      setTimeout(() => {
        AsyncStorage.setItem('@flashcards:quizIncorrect', JSON.stringify(this.state.incorrect))
          .then(() => {
            this.props.navigation.navigate('QuizResult')
            this.setState({ numQuestion: 1, correct: 0, incorrect: 0 })
          })
      }, 200)
    }
  }

  render() {
    const { questions } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <View style={styles.quantidade}>
          <Text style={{ fontSize: 16 }}> {this.state.numQuestion} / {questions.length}</Text>
        </View>
        {this.state.show === 'question'
          ? <View style={styles.questionView}>
              <Text style={styles.question}>{questions[this.state.numQuestion - 1][this.state.show]}</Text>
              <TouchableOpacity
                onPress={() => this.showAnswer()}
              >
                <Text style={styles.answer}>{this.state.show}</Text>
              </TouchableOpacity>
            </View>
          : <View style={styles.questionView}>
              <Text style={styles.question}>{questions[this.state.numQuestion - 1][this.state.show]}</Text>
              <TouchableOpacity
                onPress={() => this.showQuestion()}
              >
                <Text style={styles.answer}>{this.state.show}</Text>
              </TouchableOpacity>
            </View>
        }
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.buttonCorrect}
            onPress={() => this.questionCorrect(this.state.numQuestion, questions.length)}
          >
            <Text style={{ fontSize: 22, color: '#FFFFFF' }}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonIncorrect}
            onPress={() => this.questionIncorrect(this.state.numQuestion, questions.length)}
          >
            <Text style={{ fontSize: 22, color: '#FFFFFF' }}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  quantidade: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  questionView: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  question: {
    textAlign: 'center',
    fontSize: 42,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D22A25',
    margin: 10,
  },
  button: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCorrect: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F7F12',
    borderWidth: 0,
    borderRadius: 8,
    height: 60,
    width: Dimensions.get('window').width - 160,
    marginBottom: 20,
  },
  buttonIncorrect: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D22A25',
    borderWidth: 0,
    borderRadius: 8,
    height: 60,
    width: Dimensions.get('window').width - 160,
  },
});

export default Quiz;
