import { AsyncStorage } from "react-native";

async function save(key, data) {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (err) {
    return err;
  }
}

async function retrieve(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (err) {
    return err;
  }
}

export default asyncStore = {
  save,
  retrieve
};
