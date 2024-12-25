from flask import Blueprint, request, jsonify
from datetime import datetime

routes = Blueprint('routes', __name__)

tasks = []  # In-memory task list for simplicity
time_tracking = {}  # In-memory time tracking for simplicity

@routes.route('/api/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@routes.route('/api/tasks', methods=['POST'])
def add_task():
    task = request.json
    task['id'] = str(len(tasks) + 1)
    task['created_at'] = datetime.now().isoformat()
    tasks.append(task)
    return jsonify(task), 201

@routes.route('/api/tasks/<string:id>', methods=['DELETE'])
def delete_task(id):
    global tasks
    tasks = [task for task in tasks if task['id'] != id]
    return '', 204

@routes.route('/api/tasks/<string:id>', methods=['PUT'])
def update_task(id):
    global tasks
    updated_task = request.json
    tasks = [task if task['id'] != id else updated_task for task in tasks]
    return jsonify(updated_task)

@routes.route('/api/tasks/<string:id>/start', methods=['POST'])
def start_task(id):
    global time_tracking
    time_tracking[id] = {'start_time': datetime.now().isoformat()}
    return '', 204

@routes.route('/api/tasks/<string:id>/stop', methods=['POST'])
def stop_task(id):
    global time_tracking
    if id in time_tracking:
        time_tracking[id]['end_time'] = datetime.now().isoformat()
    return '', 204

@routes.route('/api/tasks/<string:id>/time', methods=['GET'])
def get_task_time(id):
    global time_tracking
    if id in time_tracking:
        return jsonify(time_tracking[id])
    return '', 404

@routes.route('/api/kanban', methods=['GET'])
def get_kanban_view():
    kanban_view = {
        'to_do': [task for task in tasks if task['status'] == 'To Do'],
        'in_progress': [task for task in tasks if task['status'] == 'In Progress'],
        'done': [task for task in tasks if task['status'] == 'Done']
    }
    return jsonify(kanban_view)

@routes.route('/api/gantt', methods=['GET'])
def get_gantt_view():
    gantt_view = sorted(tasks, key=lambda x: x['due_date'])
    return jsonify(gantt_view)

@routes.route('/api/calendar', methods=['GET'])
def get_calendar_view():
    calendar_view = {}
    for task in tasks:
        due_date = task['due_date']
        if due_date not in calendar_view:
            calendar_view[due_date] = []
        calendar_view[due_date].append(task)
    return jsonify(calendar_view)

# User Routes
@routes.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@routes.route('/api/users', methods=['POST'])
def create_user():
    data = request.json
    new_user = User(**data)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

# Project Routes
@routes.route('/api/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects])

@routes.route('/api/projects', methods=['POST'])
def create_project():
    data = request.json
    new_project = Project(**data)
    db.session.add(new_project)
    db.session.commit()
    return jsonify(new_project.to_dict()), 201

# Register the blueprint in app.py
def register_routes(app):
    app.register_blueprint(routes)