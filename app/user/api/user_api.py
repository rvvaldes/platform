from flask import Blueprint, request, jsonify
from user.services.user_service import create_user, get_users, update_user, delete_user

user_api = Blueprint('user_api', __name__)

@user_api.route('/users', methods=['POST'])
def api_create_user():
    data = request.json
    user = create_user(data)
    return jsonify(user.id), 201

@user_api.route('/users', methods=['GET'])
def api_get_users():
    users = get_users()
    return jsonify([{'id': user.id, 'name': user.name, 'email': user.email} for user in users])

@user_api.route('/users/<int:id>', methods=['PUT'])
def api_update_user(id):
    data = request.json
    user = update_user(id, data)
    if user:
        return jsonify({'id': user.id, 'name': user.name, 'email': user.email})
    return 'User not found', 404

@user_api.route('/users/<int:id>', methods=['DELETE'])
def api_delete_user(id):
    if delete_user(id):
        return 'User deleted', 200
    return 'User not found', 404
