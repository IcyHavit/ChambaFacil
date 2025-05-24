import React from 'react';
import { Box } from '@mui/material';
import ChatsList from '../components/Chat/ChatsList';
import ChatWindow from '../components/Chat/ChatWindow';
import ProfilePanel from '../components/Chat/ProfilePanel';

export default function Chat() {
  const [openProfile, setOpenProfile] = React.useState(false);

  return (
    <Box sx={{ height: '100vh', display: 'flex', bgcolor: 'background.default', p: 2, gap: 2 }}>
      <ChatsList />
      <ChatWindow onProfileOpen={() => setOpenProfile(true)} />
      {openProfile && <ProfilePanel onClose={() => setOpenProfile(false)} />}
    </Box>
  );
}