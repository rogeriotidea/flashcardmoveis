import React, {Component} from 'react'
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as Armazenamento from "../helpers/armazenamento";

class NewCard extends Component {

    static navigationOptions = ({navigation}) => {
        return {title: 'Add Card'}
    };
    state = {
        deck: "",
        pergunta: "",
        resposta: ""
    };

    componentDidMount = () => {
        const {params} = this.props.navigation.state;
        this.setState({ deck: params.title })
    };

    Gravar = () => {
        if (!this.state.pergunta || !this.state.resposta) {
            Alert.alert(
                "Erro", "Tem que preencher os 2 campos.",
                [{text: 'OK'}],
                {cancelable: false}
            )
        } else {
            const {navigate} = this.props.navigation;

            Armazenamento.addCardToDeck(
                {title: this.state.deck},
                {question: this.state.pergunta},
                {answer: this.state.resposta}
            ).then(() => {
                navigate('DeckDetail', {titulo: this.state.deck });
            })
        }
    };

    trocaTextoPergunta = (text) => {
        this.setState(state => {
            return {
            ...state,
            pergunta: text }
        })
    };

    trocaTextoResposta = (text) => {
        this.setState(state => {
            return {
                ...state,
                resposta: text
            }
        })
    };

    render() {
        return (
            <View style={styles.conteudo}>
                <View>
                    <TextInput style={styles.input} value={this.state.pergunta} onChangeText={this.trocaTextoPergunta} placeholder="Informe a pergunta"/>
                    <TextInput style={styles.input} value={this.state.resposta} onChangeText={this.trocaTextoResposta} numberOfLines={3} placeholder="Entre com a resposta" />

                </View>
                <View>
                    <TouchableOpacity style={styles.btnGravar} onPress={this.Gravar}><Text style={styles.btnGravarTxt}>GRAVAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default NewCard;

const styles = StyleSheet.create({
    conteudo: {
        flex: 1,
        padding:20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    input: {
        minWidth: '90%',
        padding: 20,
        margin: 10,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#000',
        fontSize: 18
    },
    checkboxInput: {
        textAlign: 'center',
        fontSize: 18,
        margin: 20
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
    btnGravarTxt: {
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        fontSize: 18
    }
});