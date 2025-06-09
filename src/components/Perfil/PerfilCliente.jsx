import { useState } from 'react';
import {
  Avatar, Typography, TextField, Grid, Button,
  Box, MenuItem, Divider, Paper,
  useTheme,Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Footer from '../Footer';
import Navbar from '../Navbar';

const tiposCliente = ['Particular', 'Representante del negocio'];
const metodosPago = ['Efectivo', 'Transferencia', 'Tarjeta'];

export default function PerfilCliente() {
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [datos, setDatos] = useState({
    nombre: 'Juan Pérez',
    fechaNacimiento: '1990-01-01',
    tipoCliente: '',
    telefono1: '',
    telefono2: '',
    horarios: '',
    metodoPago: '',
  });

  const handleChange = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });
  const mostrarValor = (v) => v?.trim() ? v : <Typography color="text.disabled">Por definir</Typography>;
  const toggleEdit = () => setEditMode(!editMode);

  return (
    <Stack sx={{ height: '100vh', width: '100%' }}>
    <Navbar />
    <Paper elevation={3} sx={{ p: 0, maxWidth: 1000, mx: 'auto', mt: 5, borderRadius: 4,mb: 4 }}>
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.tertiary.main,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          px: 4,
          py: 5,
          textAlign: 'center'
        }}
      >
        <Avatar sx={{ width: 120, height: 120, mx: 'auto', border: `3px solid ${theme.palette.tertiary.main}`, boxShadow: 3 }} />
        <Typography variant="h4" mt={2} fontWeight="bold">
          {editMode ? (
            <TextField name="nombre" value={datos.nombre} onChange={handleChange} variant="standard" fullWidth sx={{ input: { color: theme.palette.tertiary.main } }} />
          ) : mostrarValor(datos.nombre)}
        </Typography>
        <Typography mt={2}>
          {editMode ? (
            <TextField type="date" name="fechaNacimiento" value={datos.fechaNacimiento} onChange={handleChange} sx={{ input: { color: theme.palette.tertiary.main } }} />
          ) : datos.fechaNacimiento || 'Por definir'}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3} px={4}>
        <Grid item xs={12}>
          <Typography>Tipo de cliente</Typography>
          {editMode ? (
            <TextField
              select
              name="tipoCliente"
              value={datos.tipoCliente}
              onChange={handleChange}
              fullWidth
              sx={{
                bgcolor: theme.palette.background.paper,
                borderRadius: 1,
                color: theme.palette.text.primary,
                '& .MuiInputBase-root': {
                  color: theme.palette.text.primary,
                },
              }}
            >
              {tiposCliente.map(tipo => <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>)}
            </TextField>
          ) : mostrarValor(datos.tipoCliente)}
        </Grid>

        <Grid item xs={12}>
          {editMode ? (
            <TextField label="Teléfono 1" name="telefono1" value={datos.telefono1} onChange={handleChange} fullWidth />
          ) : (
            <>
              <Typography variant="subtitle2">Teléfono 1</Typography>
              <Typography>{datos.telefono1 || 'Por definir'}</Typography>
            </>
          )}
        </Grid>

        <Grid item xs={12}>
          {editMode ? (
            <TextField label="Teléfono 2" name="telefono2" value={datos.telefono2} onChange={handleChange} fullWidth />
          ) : (
            <>
              <Typography variant="subtitle2">Teléfono 2</Typography>
              <Typography>{datos.telefono2 || 'Por definir'}</Typography>
            </>
          )}
        </Grid>

        <Grid item xs={12}>
          {editMode ? (
            <TextField label="Horarios preferidos" name="horarios" value={datos.horarios} onChange={handleChange} fullWidth />
          ) : (
            <>
              <Typography variant="subtitle2">Horarios preferidos</Typography>
              <Typography>{datos.horarios || 'Por definir'}</Typography>
            </>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography>Método de pago</Typography>
          {editMode ? (
            <TextField
              select
              name="metodoPago"
              value={datos.metodoPago}
              onChange={handleChange}
              fullWidth
              sx={{
                bgcolor: theme.palette.background.paper,
                borderRadius: 1,
                color: theme.palette.text.primary,
                '& .MuiInputBase-root': {
                  color: theme.palette.text.primary,
                },
              }}
            >
              {metodosPago.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
            </TextField>
          ) : mostrarValor(datos.metodoPago)}
        </Grid>
      </Grid>

      <Box textAlign="center" mt={4} mb={3}>
        <Button variant="contained" color="primary" startIcon={editMode ? <SaveIcon /> : <EditIcon />} onClick={toggleEdit}>
          {editMode ? 'Guardar cambios' : 'Editar perfil'}
        </Button>
      </Box>
    </Paper>

    <Footer />
    </Stack>
  );
}
