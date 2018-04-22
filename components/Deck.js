import React, {Component} from 'react'
import DeckDetail from "./DeckDetail";
import {StyleSheet, Text, View,  TouchableOpacity} from 'react-native';

class Deck extends Component {

    render() {
        const {navigate} = this.props.navigation;
        return (
            <TouchableOpacity onPress={() => navigate('DeckDetail',
                {titulo: this.props.titulo})}>
                <View style={styles.conteudo}>
                    <Text style={styles.titulo}>{this.props.titulo}</Text>
                    <Text style={styles.corFonte}>{this.props.perguntas.length} cards</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default Deck

const styles = StyleSheet.create({
    titulo: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    corFonte: {
        color: 'blue',
        fontSize: 11
    },
    conteudo: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        borderTopWidth: 20,
        marginBottom:20,
        minWidth: '100%'
    },
});
