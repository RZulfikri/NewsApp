import React, { Component } from 'react'
import { View, WebView, ActivityIndicator, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import Placeholder from 'rn-placeholder'
import Icon from 'react-native-vector-icons/Octicons'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { Colors } from '../Themes';
import styles from './Styles/NewsDetailScreenStyle'

class NewsDetailScreen extends Component {

  /**
   * use to render loading webview
   */
  renderLoading () {
    return (
      <View style={[styles.mainContainer]}>
        <View style={{marginVertical: 10}}>
          <Placeholder.Box
            width="100%"
            animate="fade"
            height={50}
          />
        </View>

        <Placeholder.Box
          width="100%"
          animate="fade"
          height={200}
        />

        <View style={{marginVertical: 10}}>
          <Placeholder.Box
            width="100%"
            animate="fade"
            height={40}
          />
        </View>

        <Placeholder.Paragraph
          lineNumber={9}
          textSize={16}
          lineSpacing={5}
          width="100%"
          lastLineWidth="70%"
          firstLineWidth="100%"
          animate="fade"
        />

        <Placeholder.Paragraph
          lineNumber={15}
          textSize={16}
          lineSpacing={5}
          width="100%"
          lastLineWidth="50%"
          firstLineWidth="100%"
          animate="fade"
        />

        <Placeholder.Paragraph
          lineNumber={10}
          textSize={16}
          lineSpacing={5}
          width="100%"
          lastLineWidth="60%"
          firstLineWidth="100%"
          animate="fade"
        />
      </View>
    )
  }

  /**
   * use to render error webview
   */
  renderError () {
    return(
      <View style={[styles.mainContainer, {justifyContent: 'center', alignItems: 'center'}]}>
        <Icon
          name='alert'
          size={100}
        />
        <Text>Please check your internet connection</Text>
        <View style={{marginVertical: 10}}>
          <Button title={'Retry'} onPress={() => this.refs.webview.reload()} color={Colors.primary} />
        </View>
      </View>
    )
  }

  render () {
    const {params} = this.props.navigation.state
    return (
      <View style={{flex: 1}}>
         <WebView
            ref={'webview'}
            source={{uri: params.url}}
            style={{flex: 1}}
            renderLoading={() => this.renderLoading()}
            renderError={() => this.renderError()}
            startInLoadingState
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
