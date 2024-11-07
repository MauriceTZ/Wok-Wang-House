from flask import Blueprint, request, jsonify
from app.models import db, Persona, Administrador
from flask_login import login_required

# Crea un blueprint para las rutas de administrador
admin_bp = Blueprint('admin', __name__)

# Crear un administrador
@admin_bp.route('/admin', methods=['POST'])
@login_required
def create_admin():
    data = request.json
    run = data['Run']
    periodo = data['Periodo']

    # Verificar si la persona existe
    persona = Persona.query.get(run)
    if persona is None:
        return jsonify({'message': 'Persona no encontrada'}), 404

    # Crear administrador
    admin = Administrador(Run=run, Periodo=periodo)
    db.session.add(admin)
    db.session.commit()

    return jsonify({'message': 'Administrador creado exitosamente'}), 201

# Obtener todos los administradores
@admin_bp.route('/admins', methods=['GET'])
@login_required
def get_admins():
    admins = Administrador.query.all()
    return jsonify([{
        'Run': admin.Run,
        'Periodo': admin.Periodo
    } for admin in admins])

# Obtener un administrador por Run
@admin_bp.route('/admin/<int:run>', methods=['GET'])
@login_required
def get_admin(run):
    admin = Administrador.query.get(run)
    if admin:
        return jsonify({
            'Run': admin.Run,
            'Periodo': admin.Periodo
        })
    return jsonify({'message': 'Administrador no encontrado'}), 404
