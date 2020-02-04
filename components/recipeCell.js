import React from 'react'
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet, Image, Button, TouchableWithoutFeedback} from 'react-native'
import placeholder from '../assets/placeholder.jpeg'
import { LinearGradient } from 'expo-linear-gradient';

export default function RecipeCell(props) {
    const colors1 = ['rgba(252,182,107,1)', 'rgba(250,144,68,1)']
    const colors2 = ['rgba(111,183,221,1)', 'rgba(69,141,198,193)']
    return <TouchableWithoutFeedback onPress={() => {props.onClick()}}>
    <View style={{
        margin: 10, width: Dimensions.get('window').width * 0.8, flexDirection: 'row', shadowColor: 'black',
        shadowOffset: { height: 10, width: 10 },
        elevation: 3,
        shadowRadius: 10,
        shadowOpacity: 0.5,
        backgroundColor: "#0000",
    }}>
        <LinearGradient colors={((props.index) % 2) == 1 ? colors2 : colors1} style={style.gradiantContainer}>
            <View style={{ top: 10, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 10, borderRadius: 10 }}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '400' }}>{props.recipe.firstName} {props.recipe.lastName}</Text>
            </View>
            <Text style={style.recipeName}>{props.recipe.name}</Text>
            <Text style={{top:35,color:'white',fontSize:20}}>Very Simple and tasty Excellent for lunch</Text>
            {/* <Text style={{ color: 'white', top: 40 }}>{props.recipe.complexity == '' ? 'Easy' : props.recipe.complexity}</Text>
            <Text style={{ color: 'white', top: 50 }} >{props.recipe.preparationTime}</Text>
            <Text style={{ color: 'white', top: 60 }}>{`serves : ${props.recipe.serves}`}</Text> */}
            <Image style={{height:30,width:30,bottom:20,left:20,position:'absolute',opacity: ((props.index) % 2) == 1 ? 0.5 : 1}} source={require('../assets/heart.png')}></Image>
        </LinearGradient>
        <View style={{ flex: 2 }}>
        </View>
        <View style={{
            shadowOffset: { height: 10, width: -20 },
            elevation: 3,
            shadowRadius: 15,
            overflow: 'visible',
            shadowOpacity: 0.6,
            backgroundColor: "#0000",
        }}>
            <Image style={style.recipeImage}
                source={props.recipe.photo ? { uri: props.recipe.photo } : placeholder} />
        </View>

    </View>
    </TouchableWithoutFeedback> 
}

const style = StyleSheet.create({
    gradiantContainer: {
        padding: 10,
        paddingLeft: 20,
        flex: 8,
        borderRadius: 30,
        height: Dimensions.get('window').height * 0.5,
        margin: 10,
        alignItems: 'flex-start',
    },
    container: {
        flex: 1,
        height: 140,
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'rgba(254, 147, 87,0.7)',
        borderColor: 'gray',
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
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
        paddingTop: 0,
        justifyContent: 'space-between',
    },
    recipeImage: {
        aspectRatio: 1,
        borderRadius: 100,
        height: 200,
        width: 200,
        position: 'absolute',
        bottom: 40,
        right: 0,
    },
    detailContainer: {
        padding: 10,
        flex: 6,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    chefName: {
        paddingTop: 5,
        fontSize: 15,
        color: 'white',
        position: 'relative'
    },
    recipeName: {
        top: 25,
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
    },
    complexityText: {
        flex: 1,
        borderRightWidth: 0.5,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})