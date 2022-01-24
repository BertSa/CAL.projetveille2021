import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View
} from "react-native";
import auth from "@react-native-firebase/auth";
import React, { createRef, useState } from "react";
import CustomButton from "./CustomButton";
import database from "@react-native-firebase/database";

const RegisterScreen = (props) => {
  const isDarkMode = useColorScheme() === "dark";

  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errortext, setErrortext] = useState("");

  const emailInputRef = createRef();
  const usernameInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext("");
    if (!userFullName) {
      alert("Please fill full name");
      setErrortext("Please fill full name");
      return;
    }
    if (!userEmail) {
      alert("Please fill Email");
      return;
    }
    if (!userUsername) {
      alert("Please fill Address");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }
    auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        console.log("User account created & signed in!");
        auth().currentUser.sendEmailVerification().then();
        database().ref("users/")
          .child(auth().currentUser.uid)
          .set({
            fullName: userFullName,
            email: userEmail,
            username: userUsername,
          }).then();
        auth().currentUser.updateProfile({
          displayName: userFullName
        }).then(() => {
          props.navigation.navigate("Home");
        });
      })
      .catch(error => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#00000000" }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center"
        }}>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={{ ...styles.inputStyle, borderColor: isDarkMode ? "#FFF" : "#000" }}
              onChangeText={(UserName) => setUserFullName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Full Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={{ ...styles.inputStyle, borderColor: isDarkMode ? "#FFF" : "#000" }}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={{ ...styles.inputStyle, borderColor: isDarkMode ? "#FFF" : "#000" }}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                Keyboard.dismiss()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={{ ...styles.inputStyle, borderColor: isDarkMode ? "#FFF" : "#000" }}
              onChangeText={(UserUsername) =>
                setUserUsername(UserUsername)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Username"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={usernameInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>

          {errortext !== "" ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <CustomButton onPress={handleSubmitButton} title="Register" />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14
  }
});
