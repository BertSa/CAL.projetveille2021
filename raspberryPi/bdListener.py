import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


def listener(event):
    print(event.event_type)  # can be 'put' or 'patch'
    print(event.path)  # relative to the reference, it seems
    print(event.data)  # new data at /reference/event.path. None if deleted


cred = credentials.Certificate("GOOGLE_APPLICATION_CREDENTIALS.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': '',
})

# As an admin, the app has access to read and write all data, regradless of Security Rules
ref = db.reference('waterleak/valve').listen(listener)
