import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { styles } from './Styles'

const CharacterItem = ({ character, index, characters, setCharacters, removeCharacter }: any) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
        <Text style={styles.subtitle}>Personagem {index + 1}:</Text>
        <TouchableOpacity onPress={() => removeCharacter(index)}>
          <Image source={require('../../assets/img/trash.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome..."
        value={character.name}
        onChangeText={(text) => {
          const newCharacters = characters.map((c: any) =>
            c.id === character.id ? { ...c, name: text } : c
          )
          setCharacters(newCharacters)
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Personalidade..."
        value={character.personality}
        onChangeText={(text) => {
          const newCharacters = characters.map((c: any) =>
            c.id === character.id ? { ...c, personality: text } : c
          )
          setCharacters(newCharacters)
        }}
      />
    </View>
  )
}

export default React.memo(CharacterItem)