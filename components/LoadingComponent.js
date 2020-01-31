import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

export default function LoadingComponent(props) {
    if (props.isLoading == true){
        return <View style = {{backgroundColor:'',flex:1,alignItems:'center',justifyContent:'center'}}>
            <ActivityIndicator size='large' color='red'></ActivityIndicator>
        </View>
    }else {
        return <View>

        </View>
    }
}