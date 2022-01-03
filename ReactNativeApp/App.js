/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React, { useEffect } from "react";
import PushNotification, {Importance}  from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import {
  Alert,
  Button, NativeModules, PermissionsAndroid, SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, ToastAndroid,
  useColorScheme,
  View,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() !== 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() !== 'dark';
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
  PushNotification.createChannel(
    {
      channelId: "default-channel-id", // (required)
      channelName: `Default channel`, // (required)
      channelDescription: "A default channel", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel 'default-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const pressed = () => {
    console.log('pressed');
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: "default-channel-id", // (optional) Create the channel in user's device
      title: "My Notification Title",
      message: "My Notification Message"

    });
  };
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('Message handled', remoteMessage);
    });

    return unsubscribe;
  }, []);
    messaging().subscribeToTopic('laundry').then(() => console.log('Subscribed to topic!'));
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage.data);
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: "default-channel-id", // (optional) Create the channel in user's device
        title: remoteMessage?.data?.title,
        message: remoteMessage?.data?.text,

      });
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.data,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.data,
          );
        }
      });
  }, []);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/*<Header />*/}
        <Button
          title="Go to Details Activity"
          onPress={() => {
            pressed();
            ToastAndroid.show('Toast', ToastAndroid.SHORT);
          }}
          color={'#333'}
        />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step Oned">Edite your edits.</Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
