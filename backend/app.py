
from flask import Flask, jsonify, request, session, make_response
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from email_validator import validate_email, EmailNotValidError
import jwt
from datetime import datetime, timedelta
import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url

##inHouse
from functions import TokenAuthentication,TextExtractor, GetUsername

from dotenv import load_dotenv
import os

load_dotenv()

from extensions import app, users_collection,file_collection, character_collection, fs

cloudinary.config( 
    cloud_name = os.getenv('CLOUD_NAME'), 
    api_key = os.getenv('CLOUD_API'), 
    api_secret = os.getenv('CLOUD_SECRET'), 
    secure = True
)

@app.route('/api/data')
def get_data():
    return jsonify({"message": "Hello From Flask"}),200

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
    user = {"username": username, "email": email, "password": hashed_password}
    users_collection.insert_one(user)

    token = jwt.encode({
        'user': username,
        'expiration' : str(datetime.utcnow() + timedelta(hours = 24))

    },
        app.config['SECRET_KEY'],
        algorithm="HS256")

    if isinstance(token, bytes):
        token = token.decode('utf-8')

    response = make_response(jsonify({"message" : "Signup Successful"}), 201)
    response.set_cookie('access_token', token, httponly=True, secure=True)

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
    
    token = jwt.encode({
        'user': user['username'],
        'expiration' : str(datetime.now() + timedelta(hours = 24))

    },
        app.config['SECRET_KEY'],
        algorithm="HS256")
    
    if isinstance(token, bytes):
        token = token.decode('utf-8')

    response = make_response(jsonify({"message" : "Login Successful"}), 200)
    response.set_cookie('access_token', token, httponly=True, secure=True)

    return response

@app.route('/api/protected', methods = ['GET'])
@TokenAuthentication.token_required
def protected(current_user):
    return jsonify({'message': f'Hello, {current_user}! This is a protected route.',
                    'username':current_user}), 200

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    response = make_response(jsonify({"message": "Logout successful"}))
    response.set_cookie('access_token', '', expires=0, httponly=True, samesite='Lax')
    return response, 200    

@app.route('/api/createChar', methods = ['POST'])
def create_char():
    if request.method == 'POST':
        data = request.json
        
        if not data:
            return jsonify({'success': False, 
                            'message': 'No data provided'}), 400
        
        token = request.cookies.get('access_token')        
        if not token:
            return jsonify({"message": "No token exists"}), 400
        
        username = GetUsername.get_username(token)

        character_name = data.get('character_name')
        result = character_collection.find_one({"character_name": character_name, "username": username})
        if result:
            return jsonify({'success': True, 'message': 'Character Already exists'}), 200
        else:
            character_data = {
                'character_name': character_name,
                'username': username,
                'text': ""  
            }
            character_collection.insert_one(character_data)
            return jsonify({'success': True, 'message': 'Character created'}), 201


@app.route('/api/getChar', methods = ['GET'])
def get_char():    
    token = request.cookies.get('access_token')        
    username = GetUsername.get_username(token)
    
    if request.method == 'GET':
        projection = {'_id': False, 'character_name': True}
        your_characters = list(character_collection.find({'username' : username}, projection))
        main_characters = list(character_collection.find({'username' : "adminUser"}, projection))

        return jsonify({'your_characters': your_characters, 'main_characters': main_characters})
    

@app.route('/api/uploadFiles', methods=['POST'])
def character_data():
    if 'files' not in request.files:
        return jsonify({"error": "No files part in the request"}), 400
    files = request.files.getlist('files')
    name = request.form.get('characterName')
    if not name:
        return jsonify({'error': 'name is required'}), 400
    
    #Filtering Conditions(For Later)

   
    if not files:
        return jsonify({'error': 'No files provided'}), 400

    ## file_name = request.file.getList('name')
    for file in files:
       #extracting the filename from file object
        file_id = fs.put(file, filename=file.filename, metadata={'character_name': name})
        file_data = {
            'character_name': name,
            'file_id': file_id,  
            'file_name': file.filename,
            'flag': 0
        }
        file_collection.insert_one(file_data)

    return jsonify({"message": "Uploaded successfully"}), 200