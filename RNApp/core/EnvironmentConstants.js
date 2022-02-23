import messaging from '@react-native-firebase/messaging';

export const DB_PATH_TO_DEVICE = '/devices';

export function subscribeToTopic( topic : string ) {
    messaging().subscribeToTopic(topic).then(() => console.log(`Subscribed to topic: ${ topic }!`));
}

export function unsubscribeToTopic( topic : string ) {
    messaging().unsubscribeFromTopic(topic).then(() => console.log(`Unsubscribed to topic: ${ topic }!`));
}
