#!/usr/bin/python3
import json

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import messaging


def my_listener(event):
    print(event.event_type)  # can be 'put' or 'patch'
    print(event.path)
    print(event.data)


class FirebaseService:
    def __init__(self):
        with open("config.json", "r") as f:
            self.data = json.load(f)
        cred = credentials.Certificate("GOOGLE_APPLICATION_CREDENTIALS.json")
        firebase_admin.initialize_app(cred, {
            'databaseURL': self.data['firebase']['url_database'],
        })
        self.topic = self.data['firebase']['topic']
        self.ref_path_1 = self.data['firebase']['url_database']
        self.ref = db.reference()

    def getDataFromRef(self, ref_path):
        return self.ref.child(ref_path).get()

    def startListenerValve(self, listener=my_listener):
        self.ref.child(self.ref_path_1).listen(listener)

    def send_to_topic(self):
        message = messaging.Message(
            android=messaging.AndroidConfig(
                data={
                    'score': '850',
                    'time': '2:45',
                },
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
    firebase.send_to_topic()
