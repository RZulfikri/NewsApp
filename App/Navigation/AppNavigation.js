import { StackNavigator } from 'react-navigation'
import NewsDetailScreen from '../Containers/NewsDetailScreen'
import MainScreen from '../Containers/MainScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import {Colors} from '../Themes'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  NewsDetailScreen: { screen: NewsDetailScreen },
  MainScreen: { screen: MainScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  // headerMode: 'none',
  initialRouteName: 'MainScreen',
  navigationOptions: {
    title: 'News App',
    headerStyle: styles.header,
    headerTintColor: Colors.primary,
    headerTitleStyle: {
      color: Colors.primary
    }
  }
})

export default PrimaryNav
