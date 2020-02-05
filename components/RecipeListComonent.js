import React, { Component } from 'react'
import { Dimensions } from 'react-native';
import { View, Alert, Text, RefreshControl, FlatList, SafeAreaView , Button} from 'react-native'
import RecipeCell from './recipeCell'
import LoadingComponent from './LoadingComponent';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StackActions } from 'react-navigation';

export default class RecipeListComponent extends Component {

    state = { token: '', data: [], isLoading: true, isRefreshing: false }

    componentDidMount() {
        this.fetchRecipeData(this.props.navigation.state['params']['token'])
    }

    render() {
        return <View style={{ flex: 1 }}>

            <SafeAreaView>
                <View><Text style={{ fontWeight: 'bold', fontSize: 40, left: 30 }} >Recipe List</Text></View>

                <FlatList style={{ width: '100%', height: Dimensions.get('window').height * 0.58, }}
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
                            console.log(index);
                            // this.props.navigation.dispatch( this.pushAction );
                            this.props.navigation.push('Detail', { index: index, recipe: item })
                        }}></RecipeCell>
                    }
                ></FlatList>
                <Button title={'add'} onPress={() => {
                    console.log('in')
                    this.props.navigation.push('Add')
                }} ></Button>
            </SafeAreaView>
            <LoadingComponent isLoading={this.state.isLoading} ></LoadingComponent>
        </View>
    }

    fetchRecipeData(token) {
        this.setState({ data: [], isLoading: true });
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