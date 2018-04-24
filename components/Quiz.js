import React, {PureComponent} from 'react'
import FlipCard from "react-native-flip-card";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

class Quiz extends PureComponent {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Quiz'
        }
    };

    state = {
        deck: null,
        perguntas: null,
        index: 0,
        flip: false,
        terminado: false
    };

    componentDidMount() {
        const {params} = this.props.navigation.state;
        this.setState((prevState) => ({
            perguntas: params.perguntas,
            deck: params.titulo
        }));
    };

    componentWillUpdate(nextProps, nextState) {

        const {navigate} = nextProps.navigation;
        if (nextState.terminado) {
            navigate('QuizReview', {perguntas: nextState.perguntas, deck: nextState.deck});
        }

    }

    onFlip = () => {
        this.setState(state => ({
                ...state,
                flip: !this.state.flip } ))
    };

     onSetCorreta = () => {

        let perguntas = this.state.perguntas;
        perguntas[this.state.index].optionSelected = 'correto';

         this.setState((prevState) => {
            return {
                ...prevState, perguntas, flip: false,
                index: ((prevState.index + 1) === perguntas.length) ? prevState.index : (prevState.index + 1),
                terminado: ((prevState.index + 1) === perguntas.length)
            }
        });
    };

    onSetIncorreto = () => {
        let perguntas = this.state.perguntas;
        perguntas[this.state.index].optionSelected = 'incorreto';

        this.setState((prevState) => {
            return {
                ...prevState, perguntas, flip:false,
                index: ((prevState.index + 1) === perguntas.length) ? prevState.index : (prevState.index + 1),
                terminado: ((prevState.index + 1) === perguntas.length)
            }
        });
    };

    render() {
        return (
            <View style={styles.conteudo}>
                <View>
                    <FlipCard style={styles.flipCard} perspective={1000} clickable={false} flip={this.state.flip}>
                        <ScrollView>
                            <Text style={styles.pergunta}>
                                {this.state.perguntas && this.state.perguntas[this.state.index].question}
                            </Text>
                        </ScrollView>

                        <ScrollView>
                            <Text style={styles.resposta}>
                                {this.state.perguntas && this.state.perguntas[this.state.index].answer}
                            </Text>
                        </ScrollView>

                    </FlipCard>

                    <TouchableOpacity onPress={this.onFlip} style={styles.btnFlip}>
                        {
                            this.state.flip ? (<Text style={styles.btnFlipTxt}>Ver Pergunta</Text>
                            ) : (
                            <Text style={styles.btnFlipTxt}>Ver Resposta</Text>
                            )
                        }
                    </TouchableOpacity>
                </View>

                <View>
                    {this.state.perguntas && <Text style={{textAlign:'center'}}>Card: {this.state.index+1}/{this.state.perguntas.length}</Text>}
                    <TouchableOpacity style={styles.btnCorreto} onPress={this.onSetCorreta}>
                        <Text style={styles.btnCorretoTxt}>
                            Correta
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnIncorreto} onPress={this.onSetIncorreto}>
                        <Text style={styles.btnIncorretoTxt}>
                            Incorreta
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

export default Quiz

const styles = StyleSheet.create({
    conteudo: {
        flex: 1,
        backgroundColor: '#fff',
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderColor: '#fff',
        borderTopWidth: 20,
        borderBottomWidth: 20,

    },

    flipCard: {
        flex: 0.5,
        backgroundColor: '#fff',
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderColor: '#fff',
        borderTopWidth: 20,
        borderBottomWidth: 10,

    },
    pergunta: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    resposta: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnFlip: {
        padding: 20,
        marginTop: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        minWidth: '60%',
    },
    btnFlipTxt: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 25,
        textAlign: 'center'
    },
    btnCorreto: {
        padding: 20,
        marginTop: 20,
        backgroundColor: '#0a0',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        minWidth: '60%'
    },
    btnCorretoTxt: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 25,
        textAlign: 'center'
    },
    btnIncorreto: {
        padding: 20,
        marginTop: 20,
        backgroundColor: '#f00',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        minWidth: '60%'

    },
    btnIncorretoTxt: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 25,
        textAlign: 'center'
    },
    numeroQuestoes: {
        flex: 0.1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    }

});
