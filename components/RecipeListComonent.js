import React, { Component } from 'react'
import { View, Alert, Text ,RefreshControl, FlatList, SafeAreaView } from 'react-native'
import RecipeCell from './recipeCell'
import LoadingComponent from './LoadingComponent';

export default class RecipeListComponent extends Component {

    state = { token: '', data: [], isLoading: true, isRefreshing: false }

    constructor() {
        super()
        fetch('http://35.160.197.175:3006/api/v1/user/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': 'jm1@example.com',
                    'password': 'jay@123'
                })
            }).then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    Alert.alert('Fail', 'something went wrong', [
                        {
                            text: 'Okay',
                            style: 'cancel'
                        },
                        {
                            text: 'Cancel',
                            style: 'destructive'
                        },
                    ])
                }
            }).then((responseJSON) => {
                this.setState({
                    token: responseJSON.token
                })
                this.fetchRecipeData(responseJSON.token)
            })
    }

    render() {
        return <View style={{ flex: 1 }}>

            <SafeAreaView>
                <Text style={{fontWeight:'bold',fontSize:30,left:30}} >Recipe List</Text>
                <FlatList style={{ width: '100%' ,height:500}}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    refreshControl={
                        <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => {
                            this.fetchRecipeData(this.state.token);
                        }}></RefreshControl>
                    }
                    data={this.state.data}
                    
                    // numColumns={2}
                    keyExtractor={(r, i) => `${i}`}
                    renderItem={({item,index}) =>
                        <RecipeCell recipe={item} index={index} onClick={() => {
                            console.log(index);
                        }}></RecipeCell>
                    }
                ></FlatList>
            </SafeAreaView>
            <LoadingComponent isLoading={this.state.isLoading} ></LoadingComponent>
        </View>
    }

    fetchRecipeData(token) {
        this.setState({ isRefreshing: true, data: [], isLoading: true });
        fetch('http://35.160.197.175:3006/api/v1/recipe/cooking-list', {
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