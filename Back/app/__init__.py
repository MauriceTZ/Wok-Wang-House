from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.config import Config

# Inicializa la base de datos
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)  # Carga la configuración desde el archivo config.py

    # Inicializa la base de datos con la aplicación
    db.init_app(app)

    # Aquí puedes registrar las rutas o blueprints
    # from app.routes import some_blueprint
    # app.register_blueprint(some_blueprint)

    return app
