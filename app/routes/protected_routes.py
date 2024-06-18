from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from user.services.user_service import find_user_by_email_and_name

protected_routes = Blueprint('protected_routes', __name__)

# Rutas para manejar la autenticación
@protected_routes.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    user = find_user_by_email_and_name(username, password)
    if user:
        # Crear el token de acceso, que es válido por 15 minut
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)
    else:
        return jsonify({"msg": "Bad username or password"}), 401

# Un ejemplo de ruta protegida
@protected_routes.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200