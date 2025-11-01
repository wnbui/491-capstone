from flask import Blueprint, jsonify, request
from flask_socketio import join_room, leave_room, emit
from sqlalchemy import select
from ..models import Note
from ..schemas import NoteCreateIn, NoteUpdateIn, NoteOut
from ..pyd import parse_body
from .. import socketio, db
from .auth import token_required

notes_bp = Blueprint("notes", __name__)

@notes_bp.route("/", methods=["POST"])
@parse_body(NoteCreateIn)
@token_required
def create_note(current_user, body: NoteCreateIn):
    note = Note(
        title=body.title, 
        content=body.content, 
        owner_id=current_user.id,
        project_id=body.project_id
    )
    db.session.add(note)
    db.session.commit()
    return jsonify(NoteOut.model_validate(note).model_dump()), 201

@notes_bp.route("/", methods=["GET"])
@token_required
def list_notes(current_user):
    project_id = request.args.get('project_id', type=int)
    
    stmt = select(Note).filter_by(owner_id=current_user.id)
    
    if project_id is not None:
        stmt = stmt.filter_by(project_id=project_id)
    
    stmt = stmt.order_by(Note.updated_at.desc())
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
    if body.project_id is not None:
        note.project_id = body.project_id
    
    db.session.commit()
    
    socketio.emit("note_updated", {
        "note_id": note_id,
        "title": note.title,
        "content": note.content,
        "project_id": note.project_id
    }, room=f"note_{note_id}")
    
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

@socketio.on("join_note")
def handle_join_note(data):
    note_id = data.get("note_id")
    user = data.get("username")
    room = f"note_{note_id}"
    join_room(room)
    emit("user_joined", {"user": user, "note_id": note_id}, room=room)

# Leave a note room
@socketio.on("leave_note")
def handle_leave_note(data):
    note_id = data.get("note_id")
    user = data.get("username")
    room = f"note_{note_id}"
    leave_room(room)
    emit("user_left", {"user": user}, room=room)

# Handle edits
@socketio.on("edit_note")
def handle_edit(data):
    note_id = data["note_id"]
    new_content = data["content"]
    room = f"note_{note_id}"

    # Option A: save to DB immediately (safe but frequent writes)
    note = db.session.get(Note, note_id)
    if note:
        note.content = new_content
        db.session.commit()

    # Broadcast to everyone else editing this note
    emit("note_updated", {"note_id": note_id, "content": new_content}, room=room, include_self=False)