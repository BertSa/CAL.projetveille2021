import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

interface ICustomButtonProps {
  onPress: () => void;
  title: string;
}

export default function CustomButton(props: ICustomButtonProps) {
  return <TouchableOpacity
    style={styles.buttonStyle}
    activeOpacity={0.5}
    onPress={props.onPress}>
    <Text style={styles.buttonTextStyle}>{props.title}</Text>
  </TouchableOpacity>;
}
let styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "#7289DA",
    borderWidth: 0,
    color: "#000",
    borderColor: "#7289DA",
    height: 40,
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16
  }
});
