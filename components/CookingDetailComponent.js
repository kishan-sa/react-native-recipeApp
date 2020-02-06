import React, { Component } from 'react';
import { View, Alert, Text, RefreshControl, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { color } from 'react-native-reanimated';

export default class CookingDetailComponent extends Component {

    colors1 = ['rgba(252,182,107,1)', 'rgba(250,144,68,1)']
    colors2 = ['rgba(111,183,221,1)', 'rgba(69,141,198,193)']

    static navigationOptions = {
        mode: 'modal'
    }

    state = { index: 0, recipe: {} }

    componentDidMount() {
        this.setState({ index: this.props.navigation.state['params']['index'], recipe: this.props.navigation.state['params']['recipe'] })
    }

    render() {
        return <View style={{ flex: 1 }}>
            <LinearGradient colors={this.state.index % 2 == 1 ? this.colors2 : this.colors1} style={{ flex: 0.5, position: 'absolute', height: 500, width: '100%' }}></LinearGradient>
            <View style={{ flex: 4, /*backgroundColor: 'red' */ }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, /*backgroundColor: 'white'*/ }}>
                        <View style={{ flex: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ marginLeft: 30 }} onPress={() => {
                                this.props.navigation.pop()
                            }}>
                                <Image style={{ width: 30, height: 30, tintColor: 'white' }} source={require('../assets/back.png')} ></Image>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={{ width: 25, height: 25, marginRight: 30 }} source={require('../assets/heart.png')}></Image>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flex: 85, alignSelf: 'center', justifyContent: 'center' /*backgroundColor: 'red'*/ }}>
                            <Image style={{ flex: 1, aspectRatio: 1, borderRadius: 500, bottom: 20 }}
                                source={{ uri: this.state.recipe.photo }}></Image>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
            <View style={{ flex: 6, backgroundColor: 'white', borderTopEndRadius: 40, borderTopLeftRadius: 40, paddingHorizontal: 30 }}>
                <Text style={{ fontSize: 30, top: 20, fontWeight: '600' }} >{this.state.recipe.name}</Text>
                <View style={{ height: 80, width: '100%', top: 30, flexDirection: 'row' }} >
                    <View style={{ flex: 1, backgroundColor: 'rgba(240,240,240,1)', margin: 5, borderRadius: 10, alignContent: 'center', paddingVertical: 10, justifyContent: 'space-evenly' }}>
                        <Text style={{ textAlign: 'center', color: 'gray' }}>Complexity</Text>
                        <Text style={{ textAlign: 'center', fontWeight: '500' }}>{this.state.recipe.complexity}</Text>
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
                <Text style={{ fontSize: 20, top: 40, fontWeight: '500' }} >About recipe</Text>
                <Text style={{ top: 50, fontWeight: '200', fontSize: 15 }} >{`One of the easiest eqations for a wholesome meal. \n\nAll the ingredients of classic greek salad join forces with baked salman fillets to make for a fresh dinner that's easy to love.`}</Text>
            </View>
        </View>
    }
}