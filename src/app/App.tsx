import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';

export default function App() {
  const [loaded] = useFonts({
    MedievalSharp: require('../../assets/fonts/MedievalSharp-Book.ttf'),
  });

  if (!loaded) return null;

  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <>
      <View style={styles.container}>

        <View style={{ width: '25%' }}>
          <Image source={require('../../assets/img/logo.png')} style={{ width: 50, height: 50 }} />
        </View>
        <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontFamily: 'MedievalSharp', fontSize: 24 }}>HistorIA's</Text>
        </View>
      </View>

      <View style={styles.form}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedGenre(value)}
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
          placeholder={{ label: 'Selecione uma opção...', value: null }}
        />
        <Text style={{ marginTop: 20, fontSize: 18 }}>Gênero selecionado: {selectedGenre}</Text>
      </View>

      <ImageBackground
        source={require('../../assets/img/livros.png')}
        style={styles.background}
        resizeMode="cover"
      ></ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'black',
    width: '100%',
    padding: 20,
  },

  form: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
})