import { useState, useRef } from 'react'
import { useFonts } from 'expo-font'
import { ScrollView } from 'react-native'
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export const useStoryFunctions = () => {
    const [genre, setGenre] = useState("")
    const [details, setDetails] = useState("")
    const [additionalDetails, setAdditionalDetails] = useState(false)
    const [characters, setCharacters] = useState([{ name: "", personality: "" }])
    const [duration, setDuration] = useState("")
    const [storyResult, setStoryResult] = useState("")
    const [backgroundImage, setBackgroundImage] = useState(require('../../assets/img/livros.png'))
    const [includeDialogues, setIncludeDialogues] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [visible, setVisible] = useState(true)
    const [loading, setLoading] = useState(false)
    const [historyFontSize, setHistoryFontSize] = useState(18)
    const [historyFontFamily, setHistoryFontFamily] = useState("")
    const scrollRef = useRef<ScrollView>(null);
    const [index, setIndex] = useState(0)
    const [dialogueCount, setDialogueCount] = useState("")

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

    const changeFontSize = (action: string) => {
        if (action === 'increase') {
            setHistoryFontSize(prev => Math.min(prev + 1, 30))
        } else {
            setHistoryFontSize(prev => Math.max(prev - 1, 12))
        }
    }

    const changeFont = (action: string) => {
        const fonts = ['Caveat', 'MedialSharp', 'KodeMono', 'NothingYouCouldDo', 'SpecialElite', 'Determination', 'PlayFair', 'ComicSans']
        let newIndex = index

        if (action === 'previous') {
            newIndex = index - 1
            if (newIndex < 0) {
                newIndex = fonts.length - 1
            }
        } else {
            newIndex = index + 1
            if (newIndex >= fonts.length) {
                newIndex = 0
            }
        }

        setIndex(newIndex)
        setHistoryFontFamily(fonts[newIndex])
    }

    const changeBackground = (selectedGenre: string) => {
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
    }

    function removeCharacter(index: number) {
        const newCharacters = [...characters];
        if (newCharacters.length > 1) {
            newCharacters.splice(index, 1);
            setCharacters(newCharacters);
        }
        else {
            setErrorMessage("A história deve conter pelo menos um personagem.")
        }
    }

    function addCharacter(index: number) {
        if (characters.length >= 10) {
            scrollRef.current?.scrollTo({ y: 0, animated: true })
            setErrorMessage("O número máximo de personagens é 10.")
            return
        }
        setCharacters([...characters, { name: "", personality: "" }])
    }

    const story = async () => {
        scrollRef.current?.scrollToEnd({ animated: true })
        const algumPersonagemInvalido = characters.some(
            (char) => char.name.trim() === "" || char.personality.trim() === ""
        )

        if (genre == '' || genre == null || duration == '' || duration == null || algumPersonagemInvalido) {
            setVisible(true)
            scrollRef.current?.scrollTo({ y: 0, animated: true })
            setErrorMessage('Os campos gênero, duração e personagens devem ser preenchidos antes de criar a história!')
        }
        else {
            setVisible(false)
            try {
                setLoading(true)
                const response = await fetch("https://coletta-unworkable-goofily.ngrok-free.dev/story", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
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

                switch (genre) {
                    case 'Romance':
                        setHistoryFontFamily('Caveat')
                        break
                    case 'Ficção Científica':
                        setHistoryFontFamily('KodeMono')
                        break
                    case 'Fantasia':
                        setHistoryFontFamily('Determination')
                        break
                    case 'Mistério':
                        setHistoryFontFamily('SpecialElite')
                        break
                    case 'Terror':
                        setHistoryFontFamily('NothingYouCouldDo')
                        break
                    case 'Aventura':
                        setHistoryFontFamily('PlayFair')
                        break
                    case 'Comédia':
                        setHistoryFontFamily('ComicSans')
                        break
                    case 'Drama':
                        setHistoryFontFamily('MedievalSharp')
                }

                const data = await response.json()
                setStoryResult(data.story)

            } catch (error) {
                console.error(error)
                setErrorMessage("Erro ao gerar história.")
            }
            finally {
                setLoading(false)
            }
        }
    }

    const saveStory = async () => {
        try {
            if (!storyResult || storyResult.trim() === "") {
                setErrorMessage("Não há história para salvar.")
                return
            }
            console.log(historyFontFamily)
            console.log(historyFontSize)

            const html = `
        <html>
            <head>
                <meta charset="utf-8" />
                <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400;700&display=swap" rel="stylesheet">
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

            const { uri } = await Print.printToFileAsync({
                html,
            })

            await Sharing.shareAsync(uri)

            return uri

        } catch (error) {
            console.error("Erro ao gerar PDF:", error)
            setErrorMessage("Erro ao gerar PDF.")
        }
    }

    return {
        genre, setGenre,
        details, setDetails,
        additionalDetails, setAdditionalDetails,
        characters, setCharacters,
        duration, setDuration,
        storyResult, setStoryResult,
        backgroundImage, setBackgroundImage,
        includeDialogues, setIncludeDialogues,
        dialogueCount, setDialogueCount,
        errorMessage, setErrorMessage,
        visible, setVisible,
        loading, setLoading,
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