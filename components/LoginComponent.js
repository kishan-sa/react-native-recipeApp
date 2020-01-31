import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default class LoginComponent extends Component {
    constructor() {
        super()
        this.state = { email: '', password: '' }
    }
    render() {
        return <View style={styles.container}>
            <View style={styles.firstContainer}>
                <Text style={styles.loginText}>LOGIN</Text>
            </View>
            <View style={styles.secondContainer}>
                <View style={styles.textFieldContainer}>
                    <TextInput
                        keyboardType='email-address'
                        placeholder="Email"
                        style={[styles.commoninput, styles.emailInput]}
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}>
                    </TextInput>
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Password"
                        style={[styles.commoninput, styles.passWordInput]}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}>
                    </TextInput>
                    <TouchableOpacity style={styles.touchOpacity} onPress={this.onLogin}>
                        <Text style={styles.buttonText}>login</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.thirdContainer}><Text>Forgot Password ?</Text></View>
        </View>
    }
    onLogin = () => {
        fetch('http://35.160.197.175:3006/api/v1/user/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': this.state.email,
                    'password': this.state.password
                })
            }).then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else {

                }
            }).then((responseJSON) => {
                Alert.alert('Success', 'Welcome! ' + responseJSON.firstName + ' ' + responseJSON.lastName, [
                    {
                        text: 'Okay',
                        style: 'cancel'
                    },
                    {
                        text: 'Cancel',
                        style: 'destructive'
                    },
                ])
            }
            )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 30
    },
    firstContainer: {
        flex: 3,
        top: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    thirdContainer: {
        flex: 4,
        alignItems: 'center',
    },
    textFieldContainer: {
        width: '100%',
        height: 180,
        alignItems: 'center'
    },
    commoninput: {
        backgroundColor: 'white',
        width: '80%',
        paddingLeft: 10,
        height: 50,
        top: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
    },
    emailInput: {

    },
    passWordInput: {
        top: 20
    },
    touchOpacity: {
        borderRadius: 50,
        top: 40,
        height: 50,
        width: '80%',
        backgroundColor: 'rgb(255, 74, 0)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});
