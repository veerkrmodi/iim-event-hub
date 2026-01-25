import { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { db, appId } from '../firebase/config';

export const useSettings = (user) => {
  const [clubs, setClubs] = useState([]);
  const [mailingList, setMailingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const settingsDoc = doc(db, 'artifacts', appId, 'public', 'data', 'settings', 'config');
    
    const unsubscribe = onSnapshot(settingsDoc, 
      (docSnap) => {
        try {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setClubs(data.clubs || []);
            setMailingList(data.mailingList || []);
            setError(null);
          } else {
            // Initialize with default settings if document doesn't exist
            initializeDefaultSettings(settingsDoc);
          }
        } catch (err) {
          console.error("Error processing settings data:", err);
          setError("Failed to load settings");
        } finally {
          setLoading(false);
        }
      }, 
      (error) => {
        console.error("Settings Sync Error:", error);
        setError("Connection error. Please check your internet.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const initializeDefaultSettings = async (settingsRef) => {
    try {
      const defaultSettings = {
        clubs: ["Finance Club", "Marketing Club", "Consulting Club", "Tech Club"],
        mailingList: ["admin@iim.edu", "events@iim.edu"],
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      await setDoc(settingsRef, defaultSettings);
      console.log("Default settings initialized");
    } catch (err) {
      console.error("Error initializing default settings:", err);
      setError("Failed to initialize settings");
    }
  };

  const updateSettings = async (updates) => {
    try {
      const settingsRef = doc(db, 'artifacts', appId, 'public', 'data', 'settings', 'config');
      
      // Add timestamp to updates
      const updatesWithTimestamp = {
        ...updates,
        lastUpdated: new Date().toISOString()
      };
      
      await updateDoc(settingsRef, updatesWithTimestamp);
      return { success: true };
    } catch (error) {
      console.error("Update Settings Error:", error);
      return { 
        success: false, 
        error: error.message || "Failed to update settings" 
      };
    }
  };

  const addClub = async (clubName) => {
    if (!clubName.trim()) {
      return { success: false, error: "Club name cannot be empty" };
    }
    
    if (clubs.includes(clubName.trim())) {
      return { success: false, error: "Club already exists" };
    }

    const result = await updateSettings({ 
      clubs: [...clubs, clubName.trim()] 
    });
    
    return result;
  };

  const removeClub = async (clubName) => {
    const updatedClubs = clubs.filter(club => club !== clubName);
    
    const result = await updateSettings({ clubs: updatedClubs });
    
    if (result.success) {
      // Optional: Also delete events associated with this club
      // await cleanupClubEvents(clubName);
    }
    
    return result;
  };

  const addEmail = async (email) => {
    const trimmedEmail = email.trim().toLowerCase();
    
    if (!trimmedEmail) {
      return { success: false, error: "Email cannot be empty" };
    }
    
    if (!trimmedEmail.includes('@')) {
      return { success: false, error: "Invalid email format" };
    }
    
    if (mailingList.includes(trimmedEmail)) {
      return { success: false, error: "Email already in list" };
    }

    const result = await updateSettings({ 
      mailingList: [...mailingList, trimmedEmail] 
    });
    
    return result;
  };

  const removeEmail = async (email) => {
    const updatedMailingList = mailingList.filter(e => e !== email);
    
    return await updateSettings({ mailingList: updatedMailingList });
  };

  // Optional: Clean up events when a club is removed
  const cleanupClubEvents = async (clubName) => {
    try {
      // This is a placeholder - you'd need to implement actual cleanup logic
      // For example, query and delete events with club: clubName
      console.log(`Cleanup triggered for club: ${clubName}`);
      return { success: true };
    } catch (error) {
      console.error("Cleanup error:", error);
      return { success: false, error: error.message };
    }
  };

  // Get club statistics
  const getClubStats = (events = []) => {
    return clubs.reduce((stats, club) => {
      const clubEvents = events.filter(event => event.club === club);
      stats[club] = {
        name: club,
        totalEvents: clubEvents.length,
        upcomingEvents: clubEvents.filter(e => new Date(e.date) >= new Date()).length,
        pastEvents: clubEvents.filter(e => new Date(e.date) < new Date()).length
      };
      return stats;
    }, {});
  };

  return {
    clubs,
    mailingList,
    loading,
    error,
    
    // Update methods
    updateSettings,
    addClub,
    removeClub,
    addEmail,
    removeEmail,
    
    // Helper methods
    getClubStats,
    
    // State setters (for local form state sync)
    setClubs,
    setMailingList
  };
};

export default useSettings;
