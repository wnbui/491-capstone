from flask import Blueprint, jsonify, request
from sqlalchemy import select
from ..models import Event
from ..schemas import EventCreateIn, EventUpdateIn
from ..pyd import parse_body
from .. import db
from .auth import token_required
from datetime import datetime

events_bp = Blueprint("events", __name__)

def _serialize_event(e: Event) -> dict:
    return {
        "id": e.id,
        "name": e.name,
        "description": e.description,
        "start": e.start.isoformat() if isinstance(e.start, datetime) else e.start,
        "end": e.end.isoformat() if isinstance(e.end, datetime) else e.end,
        "creation_time": e.creation_time.isoformat() if hasattr(e, "creation_time") and isinstance(e.creation_time, datetime) else getattr(e, "creation_time", None),
        "owner_id": e.owner_id,
    }

@events_bp.route("/", methods=["POST"])
@parse_body(EventCreateIn)
@token_required
def create_event(current_user, body: EventCreateIn):
    event = Event(
        name=body.name,
        description=body.description,
        start=body.start,
        end=body.end,
        owner_id=current_user.id
    )
    db.session.add(event)
    db.session.commit()
    return jsonify(_serialize_event(event)), 201

@events_bp.route("/", methods=["GET"])
@token_required
def list_events(current_user):
    stmt = select(Event).filter_by(owner_id=current_user.id).order_by(Event.creation_time.desc())
    events = db.session.scalars(stmt).all()
    return jsonify([_serialize_event(e) for e in events])

@events_bp.route("/<int:event_id>", methods=["GET"])
@token_required
def get_event(current_user, event_id: int):
    stmt = select(Event).filter_by(id=event_id, owner_id=current_user.id)
    event = db.session.scalars(stmt).first()
    if not event:
        return jsonify({"error": "Not found"}), 404
    return jsonify(_serialize_event(event))

@events_bp.route("/<int:event_id>", methods=["PATCH"])
@parse_body(EventUpdateIn)
@token_required
def update_event(current_user, event_id: int, body: EventUpdateIn):
    stmt = select(Event).filter_by(id=event_id, owner_id=current_user.id)
    event = db.session.scalars(stmt).first()
    if not event:
        return jsonify({"error": "Not found"}), 404
    if body.name is not None:
        event.name = body.name
    if body.description is not None:
        event.description = body.description
    if body.start is not None:
        event.start = body.start
    if body.end is not None:
        event.end = body.end
    db.session.commit()
    return jsonify(_serialize_event(event))

@events_bp.route("/<int:event_id>", methods=["DELETE"])
@token_required
def delete_event(current_user, event_id: int):
    stmt = select(Event).filter_by(id=event_id, owner_id=current_user.id)
    event = db.session.scalars(stmt).first()
    if not event:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(event)
    db.session.commit()
    return jsonify({"message": "Deleted"})