import React from 'react';
import { CalendarCheck } from 'lucide-react';
import { VIEWS } from '../utils/constants';

const Navbar = ({ view, setView }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <CalendarCheck size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-none">IIM Event Hub</h1>
          <p className="text-xs text-slate-500 mt-1">Campus Calendar</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <select 
          className="text-sm bg-slate-100 border-none rounded-full px-3 py-1.5 font-semibold cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option value={VIEWS.STUDENT}>Student Portal</option>
          <option value={VIEWS.CLUB}>Club Dashboard</option>
          <option value={VIEWS.ADMIN}>Admin Console</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
