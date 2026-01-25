import React from 'react';
import { Shield, Building2, Mail, Plus, Trash2, Info } from 'lucide-react';

const AdminPanel = ({ 
  clubs, 
  mailingList, 
  newClubName, 
  setNewClubName, 
  newEmail, 
  setNewEmail, 
  onAddClub, 
  onRemoveClub, 
  onAddEmail, 
  onRemoveEmail 
}) => {
  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-2">
        <Shield className="text-indigo-600" />
        <h2 className="text-2xl font-bold">Admin Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Club Registry */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Building2 size={18} className="text-indigo-500" /> Authorized Clubs
          </h3>
          <div className="flex gap-2 mb-4">
            <input 
              className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Add Club Name..."
              value={newClubName}
              onChange={(e) => setNewClubName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onAddClub()}
            />
            <button onClick={onAddClub} className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
              <Plus size={20} />
            </button>
          </div>
          <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
            {clubs.map(club => (
              <div key={club} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                <span className="text-sm font-medium">{club}</span>
                <button onClick={() => onRemoveClub(club)} className="text-slate-300 hover:text-rose-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Mailing List */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Mail size={18} className="text-indigo-500" /> Notification List
          </h3>
          <div className="flex gap-2 mb-4">
            <input 
              className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Add Email/Batch..."
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onAddEmail()}
            />
            <button onClick={onAddEmail} className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
              <Plus size={20} />
            </button>
          </div>
          <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
            {mailingList.map(email => (
              <div key={email} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-sm font-medium truncate max-w-[180px]">{email}</span>
                <button onClick={() => onRemoveEmail(email)} className="text-slate-300 hover:text-rose-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl text-indigo-800 text-sm">
        <p className="font-bold flex items-center gap-2 mb-1">
          <Info size={16} /> Notification Pipeline
        </p>
        <p>
          Updates posted today will be compiled and sent to {mailingList.length} recipients at midnight. 
          Only events from the {clubs.length} registered clubs will be processed.
        </p>
      </div>
    </section>
  );
};

export default AdminPanel;
