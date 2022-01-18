import messaging from "@react-native-firebase/messaging";

export class mFirebase {

    initialize() {
        messaging().onMessage(async remoteMessage => {
            console.log("Message handled", remoteMessage);
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
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
