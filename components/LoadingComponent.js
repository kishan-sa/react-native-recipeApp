import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

export default function LoadingComponent(props) {
    if (props.isLoading == true) {
        return <View style={styles.container}>
            <ActivityIndicator size='large' color='red'></ActivityIndicator>
        </View>
    } else {
        return <View></View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})