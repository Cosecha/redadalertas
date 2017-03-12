const locales = ['en', 'es', 'fr'];

let translations = {};

function getTranslations(locale, directory, file) {
  return require('./translations/' + locale + '/' + directory + '/' + file)[file];
}

locales.forEach(locale => {
  translations[locale] = {
    ...getTranslations(locale, 'containers', 'app'),
    ...getTranslations(locale, 'containers', 'dashboard'),
    ...getTranslations(locale, 'containers', 'landing')
  };
});

export { translations };
