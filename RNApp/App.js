/**
 * Sample React Native App
 * @format
 * @flow strict-local
 */

import type { Node } from "react";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native";
import SwitchButton from "@freakycoder/react-native-switch-button";
import database from "@react-native-firebase/database";
import * as EnvironmentConstants from "./core/EnvironmentConstants";

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === "dark";
  const [isActiveLaundry, setIsActiveLaundry] = useState(false);
  const [isActiveValve, setIsActiveValve] = useState(false);
  const addListenerToDeviceStatus = (device: string, setter: (boolean)=>{}) => {
    database()
      .ref(`${EnvironmentConstants.DB_PATH_TO_DEVICE}/${device}/status`)
      .on("value",
        snapshot => {
          if (typeof snapshot.val() === "boolean") {
            setter(snapshot.val());
          }
        });
  };
  const handleIsActive = (device: string, isActive: boolean) => {
    database()
      .ref(`${EnvironmentConstants.DB_PATH_TO_DEVICE}/${device}/status`)
      .set(isActive)
      .then(() => {
        console.log(`Status updated for ${device}(${isActive})`);
      });
  };

  useEffect(() => {
    addListenerToDeviceStatus("laundry", setIsActiveLaundry);
    addListenerToDeviceStatus("valve", setIsActiveValve);
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
              inactiveImageSource={require(EnvironmentConstants.IMG_LAUNDRY)}
              activeImageSource={require(EnvironmentConstants.IMG_LAUNDRY)}
              style={styles.switchButton}
              textStyle={styles.textSwitchButton}
              originalColor={isDarkMode ? "#555555" : "#fff"}
              sameTextColor
              disabledOnClick
              onPress={(isActive: boolean) => handleIsActive("laundry", isActive)}
              onLongPress={() => console.log("Laundry Long Press")}
            />
            <SwitchButton
              text="Valve"
              isActive={isActiveValve}
              inactiveImageSource={require(EnvironmentConstants.IMG_VALVE)}
              activeImageSource={require(EnvironmentConstants.IMG_VALVE)}
              style={styles.switchButton}
              textStyle={styles.textSwitchButton}
              mainColor="#2196f2"
              tintColor="#ee3322"
              originalColor={isDarkMode ? "#555555" : "#fff"}
              sameTextColor
              handleChange={setIsActiveValve}
              onPress={(isActive: boolean) => handleIsActive("waterleak", isActive)}
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
  },
  textSwitchButton: {
    fontWeight: "600"
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
