import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Platform, StatusBar, Dimensions, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import placeholder from '../assets/place.png'
import { connect } from 'react-redux'
import SafeAreaView from 'react-native-safe-area-view';

class CookingDetailComponent extends Component {

    colors1 = ['rgba(252,182,107,1)', 'rgba(250,144,68,1)']
    colors2 = ['rgba(111,183,221,1)', 'rgba(69,141,198,193)']

    static navigationOptions = {
        mode: 'modal'
    }

    state = { index: 0, id: {}, recipe: null }

    componentDidMount() {
        this.setState({ index: this.props.navigation.state['params']['index'], id: this.props.navigation.state['params']['recipe'] })
        this.fetchCookingData()
    }

    render() {
        return <View style={{ flex: 1 }}>
            {this.state.recipe ? <View style={{ flex: 1 }}>
                <LinearGradient colors={this.state.index % 2 == 1 ? this.colors2 : this.colors1} style={{ position: 'absolute', height: '100%', width: '100%' }}></LinearGradient>
                <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <View style={{ height: Dimensions.get('window').height * 0.4 }}>
                            <SafeAreaView style={{ flex: 1 }}>
                                <View style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
                                    <View style={{ flex: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => {
                                            this.props.navigation.pop()
                                        }}>
                                            <Image style={{ width: 30, height: 30, tintColor: 'white' }} source={require('../assets/back.png')} ></Image>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Image style={{ width: 25, height: 25, marginRight: 20 }} source={require('../assets/heart.png')}></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 85, alignSelf: 'center', justifyContent: 'center' }}>
                                        <Image style={{ flex: 1, aspectRatio: 1, borderRadius: 500, bottom: 20 }}
                                            source={this.state.recipe.photo ? { uri: this.state.recipe.photo } : placeholder}></Image>
                                    </View>
                                </View>
                            </SafeAreaView>
                        </View>
                        <View style={{ height: '200%', backgroundColor: 'white', borderTopEndRadius: 40, borderTopLeftRadius: 40, paddingHorizontal: 30 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 30, marginTop: 20, fontWeight: '600' }} >{this.state.recipe.name}</Text>
                                <View style={{ height: 20, backgroundColor: 'rgba(255,0,0,0.2)', alignSelf: 'flex-end', paddingHorizontal: 10, borderRadius: 20, marginVertical: 5, marginLeft: 5 }}>
                                    <Text style={{ color: 'red' }}>{this.state.recipe.firstName} {this.state.recipe.lastName}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',width:'100%',flexWrap:'wrap'}}>{this.renderMetaTags()}</View>
                            <View style={{ height: 80, width: '100%', marginTop: 10, flexDirection: 'row' }} >
                                <View style={{ flex: 1, backgroundColor: 'rgba(240,240,240,1)', margin: 5, borderRadius: 10, alignContent: 'center', paddingVertical: 10, justifyContent: 'space-evenly' }}>
                                    <Text style={{ textAlign: 'center', color: 'gray' }}>Complexity</Text>
                                    <Text style={{ textAlign: 'center', fontWeight: '500' }}>{this.state.recipe.complexity ? this.state.recipe.complexity : 'Easy'}</Text>
                                </View>
                                <View style={{ flex: 1, backgroundColor: 'rgba(240,240,240,1)', margin: 5, borderRadius: 10, alignContent: 'center', paddingVertical: 10, justifyContent: 'space-evenly' }}>
                                    <Text style={{ textAlign: 'center', color: 'gray' }}>Time</Text>
                                    <Text style={{ textAlign: 'center', fontWeight: '500' }}>{this.state.recipe.preparationTime}</Text>
                                </View>
                                <View style={{ flex: 1, backgroundColor: 'rgba(240,240,240,1)', margin: 5, borderRadius: 10, alignContent: 'center', paddingVertical: 10, justifyContent: 'space-evenly' }}>
                                    <Text style={{ textAlign: 'center', color: 'gray' }}>Serves</Text>
                                    <Text style={{ textAlign: 'center', fontWeight: '500' }}>{this.state.recipe.serves}</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 10 }}>Ingredients</Text>
                            <View style={{ marginVertical: 5 }}>
                                {this.renderIngredients()}
                            </View>
                            <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 10 }}>Instructions</Text>
                            <View style={{ marginVertical: 5 }}>
                                {this.renderInstrucions()}
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View> : <View />}
        </View>
    }

    renderMetaTags() {
        const tags = [];
        this.state.recipe.metaTags.forEach(element => {
            tags.push(
                <View style={{ marginHorizontal: 5,backgroundColor:'rgba(250,144,68,0.3)',marginVertical:5,borderRadius:20}}>
                    <Text style={{ marginHorizontal:10,marginVertical:2 }}>{element.tag}</Text>
                </View>
            )
        })
        return tags
    }

    renderIngredients() {
        const ingredients = [];
        this.state.recipe.ingredients.forEach(element => {
            ingredients.push(
                <View style={{ width: '100%', marginVertical: 5, flexDirection: 'row' }}>
                    <Image style={{ height: 20, width: 20, tintColor: 'rgba(250,144,68,1)' }} source={require('../assets/ingredients.png')}></Image>
                    <Text style={{ marginLeft: 10 }}>{element.ingredient}</Text>
                </View>
            )
        })
        if (ingredients.length == 0){
            ingredients.push(
                <Text>No Ingredients available</Text>
            )
        }
        return ingredients
    }

    renderInstrucions() {
        const instructions = [];
        this.state.recipe.instructions.forEach(element => {
            instructions.push(
                <View style={{ width: '100%', marginVertical: 5, flexDirection: 'row' }}>
                    <Image style={{ height: 20, width: 20, tintColor: 'rgba(250,144,68,1)' }} source={require('../assets/spoon.png')}></Image>
                    <Text style={{ marginLeft: 10 }}>{element.instruction}</Text>
                </View>
            )
        })
        if (instructions.length == 0){
            instructions.push(
                <Text>No Instrucions available</Text>
            )
        }
        return instructions
    }

    fetchCookingData() {
        const recipeID = this.props.navigation.state['params']['recipe']
        this.setState({ data: [], isLoading: true });
        fetch('http://35.160.197.175:3006/api/v1/recipe/' + `${recipeID}` + '/details', {
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                console.log('error')
            }

        }).then((responseJSON) => {
            this.setState({
                recipe: {
                    name: responseJSON.name,
                    photo: responseJSON.photo,
                    preparationTime: responseJSON.preparationTime,
                    serves: responseJSON.serves,
                    complexity: responseJSON.complexity,
                    firstName: responseJSON.firstName,
                    lastName: responseJSON.lastName,
                    metaTags: responseJSON.metaTags,
                    ingredients: responseJSON.ingredients,
                    instructions: responseJSON.instructions
                }
            })
        })
    }
}


const mapStateToProps = (state) => {
    return { token: state.token }
}

export default connect(mapStateToProps)(CookingDetailComponent)