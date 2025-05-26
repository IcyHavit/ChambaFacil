import React from 'react';
import { Box, Typography } from '@mui/material';

export default function MessageBubble({ from, text, time }) {
  const isMe = from === 'me';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isMe ? 'flex-end' : 'flex-start',
        mb: 1,
      }}
    >
      <Box
        sx={{
          maxWidth: '70%',
          bgcolor: isMe ? 'primary.main' : 'grey.300',
          color:  isMe ? 'common.white' : 'text.primary',
          p: 1.2,
          borderRadius: 1,
        }}
      >
        <Typography variant="body2">{text}</Typography>
        <Typography
          variant="caption"
          sx={{ display: 'block', textAlign: 'right', opacity: 0.7 }}
        >
          {time}
        </Typography>
      </Box>
    </Box>
  );
}