from functools import wraps
from flask import jsonify, request
import jwt
from extensions import app

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