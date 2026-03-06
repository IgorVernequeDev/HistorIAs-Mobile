import React, { useMemo } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { Checkbox } from 'expo-checkbox'
import { styles, pickerSelectStyles } from './Styles'
import CharacterItem from './CharacterItem'
import { useTranslation } from "react-i18next";

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
    story,
    dark
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
        dark={dark}
      />
    )), [characters, dark]
  )


  const { t } = useTranslation();

  const GENRES = useMemo(() => [
    { label: t("romance"), value: 'Romance' },
    { label: t("science_fiction"), value: 'Ficção Científica' },
    { label: t("fantasy"), value: 'Fantasia' },
    { label: t("mystery"), value: 'Mistério' },
    { label: t("horror"), value: 'Terror' },
    { label: t("adventure"), value: 'Aventura' },
    { label: t("comedy"), value: 'Comédia' },
    { label: t("drama"), value: 'Drama' },
  ], [t])

  const DURATIONS = useMemo(() => [
    { label: t("very_short"), value: 'muito curta' },
    { label: t("short"), value: 'curta' },
    { label: t("medium"), value: 'médio' },
    { label: t("long"), value: 'longa' },
    { label: t("very_long"), value: 'muito longa' },
  ], [t])

  const DIALOGUES = useMemo(() => [
    { label: t("few"), value: 'Poucas' },
    { label: t("medium"), value: 'Médio' },
    { label: t("many"), value: 'Muitas' },
  ], [t])

  return (
    <View style={styles.container}>
      <View style={[styles.form, { backgroundColor: dark ? "#fff" : "#000" } ]}>

        <Text style={[styles.title, { color: dark ? "#000" : "#fff" } ]}>{t("customize_story")}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Text style={[styles.label, { color: dark ? "#000" : "#fff" } ]}>{t("genre")}:</Text>
          <RNPickerSelect
            onValueChange={(value) => {
              setGenre(value)
              changeBackground(value)
            }}
            items={GENRES}
            placeholder={{ label: t("select_genre"), value: null }}
            style={{
              ...pickerSelectStyles,
              inputIOS: {
                ...pickerSelectStyles.inputIOS,
                color: dark ? "black" : "white"
              },
              inputAndroid: {
                ...pickerSelectStyles.inputAndroid,
                color: dark ? "black" : "white"
              },
              placeholder: {
                color: dark ? "#aaa" : "#666"
              }
            }}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Text style={[styles.label, { color: dark ? "#000" : "#fff" } ]}>{t("duration")}:</Text>
          <RNPickerSelect
            onValueChange={setDuration}
            items={DURATIONS}
            placeholder={{ label: t("select_duration"), value: null }}
            style={{
              ...pickerSelectStyles,
              inputIOS: {
                ...pickerSelectStyles.inputIOS,
                color: dark ? "black" : "white"
              },

              inputAndroid: {
                ...pickerSelectStyles.inputAndroid,
                color: dark ? "black" : "white"
              },
              placeholder: {
                color: dark ? "#aaa" : "#666"
              }
            }}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10, marginTop: 5 }}>
          <Text style={[styles.label, { color: dark ? "#000" : "#fff" } ]}>{t("include_dialogues")}</Text>
          <Checkbox
            style={{ width: 22, height: 22 }}
            value={includeDialogues}
            onValueChange={setIncludeDialogues}
            color={dark ? "#000" : "#1000a0"}
          />
        </View>

        {includeDialogues && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.label, { color: dark ? "#000" : "#fff" } ]}>{t("dialogue_amount")}:</Text>
            <RNPickerSelect
              onValueChange={setDialogueCount}
              items={DIALOGUES}
              placeholder={{ label: t("select_amount_dialogue"), value: null }}
              style={{
                ...pickerSelectStyles,
                inputIOS: {
                  ...pickerSelectStyles.inputIOS,
                  color: dark ? "black" : "white"
                },

                inputAndroid: {
                  ...pickerSelectStyles.inputAndroid,
                  color: dark ? "black" : "white"
                },
                placeholder: {
                  color: dark ? "#aaa" : "#666"
                }
              }}
            />
          </View>
        )}

        {characterList}

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 10 }}>
          <Text style={[styles.label, { color: dark ? "#000" : "#fff" } ]}>{t("additional_info")}</Text>
          <Checkbox
            style={{ width: 22, height: 22 }}
            value={additionalDetails}
            onValueChange={setAdditionalDetails}
            color={dark ? "#000" : "#1000a0"}
          />
        </View>

        {additionalDetails && (
          <TextInput
            style={[styles.input, { color: dark ? "#000" : "#fff" }]}
            placeholder={t("additional_info")}
            placeholderTextColor={dark ? "#aaa" : "#666"}
            value={details}
            onChangeText={setDetails}
          />
        )}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
          <TouchableOpacity style={[styles.button, { backgroundColor: dark ? "#000" : "#fff" }]} onPress={addCharacter}>
            <Text style={[styles.buttonText, { color: dark ? "#fff" : "#000" } ]}>{t("add_character")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: dark ? "#000" : "#fff" }]} onPress={story}>
            <Text style={[styles.buttonText, { color: dark ? "#fff" : "#000" } ]}>{t("generate_story")}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default React.memo(FormSection)