import LoginComponent from './components/LoginComponent';
import RecipeListComponent from './components/RecipeListComonent';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

const navigate = createSwitchNavigator({
  Login:{screen: LoginComponent },
  List:{screen: RecipeListComponent}
})

const App = createAppContainer(navigate);

export default App;