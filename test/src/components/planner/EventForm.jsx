import { useEffect, useState } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

function toInputDateTime(isoString) {
    if (!isoString) return "";
    const d = isoString instanceof Date ? isoString : new Date(isoString);
    if (Number.isNaN(d.getTime())) return "";
    const pad = (n) => String(n).padStart(2, "0");
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const min = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

function localDateTimeToBackendString(value) {
    if (!value) return null;
    let d;
    if (value instanceof Date) {
        d = value;
    } else {
        d = new Date(value);
    }
    
    if (Number.isNaN(d.getTime())) return null;
    
    const pad = (n) => String(n).padStart(2, "0");
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const min = pad(d.getMinutes());
    const sec = pad(d.getSeconds ? d.getSeconds() : 0);
    return `${yyyy}-${mm}-${dd}T${hh}:${min}:${sec}`;
}

export const EventForm = ({ isOpen = true, initial = null, onCreate, onUpdate, onDelete, onCancel }) => {
    const safeOnCancel = onCancel ?? (() => {});
    const [name, setName] = useState(initial?.name ?? "");
    const [description, setDescription] = useState(initial?.description ?? "");
    const [start, setStart] = useState(initial?.start ? toInputDateTime(initial.start) : "");
    const [end, setEnd] = useState(initial?.end ? toInputDateTime(initial.end) : "");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    
    useEffect(() => {
        setName(initial?.name ?? "");
        setDescription(initial?.description ?? "");
        setStart(initial?.start ? toInputDateTime(initial.start) : "");
        setEnd(initial?.end ? toInputDateTime(initial.end) : "");
        setError("");
    }, [initial, isOpen]);
    
    const validate = () => {
        if (!name.trim()) {
            setError("Event name is required.");
            return false;
        }
        if (start && end) {
            const s = new Date(start);
            const e = new Date(end);
            if (s > e) {
                setError("Start must be before or equal to End.");
                return false;
            }
        }
        setError("");
        return true;
    };

    const handleSubmit = async (ev) => {
        ev?.preventDefault?.();
        if (!validate()) return;
        setSaving(true);
        try {
            const payload = {
            name: name.trim(),
            description: description?.trim() ?? "",
            start: start ? localDateTimeToBackendString(start) : null,
            end: end ? localDateTimeToBackendString(end) : null,
            };

            if (initial && initial.id && onUpdate) {
                await onUpdate(initial.id, payload);
            } else if (onCreate) {
                await onCreate(payload);
            } else {
                throw new Error("No create/update handler provided on EventForm.");
            }

            safeOnCancel();
        } catch (err) {
            console.error("EventForm submit error: ", err);
            if (err?.response?.data) {
                const body = err.response.data;
                const msg = body.message || body.error || JSON.stringify(body);
                setError(`Server: ${msg}`);
            } else if (err?.message) {
                setError(err.message);
            } else {
                setError("Failed to save event.");
            }
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!initial || !initial.id) return;
        if (!confirm("Delete this event? This cannot be undone.")) return;
        setSaving(true);
        try {
            if (!onDelete) throw new Error("No delete handler provided.");
            await onDelete(initial.id);
            safeOnCancel();
        } catch (err) {
            console.error("EventForm delete error:", err);
            if (err?.response?.data) {
                const body = err.response.data;
                const msg = body.message || body.error || JSON.stringify(body);
                setError(`Server: ${msg}`);
            } else if (err?.message) {
                setError(err.message);
            } else {
                setError("Failed to delete event.");
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={safeOnCancel} title={initial?.id ? "Edit Event" : "Create Event"}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Event title" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        rows={3}
                        placeholder="Optional description"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start</label>
                        <input
                            type="datetime-local"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">End</label>
                        <input
                            type="datetime-local"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </div>
                </div>

                {error && <div className="text-sm text-red-600">{error}</div>}

                <div className="flex justify-between items-center pt-2">
                    <div className="flex space-x-2">
                        <Button type="button" onClick={safeOnCancel} variant="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={saving}>
                            {saving ? "Saving..." : initial?.id ? "Save" : "Create"}
                        </Button>
                    </div>

                    {initial?.id && (
                    <div>
                        <Button type="button" onClick={handleDelete} variant="danger" disabled={saving}>
                            Delete
                        </Button>
                    </div>
                    )}
                </div>
            </form>
        </Modal>
    );
};

export default EventForm;
