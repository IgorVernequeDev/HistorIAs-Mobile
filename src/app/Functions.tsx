import { useState } from 'react'
import { useFonts } from 'expo-font'
import * as FileSystem from 'expo-file-system'

export const useStoryFunctions = () => {
    const [genre, setGenre] = useState("")
    const [details, setDetails] = useState("")
    const [characters, setCharacters] = useState([{ name: "", personality: "" }])
    const [duration, setDuration] = useState("")
    const [storyResult, setStoryResult] = useState("")
    const [backgroundImage, setBackgroundImage] = useState(require('../../assets/img/livros.png'))
    const [isChecked, setChecked] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [visible, setVisible] = useState(true)
    const [loading, setLoading] = useState(false)
    const [historyFontSize, setHistoryFontSize] = useState(16)
    const [historyFontFamily, setHistoryFontFamily] = useState("")

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
        if (characters.length >= 5) {
            setErrorMessage("O número máximo de personagens é 5.")
            return
        }
        setCharacters([...characters, { name: "", personality: "" }])
    }

    const story = async () => {
        const algumPersonagemInvalido = characters.some(
            (char) => char.name.trim() === "" || char.personality.trim() === ""
        )

        if (genre == '' || genre == null || duration == '' || duration == null || algumPersonagemInvalido) {
            setVisible(true)
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
                        characters,
                        duration,
                        isChecked
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
        if (!storyResult) {
            setErrorMessage("Nenhuma história para salvar.")
            return
        }

        try {
            const permissions =
                await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

            if (!permissions.granted) {
                alert("Permissão negada.")
                return
            }

            const uri = await FileSystem.StorageAccessFramework.createFileAsync(
                permissions.directoryUri,
                `historia-${Date.now()}.txt`,
                "text/plain"
            )

            await FileSystem.StorageAccessFramework.writeAsStringAsync(
                uri,
                storyResult
            )

            alert("História salva com sucesso!")

        } catch (error) {
            console.error(error)
            setErrorMessage("Erro ao salvar a história.")
        }
    }

    return {
        genre, setGenre,
        details, setDetails,
        characters, setCharacters,
        duration, setDuration,
        storyResult, setStoryResult,
        backgroundImage, setBackgroundImage,
        isChecked, setChecked,
        errorMessage, setErrorMessage,
        visible, setVisible,
        loading, setLoading,
        historyFontSize,
        historyFontFamily,
        changeFontSize,
        loaded,
        story,
        saveStory,
        removeCharacter,
        changeBackground,
        addCharacter
    }
}