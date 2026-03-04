import React from 'react'
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { styles } from './Styles'
import { useStoryFunctions } from './Functions'
import Header from './Header'
import FormSection from './FormSection'
import StorySection from './StorySection'

export default function App() {
  const {
    backgroundImage,
    visible,
    errorMessage,
    loading,
    storyResult,
    loaded,
    scrollRef,
    saveStory,
    ...props
  } = useStoryFunctions()

  if (!loaded) return null

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Header />

          {visible && errorMessage !== "" && (
            <View style={styles.error}>
              <Text style={{ color: 'white' }}>{errorMessage}</Text>
            </View>
          )}

          <FormSection {...props} />

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

          {!loading && storyResult !== "" && (
            <>
              <StorySection {...props} storyResult={storyResult} />
              <View style={styles.center}>
                <TouchableOpacity style={styles.button} onPress={saveStory}>
                  <Text style={styles.buttonText}>⬇️ Salvar História</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}