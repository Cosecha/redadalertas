import translations from "./";

const onMissingTranslation = ({ translationId, languageCode }) => {
  return `${languageCode.toUpperCase()} ${translationId}`;
}

export default translationsConfig = {
  languages: [ // determines the order of languages in array
    { name: "English", code: "en" },
    { name: "Español", code: "es" },
  ],
  translation: translations,
  options: {
    onMissingTranslation,
    defaultLanguage: "en",
    renderToStaticMarkup: false // React Native doesn't support this
  }
};
