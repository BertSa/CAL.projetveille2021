import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import messaging

cred = credentials.Certificate("GOOGLE_APPLICATION_CREDENTIALS.json")
firebase_admin.initialize_app(cred)

topic = 'leak'

message = messaging.Message(
    notification=messaging.Notification(
        title='WaterLeak!!!',
        body='The floor is getting wet!!!'
    ),
    topic=topic
)
response = messaging.send(message)
print('Successfully sent message:', response)
