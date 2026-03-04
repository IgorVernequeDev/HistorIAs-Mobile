import React, { useMemo } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { Checkbox } from 'expo-checkbox'
import { styles, pickerSelectStyles } from './Styles'
import CharacterItem from './CharacterItem'

const GENRES = [
  { label: 'Romance', value: 'Romance' },
  { label: 'Ficção Científica', value: 'Ficção Científica' },
  { label: 'Fantasia', value: 'Fantasia' },
  { label: 'Mistério', value: 'Mistério' },
  { label: 'Terror', value: 'Terror' },
  { label: 'Aventura', value: 'Aventura' },
  { label: 'Comédia', value: 'Comédia' },
  { label: 'Drama', value: 'Drama' },
]

const DURATIONS = [
  { label: 'Muito curta', value: 'muito curta' },
  { label: 'Curta', value: 'curta' },
  { label: 'Média', value: 'médio' },
  { label: 'Longa', value: 'longa' },
  { label: 'Muito longa', value: 'muito longa' },
]

const DIALOGUES = [
  { label: 'Poucas', value: 'Poucas' },
  { label: 'Médio', value: 'Médio' },
  { label: 'Muitas', value: 'Muitas' },
]

const FormSection = (props: any) => {
  const {
    setGenre,
    changeBackground,
    setDuration,
    includeDialogues,
    setIncludeDialogues,
    setDialogueCount,
    characters,
    setCharacters,
    removeCharacter,
    addCharacter,
    additionalDetails,
    setAdditionalDetails,
    details,
    setDetails,
    story
  } = props

  const characterList = useMemo(() =>
    characters.map((character: any, index: number) => (
      <CharacterItem
        key={character.id}
        character={character}
        index={index}
        characters={characters}
        setCharacters={setCharacters}
        removeCharacter={removeCharacter}
      />
    )), [characters]
  )

  return (
    <View style={styles.container}>
      <View style={styles.form}>

        <Text style={styles.title}>Personalize sua história</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Text style={styles.label}>Gênero:</Text>
          <RNPickerSelect
            onValueChange={(value) => {
              setGenre(value)
              changeBackground(value)
            }}
            items={GENRES}
            placeholder={{ label: 'Selecione um gênero...', value: null }}
            style={pickerSelectStyles}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Text style={styles.label}>Duração:</Text>
          <RNPickerSelect
            onValueChange={setDuration}
            items={DURATIONS}
            placeholder={{ label: 'Duração da história...', value: null }}
            style={pickerSelectStyles}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <Text style={styles.label}>Incluir falas?</Text>
          <Checkbox
            style={{ width: 22, height: 22 }}
            value={includeDialogues}
            onValueChange={setIncludeDialogues}
            color={includeDialogues ? 'black' : 'gray'}
          />
        </View>

        {includeDialogues && (
          <RNPickerSelect
            onValueChange={setDialogueCount}
            items={DIALOGUES}
            placeholder={{ label: 'Quantia de falas...', value: null }}
            style={pickerSelectStyles}
          />
        )}

        {characterList}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
          <TouchableOpacity style={styles.button} onPress={addCharacter}>
            <Text style={styles.buttonText}>Adicionar Personagem</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={story}>
            <Text style={styles.buttonText}>Gerar História</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 10 }}>
          <Text style={styles.label}>Adicionar informações?</Text>
          <Checkbox
            style={{ width: 22, height: 22 }}
            value={additionalDetails}
            onValueChange={setAdditionalDetails}
            color={additionalDetails ? 'black' : 'gray'}
          />
        </View>

        {additionalDetails && (
          <TextInput
            style={styles.input}
            placeholder="Informações adicionais..."
            value={details}
            onChangeText={setDetails}
          />
        )}

      </View>
    </View>
  )
}

export default React.memo(FormSection)