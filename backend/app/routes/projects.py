from flask import Blueprint, jsonify, request
from sqlalchemy import select, and_, func
from ..models import Project, Task
from ..schemas import ProjectCreateIn, ProjectUpdateIn, ProjectOut, TaskOut
from ..pyd import parse_body
from .. import db
from .auth import token_required

projects_bp = Blueprint("projects", __name__)

@projects_bp.route("/", methods=["POST"])
@parse_body(ProjectCreateIn)
@token_required
def create_project(current_user, body: ProjectCreateIn):
    project = Project(name=body.name, description=body.description, status=body.status, owner_id=current_user.id)
    db.session.add(project)
    db.session.commit()
    return jsonify(ProjectOut.model_validate(project).model_dump()), 201

@projects_bp.route("/", methods=["GET"])
@token_required
def list_projects(current_user):
    stmt = select(Project).filter_by(owner_id=current_user.id).order_by(Project.created_at.desc())
    projects = db.session.scalars(stmt).all()
    return jsonify([ProjectOut.model_validate(p).model_dump() for p in projects])

@projects_bp.route("/<int:project_id>", methods=["GET"])
@token_required
def get_project(current_user, project_id: int):
    stmt = select(Project).filter_by(id=project_id, owner_id=current_user.id)
    project = db.session.scalars(stmt).first()
    if not project:
        return jsonify({"error": "Not found"}), 404
    return jsonify(ProjectOut.model_validate(project).model_dump())

@projects_bp.route("/<int:project_id>", methods=["PATCH"])
@parse_body(ProjectUpdateIn)
@token_required
def update_project(current_user, project_id: int, body: ProjectUpdateIn):
    stmt = select(Project).filter_by(id=project_id, owner_id=current_user.id)
    project = db.session.scalars(stmt).first()
    if not project:
        return jsonify({"error": "Not found"}), 404
    if body.name is not None:
        project.name = body.name
    if body.description is not None:
        project.description = body.description
    if body.status is not None:
        project.status = body.status
    db.session.commit()
    return jsonify(ProjectOut.model_validate(project).model_dump())

@projects_bp.route("/<int:project_id>", methods=["DELETE"])
@token_required
def delete_project(current_user, project_id: int):
    stmt = select(Project).filter_by(id=project_id, owner_id=current_user.id)
    project = db.session.scalars(stmt).first()
    if not project:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(project)
    db.session.commit()
    return jsonify({"message": "Deleted"})

@projects_bp.route("/<int:project_id>/tasks", methods=["GET"])
@token_required
def list_project_tasks(current_user, project_id: int):
    proj = db.session.scalars(select(Project).where(and_(Project.id == project_id, Project.owner_id == current_user.id))).first()
    if not proj:
        return jsonify({"error": "Project not found"}), 404
    tasks = db.session.scalars(select(Task).where(and_(Task.project_id == project_id, Task.owner_id == current_user.id)).order_by(Task.created_at.desc())).all()
    return jsonify([TaskOut.model_validate(t).model_dump() for t in tasks])

@projects_bp.route("/<int:project_id>/points", methods=["GET"])
@token_required
def project_total_points(current_user, project_id: int):
    proj = db.session.scalars(select(Project).where(and_(Project.id == project_id, Project.owner_id == current_user.id))).first()
    if not proj:
        return jsonify({"error": "Project not found"}), 404
    total_points = db.session.execute(select(func.coalesce(func.sum(Task.points), 0)).where(and_(Task.project_id == project_id, Task.owner_id == current_user.id))).scalar_one()
    return jsonify({"project_id": project_id, "total_points": int(total_points)})
