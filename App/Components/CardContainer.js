import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/CardContainerStyle'

const CardContainer = (props) => {
  return (
    <View style={[styles.container, {...props.style}]}>
      {props.children}
    </View>
  )
}

export default CardContainer