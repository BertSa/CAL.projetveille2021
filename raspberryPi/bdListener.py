import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("GOOGLE_APPLICATION_CREDENTIALS.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': '',
})

# As an admin, the app has access to read and write all data, regradless of Security Rules
ref = db.reference('waterleak/valve')
print(ref.get())

