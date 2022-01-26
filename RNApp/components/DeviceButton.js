import React, { useEffect, useState } from "react";
import database from "@react-native-firebase/database";
import * as EnvironmentConstants from "../core/EnvironmentConstants";
import { subscribeToTopic, unsubscribeToTopic } from "../core/EnvironmentConstants";
import { StyleSheet, useColorScheme } from "react-native";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import SwitchButton from "@freakycoder/react-native-switch-button/lib/SwitchButton";

interface IDeviceButtonProps {
  deviceId: string;
  deviceName: string,
  disabledOnPress?: boolean,
  color?: string,
}

interface IDeviceProps {
  name?: string,
  imageSrc?: string,
  topic?: string,
}

export default function DeviceButton(props: IDeviceButtonProps) {
  const isDarkMode = useColorScheme() === "dark";
  const [isLoading, setIsLoading] = useState(true);

  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const [imageUri, setImageUri] = useState("../assets/notification.png");

  useEffect(() => {
    let topic = "default";
    if (auth().currentUser) {
      database()
        .ref(`${EnvironmentConstants.DB_PATH_TO_DEVICE}/${props.deviceId}`)
        .once("value", (snapshot) => {
          let val: IDeviceProps | any = snapshot.val();
          if (val) {
            setName(val?.name);
            topic = val?.topic;
            subscribeToTopic(val?.topic);
            if (val?.imageSrc) {
              storage().ref(`/images/${val?.imageSrc}.png`).getDownloadURL().then((url) => {
                setImageUri(url);
              });
            }
          }
        })
        .then(() => {
          database()
            .ref(`${EnvironmentConstants.DB_PATH_TO_DEVICE}/${props.deviceId}/status`)
            .on("value",
              snapshot => {
                if (typeof snapshot.val() === "boolean") {
                  setIsActive(snapshot.val());
                }
              });
          setIsLoading(false);
        });

      return () => {
        unsubscribeToTopic(topic);
        database()
          .ref(`${EnvironmentConstants.DB_PATH_TO_DEVICE}/${props.deviceId}/status`)
          .off();
      };
    }
  }, []);

  const handleIsActive = (device: string, isActive: boolean) => {
    database()
      .ref(`${EnvironmentConstants.DB_PATH_TO_DEVICE}/${device}/status`)
      .set(isActive)
      .then(() => {
        console.log(`Status updated for ${device}(${isActive})`);
      });
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <SwitchButton
      text={name}
      isActive={isActive}
      inactiveImageSource={{ uri: imageUri }}
      activeImageSource={{ uri: imageUri }}
      style={styles.switchButton}
      textStyle={styles.textSwitchButton}
      mainColor={props.color ? props.color : "#7289DA"}
      tintColor={props.color ? props.color : "#7289DA"}
      originalColor={isDarkMode ? "#2C2F33" : "#fff"}
      sameTextColor
      disabledOnClick={props.disabledOnPress}
      handleChange={setIsActive}
      onPress={(isActive: boolean) => handleIsActive(props.deviceId, isActive)}
    />
  );
}
const styles = StyleSheet.create({
  switchButton: {
    marginHorizontal: 12,
    marginTop: 8
  },
  textSwitchButton: {
    fontWeight: "600"
  }
});
