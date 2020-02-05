import LoginComponent from './components/LoginComponent';
import RecipeListComponent from './components/RecipeListComonent';
import RecipeDetailComponent from './components/RecipeDetailComponent';
import AddRecipeComponent from './components/addcomponent';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';


const detailNavigation = createStackNavigator(
  {
    List: { screen: RecipeListComponent },
    Detail: { screen: RecipeDetailComponent },
    Add: { screen: AddRecipeComponent, navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS } }
  },
  {
    mode: 'card',
    defaultNavigationOptions: {
      headerShown: false
    },
  }
)

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