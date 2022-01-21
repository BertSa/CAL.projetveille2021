/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import myFirebase from "./core/mFirebase";

myFirebase.initialize();
AppRegistry.registerComponent(appName, () => App);
