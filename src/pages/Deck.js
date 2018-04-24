import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

class Deck extends Component {
  state = {
    isDisabled: false,
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params.deck
    return {
      title
    }
  }

  componentDidMount() {
    const { questions } = this.props.navigation.state.params.deck
    if (questions.length > 0) {
      this.setState({ isDisabled: false })
    }
    if (questions.length === 0) {
      this.setState({ isDisabled: true })
    }
  }

  render() {
    const { title, questions } = this.props.navigation.state.params.deck
    const { navigate } = this.props.navigation
    const { opacity, isDisabled } = this.state
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
            <Text style={{ fontSize: 22 }}>Create New Question</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isDisabled}
            style={isDisabled ? styles.buttonStartDisable : styles.buttonStartEnable}
            onPress={() => navigate('Quiz', {questions})}
          >
            <Text style={{ fontSize: 22, color: '#FFFFFF' }}>{isDisabled ? 'No question' : 'Start Quiz'}</Text>
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
  buttonStartEnable: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    height: 60,
    width: Dimensions.get('window').width - 160,
    backgroundColor: '#000000',
  },
  buttonStartDisable: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    height: 60,
    width: Dimensions.get('window').width - 160,
    backgroundColor: '#CCCCCC',
  }
});

export default Deck;
