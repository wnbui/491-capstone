from flask import Blueprint, jsonify, request
from sqlalchemy import select
from ..models import Note
from ..schemas import NoteCreateIn, NoteUpdateIn, NoteOut
from ..pyd import parse_body
from .. import db
from .auth import token_required

notes_bp = Blueprint("notes", __name__)

@notes_bp.route("/", methods=["POST"])
@parse_body(NoteCreateIn)
@token_required
def create_note(current_user, body: NoteCreateIn):
    note = Note(
        title=body.title, 
        content=body.content, 
        owner_id=current_user.id
    )
    db.session.add(note)
    db.session.commit()
    return jsonify(NoteOut.model_validate(note).model_dump()), 201

@notes_bp.route("/", methods=["GET"])
@token_required
def list_notes(current_user):
    stmt = select(Note).filter_by(owner_id=current_user.id).order_by(Note.updated_at.desc())
    notes = db.session.scalars(stmt).all()
    return jsonify([NoteOut.model_validate(n).model_dump() for n in notes])

@notes_bp.route("/<int:note_id>", methods=["GET"])
@token_required
def get_note(current_user, note_id: int):
    stmt = select(Note).filter_by(id=note_id, owner_id=current_user.id)
    note = db.session.scalars(stmt).first()
    if not note:
        return jsonify({"error": "Not found"}), 404
    return jsonify(NoteOut.model_validate(note).model_dump())

@notes_bp.route("/<int:note_id>", methods=["PATCH"])
@parse_body(NoteUpdateIn)
@token_required
def update_note(current_user, note_id: int, body: NoteUpdateIn):
    stmt = select(Note).filter_by(id=note_id, owner_id=current_user.id)
    note = db.session.scalars(stmt).first()
    if not note:
        return jsonify({"error": "Not found"}), 404
    
    if body.title is not None:
        note.title = body.title
    if body.content is not None:
        note.content = body.content
    
    db.session.commit()
    return jsonify(NoteOut.model_validate(note).model_dump())

@notes_bp.route("/<int:note_id>", methods=["DELETE"])
@token_required
def delete_note(current_user, note_id: int):
    stmt = select(Note).filter_by(id=note_id, owner_id=current_user.id)
    note = db.session.scalars(stmt).first()
    if not note:
        return jsonify({"error": "Not found"}), 404
    
    db.session.delete(note)
    db.session.commit()
    return jsonify({"message": "Deleted"})