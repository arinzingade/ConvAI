
from flask import Flask, jsonify, request, session, make_response
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from email_validator import validate_email, EmailNotValidError

from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.secret_key = 'whiteKnight'
app.config['JWT_SECRET_KEY'] = 'jwtKnight'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']

CORS(app,origins=["http://localhost:3000"],supports_credentials=True)
jwt = JWTManager(app)
 
 
mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client.mydatabase
users_collection = db.users

@app.route('/api/data')
def get_data():
    return jsonify({"message": "Hello From Flask"})

@app.route('/api/signup', methods = ['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"message": "All fields are required"}), 400
    
    try:
        valid = validate_email(email)
        email = valid.email
    except EmailNotValidError as e:
        return jsonify({"message": str(e)}), 400

    if users_collection.find_one({"username": username}) or users_collection.find_one({"email": email}):
        return jsonify({"message": "Username or email already exists"}), 400
    
    hashed_password = generate_password_hash(password)
    users_collection.insert_one({"username": username, "email": email, "password": hashed_password})

    access_token = create_access_token(identity={'username': username, 'password': password})

    response = make_response(jsonify({"message" : "Signup Successful"}), 201)
    response.set_cookie('access_token', access_token, httponly=True, secure=True)

    return response



@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    user = users_collection.find_one({"username": username})

    if not user or not check_password_hash(user['password'], password):
        return jsonify({"message": "Invalid username or password"}), 401
    
    
    access_token = create_access_token(identity={'username': user['username'], 'password' : password})

    response = make_response(jsonify({"message" : "Login Successful"}), 200)
    response.set_cookie('access_token', access_token, httponly=True, secure=True)

    return response

@app.route('/api/protected', methods = ['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as = current_user), 200

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({"message": "Logout successful"}), 200

@app.route('/api/CharactersList',methods=['GET'])
def get_CharacterList():
    Characters=list(Characters_collection.find())
    for Character in Characters
    Character['_id']=str(Character['_id'])
    return jsonify(Characters),200