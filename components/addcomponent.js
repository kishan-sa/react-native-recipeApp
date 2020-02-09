import React, { Component } from 'react';
import { View, Button } from 'react-native';

export default class AddRecipeComponent extends Component {
    render(){
        return <View style={{flex:1,backgroundColor:'red'}}>
            <Button onPress={() => {
                this.props.navigation.pop()
            }} title={'pop'}></Button>
        </View>
    }
}