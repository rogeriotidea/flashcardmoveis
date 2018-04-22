import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Armazenamento from "../helpers/armazenamento";

class DeckDetail extends Component {

    static navigationOptions = ({navigation}) => {

        return {
            title: `${navigation.state.params.titulo}`
        }
    };

    state = {
        titulo: this.props.navigation.state.params.titulo,
        perguntas: []
    };

    componentDidMount() {
        Armazenamento.getDeck({deck: this.state.titulo}).then((deck) => {
           this.setState({
               titulo: deck.title,
               perguntas: deck.questions
           })
         })
    }

    render() {
             return (
            <View style={styles.conteudo}>
                <View>
                    <Text style={styles.titulo}>{this.state.titulo}</Text>
                    <Text>{this.state.perguntas.length} cards</Text>
                </View>

                <View>
                    <TouchableOpacity style={styles.addCardBtn} onPress={() => {
                        this.props.navigation.navigate('NewCard', {
                            title: this.state.titulo
                        });
                    }}>
                        <Text style={styles.addCardBtnTxt}>Adicionar</Text>
                    </TouchableOpacity>

                     <TouchableOpacity style={styles.iniciaQuizBtn} onPress={() => {
                         this.props.navigation.navigate('Quiz', {
                             title: this.state.titulo,
                             perguntas: this.state.perguntas,
                         });
                     }}>
                            <Text style={styles.iniciaQuizBtnTxt}>Começar o Quiz</Text>
                     </TouchableOpacity>
                </View>
            </View>
        )
    }
}


export default DeckDetail;


const styles = StyleSheet.create({
    conteudo: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        borderTopWidth: 40,
        borderBottomWidth: 40,
        minWidth: '100%',
        margin: 20
    },
    titulo: {
        fontSize: 36,
        fontWeight: 'bold'
    },
    addCardBtn: {
        padding: 20,
        marginTop: 20,
        backgroundColor: '#000',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        minWidth: '60%'

    },
    addCardBtnTxt:
    {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    iniciaQuizBtn: {
        padding: 20,
        marginTop: 20,
        backgroundColor: '#F00',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F00',
        minWidth: '60%'
    },
    iniciaQuizBtnTxt: {
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        fontSize: 18

    }
});
