import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import Portugues_Brasil from "./locales/Portugues_Brasil.json";
import English from "./locales/English.json";

const locale = Localization.getLocales()[0]?.languageCode || "English";

const resources = {
  Portugues_Brasil: { translation: Portugues_Brasil },
  English: { translation: English }
};

i18n.use(initReactI18next).init({
  resources,
  lng: locale,
  fallbackLng: "English",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;