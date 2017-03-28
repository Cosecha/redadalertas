const languages = ['en', 'es', 'fr'];

let translations = {};

function getTranslations(language, directory, file) {
  return require('./translations/' + language + '/' + directory + '/' + file)[file];
}

languages.forEach(language => {
  translations[language] = {
    ...getTranslations(language, 'containers', 'app'),
    ...getTranslations(language, 'containers', 'dashboard'),
    ...getTranslations(language, 'containers', 'landing'),
    ...getTranslations(language, 'containers', 'report')
  };
});

export { translations };
