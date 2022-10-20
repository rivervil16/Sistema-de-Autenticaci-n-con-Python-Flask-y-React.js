"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import json
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# api.config["JWT_SECRET_KEY"] = os.environ.get('FLASK_APP_KEY', 'sample_key')
# jwt  = JWTManager(app)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# PORQUE ESTE ES UN METODOS POST Y NO UN GET??


@api.route('/login', methods=['POST'])
def handle_login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    # el metedo first es una buena practica para que el codigo devuelva al primero que cumpla con las 2 condiciones.and
    user_query = User.query.filter_by(email=email, password=password).first()
    if not user_query:
        return jsonify({"mensaje": "usuario o contraseña no coinciden"}), 404
    print(user_query.email)
# ahora creamos el acces token para ingreso
    access_token = create_access_token(identity=user_query.email)
    response_body = {
        "msg": "Bienvenido al login",
        "accessToken": access_token,
        "email": user_query.email,
        "id": user_query.id,
    }
    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def handle_signup():
    email = request.json.get('email', None)
    password = request.json.get('password', None)


# if this returns a user, then the email already exists in database
    user = User.query.filter_by(email=email).first()

    if user:  # if a user is found, we want to redirect back to signup page so user can try again
        return jsonify({"msg": "este email ya esta en uso"}), 401
    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    response_body = {
        "msg": "usuario creado",
    }
    return jsonify(response_body), 200
