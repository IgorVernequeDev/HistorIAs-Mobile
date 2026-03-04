import React from 'react'
import { View, Text, Image } from 'react-native'
import { styles } from './Styles'

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={{ width: '25%' }}>
        <Image source={require('../../assets/img/logo.png')} style={{ width: 40, height: 40 }} />
      </View>
      <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontFamily: 'MedievalSharp', fontSize: 24 }}>
          HistorIA's
        </Text>
      </View>
    </View>
  )
}

export default React.memo(Header)