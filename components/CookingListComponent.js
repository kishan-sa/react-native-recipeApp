import React, { PureComponent } from 'react'
import { Dimensions } from 'react-native'
import { View, Text, RefreshControl, FlatList, SafeAreaView, Image, TextInput, TouchableOpacity, Platform, StatusBar } from 'react-native'
import RecipeCell from './recipeCell'
import LoadingComponent from './LoadingComponent'
import placeholder from '../assets/place.png'
import { connect } from 'react-redux'

class CookingListComponent extends PureComponent {

    image = <Image style={{ height: 12, width: 12, tintColor: 'rgba(255,255,255,0.8)', marginRight: 3 }} source={require('../assets/star.png')}></Image>

    state = {
        data: [], isLoading: true, isRefreshing: false, recipeData: [], token: ''
    }

    componentDidMount() {
        this.fetchCookingData(this.props.token)
        this.setState({ token: this.props.token })
    }

    render() {
        return <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView>
                <View style={{ height: 50, backgroundColor: 'rgba(240,240,240,1)', marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 0, width: '80%', left: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10 }}>
                    <Image style={{ width: 20, aspectRatio: 1, alignSelf: 'center', tintColor: 'gray' }} source={require('../assets/search.png')}></Image>
                    <View style={{ flex: 9 }}>
                        <TextInput
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
                <FlatList
                    initialNumToRender={5}
                    extraData={this.state}
                    refreshControl={
                        <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => {
                            this.setState({ isRefreshing: true })
                            this.fetchCookingData(this.state.token);
                        }}></RefreshControl>
                    }
                    refreshing={this.state.isRefreshing}
                    showsVerticalScrollIndicator={false}
                    style={{ top: 10 }}
                    data={this.state.recipeData}
                    keyExtractor={(r, i) => `${i}`}
                    renderItem={({ item, index }) => {
                        if (index == 0) {
                            return <View style={{ marginBottom: 30 }}>
                                <View style={{ top: 10, left: 0 }}><Text style={{ fontWeight: 'bold', fontSize: 40, left: 30 }} >Cooking List</Text></View>
                                <FlatList style={{ width: '100%', top: 10, height: Dimensions.get('window').height * 0.58 }}
                                    showsHorizontalScrollIndicator={false}
                                    initialNumToRender={3}
                                    horizontal={true}
                                    data={this.state.data}
                                    keyExtractor={(r, i) => `${i}`}
                                    renderItem={({ item, index }) =>
                                        <RecipeCell recipe={item} index={index} onClick={() => {
                                            this.props.navigation.push('Detail', { index: index, recipe: item.recipeId })
                                        }}></RecipeCell>
                                    }
                                ></FlatList>
                                <View style={{ top: 10, left: 0, flexDirection: "row", width: '100%' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 40, left: 30 }} >Recipe List</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.navigation.push('Add', { token: this.props.token })
                                        }}
                                        style={{ height: 40, backgroundColor: 'rgba(250,144,68,1)', right: 20, justifyContent: 'center', position: 'absolute', borderRadius: 30, paddingHorizontal: 10, top: 10 }}><Text style={{ color: 'white', fontWeight: 'bold' }}>Add more</Text></TouchableOpacity>
                                </View>
                            </View>
                        } else {
                            return <View style={{ height: 90, flexDirection: 'row', backgroundColor: index % 2 == 1 ? 'rgba(246,145,115,1)' : 'rgba(185,200,105,1)', marginHorizontal: 30, marginBottom: 20, borderRadius: 20 }}>
                                <View style={{ backgroundColor: 'rgba(255,255,2555,0.3)', width: 90, borderRadius: 20 }}>
                                    <Image style={{ margin: 10, flex: 1, borderRadius: 90, aspectRatio: 1 }} source={item.photo == null ? placeholder : { uri: item.photo }}></Image>
                                </View>
                                <View style={{ flex: 1, padding: 10 }}>
                                    <Text style={{ fontSize: 20, color: 'white' }}>{item.name}</Text>
                                    <View style={{ flexDirection: 'row', top: 5 }}>
                                        {this.image}
                                        {this.image}
                                        {this.image}
                                        {this.image}
                                        <Image style={{ height: 12, width: 12, tintColor: 'rgba(255,255,255,0.5)', marginRight: 3 }} source={require('../assets/star.png')}></Image>
                                        <Text style={{ fontSize: 11, color: 'white', top: 0 }}> 4/5</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.addToCookingList(item.recipeId)
                                        }}
                                        disabled={item.inCookingList == 1 ? true : false}
                                        style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', alignSelf: 'flex-end', right: 20, top: 35, borderRadius: 20 }}>
                                        <Image
                                            style={{ height: 20, width: 20, padding: 10, tintColor: item.inCookingList == 1 ? 'rgba(255,255,255,0.5)' : 'white' }}
                                            source={require('../assets/plus.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    }
                    }
                ></FlatList>
            </SafeAreaView>
            <LoadingComponent isLoading={this.state.isLoading} ></LoadingComponent>
        </View>
    }

    fetchCookingData(token) {
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
            this.fetchRecipeData(token)
        })
    }

    fetchRecipeData(token) {
        this.setState({ recipeData: [], isLoading: true });
        fetch('http://35.160.197.175:3006/api/v1/recipe/feeds', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            this.setState({ isLoading: false, isRefreshing: false })
            return response.json()
        }).then((responseJSON) => {
            this.setState({
                recipeData: [{}].concat(responseJSON.map(function (item) {
                    return {
                        recipeId: item.recipeId,
                        name: item.name,
                        photo: item.photo,
                        preparationTime: item.preparationTime,
                        serves: item.serves,
                        complexity: item.complexity,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        inCookingList: item.inCookingList
                    }
                }))
            })
        })
    }

    addToCookingList(id) {
        fetch('http://35.160.197.175:3006/api/v1/recipe/add-to-cooking-list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                recipeId: Number(id)
            })
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {

            }
        }).then((responseJSON) => {
            this.fetchCookingData(this.state.token)
        })
    }
}

const mapStateToProps = (state) => {
    return { token: state.token }
}

export default connect(mapStateToProps)(CookingListComponent)