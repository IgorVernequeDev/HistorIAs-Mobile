import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './Styles'

const StorySection = ({
  storyResult,
  historyFontSize,
  historyFontFamily,
  changeFont,
  changeFontSize
}: any) => {
  return (
    <View style={styles.story}>

      <View style={{ width: '100%', justifyContent: 'space-around', flexDirection: 'row' }}>

        <View style={{ flexDirection: 'row', width: '50%', gap: 10, alignItems: 'center' }}>
          <Text>Mudar fonte:</Text>
          <TouchableOpacity style={styles.fontButton} onPress={() => changeFont('previous')}>
            <Text style={styles.buttonText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fontButton} onPress={() => changeFont('next')}>
            <Text style={styles.buttonText}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', width: '50%', justifyContent: 'flex-end', gap: 10, alignItems: 'center' }}>
          <Text>Tamanho:</Text>
          <TouchableOpacity style={styles.fontButton} onPress={() => changeFontSize('increase')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fontButton} onPress={() => changeFontSize('decrease')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>

      </View>

      <Text
        style={{
          fontSize: historyFontSize,
          fontFamily: historyFontFamily || 'System',
          marginTop: 10
        }}
      >
        {storyResult}
      </Text>

    </View>
  )
}

export default React.memo(StorySection)