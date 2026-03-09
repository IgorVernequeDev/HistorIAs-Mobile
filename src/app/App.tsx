import React from 'react'
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View, ActivityIndicator, Text, TouchableOpacity, Image, Pressable } from 'react-native'
import { styles } from './Styles'
import { useStoryFunctions } from './Functions'
import FormSection from './FormSection'
import StorySection from './StorySection'
import { Animated } from "react-native"
import "../../i18n";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

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
    shakeAnim,
    changeLanguage,
    languageButtonsVisibility, setLanguageButtonsVisibility,
    dark, setDark,
    resetForm,
    ...props
  } = useStoryFunctions()

  const { t, i18n } = useTranslation();

  const changeToPT = () => {
    resetForm()
    i18n.changeLanguage("Portugues_Brasil")
    setLanguageButtonsVisibility(false)
  }

  const changeToEN = () => {
    resetForm()
    i18n.changeLanguage("English")
    setLanguageButtonsVisibility(false)
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

          <View style={styles.header}>
            <View style={{ width: '25%' }}>
              <Image source={require('../../assets/img/logo.png')} style={{ width: 40, height: 40 }} />
            </View>
            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 24 }}>
                HistorIA's
              </Text>
            </View>
          </View>

          {visible && errorMessage !== "" && (
            <Animated.View style={[styles.error, { transform: [{ translateX: shakeAnim }] }]}>
              <Text style={{ color: 'white' }}>{errorMessage}</Text>
            </Animated.View>
          )}

          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' }}>

            <View style={styles.button}>
              <TouchableOpacity onPress={changeLanguage}>
                <Image source={require('../../assets/img/language.png')} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
            </View>

            <View style={{ borderRadius: 5, backgroundColor: dark ? "#000" : "#fff", padding: 5 }}>
              <Pressable onPress={() => setDark(!dark)}>
                <Ionicons
                  name={dark ? "moon" : "sunny"}
                  size={40}
                  color={dark ? "white" : "black"}
                />
              </Pressable>
            </View>

          </View>

          {languageButtonsVisibility === true && (
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>

              <TouchableOpacity style={styles.button} onPress={changeToPT}>
                <Text style={styles.buttonText}>PT-BR</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={changeToEN}>
                <Text style={styles.buttonText}>English</Text>
              </TouchableOpacity>

            </View>
          )}

          <FormSection {...props} dark={dark} />

          {loading && (
            <View>
              <ActivityIndicator size={70} color={dark ? "#000" : "#fff"} />
              <View style={styles.center}>
                <View style={{ padding: 10, borderRadius: 5, alignItems: 'center', backgroundColor: dark ? "#fff" : "#000" }}>
                  <Text style={{ color: dark ? "#000" : "#fff" }}>{t("generating_story")}</Text>
                </View>
              </View>
            </View>
          )}

          {!loading && storyResult !== "" && (
            <>
              <StorySection {...props} dark={dark} storyResult={storyResult} />
              <View style={styles.center}>
                <TouchableOpacity style={styles.button} onPress={saveStory}>
                  <Text style={styles.buttonText}>{t("save_story")}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}