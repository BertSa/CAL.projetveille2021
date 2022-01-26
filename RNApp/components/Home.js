import { ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import React, { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { subscribeToTopic, unsubscribeToTopic } from "../core/EnvironmentConstants";
import CustomButton from "./CustomButton";
import DeviceButton from "./DeviceButton";

export default function Home(props) {
  useEffect(() => {
    if (auth().currentUser) {
      subscribeToTopic(auth().currentUser.uid);
    }
  }, []);

  return <ScrollView
    contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: "#00000000" }}>
    <Text style={{ fontSize: 32, fontWeight: "bold", color: "#757575" }}>
      DomoApp
    </Text>
    <Text style={{ color: "#bababa", marginTop: 12 }}>
      Hello {auth().currentUser.displayName}!
    </Text>
    <View style={styles.fixToText}>
      <WrapContainer>
        <DeviceButton deviceId="laundry" deviceName="laundry" disabledOnPress />
        <DeviceButton deviceId="waterleak" deviceName="valve" />
      </WrapContainer>
    </View>
    <Separator />
    <CustomButton onPress={() => {
      unsubscribeToTopic(auth().currentUser.uid);
      auth().signOut()
        .then(() => {
          console.log("Logged out");
          props.navigation.replace("Auth");
        });
    }
    } title="Logout" />
    <CustomButton
      onPress={() => {
        auth().currentUser.delete()
          .then(() => {
            console.log("User deleted");
            props.navigation.replace("Auth");
          }).catch(
          error => {
            console.log(error);
            if (error.code === "auth/requires-recent-login") {
              auth().signOut()
                .then(() => {
                  console.log("Logged out");
                  props.navigation.replace("Auth");
                });
            }
          }
        );
      }}
      title="DeleteAccount"
      color="#f44336"
    />
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
