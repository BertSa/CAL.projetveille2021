/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import myFirebase from "./MyFirebase";
import myNotification from "./MyNotification";

myNotification.initialize();
myFirebase.initialize();
AppRegistry.registerComponent(appName, () => App);
