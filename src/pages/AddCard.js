import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { addCardToDeck, getDecks } from '../utils/api';

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  addCardAndSave = (title, card) => {
    addCardToDeck(title, card)
      .then(() => {
        this.setState({ question: '', answer: '' })
      })
  }

  render() {
    const { title } = this.props.navigation.state.params;
    const { question, answer } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Enter your question"
            value={this.state.question}
            onChangeText={(question) => this.setState({ question }) }
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Enter you answer"
            value={this.state.answer}
            onChangeText={(answer) => this.setState({ answer }) }
          />
        </View>
        <TouchableOpacity
          style={styles.submit}
          onPress={() => {
            const card = {
              question,
              answer
            }
            this.addCardAndSave(title, card)
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 22 }}>Submit</Text>
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
  inputView: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 40,
  },
  input: {
    fontSize: 24,
    width: Dimensions.get('window').width - 60,
    borderBottomWidth: 1,
  },
  submit: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#000000',
    height: 60,
    width: Dimensions.get('window').width - 160,
  },
});

export default AddCard;
