import {
  StackNavigator,
} from 'react-navigation';

import HomeScreen from './screens/HomeScreen'
import Start from './screens/Start'

export default StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Start: {
    screen: Start,
  }
});