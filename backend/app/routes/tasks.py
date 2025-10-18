from flask import Blueprint, jsonify, request
from sqlalchemy import select
from .. import db
from ..models import Task, Project
from ..schemas import TaskCreateIn, TaskUpdateIn, TaskOut
from ..pyd import parse_body
from .auth import token_required

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/", methods=["POST"])
@parse_body(TaskCreateIn)
@token_required
def create_task(current_user, body: TaskCreateIn):
    proj = db.session.scalars(select(Project).filter_by(id=body.project_id, owner_id=current_user.id)).first()
    if not proj:
        return jsonify({"error": "Project not found"}), 404
    task = Task(title=body.title, description=body.description, status=body.status, points=body.points, owner_id=current_user.id, project_id=body.project_id)
    db.session.add(task)
    db.session.commit()
    return jsonify(TaskOut.model_validate(task).model_dump()), 201

@tasks_bp.route("/", methods=["GET"])
@token_required
def list_tasks(current_user):
    allowed_status = {"todo", "in_progress", "in_review", "done"}
    status = request.args.get("status")
    project_id = request.args.get("project_id", type=int)
    stmt = select(Task).where(Task.owner_id == current_user.id)
    if status:
        if status not in allowed_status:
            return jsonify({"error": "Invalid status"}), 400
        stmt = stmt.where(Task.status == status)
    if project_id is not None:
        stmt = stmt.where(Task.project_id == project_id)
    stmt = stmt.order_by(Task.created_at.desc())
    tasks = db.session.scalars(stmt).all()
    return jsonify([TaskOut.model_validate(t).model_dump() for t in tasks])

@tasks_bp.route("/<int:task_id>", methods=["GET"])
@token_required
def get_task(current_user, task_id: int):
    task = db.session.scalars(select(Task).filter_by(id=task_id, owner_id=current_user.id)).first()
    if not task:
        return jsonify({"error": "Not found"}), 404
    return jsonify(TaskOut.model_validate(task).model_dump())

@tasks_bp.route("/<int:task_id>", methods=["PATCH"])
@parse_body(TaskUpdateIn)
@token_required
def update_task(current_user, task_id: int, body: TaskUpdateIn):
    task = db.session.scalars(select(Task).filter_by(id=task_id, owner_id=current_user.id)).first()
    if not task:
        return jsonify({"error": "Not found"}), 404
    if body.project_id is not None and body.project_id != task.project_id:
        proj = db.session.scalars(select(Project).filter_by(id=body.project_id, owner_id=current_user.id)).first()
        if not proj:
            return jsonify({"error": "New project not found"}), 404
        task.project_id = body.project_id
    if body.title is not None:
        task.title = body.title
    if body.description is not None:
        task.description = body.description
    if body.status is not None:
        task.status = body.status
    if body.points is not None:
        task.points = body.points
    db.session.commit()
    return jsonify(TaskOut.model_validate(task).model_dump())

@tasks_bp.route("/<int:task_id>", methods=["DELETE"])
@token_required
def delete_task(current_user, task_id: int):
    task = db.session.scalars(select(Task).filter_by(id=task_id, owner_id=current_user.id)).first()
    if not task:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Deleted"})
