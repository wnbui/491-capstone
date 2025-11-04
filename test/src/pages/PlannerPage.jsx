import { useState, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAuth } from '../hooks/useAuth';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../services/api';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { Modal } from '../components/common/Modal';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import EventForm from "../components/planner/EventForm";

function formatDateToBackendLocal(date) {
  if (!date) return null;
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());
  const sec = pad(d.getSeconds());
  return `${yyyy}-${mm}-${dd}T${hh}:${min}:${sec}`;
}

export const PlannerPage = ({ onNavigate }) => {
    const { token } = useAuth();
    const [events, setEvents] = useState([]);
    const [showEventModal, setShowEventModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getEvents(token);
            setEvents(data.map(e => ({
                id: e.id,
                title: e.name,
                start: e.start,
                end: e.end,
                extendedProps: e
            })));
        } catch (err) {
            console.error("Failed to load events: ", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateEvent = async (eventData) => {
        const response = await createEvent(eventData, token);
        setEvents((events) => [...events, { id: response.id, title: response.name, start: response.start, end: response.end, extendedProps: response }]);
        setShowEventModal(false);
    };

    const handleUpdateEvent = async (id, eventData) => {
        const response = await updateEvent(id, eventData, token);
        setEvents((events) => events.map(e => e.id === id ? { id: response.id, title: response.name, start: response.start, end: response.end, extendedProps: response } : e));
        setShowEventModal(false);
    };

    const handleDeleteEvent = async (id) => {
        await deleteEvent(id, token);
        setEvents((events) => events.filter(e => e.id !== id));
    };

    const handleDateSelect = (selectDateInfo) => {
        setSelected({ start: selectDateInfo.startStr, end: selectDateInfo.endStr });
        setShowEventModal(true);
    };

    const handleEventClick = (clickEventInfo) => {
        setSelected(clickEventInfo.event.extendedProps);
        setShowEventModal(true);
    };

    if (loading) {
        return <LoadingSpinner />;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="flex">
                <Sidebar activePage="planner" onNavigate={onNavigate} />

                <main className="flex-1 p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        Planner
                    </h2>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        selectable={true}
                        editable={true}
                        events={events}
                        select={handleDateSelect}
                        eventClick={handleEventClick}
                        eventDrop={async (info) => {
                            const eventPayload = {
                                name: info.event.title,
                                description: info.event.extendedProps?.description ?? "",
                                start: formatDateToBackendLocal(info.event.start),
                                end: formatDateToBackendLocal(info.event.end ?? info.event.start)
                            };
                            await handleUpdateEvent(info.event.id, eventPayload);
                        }}
                    />
                </main>
            </div>

            {showEventModal && (
                <Modal
                    isOpen={showEventModal}
                    onClose={() => setShowEventModal(false)}
                    title={selected?.id ? "Edit Event" : "Create Event"}
                >
                    <EventForm 
                        initial={selected}
                        onCreate={handleCreateEvent}
                        onUpdate={handleUpdateEvent}
                        onDelete={handleDeleteEvent}
                        onCancel={() => setShowEventModal(false)}
                    />
                </Modal>
            )}
        </div>
    );
};
