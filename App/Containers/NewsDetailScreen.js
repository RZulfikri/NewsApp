import React, { Component } from 'react'
import { View, WebView, ActivityIndicator, Text } from 'react-native'
import { connect } from 'react-redux'
import Placeholder from 'rn-placeholder'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { Colors } from '../Themes';
import styles from './Styles/NewsDetailScreenStyle'

class NewsDetailScreen extends Component {

  renderLoading () {
    return (
      <View style={[styles.mainContainer, {paddingVertical: 10}]}>
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

  render () {
    const {params} = this.props.navigation.state
    return (
      <View style={{flex: 1}}>
         <WebView
            source={{uri: params.url}}
            style={{flex: 1}}
            renderLoading={() => this.renderLoading()}
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
