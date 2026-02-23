import { Text, View, Image, ImageBackground, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { styles, pickerSelectStyles, htmlStyles } from './Styles'
import { useFonts } from 'expo-font';
import { Checkbox } from 'expo-checkbox';
import { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import Slider from '@react-native-community/slider';
import RenderHTML from 'react-native-render-html';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default function App() {
  const [genre, setGenre] = useState(null);
  const [details, setDetails] = useState("");
  const [characters, setCharacters] = useState([
    { name: "", personality: "" }
  ]);
  const [duration, setDuration] = useState(null);
  const [storyResult, setStoryResult] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(require('../../assets/img/livros.png'));
  const [isChecked, setChecked] = useState(false);
  const [temperature, setTemperature] = useState(1);
  const temperatureDisplay = temperature.toFixed(1);

  const changeBackground = (selectedGenre) => {
    const backgrounds = {
      'Terror': require('../../assets/img/terror.png'),
      'Romance': require('../../assets/img/romance.png'),
      'Ficção Científica': require('../../assets/img/cientifica.png'),
      'Fantasia': require('../../assets/img/fantasia.png'),
      'Mistério': require('../../assets/img/misterio.png'),
      'Aventura': require('../../assets/img/aventura.png'),
      'Comédia': require('../../assets/img/comedia.png'),
      'Drama': require('../../assets/img/drama.png'),
    };

    setBackgroundImage(backgrounds[selectedGenre] || require('../../assets/img/livros.png'));
  };

  function addCharacter(index) {
    if (characters.length >= 5) {
      setStoryResult("O número máximo de personagens é 5.");
      return;
    }
    setCharacters([...characters, { name: "", personality: "" }]);
  }

  function removeCharacter(index) {
    const newCharacters = [...characters];
    if (newCharacters.length > 1) {
      newCharacters.splice(index, 1);
      setCharacters(newCharacters);
    }
    else {
      setStoryResult("A história deve conter pelo menos um personagem.");
    }
  }

  const [loaded] = useFonts({
    MedievalSharp: require('../../assets/fonts/MedievalSharp-Book.ttf'),
  });

  if (!loaded) return null;

  const story = async () => {
    try {
      const response = await fetch("https://coletta-unworkable-goofily.ngrok-free.dev/story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genre,
          details,
          characters,
          duration,
          isChecked,
          temperature
        }),
      });

      const data = await response.json();
      setStoryResult(data.story);

    } catch (error) {
      console.error(error);
      setStoryResult("Erro ao gerar história.");
    }
  };

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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          <View style={styles.header}>
            <View style={{ width: '25%' }}>
              <Image source={require('../../assets/img/logo.png')} style={{ width: 50, height: 50 }} />
            </View>
            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontFamily: 'MedievalSharp', fontSize: 24 }}>
                HistorIA's
              </Text>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.form}>

              <Text style={styles.title}>
                Personalize sua história
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Text style={styles.label}>Gênero:</Text>
                <RNPickerSelect
                  onValueChange={(value) => {
                    setGenre(value);
                    changeBackground(value);
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
                    setDuration(value);
                  }}
                  items={[
                    { label: 'Curta', value: 'Curta' },
                    { label: 'Média', value: 'Média' },
                    { label: 'Longa', value: 'Longa' }
                  ]}
                  placeholder={{ label: 'Duração da história...', value: null }}
                  style={pickerSelectStyles}
                />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15, gap: 5 }}>
                <Text style={styles.label}>Incluir falas na história?</Text>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? 'black' : 'gray'}
                />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15, gap: 5 }}>
                <Slider
                  style={{ width: 200 }}
                  minimumValue={0}
                  maximumValue={2}
                  step={0.1}
                  value={temperature}
                  onValueChange={setTemperature}
                />
                <Text>Temperatura: {temperatureDisplay}</Text>
              </View>

              <Text style={{ textAlign: 'center' }}>A temperatura indica o grau de criatividade da história gerada. Valores mais altos geram histórias mais criativas e inesperadas.</Text>

              <Text style={styles.subtitle}>
                Informações adicionais:
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Detalhes adicionais..."
                value={details}
                onChangeText={setDetails}
              />

              {characters.map((character, index) => (
                <View key={index}>
                  <Text style={styles.subtitle}>
                    Personagem {index + 1}:
                  </Text>

                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{ display: 'flex', flexDirection: 'column', width: '90%' }}>
                      <TextInput
                        style={styles.input}
                        placeholder="Nome do personagem..."
                        value={character.name}
                        onChangeText={(text) => {
                          const newCharacters = [...characters];
                          newCharacters[index].name = text;
                          setCharacters(newCharacters);
                        }}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Personalidade..."
                        value={character.personality}
                        onChangeText={(text) => {
                          const newCharacters = [...characters];
                          newCharacters[index].personality = text;
                          setCharacters(newCharacters);
                        }}
                      />
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '15%' }}>
                      <TouchableOpacity onPress={() => removeCharacter(index)}>
                        <Image source={require('../../assets/img/trash.png')} style={{ width: 25, height: 25 }} />
                      </TouchableOpacity>
                    </View>

                  </View>

                </View>
              ))}

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

          <View style={styles.container}>
            {storyResult !== "" && (
              <View style={styles.story}>
                <RenderHTML
                  contentWidth={width}
                  source={{ html: storyResult }}
                  tagsStyles={htmlStyles}
                />
              </View>
            )}
          </View>

        </ScrollView>
      </KeyboardAvoidingView >

    </ImageBackground>
  );
}