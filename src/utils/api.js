import React from 'react';
import { AsyncStorage } from 'react-native';

const data = JSON.stringify(
  {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
    TypeScript: {
      title: 'TypeScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
)

export const getDecks = async () => {
  const response = await AsyncStorage.getItem('@flashcards:decks')
  .then(res => res
    ? JSON.parse(res)
    : AsyncStorage.setItem('@flashcards:decks', data )
  )
  return response;
}

export const getDeck = async (id) => {
  const response = await AsyncStorage.getItem('@flashcards:decks')
  .then(res => JSON.parse(res))
  return response[id];
}

export const saveDeckTitle = async (title) => {

  const newDeck = {
    [title]: {
      title,
      questions: []
    }
  }

  const decks = await AsyncStorage.getItem('@flashcards:decks')
    .then(res => JSON.parse(res))
    .then(res => Object.assign({}, res, newDeck))

  return await AsyncStorage.setItem('@flashcards:decks', JSON.stringify(decks))
}

export const addCardToDeck = async (title, card) => {

  const deck = await AsyncStorage.getItem('@flashcards:decks')
  .then(res => JSON.parse(res)[title])

    const questions = deck.questions.concat(card)
    const newQuestion = {
      [title]: {
        title,
        questions
      }
    }

  const decks = await AsyncStorage.getItem('@flashcards:decks')
    .then(res => JSON.parse(res))
    .then(res => Object.assign({}, res, newQuestion))

    return await AsyncStorage.setItem('@flashcards:decks', JSON.stringify(decks))

}