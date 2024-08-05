"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



@api.route("/login", methods=["POST", "GET"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Consulta la base de datos por el nombre de usuario y la contraseña
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401
    
    # Crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id})


@api.route("/welcome", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email}), 200

@api.route("/signup", methods=["POST"])
def add_user():
    data = request.json

    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    last_name = data.get('last_name')
    #podriamos no incluir el is_active en el formulario front end y aquí no mencionar el is_active
    is_active=data.get('is_active')


    if not email or not password or not name or not last_name:
        return jsonify({'msg': 'Todos los datos son necesarios'}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({'msg': 'Usuario ya existente, intenta logearte'}), 400
    
    #para hashear la contraseña antes de almacenarla en la base de datos.
    #INSTALAR pip install werkzeug
    #IMPORTAR from werkzeug.security import generate_password_hash
    hashed_password = generate_password_hash(password)
    
    new_user = User(
        email=email, 
        password= hashed_password,  #password, 
        #si no incluimos el is_active en el front end aquí le daremos un valor True
        is_active=is_active, 
        name=name, 
        last_name=last_name
    )
    db.session.add(new_user)
    db.session.commit()
    #crear el token para el nuevo usuario
    access_token = create_access_token(identity=new_user.id)
    
    return jsonify({'msg': 'Usuario creado', 'user': new_user.serialize(), 'token': access_token}), 200

    


