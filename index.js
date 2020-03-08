/** @format */

import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";

import {NativeModules} from 'react-native';

AppRegistry.registerComponent(appName, () => App);


function downloadCallback(success, dataString) {
	if (success) {
		console.log(dataString)
	} else {
		console.log("not success =(")
		console.log("this is probably an error message: " + dataString)
	}
}

var TorURLDownloaderX = NativeModules.TorURLDownloaderJSBridge
console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
console.log(NativeModules)
console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
TorURLDownloaderX.download('https://check.torproject.org', downloadCallback);
