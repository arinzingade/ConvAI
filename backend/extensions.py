
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import gridfs

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'whiteKnight')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_TOKEN_LOCATION'] = [os.getenv('JWT_TOKEN_LOCATION')]

CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
jwt = JWTManager(app)

mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client.mydatabase
fs = gridfs.GridFS(db)

users_collection = db.users
file_collection = db.files
character_collection = db.characters