import React, { Component } from 'react'
import { View, WebView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/NewsDetailScreenStyle'

class NewsDetailScreen extends Component {
  render () {
    const {params} = this.props.navigation.state
    return (
      <View style={styles.container}>
         <WebView
            source={{uri: params.url}}
            style={styles.container}
          />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetailScreen)
