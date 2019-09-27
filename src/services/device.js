import asyncStore from "utils/asyncstorage";

async function get() {
  let settings;
  try {
    settings = JSON.parse(await asyncStore.retrieve("device"));
    return settings;
  } catch (err) {
    console.log("device get error: ", err);
    return err;
  }
}

async function set(settings) {
  try {
    await asyncStore.save("device", JSON.stringify(settings));
    return settings;
  } catch (err) {
    console.log("device set error: ", err);
    return err;
  }
}

async function reset() {
  try {
    await asyncStore.remove("device");
    return true;
  } catch (err) {
    console.log("device reset error: ", err);
    return err;
  }
}

export default deviceServices = {
  get,
  set,
  reset
}
