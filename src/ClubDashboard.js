import React from 'react';
import { Plus, Calendar, Users, BarChart } from 'lucide-react';
import EventCard from '../components/EventCard';
import Filters from '../components/Filters';

const ClubDashboard = ({ 
  events, 
  clubs, 
  user, 
  filterClub, 
  setFilterClub, 
  filterCategory, 
  setFilterCategory,
  onEditEvent,
  onDeleteEvent,
  onCreateEvent
}) => {
  // Filter events created by current club/user
  const myEvents = events.filter(event => event.createdBy === user?.uid);
  
  // Statistics
  const stats = {
    totalEvents: myEvents.length,
    upcomingEvents: myEvents.filter(e => new Date(e.date) >= new Date()).length,
    pastEvents: myEvents.filter(e => new Date(e.date) < new Date()).length,
    byCategory: myEvents.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {})
  };

  return (
    <>
      {/* Dashboard Header */}
      <header className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">Club Dashboard</h2>
            <p className="text-slate-500">Manage your club's events and analytics</p>
          </div>
          <button 
            onClick={onCreateEvent}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg active:scale-95"
          >
            <Plus size={18} /> <span>Create Event</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-500">Total Events</h3>
              <Calendar size={18} className="text-indigo-500" />
            </div>
            <p className="text-2xl font-bold">{stats.totalEvents}</p>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-500">Upcoming</h3>
              <BarChart size={18} className="text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.upcomingEvents}</p>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-500">Past Events</h3>
              <Calendar size={18} className="text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-amber-600">{stats.pastEvents}</p>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-500">Active Clubs</h3>
              <Users size={18} className="text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{clubs.length}</p>
          </div>
        </div>

        {/* Category Breakdown */}
        {Object.keys(stats.byCategory).length > 0 && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6">
            <h3 className="font-semibold mb-4">Events by Category</h3>
            <div className="space-y-3">
              {Object.entries(stats.byCategory).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm">{category}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${(count / stats.totalEvents) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Filters - Auto-set to user's club */}
      <Filters 
        filterClub={filterClub}
        setFilterClub={setFilterClub}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        clubs={clubs}
      />

      {/* My Events Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">My Club's Events</h3>
          <span className="text-sm text-slate-500">
            Showing {myEvents.length} of {events.length} total events
          </span>
        </div>

        <div className="space-y-4">
          {myEvents.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
              <Calendar size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-medium">No events created by your club yet.</p>
              <button 
                onClick={onCreateEvent}
                className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Create your first event →
              </button>
            </div>
          ) : (
            myEvents.map(event => (
              <EventCard 
                key={event.id}
                event={event}
                view="club"
                user={user}
                onEdit={() => onEditEvent(event)}
                onDelete={() => onDeleteEvent(event.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* All Events Section (Read-only) */}
      {events.length > myEvents.length && (
        <div>
          <h3 className="text-lg font-bold mb-4">All Campus Events</h3>
          <div className="space-y-4">
            {events
              .filter(event => event.createdBy !== user?.uid)
              .slice(0, 3) // Show only first 3
              .map(event => (
                <EventCard 
                  key={event.id}
                  event={event}
                  view="student" // Read-only view
                  user={user}
                  onEdit={() => onEditEvent(event)}
                  onDelete={() => onDeleteEvent(event.id)}
                />
              ))
            }
          </div>
        </div>
      )}
    </>
  );
};

export default ClubDashboard;