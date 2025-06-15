import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PerfilImg from '../../assets/images/Perfil.png';

export default function ChatBubble({
  name,
  avatar,
  lastMessage,
  time,
  onSelect,          
  isActive = false, 
}) {
  return (
    <Box
      onClick={onSelect}                    
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 1.5,
        mb: 1.5,
        borderRadius: 2,
        cursor: 'pointer',
        bgcolor: isActive ? 'primary.main' : 'background.paper',
        color: isActive ? 'white' : 'text.primary',
        boxShadow: 1,
        '&:hover': { boxShadow: '0 0 8px 2px #4c9b82AA' },
      }}
    >
      {/* avatar */}
      <Avatar src={avatar || PerfilImg} sx={{ width: 48, height: 48 }}>
      </Avatar>

      {/* texto */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="subtitle1" noWrap fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body2" noWrap>
          {lastMessage}
        </Typography>
      </Box>

      <Typography variant="caption">
        {time}
      </Typography>
    </Box>
  );
}
