from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from patient.services.patient_service import create_patient, get_patient, update_patient, delete_patient

patient_routes = Blueprint('patient_routes', __name__)

@patient_routes.route('/patients', methods=['POST'])
@jwt_required()
def add_patient():
    data = request.json
    patient = create_patient(data)
    if isinstance(patient, dict):
        return jsonify(patient)
    else:
        return jsonify(patient.dict())

@patient_routes.route('/patients/<patient_id>', methods=['GET'])
@jwt_required()
def read_patient(patient_id):
    patient = get_patient(patient_id)
    if patient:
        return jsonify(patient)
    else:
        return jsonify({"error": "Patient not found"}), 404

@patient_routes.route('/patients/<patient_id>', methods=['PUT'])
@jwt_required()
def modify_patient(patient_id):
    data = request.json
    patient = update_patient(patient_id, data)
    return jsonify(patient)

@patient_routes.route('/patients/<patient_id>', methods=['DELETE'])
@jwt_required()
def remove_patient(patient_id):
    result = delete_patient(patient_id)
    return jsonify(result)
