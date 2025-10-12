from datetime import datetime, timezone

def utcnow() -> datetime:
    """Return timezone-aware UTC datetime for app logic (JWT, logging)."""
    return datetime.now(timezone.utc)

def utcnow_naive() -> datetime:
    """Return UTC-naive datetime for DB DATETIME columns."""
    return datetime.now(timezone.utc).replace(tzinfo=None)
