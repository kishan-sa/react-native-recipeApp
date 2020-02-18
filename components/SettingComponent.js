import React, { Component } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
export default class SettingComponent extends Component {

    state = { token: '', data: [], isLoading: false, isRefreshing: false }

    render() {
        return <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView>
                <View style={{ top: 20, alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 40, left: 30 ,alignSelf:'flex-start'}} >Settings</Text>
                    <TouchableOpacity style={{ width: '90%', height: 60, backgroundColor: 'rgba(250,144,68,1)', marginVertical: 15, overflow: 'hidden', borderRadius: 10 }} onPress={() => {
                        this.props.navigation.push('Map')
                    }}>
                        <LinearGradient colors={['rgba(250,144,68,1)', 'rgba(252,182,107,1)']} start={[0, 0]} end={[1, 1]} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Map</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '90%', height: 60, backgroundColor: 'rgba(250,144,68,1)', marginVertical: 15, overflow: 'hidden', borderRadius: 10 }} onPress={() => {
                        this.props.navigation.push('Profile')
                    }}>
                        <LinearGradient colors={['rgba(69,141,198,1)', 'rgba(111,183,221,1)']} start={[0, 0]} end={[1, 1]} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Profile</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    }
}
