import polyglotI18nProvider from "ra-i18n-polyglot";
import en from "ra-language-english";
import sp from "@blackbox-vision/ra-language-spanish";

// Extiende los mensajes para inglés
const englishMessages = {
  ...en,
  "Note added successfully": "Note added successfully",
  "Note deleted": "Note deleted",
};

// Extiende los mensajes para español
const spanishMessages = {
  ...sp,
  "Note added successfully": "Nota añadida con éxito",
  "Note deleted": "Nota Eliminada",
};

const translations = {
  en: englishMessages,
  sp: spanishMessages,
};

export const i18nProvider = polyglotI18nProvider(
  (locale: string) => translations[locale],
  "sp", // default locale
  [
    { locale: "en", name: "English" },
    { locale: "sp", name: "Spanish" },
  ]
);
