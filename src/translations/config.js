import translations from "./";

export default translationsConfig = {
  languages: [ // determines the order of languages in array
    { name: "English", code: "en" },
    { name: "Español", code: "es" },
    { name: "Français", code: "fr" }
  ],
  translation: translations,
  options: {
    defaultLanguage: "es",
    renderToStaticMarkup: false // React Native doesn't support this
  }
};
