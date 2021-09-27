from typing import Any

import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import messaging

cred = credentials.Certificate("GOOGLE_APPLICATION_CREDENTIALS.json")
firebase_admin.initialize_app(cred)

topic: Any = 'leak'


def send_to_topic():
    message = messaging.Message(
        android=messaging.AndroidConfig(
            notification=messaging.AndroidNotification(
                title='WaterLeak!!!',
                body='The floor is getting wet!!!',
                click_action='alert'
            )
        ),
        topic=topic,
    )
    response = messaging.send(message)
    print('Successfully sent message:', response)


if __name__ == "__main__":
    send_to_topic()
