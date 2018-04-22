import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {NavigationActions} from 'react-navigation';

class QuizReview extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: `Resultado Quiz`
        }
    };

    state = {
        perguntas: []
    };

    componentDidMount() {
          this.setState({
               perguntas: this.props.navigation.state.params.perguntas
          })
    }
    scoreTotal = () => {

        let acertos = this.state.perguntas.filter(question => {
            if ((question.optionSelected === 'correto'))
                return true
        });

        let percAcerto = (acertos.length / this.state.perguntas.length) * 100;

        return {
            totalPerguntas: this.state.perguntas.length, totalIncorreto: (this.state.perguntas.length - acertos.length), totalCorreto: acertos.length, percAcerto: percAcerto
        }
    };

    render() {

        const score = this.scoreTotal();

        return (
            <View style={styles.conteudo}>
                <View>
                    <Text style={styles.texto}>
                        Total perguntas: {score.totalPerguntas}
                    </Text>
                    <Text style={styles.texto}>
                        Total Corretas: {score.totalCorreto}
                    </Text>
                    <Text style={styles.texto}>
                        Total Incorretas: {score.totalIncorreto}
                    </Text>
                    <Text style={styles.texto}>
                        Percuntual Acerto: {score.percAcerto} %
                    </Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.btnRestart} onPress={() => {
                        this.props.navigation.navigate('Quiz', {
                            title: this.state.titulo,
                            perguntas: this.state.perguntas,
                        });
                    }}>
                        <Text style={styles.btnRestartTxt}>
                            Reinicializar o Quiz
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnHome} onPress={() => {
                        this.props.navigation.navigate('Home');
                    }}>
                        <Text style={styles.btnHomeTxt}>
                            Voltar ao Inicio
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default QuizReview

const styles = StyleSheet.create({
    conteudo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        minWidth: '100%',
        borderColor: '#fff',
        borderTopWidth: 35,
        borderBottomWidth: 35,
    },
    texto: {
        fontSize: 25,
        fontWeight: 'bold',
        margin:10
    },
    btnRestart: {
        marginTop:30,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        minWidth: '80%',
        marginBottom: 30,
        backgroundColor: '#0a0'

    },
    btnRestartTxt: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 30,
        textAlign: 'center'
    },
    btnHome: {
        padding: 20,
        backgroundColor: '#000',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        minWidth: '80%'

    },
    btnHomeTxt: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#fff',
        textAlign: 'center'
    }
});
