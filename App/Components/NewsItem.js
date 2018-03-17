import React, { Component } from 'react'
import Proptypes from 'prop-types';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import styles from './Styles/NewsItemStyle'
import CardContainer from './CardContainer'
import { Metrics, Colors } from '../Themes/'
import Icon from 'react-native-vector-icons/FontAwesome'

const {height, width} = Dimensions.get('window')

const noImage = 'http://noodleblvd.com/wp-content/uploads/2016/10/No-Image-Available.jpg'

const NewsItem = (props) => {
  return (
    <CardContainer style={{marginVertical: 10, width: width - (Metrics.baseMargin * 2), height: 200}} >
      <Image source={{uri: props.data.urlToImage || noImage}} style={{height: 150, width: width - (Metrics.baseMargin * 2)}} />
      <View style={styles.contentContainer}>
        <Text style={{flexWrap: 'wrap', flex: 1}} ellipsizeMode={'tail'} numberOfLines={2}>{props.data.title}</Text>
        <TouchableOpacity onPress={props.onPressLike}>
          <Icon
            name={props.isLike ? 'heart' : 'heart-o'}
            color={props.isLike ? Colors.love : Colors.steel}
            size={25}
          />
        </TouchableOpacity>
      </View>
    </CardContainer>
  )
}

NewsItem.defaultProps = {
  isLike: false,
  type: 'news'
}

NewsItem.propTypes = {
  isLike: Proptypes.bool,
  data: Proptypes.object,
  type: Proptypes.oneOf(['news', 'headlines'])
}

export default NewsItem
