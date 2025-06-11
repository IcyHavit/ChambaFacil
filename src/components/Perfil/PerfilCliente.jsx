// ✅ Versión final refinada — PerfilCliente.jsx (sin sección de imágenes de trabajo)

import { useState } from 'react';
import {
  Avatar, Typography, TextField, Grid, Button,
  Box, MenuItem, Divider, Paper, Checkbox, FormGroup, FormControlLabel,
  useTheme, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Footer from '../Footer';
import Navbar from '../Navbar';

const tiposCliente = ['Particular', 'Representante del negocio'];
const metodosPago = ['Efectivo', 'Transferencia', 'Tarjeta'];
const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function PerfilCliente() {
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [datos, setDatos] = useState({
    nombre: 'Juan Pérez',
    fechaNacimiento: '1990-01-01',
    tipoCliente: '',
    telefono1: '',
    telefono2: '',
    horarios: [],
    metodoPago: [],
  });

  const toggleEdit = () => setEditMode(!editMode);
  const handleChange = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });
  const handleCheckChange = (e, key) => {
    const { value, checked } = e.target;
    const actual = new Set(datos[key]);
    checked ? actual.add(value) : actual.delete(value);
    setDatos((prev) => ({ ...prev, [key]: Array.from(actual) }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <Stack sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Navbar />

      <Paper elevation={3} sx={{ maxWidth: 1000, mx: 'auto', mt: 5, p: 4, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mb: 4 }}>
          {editMode ? (
            <>
              <input accept="image/*" type="file" onChange={handleFileChange} id="fotoPerfil" style={{ display: 'none' }} />
              <label htmlFor="fotoPerfil">
                <Avatar
                  src={preview || undefined}
                  sx={{ width: 120, height: 120, border: `3px solid ${theme.palette.primary.main}`, boxShadow: 3, cursor: 'pointer' }}
                />
              </label>
            </>
          ) : (
            <Avatar
              src={preview || undefined}
              sx={{ width: 120, height: 120, border: `3px solid ${theme.palette.primary.main}`, boxShadow: 3 }}
            />
          )}

          <Box mt={2}>
            {editMode ? (
              <TextField
                name="nombre"
                value={datos.nombre}
                onChange={handleChange}
                variant="standard"
                fullWidth
                sx={{ input: { textAlign: 'center', fontSize: '1.5rem' } }}
              />
            ) : (
              <Typography variant="h5" fontWeight="bold" color="text.primary" textAlign="center">
                {datos.nombre}
              </Typography>
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>Información Personal</Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Fecha de Nacimiento</Typography>
            <TextField fullWidth type="date" name="fechaNacimiento" value={datos.fechaNacimiento} onChange={handleChange} disabled={!editMode} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Tipo de Cliente</Typography>
            {editMode ? (
              <TextField select name="tipoCliente" value={datos.tipoCliente} onChange={handleChange} fullWidth>
                {tiposCliente.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
            ) : (
              <TextField fullWidth value={datos.tipoCliente} disabled />
            )}
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Teléfono 1</Typography>
            <TextField fullWidth name="telefono1" value={datos.telefono1} onChange={handleChange} disabled={!editMode} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Teléfono 2</Typography>
            <TextField fullWidth name="telefono2" value={datos.telefono2} onChange={handleChange} disabled={!editMode} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Métodos de Pago</Typography>
            <FormGroup>
              {metodosPago.map((m) => (
                <FormControlLabel
                  key={m}
                  control={<Checkbox checked={datos.metodoPago.includes(m)} onChange={(e) => handleCheckChange(e, 'metodoPago')} value={m} disabled={!editMode} />}
                  label={m}
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Horarios Preferidos</Typography>
            <FormGroup>
              {diasSemana.map((d) => (
                <FormControlLabel
                  key={d}
                  control={<Checkbox checked={datos.horarios.includes(d)} onChange={(e) => handleCheckChange(e, 'horarios')} value={d} disabled={!editMode} />}
                  label={d}
                />
              ))}
            </FormGroup>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={4}>
          <Button variant="contained" startIcon={editMode ? <SaveIcon /> : <EditIcon />} onClick={toggleEdit}>
            {editMode ? 'Guardar cambios' : 'Editar perfil'}
          </Button>
        </Box>
      </Paper>

      <Footer />
    </Stack>
  );
}
