import SwitchButton from "@freakycoder/react-native-switch-button";
import React, { useEffect, useState } from "react";
import database from "@react-native-firebase/database";
import * as EnvironmentConstants from "../core/EnvironmentConstants";
import { subscribeToTopic, unsubscribeToTopic } from "../core/EnvironmentConstants";
import { StyleSheet, useColorScheme } from "react-native";
import auth from "@react-native-firebase/auth";
import imageLaundry from "../assets/laundry.png";
import imageValve from "../assets/valve.png";

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
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    let topic = "default";
    if (auth().currentUser) {
      database()
        .ref(`${EnvironmentConstants.DB_PATH_TO_DEVICE}/${props.deviceId}`)
        .once("value", (snapshot) => {
          let val: IDeviceProps | any = snapshot.val();
          if (val) {
            setName(val?.name);
            setImageSrc(val?.imageSrc);
            topic = val?.topic;
            subscribeToTopic(val?.topic);
          }
        }).then();
      database()
        .ref(`${EnvironmentConstants.DB_PATH_TO_DEVICE}/${props.deviceId}/status`)
        .on("value",
          snapshot => {
            if (typeof snapshot.val() === "boolean") {
              setIsActive(snapshot.val());
            }
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


  function getImage(deviceId) {
    switch (deviceId) {
      case "laundry":
        return imageLaundry;
      case "valve":
        return imageValve;
      default:
        return imageLaundry;
    }
  }

  return (
    <SwitchButton
      text={name}
      isActive={isActive}
      inactiveImageSource={getImage(imageSrc)}
      activeImageSource={getImage(imageSrc)}
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
