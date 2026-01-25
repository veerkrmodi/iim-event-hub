import { useState, useMemo } from 'react';
import { useFirestore } from './useFirestore';

export const useEvents = (user, filterClub, filterCategory) => {
  const { data: events, loading } = useFirestore(user, 'events');
  
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchClub = filterClub === 'All' || event.club === filterClub;
      const matchCategory = filterCategory === 'All' || event.category === filterCategory;
      return matchClub && matchCategory;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events, filterClub, filterCategory]);

  return { events: filteredEvents, loading, allEvents: events };
};
