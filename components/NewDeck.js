import React, {Component} from 'react'
import {TextInput, TouchableOpacity, View, Alert, StyleSheet, Text} from 'react-native';
import * as Armazenamento from "../helpers/armazenamento";

class NewDeck extends Component {

    state = {
        titulo: ""
    };

    static navigationOptions = {
        title: 'New Deck'
    };

    onGravar = () => {
        if (!this.state.titulo) {
            Alert.alert(
                "Erro",
                "Titulo do Deck nao pode ser vazio",
                [{text: 'OK'}],{cancelable: false}
            )
        } else {
            const {navigate} = this.props.navigation;
            Armazenamento.saveDeckTitle({title: this.state.titulo}).then(() => {
                navigate('DeckDetail', {titulo: this.state.titulo, perguntas:[]});
                this.setState(state => {
                    return {
                        ...state,
                        titulo: ""
                    }
                })
            })
        }
    };

    onChangeTexto = (text) => {
        this.setState(state => {
            return {
                ...state,
                titulo: text
            }
        })
    };


    render() {
        return (
            <View style={styles.conteudo}>
                <View>
                    <Text style={styles.titulo}>
                       Qual eh o nome do seu deck?
                    </Text>
                    <TextInput style={styles.TextInput} value={this.state.titulo} onChangeText={this.onChangeTexto} placeholder="Entre o nome do seu deck"/>
                </View>
                <View>
                    <TouchableOpacity style={styles.btnGravar} onPress={this.onGravar}>
                        <Text style={styles.btnTexto}>GRAVAR</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}



export default NewDeck;


const styles = StyleSheet.create({
    conteudo: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff'
    },
    titulo: {
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    TextInput: {
        minWidth: '90%',
        padding: 20,
        margin: 10,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#000'
    },
    btnGravar: {
        padding: 20,
        margin: 5,
        backgroundColor: '#F00',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F00',
        minWidth: '60%'
    },
    btnTexto: {
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        fontSize: 18
    }
});
