import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { styles } from './Styles'
import { useTranslation } from "react-i18next";

const CharacterItem = ({ character, index, characters, setCharacters, removeCharacter, dark }: any) => {
  const { t } = useTranslation();
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
        <Text style={[styles.subtitle, { color: dark ? "#000" : "#fff" }]}>{t("character")} {index + 1}:</Text>
        <TouchableOpacity onPress={() => removeCharacter(character.id)}>
          <Image source={require('../../assets/img/trash.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: 'space-between' }}>
        <Text style={[styles.label, { color: dark ? "#000" : "#fff" }]}>{t("name")}:</Text>
        <TextInput
          style={[styles.input, { width: '100%', color: dark ? "#000" : "#fff" }]}
          placeholder={t("select_name")}
          placeholderTextColor={dark ? "#aaa" : "#666"}
          value={character.name}
          onChangeText={(text) => {
            const newCharacters = characters.map((c: any) =>
              c.id === character.id ? { ...c, name: text } : c
            )
            setCharacters(newCharacters)
          }}

        />
      </View>

      <View style={{ justifyContent: 'space-between', marginVertical: 5 }}>
        <Text style={[styles.label, { color: dark ? "#000" : "#fff" }]}>{t("personality")}:</Text>
        <TextInput
          style={[styles.input, { width: '100%', color: dark ? "#000" : "#fff" }]}
          placeholder={t("select_personality")}
          placeholderTextColor={dark ? "#aaa" : "#666"}
          value={character.personality}
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => {
            const newCharacters = characters.map((c: any) =>
              c.id === character.id ? { ...c, personality: text } : c
            )
            setCharacters(newCharacters)
          }}
        />
      </View>
    </View>
  )

}

export default React.memo(CharacterItem)