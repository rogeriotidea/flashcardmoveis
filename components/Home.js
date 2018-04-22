import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import NewCard from "./NewCard";
import DeckList from './DeckList'
import DeckDetail from "./DeckDetail";
import NewDeck from "./NewDeck";
import QuizReview from "./QuizReview";
import Quiz from "./Quiz";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const TabNav = TabNavigator({
        Home: {
            screen: DeckList,
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: ({ tintColor }) => <Ionicons name="ios-albums" size={30} />
            },
        },
        NewDeck: {
            screen: NewDeck,
            navigationOptions: {
                tabBarLabel: 'New Deck',
                tabBarIcon: ({ tintColor }) => <Ionicons name="ios-add" size={30} />
            },
        }
    }
);

const StackNav = StackNavigator({
    Decks: {
        screen: TabNav,
    },
    DeckDetail: {
        screen: DeckDetail,
    },
    NewCard: {
        screen: NewCard,
    },
    Quiz: {
        screen: Quiz,
    },
    QuizReview: {
        screen: QuizReview,
    }
});

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StackNav />
            </View>
        )
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
    },
});