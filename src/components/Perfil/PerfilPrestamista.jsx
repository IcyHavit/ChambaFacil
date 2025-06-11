// ✅ Versión final refinada — PerfilPrestamista.jsx (foto y eliminación de imágenes solo en modo edición)

import { useState } from 'react';
import {
  Avatar, Typography, TextField, Grid, Button,
  Box, MenuItem, Divider, Paper, Checkbox, FormGroup, FormControlLabel,
  useTheme, Modal, IconButton, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Footer from '../Footer';
import Navbar from '../Navbar';

const tiposPrestamista = ['Individual', 'Cuadrilla', 'Empresa pequeña'];
const metodosPago = ['Efectivo', 'Transferencia', 'Tarjeta'];
const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function PerfilPrestamista() {
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imagenes, setImagenes] = useState([]);

  const [datos, setDatos] = useState({
    nombre: 'Carlos Martínez',
    fechaNacimiento: '1985-05-12',
    descripcion: '',
    tipoPrestamista: '',
    contacto1: '',
    contacto2: '',
    portafolio: '',
    metodoPago: [],
    horarios: [],
    redes: { facebook: '', instagram: '', youtube: '' },
  });

  const toggleEdit = () => setEditMode(!editMode);
  const handleChange = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });
  const handleRedChange = (e) => setDatos({ ...datos, redes: { ...datos.redes, [e.target.name]: e.target.value } });
  const handleCheckChange = (e, key) => {
    const { value, checked } = e.target;
    const actual = new Set(datos[key]);
    checked ? actual.add(value) : actual.delete(value);
    setDatos((prev) => ({ ...prev, [key]: Array.from(actual) }));
  };

  const handleImageClick = (src) => {
    setModalImage(src);
    setModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const urls = [...imagenes, ...files].slice(0, 5).map((file) => URL.createObjectURL(file));
    setImagenes(urls);
  };

  const eliminarImagen = (index) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
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
            <Typography variant="subtitle2">Tipo de Prestamista</Typography>
            {editMode ? (
              <TextField select name="tipoPrestamista" value={datos.tipoPrestamista} onChange={handleChange} fullWidth>
                {tiposPrestamista.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
            ) : (
              <TextField fullWidth value={datos.tipoPrestamista} disabled />
            )}
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Contacto 1</Typography>
            <TextField fullWidth name="contacto1" value={datos.contacto1} onChange={handleChange} disabled={!editMode} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Contacto 2</Typography>
            <TextField fullWidth name="contacto2" value={datos.contacto2} onChange={handleChange} disabled={!editMode} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">Descripción</Typography>
            <TextField fullWidth name="descripcion" value={datos.descripcion} onChange={handleChange} multiline rows={3} disabled={!editMode} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">Portafolio / Experiencia</Typography>
            <TextField fullWidth name="portafolio" value={datos.portafolio} onChange={handleChange} multiline rows={3} disabled={!editMode} />
          </Grid>

          <Grid item xs={4}>
            <Typography variant="subtitle2">Métodos de Pago</Typography>
            <FormGroup>
              {metodosPago.map((m) => (
                <FormControlLabel key={m} control={<Checkbox checked={datos.metodoPago.includes(m)} onChange={(e) => handleCheckChange(e, 'metodoPago')} value={m} disabled={!editMode} />} label={m} />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="subtitle2">Horarios Preferidos</Typography>
            <FormGroup>
              {diasSemana.map((d) => (
                <FormControlLabel key={d} control={<Checkbox checked={datos.horarios.includes(d)} onChange={(e) => handleCheckChange(e, 'horarios')} value={d} disabled={!editMode} />} label={d} />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="subtitle2">Redes Sociales</Typography>
            <TextField label="Facebook" name="facebook" value={datos.redes.facebook} onChange={handleRedChange} fullWidth disabled={!editMode} sx={{ mb: 1 }} />
            <TextField label="Instagram" name="instagram" value={datos.redes.instagram} onChange={handleRedChange} fullWidth disabled={!editMode} sx={{ mb: 1 }} />
            <TextField label="Youtube" name="youtube" value={datos.redes.youtube} onChange={handleRedChange} fullWidth disabled={!editMode} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" color="primary">Imágenes de Trabajo (máx. 5)</Typography>
        {editMode && (
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ marginTop: 8 }} />
        )}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
          {imagenes.map((src, idx) => (
            <Box key={idx} sx={{ position: 'relative' }}>
              <Avatar src={src} variant="rounded" sx={{ width: 120, height: 120, boxShadow: 2 }} />
              {editMode && (
                <IconButton size="small" onClick={() => eliminarImagen(idx)} sx={{ position: 'absolute', top: -10, right: -10, bgcolor: 'white', border: '1px solid #ccc' }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>

        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 2, borderRadius: 2, boxShadow: 4 }}>
            <IconButton onClick={() => setModalOpen(false)} sx={{ position: 'absolute', top: 8, right: 8 }}>
              <CloseIcon />
            </IconButton>
            <Box component="img" src={modalImage} alt="preview" sx={{ maxWidth: '100%', maxHeight: '80vh', display: 'block', mx: 'auto', mt: 4 }} />
          </Box>
        </Modal>

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
