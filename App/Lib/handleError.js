import {Platform, ToastAndroid} from 'react-native'

export default function handleError (type) {
  let message = ''
  switch(type) {
    case 'CLIENT_ERROR': message = 'Sorry something went wrong'
      break
    case 'SERVER_ERROR': message = 'Error, server under maintenance'
      break
    case 'TIMEOUT_ERROR': message = 'Error, server didnt respond in time'
      break
    case 'CONNECTION_ERROR': message = 'Error, server not available, bad dns'
      break
    case 'NETWORK_ERROR': message = 'Error, network not available'
      break
    case 'CANCEL_ERROR': message = 'Error, request has been canceled'
      break
    default: 'Sorry something went wrong'
  }

  if (Platform.OS === 'android') ToastAndroid.show(message, ToastAndroid.SHORT)
}