from flask import Flask, jsonify, request, session
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY')
CORS(app, supports_credentials=True)

mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client.mydatabase
users_collection = db.users

@app.route('/api/data')
def get_data():
    return jsonify({"message": "Hello From Flask"})

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    if users_collection.find_one({"$or": [{"username": username}, {"email": email}]}):
        return jsonify({"message": "Username or email already exists"}), 400

    hashed_password = generate_password_hash(password)
    users_collection.insert_one({"username": username, "email": email, "password": hashed_password})

    session['username'] = username

    return jsonify({"message": "Signup successful"}), 201

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

    session['username'] = username

    return jsonify({"message": "Login successful"}), 200

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({"message": "Logout successful"}), 200

if __name__ == '__main__':
    app.run(debug=True)
