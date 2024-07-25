
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
from functions import TokenAuthentication,TextExtractor

from dotenv import load_dotenv
import os

load_dotenv()

from extensions import app, users_collection,file_collection

cloudinary.config( 
    cloud_name = "dewmhfhjr", 
    api_key = "961845734912925", 
    api_secret = "X-0x9-AqirPa9HgEIYT15DgqQKQ", 
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
        'expiration' : str(datetime.utcnow() + timedelta(hours = 24))

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




@app.route('/api/uploadFiles', methods=['POST'])
def character_data():
    if 'files' not in request.files:
        return jsonify({"error": "No files part in the request"}), 400

    name = request.form.get('characterName')
    if not name:
        return jsonify({'error': 'name is required'}), 400

    files = request.files.getlist('files')
    # all_extracted_text = ""  # Initialize extracted text string

    for file in files:
        upload_result = cloudinary.uploader.upload(file)
        file_url = upload_result['secure_url']

        # Extract text from the file (commented out for now)
        # extracted_text = TextExtractor(file.stream)
        # all_extracted_text += extracted_text + "\n"
        file_data = {
            'name_char': name,
            'file_url': file_url,
            'flag': 0,  # Initial flag value
            # 'upload_date': str(datetime.datetime.now())
        }
        file_collection.insert_one(file_data)

    # Commented out for now
    # character_data = {
    #     'name': name,
    #     'text': all_extracted_text
    # }
    # character_collection.insert_one(character_data)

    return jsonify({"message": "Character successfully created"}), 200


        

@app.route('/api/logout', methods=['POST'])
def logout():
   
    session.pop('username', None)
    response = make_response(jsonify({"message": "Logout successful"}))
    response.set_cookie('access_token', '', expires=0, httponly=True, samesite='Lax')
    return response, 200    



# @app.route('/api/CharactersList',methods=['GET'])
# def get_CharacterList():
#     Characters=list(Characters_collection.find())
#     for Character in Characters
#     Character['_id']=str(Character['_id'])
#     return jsonify(Characters),200

##@app.route('/api/characters', method = ['GET'])
##def get_char():
    ##pass
