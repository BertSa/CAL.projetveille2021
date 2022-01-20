/**
 * Sample React Native App
 * @format
 * @flow strict-local
 */

import type { Node } from "react";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native";
import SwitchButton from "@freakycoder/react-native-switch-button";
import database from "@react-native-firebase/database";

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === "dark";
  const [isActiveLaundry, setIsActiveLaundry] = React.useState(false);
  const [isActiveValve, setIsActiveValve] = React.useState(false);


  useEffect(() => {
    database()
      .ref(`/devices/laundry/status`)
      .on("value",
        snapshot => {
          setIsActiveLaundry(snapshot.val());
        });
    database()
      .ref(`/devices/waterleak/status`)
      .on("value",
        snapshot => {
          setIsActiveValve(snapshot.val());
        });
  }, []);
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
              isActive={isActiveLaundry}
              handleChange={setIsActiveLaundry}
              inactiveImageSource={require("./assets/laundry.png")}
              activeImageSource={require("./assets/laundry.png")}
              style={styles.switchButton}
              originalColor={isDarkMode ? "#555555" : "#fff"}
              sameTextColor
              textStyle={{
                fontWeight: "600"
              }}
              onPress={(isActive: boolean) => {
                database()
                  .ref(`/devices/laundry/status`)
                  .set(isActive)
                  .then(() => {
                    console.log("Status updated");
                  });
              }}
            />
            <SwitchButton
              isActive={isActiveValve}
              handleChange={setIsActiveValve}
              text="Valve"
              inactiveImageSource={require("./assets/valve.png")}
              activeImageSource={require("./assets/valve.png")}
              style={styles.switchButton}
              textStyle={{
                fontWeight: "600"
              }}
              mainColor="#2196f2"
              tintColor="#ee3322"
              originalColor={isDarkMode ? "#555555" : "#fff"}
              sameTextColor
              onPress={(isActive: boolean) => {
                database()
                  .ref(`/devices/waterleak/status`)
                  .set(isActive)
                  .then(() => {
                    console.log("Status updated");
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
    paddingHorizontal: 20
  },
  title: {
    textAlign: "center",
    marginVertical: 8
  },
  fixToText: {
    marginTop: 32,
    flex: 1
  },
  switchButton: {
    marginHorizontal: 12,
    marginTop: 8
  },
  wrapContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%"
  }
});


const Separator = () => {
  const isDarkMode = useColorScheme() === "dark";
  return <View style={{
    marginVertical: 8,
    borderBottomColor: isDarkMode ? "#EEE" : "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  }} />;
};
const WrapContainer = (props) => (
  <View style={[styles.wrapContainer, props.style]}>
    {props.children}
  </View>
);
