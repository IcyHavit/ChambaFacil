import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { deleteSolicitud, updateSolicitudState } from '../../api/solicitud';

/**
 * Tarjeta para solicitudes **pendientes**.
 *
 * @param {Object}   props
 * @param {Object}   props.data      { id, puesto, ubicacion, tipo, inicio }
 * @param {'cliente'|'prestamista'} props.role
 * @param {Function} props.onAccept  (id)              => void
 * @param {Function} props.onReject  (id, motivo)      => void
 * @param {Function} props.onCancel  (id, motivo)      => void (solo cliente)
 */
export default function SolicitudCardPendiente({
  data,
  role,
  onAccept,
  onReject,
  onCancel,
}) {
  const { id_solicitud, id_servicio, nombreServicio, ubicacion, direccion, tipo = 'Full Time', fechaSolicitud } = data;
  // Formatear la fecha con hora
  const formattedDate = new Date(fechaSolicitud).toLocaleString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Formato 24 horas
  });

  const ubicacionFinal = ubicacion || direccion || 'Ubicación no especificada';

  // Eliminar solicitud
  const handleDeleteSolicitud = async (id_solicitud) => {
    try {
      await deleteSolicitud(id_solicitud);
      console.log('Solicitud eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la solicitud:', error);
    }
  };

  // Pasar a estado "aceptadas"
  const handleAcceptSolicitud = async (id_servicio) => {
    try {
      await updateSolicitudState(id_solicitud, 'aceptadas');
      console.log('Solicitud aceptada correctamente');
      onAccept?.(id_servicio); // Notifica al padre
    } catch (error) {
      console.error('Error al aceptar la solicitud:', error);
    }
  }


  /* ---------- diálogo rechazo / cancelación ---------- */
  const [openReject, setOpenReject] = useState(false);
  const [reason, setReason] = useState('');

  const handleSendReject = async () => {
    onReject?.(id_servicio, reason);
    setOpenReject(false);
    setReason('');
    await handleDeleteSolicitud(id_solicitud); // Elimina la solicitud
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
          gap: 2,
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
          <Typography fontWeight="bold">{nombreServicio}</Typography>

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
              {ubicacionFinal}
            </Box>
            <Divider orientation="vertical" flexItem />
            {tipo}
          </Box>

          <Typography variant="body2" color="text.secondary">
            Fecha de Solicitud:&nbsp;{formattedDate}
          </Typography>
        </Box>

        {/* acciones */}
        {role === 'prestamista' ? (
          <Stack direction={{ xs: 'row', sm: 'row' }} spacing={1}>
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: 'primary.main',
                color: 'common.white',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
              onClick={() => handleAcceptSolicitud(id_solicitud)}
            >
              Aceptar
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenReject(true)}
            >
              Rechazar
            </Button>
          </Stack>
        ) : (
          /* cliente: solo Cancelar (igual que antes) */
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => setOpenReject(true)}
          >
            Cancelar solicitud
          </Button>
        )}
      </Box>

      {/* ---------- Diálogo Rechazar / Cancelar ---------- */}
      <Dialog
        open={openReject}
        onClose={() => setOpenReject(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          {role === 'prestamista' ? 'Rechazar trabajo' : 'Cancelar solicitud'}
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Typography variant="body2" mb={1}>
            Indica brevemente el motivo:
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ej. No podré asistir en ese horario…"
          />
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={() => setOpenReject(false)}>Cerrar</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleSendReject}
            disabled={!reason.trim()}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
