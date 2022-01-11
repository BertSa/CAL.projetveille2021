/**
 * Sample React Native App
 * @format
 * @flow strict-local
 */

import type { Node } from "react";
import React from "react";
import PushNotification, { Importance } from "react-native-push-notification";
import { AppRegistry, Button, SafeAreaView, ScrollView, ToastAndroid, useColorScheme, View } from "react-native";

import { Colors, DebugInstructions, ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import { Section } from "./Section";

const App: () => Node = () => {
  const isDarkMode = useColorScheme() !== "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const pressed = () => {
    console.log("pressed");
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: "default-channel-id", // (optional) Create the channel in user's device
      title: "My Notification Title",
      message: "My Notification Message",
      actions: ["Yes", "No"],
    });
    ToastAndroid.show("Toast", ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {/*<StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />*/}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/*<Header />*/}
        <Button
          title="Go to Details Activity"
          onPress={() => {
            pressed();
          }}
          color={"#333"}
        />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step Oned">Edite your edits.</Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default App;
