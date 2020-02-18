import LoginComponent from './components/LoginComponent'
import React from 'react'
import { Image } from 'react-native'

import CookingListComponent from './components/CookingListComponent'
import CookingDetailComponent from './components/CookingDetailComponent'
import AddRecipeComponent from './components/addcomponent'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import SettingComponent from './components/SettingComponent'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import mapComponent from './components/mapComponent'
import ProfileComponent from './components/profileComponent'

const tabbarNavigator = createBottomTabNavigator({
  List: {
    screen: CookingListComponent, navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./assets/cooking.png')}></Image>
      ),
      title: 'Cooking List'
    }
  },
  Setting: {
    screen: SettingComponent, navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./assets/settings.png')}></Image>
      ),
      title: 'Settings'
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: 'rgba(252,182,107,1)',
  }
})

const detailNavigation = createStackNavigator({
  tabbarNavigator,
  Detail: { screen: CookingDetailComponent, navigationOptions: { ...TransitionPresets.SlideFromRightIOS } },
  Add: { screen: AddRecipeComponent, navigationOptions: { ...TransitionPresets.ModalPresentationIOS } },
  Map: { screen: mapComponent },
  Profile: { screen : ProfileComponent }
}, {
  headerMode: "none"
});

const navigate = createSwitchNavigator(
  {
    Login: {
      screen: LoginComponent, navigationOptions: { headerShown: false }
    },
    detailNavigation
  }
)

const AppContainer = createAppContainer(navigate);

const initialState = { token: '' };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'Token':
      return { token: action.token }
    default: { token: state.token }
  }
  return { token: state.token }
}

const store = createStore(reducer)

export default function App() {
  return <Provider store={store}>
    <AppContainer />
  </Provider>
}
