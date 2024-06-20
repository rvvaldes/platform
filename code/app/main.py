import logging
import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from user.api.user_api import user_api
from routes.protected_routes import protected_routes

def create_app():
    app = Flask(__name__)

    secret_key_jwt = os.getenv('SECRET_KEY_JWT')
    cors_url = os.getenv('CORS_URL')

    CORS(app, resources={r"/*": {"origins": cors_url}}, supports_credentials=True)

    # Configuración de JWT
    app.config['JWT_SECRET_KEY'] = secret_key_jwt  # Cambia esto por una clave secreta real
    jwt = JWTManager(app)

    app.register_blueprint(user_api, url_prefix='/api')
    app.register_blueprint(protected_routes)

    logging.basicConfig(level=logging.DEBUG)
    

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=80)
