import { useState, useRef, useCallback } from 'react'
import { useFonts } from 'expo-font'
import { ScrollView } from 'react-native'
import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'

export const useStoryFunctions = () => {
  const [genre, setGenre] = useState("")
  const [details, setDetails] = useState("")
  const [additionalDetails, setAdditionalDetails] = useState(false)
  const [characters, setCharacters] = useState([
    { id: Date.now().toString(), name: "", personality: "" }
  ])
  const [duration, setDuration] = useState("")
  const [storyResult, setStoryResult] = useState("")
  const [backgroundImage, setBackgroundImage] = useState(require('../../assets/img/livros.png'))
  const [includeDialogues, setIncludeDialogues] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [visible, setVisible] = useState(true)
  const [loading, setLoading] = useState(false)
  const [historyFontSize, setHistoryFontSize] = useState(18)
  const [historyFontFamily, setHistoryFontFamily] = useState("")
  const [index, setIndex] = useState(0)
  const [dialogueCount, setDialogueCount] = useState("")
  const scrollRef = useRef<ScrollView>(null)

  const [loaded] = useFonts({
    MedievalSharp: require('../../assets/fonts/MedievalSharp-Book.ttf'),
    Caveat: require('../../assets/fonts/Caveat-VariableFont_wght.ttf'),
    KodeMono: require('../../assets/fonts/KodeMono-VariableFont_wght.ttf'),
    NothingYouCouldDo: require('../../assets/fonts/NothingYouCouldDo-Regular.ttf'),
    SpecialElite: require('../../assets/fonts/SpecialElite-Regular.ttf'),
    Determination: require('../../assets/fonts/determinationmonoweb-webfont.ttf'),
    PlayFair: require('../../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
    ComicSans: require('../../assets/fonts/comicsans.ttf')
  })

  const changeFontSize = useCallback((action: string) => {
    if (action === 'increase') {
      setHistoryFontSize(prev => Math.min(prev + 1, 30))
    } else {
      setHistoryFontSize(prev => Math.max(prev - 1, 12))
    }
  }, [])

  const changeFont = useCallback((action: string) => {
    const fonts = ['Caveat', 'MedievalSharp', 'KodeMono', 'NothingYouCouldDo', 'SpecialElite', 'Determination', 'PlayFair', 'ComicSans']
    let newIndex = index

    if (action === 'previous') {
      newIndex = index - 1 < 0 ? fonts.length - 1 : index - 1
    } else {
      newIndex = index + 1 >= fonts.length ? 0 : index + 1
    }

    setIndex(newIndex)
    setHistoryFontFamily(fonts[newIndex])
  }, [index])

  const changeBackground = useCallback((selectedGenre: string) => {
    const backgrounds: { [key: string]: any } = {
      'Terror': require('../../assets/img/terror.png'),
      'Romance': require('../../assets/img/romance.png'),
      'Ficção Científica': require('../../assets/img/cientifica.png'),
      'Fantasia': require('../../assets/img/fantasia.png'),
      'Mistério': require('../../assets/img/misterio.png'),
      'Aventura': require('../../assets/img/aventura.png'),
      'Comédia': require('../../assets/img/comedia.png'),
      'Drama': require('../../assets/img/drama.png'),
    }

    setBackgroundImage(backgrounds[selectedGenre] || require('../../assets/img/livros.png'))
  }, [])

  const removeCharacter = useCallback((id: string) => {
    if (characters.length === 1) {
      setErrorMessage("A história deve conter pelo menos um personagem.")
      return
    }
    setCharacters(prev => prev.filter(c => c.id !== id))
  }, [characters])

  const addCharacter = useCallback(() => {
    if (characters.length >= 10) {
      setErrorMessage("O número máximo de personagens é 10.")
      return
    }
    setCharacters(prev => [...prev, { id: Date.now().toString(), name: "", personality: "" }])
  }, [characters])

  const story = useCallback(async () => {
    scrollRef.current?.scrollToEnd({ animated: true })

    const invalidCharacter = characters.some(
      char => char.name.trim() === "" || char.personality.trim() === ""
    )

    if (!genre || !duration || invalidCharacter) {
      setVisible(true)
      scrollRef.current?.scrollTo({ y: 0, animated: true })
      setErrorMessage('Os campos gênero, duração e personagens devem ser preenchidos.')
      return
    }

    setVisible(false)
    setLoading(true)

    try {
      const response = await fetch("https://historias-mobile.onrender.com/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          genre,
          details,
          additionalDetails,
          characters,
          duration,
          includeDialogues,
          dialogueCount
        }),
      })

      const data = await response.json()
      setStoryResult(data.story)

      const fontByGenre: any = {
        'Romance': 'Caveat',
        'Ficção Científica': 'KodeMono',
        'Fantasia': 'Determination',
        'Mistério': 'SpecialElite',
        'Terror': 'NothingYouCouldDo',
        'Aventura': 'PlayFair',
        'Comédia': 'ComicSans',
        'Drama': 'MedievalSharp'
      }

      setHistoryFontFamily(fontByGenre[genre] || 'System')

    } catch {
      setErrorMessage("Erro ao gerar história.")
    } finally {
      setLoading(false)
    }
  }, [genre, duration, characters, details, additionalDetails, includeDialogues, dialogueCount])

  const saveStory = useCallback(async () => {
    if (!storyResult.trim()) {
      setErrorMessage("Não há história para salvar.")
      return
    }

    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body {
              font-family: '${historyFontFamily}', cursive;
              font-size: ${historyFontSize}px;
            }
          </style>
        </head>
        <body>
          ${storyResult}
        </body>
      </html>
    `

    const { uri } = await Print.printToFileAsync({ html })
    await Sharing.shareAsync(uri)
  }, [storyResult, historyFontFamily, historyFontSize])

  return {
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
    story,
    removeCharacter,
    changeBackground,
    addCharacter,
    scrollRef,
    changeFont,
    saveStory
  }
}