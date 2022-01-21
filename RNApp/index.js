/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import initializeApp from "./core/AppInitializer";

initializeApp();
AppRegistry.registerComponent(appName, () => App);
