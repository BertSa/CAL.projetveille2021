#!/usr/bin/python3

import firebase_admin
from firebase_admin import credentials, db, messaging

from conf import config


def my_listener(event):
    print(event.event_type)  # can be 'put' or 'patch'
    print(event.path)
    print(event.data)


class FirebaseData(dict):
    def __init__(self, channel_id, title, text):
        super().__init__()
        self['channelId'] = channel_id
        self['title'] = title
        self['text'] = text


class FirebaseService:
    def __init__(self):
        cred = credentials.Certificate(config.firebase['credentials'])
        firebase_admin.initialize_app(cred, {
            'databaseURL': config.firebase["url_database"],
        })
        self.topic = config.firebase['topics']['water_leak']
        self.ref_path_1 = config.firebase['url_database']
        self.ref = db.reference()

    def getDataFromRef(self, ref_path):
        return self.ref.child(ref_path).get()

    def startListenerValve(self, listener=my_listener):
        self.ref.child(self.ref_path_1).listen(listener)

    def send_to_topic(self, data: dict):
        message = messaging.Message(
            android=messaging.AndroidConfig(
                data=data,
            ),
            topic=self.topic,
        )
        response = messaging.send(message)
        print('Successfully sent message:', response)

    def setDataToRef(self, ref_path, data):
        child = self.ref.child(ref_path)
        child.set(data)

    def setValve(self, data: bool):
        self.setDataToRef(self.ref_path_1, data)


if __name__ == '__main__':
    firebase = FirebaseService()
    firebase.send_to_topic(FirebaseData(
        channel_id=config.firebase['channel_ids']['water_leak'],
        title='Oops!',
        text='Water leak detected!'))
