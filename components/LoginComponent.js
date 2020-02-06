import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Alert, TextInput, TouchableOpacity } from 'react-native';
export default class LoginComponent extends Component {
    constructor() {
        super()
        this.state = { email: 'jm1@example.com', password: 'jay@123' }
    }
    render() {
        return <View style={{ flex: 1 }}>
            <Image
                style={styles.topImageContainer}
                source={require('../assets/background.jpg')} >
            </Image>
            <View style={{ flex: 4 }}></View>
            <View style={styles.bottomContainer}>
                <View style={styles.loginContainer}>
                    <Text style={styles.logintext}>LOGIN</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.textInputContainer} >
                        <Image style={styles.icon} source={require('../assets/user.png')} ></Image>
                        <TextInput
                            keyboardType='email-address'
                            placeholder="Email"
                            style={[styles.commoninput]}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}>
                        </TextInput>
                    </View>
                    <View style={styles.textInputContainer} >
                        <Image style={styles.icon} source={require('../assets/key.png')} ></Image>
                        <TextInput
                            secureTextEntry={true}
                            placeholder="Password"
                            style={[styles.commoninput]}
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}>
                        </TextInput>
                    </View>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', }}>
                        <Text style={styles.forgotText} >Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.loginButton} onPress={() => {
                        this.onLogin()
                    }}>
                        <Text style={{ fontSize: 25, color: 'white' }} >LOGIN</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', top: 10 }}>
                        <Text style={{ fontSize: 17 }}>You have an account? </Text>
                        <TouchableOpacity>
                            <Text style={{ color: 'rgba(250,144,68,1)', fontSize: 17 }}>signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
                        style: 'cancel',
                        onPress: () => {
                            this.props.navigation.navigate('List',{token:responseJSON.token});
                        }
                    },
                    {
                        text: 'Cancel',
                        style: 'destructive'
                    },
                ])
            })
    }
}


const styles = StyleSheet.create({
    commoninput: {
        alignSelf: 'center',
        flex: 1,
        backgroundColor: 'white',
        width: '80%',
        paddingLeft: 20,
        fontSize: 20
    },
    topImageContainer: {
        flex: 0.6,
        position: 'absolute',
        height: 500,
        width: '100%'
    },
    bottomContainer: {
        flex: 6,
        backgroundColor: 'white',
        borderTopEndRadius: 40,
        borderTopLeftRadius: 40,
        paddingHorizontal: 30,
        alignItems: 'center'
    },
    loginContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center'
    },
    logintext: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold'
    },
    textInputContainer: {
        height: 50,
        width: '100%',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    icon: {
        aspectRatio: 1,
        height: 30,
        width: 30,
        alignSelf: 'center',
        tintColor: 'rgba(250,144,68,1)'
    },
    loginButton: {
        backgroundColor: 'rgba(250,144,68,1)',
        height: 50,
        width: '80%',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotText: {
        top: 20,
        fontSize: 18
    },
    buttonContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center'
    }
});
