from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class Persona(db.Model):
    __tablename__ = 'Persona'

    Run = db.Column(db.Integer, primary_key=True)
    Nombre = db.Column(db.String(100), nullable=False)
    Apellido = db.Column(db.String(100), nullable=False)
    Correo = db.Column(db.String(100), nullable=False)
    Contraseña = db.Column(db.String(100), nullable=False)

    administrador = db.relationship('Administrador', backref='persona', uselist=False)
    empleado = db.relationship('Empleado', backref='persona', uselist=False)

class Administrador(db.Model):
    __tablename__ = 'Administrador'
    
    Run = db.Column(db.Integer, db.ForeignKey('Persona.Run'), primary_key=True)
    Periodo = db.Column(db.Integer, nullable=False)

class Empleado(db.Model):
    __tablename__ = 'Empleado'
    
    Run = db.Column(db.Integer, db.ForeignKey('Persona.Run'), primary_key=True)
    Turno = db.Column(db.Integer, nullable=False)

    cocinero = db.relationship('Cocinero', backref='empleado', uselist=False)
    mesero = db.relationship('Mesero', backref='empleado', uselist=False)
    cajero = db.relationship('Cajero', backref='empleado', uselist=False)

class Cocinero(db.Model):
    __tablename__ = 'Cocinero'

    Run = db.Column(db.Integer, db.ForeignKey('Empleado.Run'), primary_key=True)

class Mesero(db.Model):
    __tablename__ = 'Mesero'

    Run = db.Column(db.Integer, db.ForeignKey('Empleado.Run'), primary_key=True)

class Cajero(db.Model):
    __tablename__ = 'Cajero'

    Run = db.Column(db.Integer, db.ForeignKey('Empleado.Run'), primary_key=True)

# Otras tablas de productos, pedidos, etc., pueden ser definidas de manera similar.
