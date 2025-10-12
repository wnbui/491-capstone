from flask import Blueprint, jsonify, request
from sqlalchemy import select
from .. import db
from ..models import Project
from ..schemas import ProjectCreateIn, ProjectUpdateIn, ProjectOut
from ..pyd import parse_body
from .auth import token_required

projects_bp = Blueprint("projects", __name__)

@projects_bp.route("/", methods=["POST"])
@parse_body(ProjectCreateIn)
@token_required
def create_project(current_user, body: ProjectCreateIn):
    project = Project(
        name=body.name,
        description=body.description,
        owner_id=current_user.id
    )
    db.session.add(project)
    db.session.commit()
    return jsonify(ProjectOut.model_validate(project).model_dump()), 201

@projects_bp.route("/", methods=["GET"])
@token_required
def list_projects(current_user):
    stmt = (
        select(Project)
        .filter_by(owner_id=current_user.id)
        .order_by(Project.created_at.desc())
    )
    projects = db.session.scalars(stmt).all()

    return jsonify([
        ProjectOut.model_validate(p).model_dump()
        for p in projects
    ])

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
