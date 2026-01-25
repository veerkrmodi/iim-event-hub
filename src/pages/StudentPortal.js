import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import EventCard from '../components/EventCard';
import Filters from '../components/Filters';

const StudentPortal = ({ 
  events, 
  clubs, 
  view, 
  user, 
  filterClub, 
  setFilterClub, 
  filterCategory, 
  setFilterCategory,
  onEditEvent,
  onDeleteEvent,
  onCreateEvent
}) => {
  return (
    <>
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <p className="text-slate-500">Live campus feed via IIM Hub.</p>
        </div>
        {view !== 'student' && (
          <button 
            onClick={onCreateEvent}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg active:scale-95"
          >
            <Plus size={18} /> <span>Create Event</span>
          </button>
        )}
      </header>

      <Filters 
        filterClub={filterClub}
        setFilterClub={setFilterClub}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        clubs={clubs}
      />

      <div className="space-y-4">
        {events.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
            <Calendar size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-medium">No events found matching your criteria.</p>
          </div>
        ) : (
          events.map(event => (
            <EventCard 
              key={event.id}
              event={event}
              view={view}
              user={user}
              onEdit={() => onEditEvent(event)}
              onDelete={() => onDeleteEvent(event.id)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default StudentPortal;
