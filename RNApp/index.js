/**
 * @format
 */

import { AppRegistry, LogBox } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import initializeApp from "./core/AppInitializer";
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
initializeApp();
AppRegistry.registerComponent(appName, () => App);
