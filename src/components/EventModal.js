import React from 'react';
import { X } from 'lucide-react';
import { CATEGORIES } from '../utils/constants';

const EventModal = ({ 
  isOpen, 
  onClose, 
  editingEvent, 
  formData, 
  setFormData, 
  onSubmit, 
  clubs 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-xl rounded-t-[2.5rem] sm:rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-10 duration-500 max-h-[95vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                {editingEvent ? 'Edit Event' : 'New Publication'}
              </h3>
              <p className="text-sm text-slate-500">Broadcasting to the campus hub.</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-900 bg-slate-100 p-2 rounded-full transition-all">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">
                Title of Event
              </label>
              <input 
                required
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                placeholder="e.g. Annual Consulting Summit"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">
                  Hosting Organization
                </label>
                <select 
                  required
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
                  value={formData.club}
                  onChange={(e) => setFormData({...formData, club: e.target.value})}
                >
                  {clubs.map(club => (
                    <option key={club} value={club}>{club}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">
                  Genre
                </label>
                <select 
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">
                  Scheduled Date
                </label>
                <input 
                  required
                  type="date"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">
                  Start Time
                </label>
                <input 
                  required
                  type="time"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">
                Venue / Digital Link
              </label>
              <input 
                required
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
                placeholder="Auditorium / Zoom Link"
                value={formData.venue}
                onChange={(e) => setFormData({...formData, venue: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">
                Brief Description
              </label>
              <textarea 
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none h-28 resize-none"
                placeholder="What should students know?"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-200 transition-all active:scale-[0.98] mt-4 uppercase tracking-widest"
            >
              {editingEvent ? 'Confirm Changes' : 'Post to Hub'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
