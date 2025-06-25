import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Rating, Typography, Box, Divider, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function SolicitudCardAceptada({ data, role, onCancel, onFinish }) {
  const { id, puesto, ubicacion, tipo, inicio } = data;

  /* ---------- estado de diálogos ---------- */
  const [openCancel, setOpenCancel] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);
  const [openRating, setOpenRating] = useState(false); // Nuevo estado para abrir el modal de calificación
  const [cancelReason, setCancelReason] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [rating, setRating] = useState(0); // Estado para la calificación

  /* ---------- efecto para generar / limpiar la URL ---------- */
  useEffect(() => {
    if (!photoFile) {                       // nada seleccionado
        setPreviewUrl(null);
        return;
    }
    const objectUrl = URL.createObjectURL(photoFile);
    setPreviewUrl(objectUrl);
     
    return () => URL.revokeObjectURL(objectUrl); // libera la memoria
  }, [photoFile]);

  /* ---------- handlers ---------- */
  const handleSendCancel = () => {
    onCancel?.(id, cancelReason);      // comunica al padre
    setOpenCancel(false);
    setCancelReason('');
  };

  const handleSendFinish = () => {
  setOpenFinish(false);
  setPhotoFile(null);
  onFinish?.(id, photoFile); // Solo notifica al padre
  };

  const handleSubmitRating = () => {
    console.log('Calificación enviada:', rating);
    // Aquí podrías enviar la calificación al servidor o procesarla
    setOpenRating(false); // Cierra el modal de calificación
  };

  /* ---------- UI ---------- */
  return (
    <>
      <Box
        sx={{
          width: '100%',
          p: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        {/* icono cuadrado */}
        <Box
          sx={{
            width: 48,
            height: 48,
            mr: { xs: 0, sm: 2 },
            mb: { xs: 1, sm: 0 },
            borderRadius: 1,
            bgcolor: 'secondary.main',
            color: 'tertiary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <WorkHistoryIcon />
        </Box>

        {/* texto */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography fontWeight="bold">{puesto}</Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              fontSize: 14,
              color: 'text.secondary',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOnIcon fontSize="inherit" />
              {ubicacion}
            </Box>
            <Divider orientation="vertical" flexItem />
            {tipo}
          </Box>

          <Typography variant="body2" color="text.secondary">
            Inicio:&nbsp;{inicio}
          </Typography>
        </Box>

        {/* acciones según rol */}
        {role === 'cliente' ? (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => setOpenCancel(true)}
          >
            Cancelar trabajo
          </Button>
        ) : (
          <Stack direction={{ xs: 'row', sm: 'row' }} spacing={1}>
            <Button
              variant="contained"
              bgcolor="primary.main"
              size="small"
              onClick={() => setOpenFinish(true)}
            >
              Finalizar
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenCancel(true)}
            >
              Cancelar
            </Button>
          </Stack>
        )}
      </Box>

      {/* ---------- Diálogo Cancelar ---------- */}
      <Dialog open={openCancel} onClose={() => setOpenCancel(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Cancelar trabajo</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Typography variant="body2" mb={1}>
            Indica brevemente el motivo de la cancelación:
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Ej. El cliente cambió de planes..."
          />
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={() => setOpenCancel(false)}>Cerrar</Button>
          <Button variant="contained" color="error" onClick={handleSendCancel}>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>

      {/* ---------- Diálogo Finalizar ---------- */}
      <Dialog open={openFinish} onClose={() => setOpenFinish(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Finalizar trabajo</DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          <Typography variant="body2" mb={1}>
            Sube una foto del trabajo terminado para confirmar su finalización:
          </Typography>

          {/* selector de archivo */}
          <Button variant="outlined" component="label" fullWidth>
            Seleccionar foto
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
            />
          </Button>

          {/* nombre / mini-vista previa */}
          {photoFile && (
            <>
              {/* vista previa */}
              {previewUrl && (
                <Box
                  component="img"
                  src={previewUrl}
                  alt="Vista previa"
                  sx={{
                    mt: 2,
                    width: '100%',
                    maxHeight: 200,
                    objectFit: 'cover',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                />
              )}
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={() => setOpenFinish(false)}>Cerrar</Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'primary.main',
              color: 'common.white',
              '&:hover': { bgcolor: 'tertiary.dark' },
            }}
            onClick={handleSendFinish}
            disabled={!photoFile}
          >
            Finalizar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
