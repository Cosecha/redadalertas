// We're Inceptioning our way down our individual translation json objects
// to merge them into one big translation object composed of arbitrarily
// nested keys that each end in an array of translated strings.

function buildIndex([ ...langObjects ]) {

  let main = {};
  // main: the index object we're building with all the translations in it

  let parentNames = [];

  // Dive down into a langObject's keys until you find
  // a string value instead of another object
  function readKey(item, itemIndex, parent = null) {
    if (!item || typeof item !== 'object') return;
    Object.keys(item).forEach((key, index) => {
      parentNames.push(key);
      if (typeof item[key] === 'object') {
        readKey(item[key], itemIndex, key);
      } else if (typeof item[key] === 'string') {
        addToIndex(parentNames, item[key], itemIndex);
      }
      parentNames.pop();
    });
  }

  // addToIndex takes a list of keys that are basically nested matryoshka dolls
  // Inside the tiny last doll is a queue of localized strings
  // Our string param should be inserted into that queue
  // in the order indicated by what language it's for (langIndex)
  function addToIndex(parents = [], string = "", langIndex) {
    // parents: an array of object keys in the order they're nested
    // langIndex: what # in the array a given language's string should be
    // grandparent: a saved reference to the previous layer we've nested into,
    // which is in the main index object we're building

    // Set value of first key to a new object if it doesn't already exist:
    if (!main[parents[0]]) main[parents[0]] = {};
    // Set reference to original object at first key:
    let grandparent = main[parents[0]];
    parents.forEach((parent, parentIndex) => {
      if (parentIndex === parents.length - 1) {
        // If key is last one in parent key array, its value is the i18n array
        // So set its value in main object to an array if it doesn't already exist:
        if (!grandparent[parents[parentIndex]]) grandparent[parents[parentIndex]] = [];
        // Then insert string into the i18n array in the correct language order:
        grandparent[parents[parentIndex]][langIndex] = string;
      } else if (parentIndex !== 0) {
        // The key's value is another nested object
        // So in main object, set key value to a new object if it doesn't exist:
        if (!grandparent[parents[parentIndex]]) grandparent[parents[parentIndex]] = {};
        // Then set grandparent to refer to this value
        // because it's the object we need to access with the next key:
        grandparent = grandparent[parents[parentIndex]];
      }
    });
  }

  langObjects.forEach((langObject, index) => {
    parentNames = [];
    readKey(langObject, index);
  });
  return main;
}

const translations = buildIndex([
  // To add another translation file, require it here and add lang to config.js.
  // Make sure languages are required in the same order here as in config.js
  require("./en.json"),
  require("./es.json"),
]);

export default translations;
