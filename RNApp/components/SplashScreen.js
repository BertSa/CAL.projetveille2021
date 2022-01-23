import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, useColorScheme, View } from "react-native";

import auth from "@react-native-firebase/auth";

const SplashScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === "dark";
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.replace(
        auth().currentUser === null ? "Auth" : "Home"
      );
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/notification.png")}
        style={{ width: "90%", resizeMode: "contain", margin: 30, tintColor: isDarkMode ? "#fff" : "#000" }}
      />
      <ActivityIndicator
        animating={animating}
        color={isDarkMode ? "#FFF" : "#000"}
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0)"
  },
  activityIndicator: {
    alignItems: "center",
    height: 80
  }
});
