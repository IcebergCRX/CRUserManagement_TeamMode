import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import csv

# Use a service account
cred = credentials.Certificate('serviceAccount.json')
firebase_admin.initialize_app(cred)

db = firestore.client()


docs = db.collection(u'visualCR').where(u'round', u'==', "4").stream()

with open('trainee_data.csv', mode='w', newline="") as trainee_csv:
    trainee_data_writer = csv.writer(trainee_csv, delimiter=';')
    trainee_data_writer.writerow(
        ["userID", "pseudonym", "round", "points",
         "level", "startTime", "taskTimes", "tries", "ip"])

    for doc in docs:
        
        trainee_data_writer.writerow([doc.to_dict()['userID'], doc.to_dict()['pseudonym'], doc.to_dict()['round'],doc.to_dict()['points'], doc.to_dict()['level'], doc.to_dict()['startTime']])






