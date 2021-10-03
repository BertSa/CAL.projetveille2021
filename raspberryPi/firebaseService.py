import json
from typing import Any

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import messaging


class FirebaseService:
    topic: Any = 'leak'

    def __init__(self):
        with open("config.json", "r") as f:
            self.data = json.load(f)
        cred = credentials.Certificate("GOOGLE_APPLICATION_CREDENTIALS.json")
        firebase_admin.initialize_app(cred, {
            'databaseURL': self.data['firebase']['url_database'],
        })
        self.refs = []

    def startListener(self, listener):
        self.refs.append(db.reference('waterleak/valve').listen(listener))

    def send_to_topic(self):
        message = messaging.Message(
            android=messaging.AndroidConfig(
                notification=messaging.AndroidNotification(
                    title='WaterLeak!!!',
                    body='The floor is getting wet!!!',
                    click_action='alert'
                )
            ),
            topic=self.topic,
        )
        response = messaging.send(message)
        print('Successfully sent message:', response)


def my_listener(event):
    print(event.event_type)  # can be 'put' or 'patch'
    print(event.path)
    print(event.data)


if __name__ == "__main__":
    service = FirebaseService()
    # service.send_to_topic()
    service.startListener(my_listener)
