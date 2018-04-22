import React, {Component} from 'react'
import {FlatList, StyleSheet, View} from 'react-native';
import * as Armazenamento from "../helpers/armazenamento";
import Deck from "./Deck";

class DeckList extends Component {

    static navigationOptions = {
        title: 'Decks'
    };

    state = {
        decks: []
    };

    componentDidMount() {
        Armazenamento.getDecks().then((decks) => this.setState({ decks }));
    }

     renderLineSeparator = () => {
        return (
            <View style={{ height: 10,  backgroundColor: "#F0F0F0" }} />
        );
    };

    renderItemDeck = ({item}) => {
        return <Deck titulo={item.title} perguntas={item.questions} id={item.title} navigation={this.props.navigation}/>
    };

    render() {
        return (
            <View style={styles.conteudo}>
                <FlatList style={styles.lista} data={Object.values(this.state.decks)}
                          renderItem={this.renderItemDeck}
                          ItemSeparatorComponent={this.renderLineSeparator}
                          keyExtractor={(item, index) => index} />
            </View>
        )
    }
}


export default DeckList;

const styles = StyleSheet.create({
    conteudo: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    lista: {
        flex: 1
    }
});