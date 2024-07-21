from functools import wraps
from flask import jsonify, request
import jwt
from extensions import app
import time 

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
    

import pytesseract
from PIL import Image
import pdfplumber
from docx import Document

class TextExtractor:

    def __init__(self):
        pass

    def extract_text(self, file_path):
        if file_path.endswith('.pdf'):
            return self.extract_text_from_pdf(file_path)
        elif file_path.endswith(('.png', '.jpg', '.jpeg', '.bmp')):
            return self.extract_text_from_image(file_path)
        elif file_path.endswith('.docx'):
            return self.extract_text_from_docx(file_path)
        else:
            raise jsonify("Unsupported file type!")
    
    def extract_text_from_pdf(self, pdf_path):
        with pdfplumber.open(pdf_path) as pdf:
            full_text = ''
            for page in pdf.pages:
                full_text += page.extract_text() or ''
            return full_text
        
    def extract_text_from_image(self, image_path):
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image)
        return text

    def extract_text_from_docx(self, docx_path):
        doc = Document(docx_path)
        full_text = '\n'.join([para.text for para in doc.paragraphs])
        return full_text