import React, { Component } from 'react'
import { Dimensions } from 'react-native';
import { View, Text, RefreshControl, FlatList, SafeAreaView, Button, Image, TextInput ,TouchableOpacity} from 'react-native'
import RecipeCell from './recipeCell'
import LoadingComponent from './LoadingComponent';

export default class RecipeListComponent extends Component {

    state = { token: '', data: [], isLoading: false, isRefreshing: false }

    componentDidMount() {
        console.log(this.props.navigation)
        // this.fetchRecipeData(this.props)
    }

    render() {
        return <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView>
                <View style={{ top: 20 }}><Text style={{ fontWeight: 'bold', fontSize: 40, left: 30 }} >Cooking List</Text></View>
                <View style={{ height: 50, backgroundColor: 'rgba(240,240,240,1)', top: 30, width: '80%', left: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10 }}>
                    <Image style={{ width: 20, aspectRatio: 1, alignSelf: 'center', tintColor:'gray' }} source={require('../assets/search.png')}></Image>
                    <View style={{ flex: 9 }}>
                        <TextInput
                            keyboardType='email-address'
                            placeholder='Search your recipes here...'
                            style={{
                                alignSelf: 'center',
                                flex: 1,
                                width: '100%',
                                left: 10,
                                fontSize: 15
                            }}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}>
                        </TextInput>
                    </View>
                </View>

                <FlatList style={{ width: '100%', top: 30, height: Dimensions.get('window').height * 0.58, }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    refreshControl={
                        <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => {
                            this.setState({ isRefreshing: true })
                            this.fetchRecipeData(this.state.token);
                        }}></RefreshControl>
                    }
                    data={this.state.data}
                    keyExtractor={(r, i) => `${i}`}
                    renderItem={({ item, index }) =>
                        <RecipeCell recipe={item} index={index} onClick={() => {
                            this.props.navigation.push('Detail', { index: index, recipe: item })
                        }}></RecipeCell>
                    }
                ></FlatList>
                
            </SafeAreaView>
            <LoadingComponent isLoading={this.state.isLoading} ></LoadingComponent>
        </View>
    }

    fetchRecipeData(token) {
        this.setState({ data: [], isLoading: true });
        fetch('http://35.160.197.175:3006/api/v1/recipe/feeds', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            return response.json()
        }).then((responseJSON) => {
            this.setState({
                data: responseJSON.map(function (item) {
                    return {
                        recipeId: item.recipeId,
                        name: item.name,
                        photo: item.photo,
                        preparationTime: item.preparationTime,
                        serves: item.serves,
                        complexity: item.complexity,
                        firstName: item.firstName,
                        lastName: item.lastName,
                    }
                })
            })
            this.setState({ isLoading: false, isRefreshing: false })
        })
    }
}