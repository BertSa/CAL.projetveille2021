/**
 * Sample React Native App
 * @format
 * @flow strict-local
 */

import type { Node } from "react";
import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native";
import SwitchButton from "./components/SwitchButton/SwitchButton";
import PushNotification from "react-native-push-notification";

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: isDarkMode ? "#333" : "#EEE" }}>
      <StatusBar translucent={true} barStyle={isDarkMode ? "light-content" : "dark-content"}
                 backgroundColor={"#00000000"} />
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
              style={styles.switchButton}
              originalColor= {isDarkMode ? "#555555" : "#fff"}
              textStyle={{
                fontWeight: "600",
              }}
              onPress={(isActive: boolean) => {
                console.log(isActive);
              }}
            />
            <SwitchButton
              text="Valve"
              inactiveImageSource={require("./assets/valve.png")}
              activeImageSource={require("./assets/valve.png")}
              style={styles.switchButton}
              textStyle={{
                fontWeight: "600",
              }}
              mainColor="#2196f2"
              tintColor="#ee3322"
              originalColor={isDarkMode ? "#555555" : "#fff"}
              onPress={(isActive: boolean) => {
                console.log(isActive);
                PushNotification.localNotification({
                  channelId: "laundry",
                  title: "DomoApp",
                  message: "Valve is now " + (isActive ? "open" : "closed"),
                  playSound: true,
                  soundName: "default",
                  number: "1",
                });
              }}
            />
          </WrapContainer>
        </View>
        <Separator />
      </ScrollView>
    </SafeAreaView>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    marginTop: 32,
    flex: 1,
  },
  switchButton: {
    marginHorizontal: 12,
    marginTop: 8,
  },
  wrapContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
});


const Separator = () => {
  const isDarkMode = useColorScheme() === "dark";
  return <View style={{
    marginVertical: 8,
    borderBottomColor: isDarkMode ? "#EEE" : "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
  } />;
};
const WrapContainer = (props) => (
  <View style={[styles.wrapContainer, props.style]}>
    {props.children}
  </View>
);
