import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation'
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons'
import { setLocalNotification, clearLocalNotification } from './src/utils/helpers'
import Decks from './src/pages/Decks'
import Deck from './src/pages/Deck'
import Quiz from './src/pages/Quiz'
import NewDeck from './src/pages/NewDeck'
import AddCard from './src/pages/AddCard'
import QuizResult from './src/pages/QuizResult'
import './src/config/ReactotronConfig'

console.disableYellowBox = true;

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: () => <Entypo name='documents' size={22}/>
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Decks',
      tabBarIcon: () => <Entypo name='plus' size={22}/>
    }
  }
})

const Routes = StackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card'
    }
  },
  QuizResult: {
    screen: QuizResult,
    navigationOptions: {
      title: 'Result Quiz'
    }
  }
})

export default class App extends Component {
  componentDidMount() {
    // setLocalNotification()
  }
  render() {
    return <Routes />
  }
}