import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './Styles'
import { useTranslation } from 'react-i18next'

const StorySection = ({
  storyResult,
  historyFontSize,
  historyFontFamily,
  changeFont,
  changeFontSize,
  dark
}: any) => {
  const { t } = useTranslation()

  return (
    <View style={[styles.story, { backgroundColor: dark ? "#fff" : "#000" }]}>

      <View style={{ width: '100%', justifyContent: 'space-around', flexDirection: 'row' }}>

        <View style={{ flexDirection: 'row', width: '50%', gap: 10, alignItems: 'center' }}>
          <Text style={{color: dark ? "#000" : "#fff" }}>{t("change_font")}</Text>
          <TouchableOpacity style={[styles.fontButton, { backgroundColor: dark ? "#000" : "#fff"} ]} onPress={() => changeFont('previous')}>
            <Text style={[styles.buttonText, { color: dark ? "#fff" : "#000" } ]}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.fontButton, { backgroundColor: dark ? "#000" : "#fff"} ]} onPress={() => changeFont('next')}>
            <Text style={[styles.buttonText, { color: dark ? "#fff" : "#000" } ]}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', width: '50%', justifyContent: 'flex-end', gap: 10, alignItems: 'center' }}>
          <Text style={{ color: dark ? "#000" : "#fff" }}>{t("size")}</Text>
          <TouchableOpacity style={[styles.fontButton, { backgroundColor: dark ? "#000" : "#fff"} ]} onPress={() => changeFontSize('increase')}>
            <Text style={[styles.buttonText, { color: dark ? "#fff" : "#000" } ]}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.fontButton, { backgroundColor: dark ? "#000" : "#fff" } ]} onPress={() => changeFontSize('decrease')}>
            <Text style={[styles.buttonText, { color: dark ? "#fff" : "#000" } ]}>-</Text>
          </TouchableOpacity>
        </View>

      </View>

      <Text
        style={{
          fontSize: historyFontSize,
          fontFamily: historyFontFamily || 'System',
          marginTop: 10,
          color: dark ? "#000" : "#fff"
        }}
      >
        {storyResult}
      </Text>

    </View>
  )
}

export default React.memo(StorySection)