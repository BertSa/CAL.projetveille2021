import messaging from "@react-native-firebase/messaging";
import PushNotification, { Importance } from "react-native-push-notification";


const initializeApp = () => {
  setupNotification();

  messaging().onMessage(async remoteMessage => {
    console.debug("Message handled", remoteMessage);
    sendLocalNotification(remoteMessage.data);
  });
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("Notification caused app to open from background state:", remoteMessage.data);
    sendLocalNotification(remoteMessage.data);
  });

  subscribeToTopic("laundry");
  subscribeToTopic("waterleak");

};

function setupNotification() {
  PushNotification.configure({
    onRegister: function(token) {
      console.debug("TOKEN:", token);
    },
    onNotification: function(notification) {
      console.debug("NOTIFICATION:", notification);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    popInitialNotification: true,
    requestPermissions: true
  });
  PushNotification.createChannel(
    {
      id: "laundry",
      name: "laundry",
      description: "default",
      priority: "high",
      vibrate: true,
      sound: true,
      light: true,
      importance: Importance.HIGH,
      visibility: "public",
      badge: true
    }
  );
}

function sendLocalNotification(data: { title: string, message: string, channelId: string }) {
  const { title, message, channelId } = data;
  PushNotification.localNotification({
    channelId: channelId,
    title: title,
    message: message
  });
}

function subscribeToTopic(topic: string) {
  messaging().unsubscribeFromTopic(topic).then();
  messaging().subscribeToTopic(topic).then(() => console.log(`Subscribed to topic: ${topic}!`));
}

export default initializeApp;
