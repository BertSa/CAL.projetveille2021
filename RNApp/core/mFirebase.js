import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";

export class mFirebase {

    initialize() {
        messaging().onMessage(async remoteMessage => {
            console.log("Message handled", remoteMessage);
            PushNotification.localNotification({
                channelId: "alert",
                title: "DomoApp",
                message: "Valve is now ",
            });
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            PushNotification.localNotification({
                channelId: "alert",
                title: "DomoApp",
                message: "Valve is now ",
            });
            console.log("Message handled in the background!", remoteMessage.data);
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
