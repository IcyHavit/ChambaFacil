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
  const { id, puesto, ubicacion, tipo, inicio } = data;

  /* ---------- diálogo rechazo / cancelación ---------- */
  const [openReject, setOpenReject] = useState(false);
  const [reason, setReason] = useState('');

  const handleSendReject = () => {
    onReject?.(id, reason);
    setOpenReject(false);
    setReason('');
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
              onClick={() => onAccept?.(id)}
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
