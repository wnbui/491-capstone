from functools import wraps
from flask import request, jsonify
from pydantic import ValidationError

def parse_body(model_cls, arg_name: str = "body"):
    """Validate request JSON with Pydantic and inject as a keyword arg."""
    def wrapper(fn):
        @wraps(fn)
        def inner(*args, **kwargs):
            data = request.get_json(silent=True) or {}
            try:
                obj = model_cls.model_validate(data)
            except ValidationError as e:
                return jsonify({"errors": e.errors()}), 422
            kwargs[arg_name] = obj
            return fn(*args, **kwargs)
        return inner
    return wrapper