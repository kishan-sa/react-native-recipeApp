import LoginComponent from './components/LoginComponent';
import React, { Component } from 'react'
import { Image } from 'react-native';

import CookingListComponent from './components/CookingListComponent';
import CookingDetailComponent from './components/CookingDetailComponent';
import AddRecipeComponent from './components/addcomponent';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';
import RecipeListComponent from './components/RecipeListComponent';

const tabbarNavigator = createBottomTabNavigator({
  List: {
    screen: CookingListComponent, navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./assets/cooking.png')}></Image>
      ),
      title: 'Cooking List'
    }
  },
  RecipeList: {
    screen: RecipeListComponent, navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./assets/grid.png')}></Image>
      ),
      title: 'Recipe List'
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: 'rgba(252,182,107,1)',
  }
})

const detailNavigation = createStackNavigator({
  tabbarNavigator,
  Detail: { screen: CookingDetailComponent , navigationOptions:{ ...TransitionPresets.SlideFromRightIOS}},
  Add: { screen: AddRecipeComponent, navigationOptions: { ...TransitionPresets.ModalPresentationIOS } }
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

const App = createAppContainer(navigate);

export default App;