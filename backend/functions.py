from functools import wraps
from flask import jsonify, request
import jwt
from extensions import app
import time 
import pytesseract
from PIL import Image
import pdfplumber
from docx import Document
from pymongo import MongoClient
import os
import requests
from io import BytesIO 
from PyPDF2 import PdfReader
import gridfs

from extensions import db, file_collection, fs, character_collection

class TokenAuthentication:
    @staticmethod
    def token_required(func):
        @wraps(func)
        def decorated(*args, **kwargs):
            token = request.cookies.get('access_token')
            if not token:
                return jsonify({'message': 'Token is missing'}), 401
            
            try:
                payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
                current_user = payload['user']
            except jwt.ExpiredSignatureError:
                return jsonify({'message': 'Token has expired'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'message': 'Invalid token'}), 401
            
            return func(current_user, *args, **kwargs)
        
        return decorated
    

class TextExtractor:

    def __init__(self):
        pass

    def extract_text(self, file_stream, file_name):
        if file_name.endswith('.pdf'):
            return self.extract_text_from_pdf(file_stream)
        elif file_name.endswith(('.png', '.jpg', '.jpeg', '.bmp')):
            return self.extract_text_from_image(file_stream)
        elif file_name.endswith('.docx'):
            return self.extract_text_from_docx(file_stream)
        else:
            raise Exception("Unsupported file type!")

    def extract_text_from_pdf(self, file_stream):
        pdf = PdfReader(file_stream)
        full_text = ''
        try:
            for page in pdf.pages:
                full_text += page.extract_text() or ''
        
        except Exception as e:
            print(e)
        return full_text

    def extract_text_from_image(self, file_stream):
        image = Image.open(file_stream)
        text = pytesseract.image_to_string(image)
        return text

    def extract_text_from_docx(self, file_stream):
        doc = Document(file_stream)
        full_text = '\n'.join([para.text for para in doc.paragraphs])
        return full_text


class TextFromFlaggedFiles:
    def __init__(self, db):
        self.db = db
        self.file_collection = db['file_collection']
        self.character_collection = db['character_collection']
        self.fs = fs 

    def process_file(self):
        te = TextExtractor()  
        for file_record in file_collection.find({'flag': 0}):
            char_name = file_record['character_name']
            file_id = file_record['file_id']
            file_name = file_record['file_name']
            try:
                with fs.get(file_id) as file_stream:
                    extracted_text = te.extract_text(file_stream, file_name)
                    print(f"Extracted Text for {char_name}: {extracted_text}")
                    
                    file_collection.update_one({'_id': file_record['_id']}, {'$set': {'flag': 1}})
                    
                    ## For this we have to make sure that Character_Collection has Character
                    character_doc = character_collection.find_one({"character_name" : char_name})
                    old_text = character_doc['text']
                    final_text = old_text + extracted_text
                    character_collection.update_one({'_id': character_doc['_id']}, {'$set': {'text': final_text}})

                    return extracted_text

            except Exception as e:
                print(f"Error processing file {file_record['_id']}: {e}")

class GetUsername():
    def get_username(token):
        if not token:
            return jsonify({'error': 'Token is missing'}), 400
        
        payload = jwt.decode(token, "whiteKnight", algorithms=["HS256"])
        username = payload['user']

        return username