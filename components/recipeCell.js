import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import placeholder from '../assets/placeholder.jpeg'

export default function RecipeCell(props) {
    return <View style={style.container}>
        <View style={style.imageContainer}>
            <Image
                style={style.recipeImage}
                source={props.recipe.photo ? { uri: props.recipe.photo } : placeholder}
            />
            <Text style={style.chefName} >{props.recipe.firstName} {props.recipe.lastName}</Text>
        </View>
        <View style={style.detailContainer}>
            <Text style={style.recipeName}>{props.recipe.name}</Text>
            <View style={style.serves}>
                <Text>{`serves : ${props.recipe.serves}`}</Text>
            </View>
            <View style={style.complexity}>
                <View style={style.complexityText}>
                    <Text>{props.recipe.complexity == '' ? 'Easy' : props.recipe.complexity}</Text>
                </View>
                <View style={style.timeText}><Text>{props.recipe.preparationTime}</Text></View>
            </View>
        </View>
    </View>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        height: 140,
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    complexity: {
        flex: 3,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    serves: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    imageContainer: {
        flex: 4,
        alignItems: 'center',
        paddingTop: 5
    },
    recipeImage: {
        width: 100,
        height: 100
    },
    detailContainer: {
        padding: 10,
        flex: 6,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    chefName: {
        paddingTop: 5,
        fontSize: 15
    },
    recipeName: {
        height: 30,
        fontWeight: 'bold',
        fontSize: 13
    },
    complexityText: {
        flex: 1,
        borderRightWidth: 0.5,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})