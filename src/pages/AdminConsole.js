import React from 'react';
import AdminPanel from '../components/AdminPanel';

const AdminConsole = ({
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
    <AdminPanel
      clubs={clubs}
      mailingList={mailingList}
      newClubName={newClubName}
      setNewClubName={setNewClubName}
      newEmail={newEmail}
      setNewEmail={setNewEmail}
      onAddClub={onAddClub}
      onRemoveClub={onRemoveClub}
      onAddEmail={onAddEmail}
      onRemoveEmail={onRemoveEmail}
    />
  );
};

export default AdminConsole;
