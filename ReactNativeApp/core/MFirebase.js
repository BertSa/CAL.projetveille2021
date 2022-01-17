import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";

export class mFirebase {
  lastMessage = null;

  initialize() {
    messaging().onMessage(async remoteMessage => {
      if (remoteMessage === this.lastMessage && this.lastMessage !== null) {
        return;
      }
      this.lastMessage = remoteMessage;
      console.log("Message handled", remoteMessage);
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: "laundry", // (optional) Create the channel in user's device
        title: remoteMessage?.data?.title,
        message: remoteMessage?.data?.text,
        data: remoteMessage?.data,
        playSound: true,
        actions: [
          "Yes",
        ],

      });
      console.log("Finished handling message");
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("Message handled in the background!", remoteMessage.data);
      if (remoteMessage === this.lastMessage && this.lastMessage !== null) {
        return;
      }
      this.lastMessage = remoteMessage;
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: "laundry",
        title: remoteMessage?.data?.title,
        message: remoteMessage?.data?.text,
        data: remoteMessage?.data,
      });
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log("Notification caused app to open from background state:", remoteMessage.data);
    });

    this.subscribeToTopic("laundry");
  }

  subscribeToTopic(topic) {
    messaging().unsubscribeFromTopic(topic).then();
    messaging().subscribeToTopic(topic).then(() => console.log(`Subscribed to topic ${topic}!`));
  }
}

const myFirebase = new mFirebase();
export default myFirebase;
