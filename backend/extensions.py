
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.secret_key = 'whiteKnight'
app.config['JWT_SECRET_KEY'] = 'jwtKnight'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']

CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
jwt = JWTManager(app)

mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client.mydatabase
users_collection = db.users
file_collection = db.files
character_collection = db.characters