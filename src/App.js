import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StudentPortal from './pages/StudentPortal';
import ClubDashboard from './pages/ClubDashboard'; // ← Import ClubDashboard
import AdminConsole from './pages/AdminConsole';
import EventModal from './components/EventModal';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';
import { useEvents } from './hooks/useEvents';
import { useSettings } from './hooks/useSettings';
import { auth, db, appId } from './firebase/config';
import { addDoc, updateDoc, deleteDoc, doc, collection } from 'firebase/firestore';
import { CATEGORIES, VIEWS } from './utils/constants';

function App() {
  const { user, loading: authLoading } = useAuth(window.__initial_auth_token);
  const [view, setView] = useState(VIEWS.STUDENT);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [filterClub, setFilterClub] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  
  const [newClubName, setNewClubName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    club: '',
    date: '',
    time: '',
    venue: '',
    category: CATEGORIES[0],
    description: '',
  });

  const { events, loading: eventsLoading } = useEvents(user, filterClub, filterCategory);
  const { clubs, mailingList, updateSettings } = useSettings(user);

  useEffect(() => {
    if (clubs.length > 0 && !formData.club) {
      setFormData(prev => ({ ...prev, club: clubs[0] }));
    }
  }, [clubs, formData.club]);

  const handleAddClub = async () => {
    if (!newClubName.trim()) return;
    await updateSettings({ clubs: [...clubs, newClubName.trim()] });
    setNewClubName('');
  };

  const handleRemoveClub = async (clubName) => {
    await updateSettings({ clubs: clubs.filter(club => club !== clubName) });
  };

  const handleAddEmail = async () => {
    if (!newEmail.trim() || !newEmail.includes('@')) return;
    await updateSettings({ mailingList: [...mailingList, newEmail.trim().toLowerCase()] });
    setNewEmail('');
  };

  const handleRemoveEmail = async (email) => {
    await updateSettings({ mailingList: mailingList.filter(e => e !== email) });
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    if (!user) return;
    
    const payload = { 
      ...formData, 
      updatedAt: new Date().toISOString(), 
      createdBy: user.uid 
    };

    try {
      if (editingEvent) {
        await updateDoc(
          doc(db, 'artifacts', appId, 'public', 'data', 'events', editingEvent.id), 
          payload
        );
      } else {
        await addDoc(
          collection(db, 'artifacts', appId, 'public', 'data', 'events'), 
          payload
        );
      }
      setIsModalOpen(false);
      setEditingEvent(null);
      resetForm();
    } catch (err) {
      console.error("Save Error:", err);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Confirm deletion of this event?")) {
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'events', id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      club: clubs[0] || '',
      date: '',
      time: '',
      venue: '',
      category: CATEGORIES[0],
      description: '',
    });
  };

  const handleCreateEvent = () => {
    setEditingEvent(null);
    resetForm();
    setIsModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    resetForm();
  };

  if (authLoading || eventsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <Navbar view={view} setView={setView} />
      
      <main className="max-w-4xl mx-auto px-4 mt-6">
        {view === VIEWS.ADMIN ? (
          <AdminConsole
            clubs={clubs}
            mailingList={mailingList}
            newClubName={newClubName}
            setNewClubName={setNewClubName}
            newEmail={newEmail}
            setNewEmail={setNewEmail}
            onAddClub={handleAddClub}
            onRemoveClub={handleRemoveClub}
            onAddEmail={handleAddEmail}
            onRemoveEmail={handleRemoveEmail}
          />
        ) : view === VIEWS.CLUB ? (
          <ClubDashboard
            events={events}
            clubs={clubs}
            user={user}
            filterClub={filterClub}
            setFilterClub={setFilterClub}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
            onCreateEvent={handleCreateEvent}
          />
        ) : (
          <StudentPortal
            events={events}
            clubs={clubs}
            view={view}
            user={user}
            filterClub={filterClub}
            setFilterClub={setFilterClub}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
            onCreateEvent={handleCreateEvent}
          />
        )}

        <Footer />
      </main>

      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingEvent={editingEvent}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSaveEvent}
        clubs={clubs}
      />
    </div>
  );
}

export default App;
