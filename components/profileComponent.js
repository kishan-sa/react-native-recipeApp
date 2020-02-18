import React, { Component } from 'react'
import { View, Button, Image, Text, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import * as Permission from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'

export default class ProfileComponent extends Component {
    state = { image: null }
    constructor() {
        super()
        Permission.askAsync(Permission.CAMERA)
        Permission.askAsync(Permission.CAMERA_ROLL)
    }
    render() {
        return <View style={{ flex: 1 }}>
            <LinearGradient colors={['rgba(252,182,107,1)', 'rgba(250,144,68,1)']} style={{ flex: 0.5, position: 'absolute', height: 500, width: '100%' }}>
                {this.state.image ?
                    <Image source={{ uri: this.state.image }} style={{ flex: 1 }} />
                    :
                    <View />
                }
            </LinearGradient>
            <View style={{ flex: 4 }}>
            </View>
            <View style={{ flex: 6, backgroundColor: 'white', borderTopEndRadius: 40, borderTopLeftRadius: 40, paddingHorizontal: 30 }}>
                <TouchableOpacity onPress={() => {

                }} style={{ width: '100%', borderRadius: 10, height: 50, backgroundColor: 'rgba(250,144,68,1)', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}><Text>CAMERA</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this._pickImage()
                }} style={{ width: '100%', borderRadius: 10, height: 50, backgroundColor: 'rgba(250,144,68,1)', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}><Text>Gallery</Text></TouchableOpacity>
            </View>
            <SafeAreaView style={{flex:1,position:'absolute'}}><TouchableOpacity style={{ marginLeft: 20 }} onPress={() => {
                this.props.navigation.pop()
            }}>
                <Image style={{ width: 30, height: 30, tintColor: 'white' }} source={require('../assets/back.png')} ></Image>
            </TouchableOpacity></SafeAreaView>

        </View>
    }


    onCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        } else {
            Alert.alert('Please select Image')
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        } else {
            Alert.alert('Please select Image')
        }
    }
}