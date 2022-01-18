/**
 * Sample React Native App
 * @format
 * @flow strict-local
 */

import type { Node } from "react";
import React from "react";
import PushNotification from "react-native-push-notification";
import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native";
import SwitchButton from "./components/SwitchButton/SwitchButton";

const App: () => Node = () => {
  const isDarkMode = useColorScheme() !== "dark";
  const pressed = () => {
    console.log("pressed");
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: "laundry",
      title: "My Notification Title",
      message: "My Notification Message",
      actions: ["Yes", "No"],
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#757575" }}>
          DomoApp
        </Text>
        <Text style={{ color: "#bababa", marginTop: 12 }}>
          Fundamental app settings to configure
        </Text>
        <View style={styles.fixToText}>
          <WrapContainer>
            <SwitchButton
              text="Laundry"
              inactiveImageSource={require("./assets/laundry.png")}
              activeImageSource={require("./assets/laundry.png")}
              onPress={(isActive: boolean) => {
                console.log(isActive);
              }}
              style={styles.switchButton}
              textStyle={{
                fontWeight: "600",
              }}
            />
            <SwitchButton
              text="Valve"
              style={styles.switchButton}
              inactiveImageSource={require("./assets/valve.png")}
              activeImageSource={require("./assets/valve.png")}
              onPress={(isActive: boolean) => {
                console.log(isActive);
              }}
              mainColor="#2196f2"
              tintColor="#ee3322"
              textStyle={{
                fontWeight: "600",
              }}
            />
          </WrapContainer>
        </View>
        <Separator />
        <Button
          title="Go to Details Activity"
          onPress={() => {
            pressed();
          }}
          color={"#333"}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    marginTop: 32,
    flex: 1,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  switchButton: {
    marginHorizontal: 12,
    marginTop: 8,
  },
  wrapContainer: {
    justifyContent:"space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
});


const Separator = () => {
  return <View style={styles.separator} />;
};
const WrapContainer = (props) => (
  <View style={[styles.wrapContainer, props.style]}>
    {props.children}
  </View>
);
