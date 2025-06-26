// src/components/Chat/Informacion.jsx   (o ProfilePanel.jsx)
import React from 'react';
import PerfilImg from '../../assets/images/Perfil.png';
import {
  Avatar,
  Box,
  Dialog,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Rating,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ProfilePanel({ user, files, onClose }) {
  // 1) Estado para la imagen a previsualizar
  const [previewSrc, setPreviewSrc] = React.useState(null);

  return (
    <>
      {/* ---------- Panel lateral ---------- */}
      <Box
        sx={{
          width: 340,
          height:'calc(100vh - 64px - 32px)',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* botón cerrar */}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" fontWeight="bold" mb={2}>
          Perfil
        </Typography>

        {/* avatar */}
        <Avatar
          src={user.avatar || PerfilImg}
          alt={user.name}
          sx={{ width: 140, height: 140, mx: 'auto', mb: 2 }}
        />

        <Typography variant="h6" align="center" fontWeight="bold">
          {user.name}
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          mb={2}
        >
          {user.job}
        </Typography>

        <Typography variant="body2" mb={0.5}>
          <strong style={{ color: '#4c9b82' }}>Tel 1:</strong>&nbsp;{user.phone1}
        </Typography>
        <Typography variant="body2" mb={2}>
          <strong style={{ color: '#4c9b82' }}>Tel 2:</strong>&nbsp;{user.phone2}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" fontWeight="bold" mr={1}>
            {user.rating.toFixed(1)} Rating
          </Typography>
          <Rating readOnly precision={0.5} value={user.rating} size="small" />
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* ---------- Galería de archivos ---------- */}
        <Typography variant="body1" fontWeight="bold" mb={1}>
          Archivos compartidos
        </Typography>

        <ImageList cols={3} gap={8} sx={{ overflowY: 'auto' }}>
          {files.map((f, index) => (
            <ImageListItem
              key={f.id || index}
              sx={{ cursor: 'pointer' }}
              onClick={() => setPreviewSrc(f)}
            >
              <img
                src={f}
                alt={f.filename || `Archivo ${index + 1}`}
                loading="lazy"
                style={{ borderRadius: 4 }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      {/* ---------- Diálogo de previsualización ---------- */}
      <Dialog
        open={Boolean(previewSrc)}
        onClose={() => setPreviewSrc(null)}
        maxWidth="lg"
        PaperProps={{
          sx: { bgcolor: 'transparent', boxShadow: 'none' },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => setPreviewSrc(null)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'common.white',
              bgcolor: 'rgba(0,0,0,0.4)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
            }}
          >
            <CloseIcon />
          </IconButton>

          <img
            src={previewSrc}
            alt="preview"
            style={{
              display: 'block',
              maxWidth: '90vw',
              maxHeight: '90vh',
              margin: 'auto',
              borderRadius: 8,
            }}
          />
        </Box>
      </Dialog>
    </>
  );
}
