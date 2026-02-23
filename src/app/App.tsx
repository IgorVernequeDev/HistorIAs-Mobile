import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';

export default function App() {

  const [genre, setGenre] = useState(null);
  const [details, setDetails] = useState("");
  const [characters, setCharacters] = useState("");
  const [personalities, setPersonalities] = useState("");
  const [storyResult, setStoryResult] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(require('../../assets/img/livros.png'));

  const changeBackground = (genre: string | number | null) => {
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

    setBackgroundImage(backgrounds[genre] || require('../../assets/img/livros.png'));
  };

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
          personalities,
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

            <View style={styles.row}>
              <Text style={styles.label}>Gênero:</Text>
              <RNPickerSelect
                onValueChange={(value) => setGenre(value)}
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

            <Text style={styles.subtitle}>
              Informações adicionais:
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Detalhes adicionais..."
              value={details}
              onChangeText={setDetails}
            />

            <Text style={styles.subtitle}>
              Personagem:
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do personagem..."
              value={characters}
              onChangeText={setCharacters}
            />

            <TextInput
              style={styles.input}
              placeholder="Personalidade..."
              value={personalities}
              onChangeText={setPersonalities}
            />

            <TouchableOpacity style={styles.button} onPress={() => {story()}} onPressIn={() => { changeBackground(genre); }}>
              <Text style={styles.buttonText}>Gerar História</Text>
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.container}>
        {storyResult !== "" && (
          <View style={styles.story}>
            <Text style={{ fontSize: 16 }}>{storyResult}</Text>
          </View>
        )}
      </View>

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },

  header: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'black',
    height: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },

  story: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },

  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    width: 300,
  },
  inputAndroid: {
    width: 200,
    fontSize: 16,
    color: 'black',
  },
});