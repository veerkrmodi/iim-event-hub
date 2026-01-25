import React from 'react';
import { Filter } from 'lucide-react';
import { CATEGORIES } from '../utils/constants';

const Filters = ({ filterClub, setFilterClub, filterCategory, setFilterCategory, clubs }) => {
  return (
    <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="text-[10px] font-bold uppercase text-slate-400 mb-1.5 block tracking-widest">Source</label>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <select 
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-indigo-500 outline-none"
            value={filterClub}
            onChange={(e) => setFilterClub(e.target.value)}
          >
            <option value="All">All Clubs & Committees</option>
            {clubs.map(club => (
              <option key={club} value={club}>{club}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="text-[10px] font-bold uppercase text-slate-400 mb-1.5 block tracking-widest">Event Type</label>
        <select 
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default Filters;
