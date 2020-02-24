import React, { Component } from 'react'
import { View ,TouchableOpacity,Image} from 'react-native'
import MapView, { Marker, Polyline , PROVIDER_GOOGLE } from 'react-native-maps'
import * as Permission from 'expo-permissions'
import SafeAreaView from 'react-native-safe-area-view';

export default class mapComponent extends Component {
    constructor() {
        super()
        Permission.askAsync(Permission.LOCATION)
        navigator.geolocation.watchPosition(this.onSuccess, this.onError)
    }

    onSuccess = (position) => {
        console.log(position);
    }

    onError = (error) => {

    }

    render() {
         return <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }} forceInset={{bottom:'never'}} >
                <View style={{ height: 50, width: '100%' }}>
                <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => {
                                this.props.navigation.pop()
                            }}>
                                <Image style={{ width: 30, height: 30 }} source={require('../assets/back.png')} ></Image>
                            </TouchableOpacity>
                </View>
                <MapView
                provider={PROVIDER_GOOGLE}
                customMapStyle={require('./customMapStyle.json')}
                    showsMyLocationButton={true}
                    initialRegion={{
                        latitude: 23.025836,
                        longitude: 72.503349,
                        latitudeDelta: 0.004,
                        longitudeDelta: 0.004
                    }}
                    style={{ flex: 1 }}
                    showsUserLocation={true}
                    onRegionChange={this.onMapRegionChange}
                    onMarkerPress={this.onMapMarkerPressed}
                >

                    <Polyline
                        strokeWidth={5}
                        strokeColor='rgba(250,144,68,1)'
                        coordinates={
                            [
                                {
                                    latitude: 23.025734,
                                    longitude: 72.503349
                                },
                                {
                                    latitude: 23.025802,
                                    longitude: 72.502587
                                },
                                {
                                    latitude: 23.027712,
                                    longitude: 72.502839
                                },
                                {
                                    latitude: 23.027387,
                                    longitude: 72.507136
                                }
                            ]
                        }
                    >

                    </Polyline>

                    <Marker
                        coordinate={{ 
                            latitude: 23.025836,
                            longitude: 72.503349,
                        }}
                        title='Solution Analysts'
                        description='Analysing needs, delivering solutions'
                        identifier='1'
                    >

                    </Marker>
                </MapView>
            </SafeAreaView>
        </View>
    }

    onMapRegionChange = (region) => {
        // console.log(region);
    }

    onMapMarkerPressed = (marker) => {
        console.log(marker);
    }
}
