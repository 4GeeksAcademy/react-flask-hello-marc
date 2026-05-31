"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import request, jsonify, Blueprint
from api.models import db, User
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

api = Blueprint('api', __name__)

# CORS
CORS(api, resources={r"/*": {"origins": "*"}})


@api.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add(
        "Access-Control-Allow-Headers",
        "Content-Type,Authorization"
    )
    response.headers.add(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS"
    )
    return response


@api.route('/hello', methods=['GET'])
def handle_hello():

    return jsonify({
        "message": "Hello! I'm a message that came from the backend"
    }), 200


# ==========================
# REGISTER
# ==========================

@api.route('/signup', methods=['POST', 'OPTIONS'])
def signup():

    if request.method == "OPTIONS":
        return jsonify({}), 200

    body = request.get_json()

    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return jsonify({
            "msg": "Email and password required"
        }), 400

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "msg": "User already exists"
        }), 400

    new_user = User(
        email=email,
        password=generate_password_hash(password),
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    token = create_access_token(identity=str(new_user.id))

    return jsonify({
        "token": token,
        "user": new_user.serialize()
    }), 201


# ==========================
# LOGIN
# ==========================

@api.route('/login', methods=['POST', 'OPTIONS'])
def login():

    if request.method == "OPTIONS":
        return jsonify({}), 200

    body = request.get_json()

    email = body.get("email")
    password = body.get("password")

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "msg": "Bad credentials"
        }), 401

    if not check_password_hash(user.password, password):
        return jsonify({
            "msg": "Bad credentials"
        }), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({
        "token": token,
        "user": user.serialize()
    }), 200


# ==========================
# PRIVATE ROUTE
# ==========================

@api.route('/private', methods=['GET'])
@jwt_required
def private():

    current_user = get_jwt_identity()

    return jsonify({
        "msg": "Access granted",
        "user_id": current_user
    }), 200
