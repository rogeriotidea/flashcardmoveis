import {AsyncStorage} from 'react-native'
import {DECKS} from "../helpers/const.js";

export function addCardToDeck({title}, {question}, {answer}) {

      return AsyncStorage.getItem(DECKS).then(decks => {

        decks = JSON.parse(decks);
        decks[title].questions.push({
            question: question,
            answer: answer,
            title: title
        });
        //console.log(decks[title]);
        return AsyncStorage.mergeItem(DECKS, JSON.stringify(decks));
    })
}

export function saveDeckTitle({title}) {

    let decks = {};
    decks[title] = {
        title: title,
        questions: [],
    };
    return AsyncStorage.mergeItem(DECKS, JSON.stringify(decks))
}

export function getDecks() {

    return AsyncStorage.getItem(DECKS).then(results => {
        return results === null ? dadosDefault() : JSON.parse(results)
    });

}

export function getDeck({deck}) {
    return AsyncStorage.getItem(DECKS).then(decks => {
        decks = JSON.parse(decks);
        return Promise.resolve(decks[deck]); })

}


let data = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces',
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event',
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer:
                    'The combination of a function and the lexical environment within which that function was declared.',
            }
        ]
    }
};

export function dadosDefault() {

    AsyncStorage.setItem(DECKS, JSON.stringify(data));
    return data;

}


