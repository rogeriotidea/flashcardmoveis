import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {setarNotificacao} from "./notifications/notification";
import Home from "./components/Home";

export default class App extends React.Component {

    componentDidMount(){
        setarNotificacao();
    }

    render() {
        return (
                <View style={estilo.container}>
                    <Home/>
                </View>
        );
    }
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
    },
});
