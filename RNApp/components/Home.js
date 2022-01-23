import { ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import React, { useEffect, useState } from "react";
import SwitchButton from "@freakycoder/react-native-switch-button";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import * as EnvironmentConstants from "../core/EnvironmentConstants";
import CustomButton from "./CustomButton";

export default function Home(props) {
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
  useEffect(() => {
    addListenerToDeviceStatus("laundry", setIsActiveLaundry);
    addListenerToDeviceStatus("valve", setIsActiveValve);
  }, []);
  const handleIsActive = (device: string, isActive: boolean) => {
    database()
      .ref(`${EnvironmentConstants.DB_PATH_TO_DEVICE}/${device}/status`)
      .set(isActive)
      .then(() => {
        console.log(`Status updated for ${device}(${isActive})`);
      });
  };


  return <ScrollView
    contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: "#00000000" }}>
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
          inactiveImageSource={require("../assets/laundry.png")}
          activeImageSource={require("../assets/laundry.png")}
          style={styles.switchButton}
          textStyle={styles.textSwitchButton}
          mainColor="#7289DA"
          tintColor="#7289DA"
          originalColor={isDarkMode ? "#2C2F33" : "#fafafa"}
          sameTextColor
          disabledOnClick
          onPress={(isActive: boolean) => handleIsActive("laundry", isActive)}
          onLongPress={() => console.log("Laundry Long Press")}
        />
        <SwitchButton
          text="Valve"
          isActive={isActiveValve}
          inactiveImageSource={require("../assets/valve.png")}
          activeImageSource={require("../assets/valve.png")}
          style={styles.switchButton}
          textStyle={styles.textSwitchButton}
          mainColor="#7289DA"
          tintColor="#7289DA"
          originalColor={isDarkMode ? "#2C2F33" : "#fff"}
          sameTextColor
          handleChange={setIsActiveValve}
          onPress={(isActive: boolean) => handleIsActive("waterleak", isActive)}
        />
      </WrapContainer>
    </View>
    <Separator />
    <CustomButton onPress={() => {
      auth().signOut()
        .then(() => {
          console.log("Logged out");
          props.navigation.replace("Auth");
        });
    }
    } title="Logout" />
  </ScrollView>;
}
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 20
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
