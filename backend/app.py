
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data')
def get_data():
    return jsonify({"message": "Hello From Flask"})
