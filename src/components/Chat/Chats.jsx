import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import PerfilImg from '../../assets/images/Perfil.png';

export default function ChatBubble({ name, avatar, lastMessage, time }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 1.5,
        borderRadius: 2,
        cursor: 'pointer',
        bgcolor: 'background.paper',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // sombra solo abajo
        mb: 0.5,
        '&:hover': {
          boxShadow: '0px 6px 8px rgba(76, 155, 130, 0.6)', // sombra verde suave solo abajo
          bgcolor: 'grey.100',
        },
      }}
    >
      {/* Avatar */}
      <Avatar src={avatar || PerfilImg} alt={name} sx={{ width: 56, height: 56 }} />
      {/* Textual info */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle1"
          noWrap
          sx={{ fontWeight: 'bold', mb: 0.3 }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
        >
          {lastMessage}
        </Typography>
      </Box>

      {/* Time */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ minWidth: '45px', textAlign: 'right' }}
      >
        {time}
      </Typography>
    </Box>
  );
}
