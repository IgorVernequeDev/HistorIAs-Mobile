import { Text, View, Image, ImageBackground, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { styles, pickerSelectStyles } from './Styles'
import { Checkbox } from 'expo-checkbox'
import { useStoryFunctions } from './Functions'
import RNPickerSelect from 'react-native-picker-select'
import { ActivityIndicator } from 'react-native'

export default function App() {
  const {
    genre, setGenre,
    details, setDetails,
    additionalDetails, setAdditionalDetails,
    characters, setCharacters,
    duration, setDuration,
    storyResult,
    backgroundImage,
    includeDialogues, setIncludeDialogues,
    dialogueCount, setDialogueCount,
    errorMessage,
    visible,
    loading,
    historyFontSize,
    historyFontFamily,
    changeFontSize,
    loaded,
    changeBackground,
    removeCharacter,
    addCharacter,
    story,
    scrollRef,
    changeFont,
    saveStory
  } = useStoryFunctions()

  if (!loaded) return null

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }}>

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

          {visible && errorMessage !== "" && (
            <View style={styles.error}>
              <Text style={{ color: 'white' }}>{errorMessage}</Text>
            </View>
          )}

          <View style={styles.container}>
            <View style={styles.form}>

              <Text style={styles.title}>
                Personalize sua história
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Text style={styles.label}>Gênero:</Text>
                <RNPickerSelect
                  onValueChange={(value) => {
                    setGenre(value)
                    changeBackground(value)
                  }}
                  items={[
                    { label: 'Romance', value: 'Romance' },
                    { label: 'Ficção Científica', value: 'Ficção Científica' },
                    { label: 'Fantasia', value: 'Fantasia' },
                    { label: 'Mistério', value: 'Mistério' },
                    { label: 'Terror', value: 'Terror' },
                    { label: 'Aventura', value: 'Aventura' },
                    { label: 'Comédia', value: 'Comédia' },
                    { label: 'Drama', value: 'Drama' },
                  ]}
                  placeholder={{ label: 'Selecione um gênero...', value: null }}
                  style={pickerSelectStyles}
                />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Text style={styles.label}>Duração:</Text>
                <RNPickerSelect
                  onValueChange={(value) => {
                    setDuration(value)
                  }}
                  items={[
                    { label: 'Muito curta', value: 'muito curta' },
                    { label: 'Curta', value: 'curta' },
                    { label: 'Média', value: 'médio' },
                    { label: 'Longa', value: 'longa' },
                    { label: 'Muito longa', value: 'muito longa' }
                  ]}
                  placeholder={{ label: 'Duração da história...', value: null }}
                  style={pickerSelectStyles}
                />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Text style={styles.label}>Incluir falas na história?</Text>
                <Checkbox
                  style={{ width: 22, height: 22 }}
                  value={includeDialogues}
                  onValueChange={setIncludeDialogues}
                  color={includeDialogues ? 'black' : 'gray'}
                />
              </View>,

              {includeDialogues == true && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Text style={styles.label}>Quantia de falas:</Text>
                  <RNPickerSelect
                    onValueChange={(value) => {
                      setDialogueCount(value)
                    }}
                    items={[
                      { label: 'Poucas', value: 'Poucas' },
                      { label: 'Médio', value: 'Médio' },
                      { label: 'Muitas', value: 'Muitas' }
                    ]}
                    placeholder={{ label: 'Quantia de falas...', value: null }}
                    style={pickerSelectStyles}
                  />
                </View>
              )}

              {characters.map((character, index) => (
                <View key={index}>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                    <Text style={styles.subtitle}>Personagem {index + 1}:</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => removeCharacter(index)}>
                        <Image source={require('../../assets/img/trash.png')} style={{ width: 25, height: 25 }} />
                      </TouchableOpacity>
                    </View>

                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column' }}>

                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 5 }}>
                        <Text>Personagem:</Text>
                        <TextInput
                          style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, width: '70%' }}
                          placeholder="Nome do personagem..."
                          value={character.name}
                          onChangeText={(text) => {
                            const newCharacters = [...characters]
                            newCharacters[index].name = text
                            setCharacters(newCharacters)
                          }}
                        />
                      </View>

                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 5, marginVertical: 5 }}>
                        <Text>Personalidade:</Text>
                        <TextInput
                          style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, width: '70%' }}
                          placeholder="Personalidade..."
                          value={character.personality}
                          onChangeText={(text) => {
                            const newCharacters = [...characters]
                            newCharacters[index].personality = text
                            setCharacters(newCharacters)
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              ))}

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 10 }}>
                <Text style={styles.label}>Adicionar informações adicionais?</Text>
                <Checkbox
                  style={{ width: 22, height: 22 }}
                  value={additionalDetails}
                  onValueChange={setAdditionalDetails}
                  color={additionalDetails ? 'black' : 'gray'}
                />
              </View>

              {additionalDetails == true && (
                <View>
                  <Text style={styles.subtitle}>Informações adicionais:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Informações adicionais..."
                    value={details}
                    onChangeText={setDetails}
                  />
                </View>
              )}

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                <TouchableOpacity style={styles.button} onPress={() => addCharacter(characters.length)}>
                  <Text style={styles.buttonText}>Adicionar Personagem</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={story}>
                  <Text style={styles.buttonText}>Gerar História</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>

          {loading && (
            <View>
              <ActivityIndicator size={70} color="#ffffff" />
              <View style={styles.center}>
                <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 5, alignItems: 'center' }}>
                  <Text>Gerando História...</Text>
                </View>
              </View>
            </View>
          )}

          {loading == false && (
            <View>
              {storyResult !== "" && (
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
                      <Text>Tamanho da fonte:</Text>

                      <TouchableOpacity style={styles.fontButton} onPress={() => changeFontSize('increase')}>
                        <Text style={styles.buttonText}>+</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.fontButton} onPress={() => changeFontSize('decrease')}>
                        <Text style={styles.buttonText}>-</Text>
                      </TouchableOpacity>

                    </View>
                  </View>

                  <Text style={{ fontSize: historyFontSize, fontFamily: historyFontFamily, marginTop: 10 }}>{storyResult}</Text>

                </View>
              )}
            </View>
          )}

          {loading == false && storyResult !== "" && (
            <View style={styles.center}>
              <TouchableOpacity style={styles.button} onPress={saveStory}>
                <Text style={styles.buttonText}>⬇️ Salvar História</Text>
              </TouchableOpacity>
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}