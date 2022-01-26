import { Text, TouchableOpacity } from "react-native";
import React from "react";

interface ICustomButtonProps {
  onPress: () => void;
  title: string;
  color?: string;
}

export default function CustomButton(props: ICustomButtonProps) {
  return <TouchableOpacity
    style={{
      backgroundColor: props.color ? props.color : "#7289DA",
      borderWidth: 0,
      color: "#000",
      borderColor: props.color ? props.color : "#7289DA",
      height: 40,
      alignItems: "center",
      borderRadius: 5,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 5,
      marginBottom: 5
    }}
    activeOpacity={0.5}
    onPress={props.onPress}>
    <Text style={{
      color: "#FFFFFF",
      paddingVertical: 10,
      fontSize: 16
    }}>{props.title}</Text>
  </TouchableOpacity>;
}
