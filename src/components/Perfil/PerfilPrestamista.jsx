import { useState } from 'react';
import {
  Avatar, Typography, TextField, Grid, Button,
  Box, MenuItem, Divider, Paper,
  useTheme, Modal, IconButton,Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Footer from '../Footer';
import Navbar from '../Navbar';

import PerfilImg from '../../assets/images/Perfil.png';

const tiposPrestamista = ['Individual', 'Cuadrilla', 'Empresa pequeña'];
const metodosPago = ['Efectivo', 'Transferencia', 'Tarjeta'];

export default function PerfilPrestamista() {
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [datos, setDatos] = useState({
    nombre: 'Carlos Martínez',
    fechaNacimiento: '1985-05-12',
    descripcion: '',
    tipoPrestamista: '',
    contacto1: '',
    contacto2: '',
    portafolio: '',
    metodoPago: '',
    imagenes: [PerfilImg, PerfilImg, PerfilImg, PerfilImg, PerfilImg],
  });

  const handleChange = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });
  const toggleEdit = () => setEditMode(!editMode);

  const handleImageClick = (src) => {
    setModalImage(src);
    setModalOpen(true);
  };

  return (

    <Stack sx={{ height: '100vh', width: '100%' }}>
    <Navbar />

    <Paper elevation={3} sx={{ p: 4, maxWidth: 1000, mx: 'auto', mt: 5, borderRadius: 4,mb: 4 }}>
    
      <Box textAlign="center">
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
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mx: 'auto',
              border: `3px solid ${theme.palette.tertiary.main}`,
              boxShadow: 3,
            }}
          />

          <Typography mt={1}>
            {editMode ? (
              <TextField
                type="date"
                name="fechaNacimiento"
                value={datos.fechaNacimiento}
                onChange={handleChange}
                sx={{ input: { color: theme.palette.tertiary.main } }}
              />
            ) : (
              datos.fechaNacimiento || 'Por definir'
            )}
          </Typography>

          <Typography variant="h4" mt={2} fontWeight="bold">
            {editMode ? (
              <TextField
                name="nombre"
                value={datos.nombre}
                onChange={handleChange}
                variant="standard"
                fullWidth
                sx={{ input: { color: theme.palette.tertiary.main } }}
              />
            ) : (
              datos.nombre
            )}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography mt={2} variant="subtitle1">Tipo de prestamista</Typography>
        <Typography>
          {editMode ? (
            <TextField
              select
              name="tipoPrestamista"
              value={datos.tipoPrestamista}
              onChange={handleChange}
              size="small"
              sx={{
                bgcolor: theme.palette.background.paper,
                borderRadius: 1,
                color: theme.palette.text.primary,
                '& .MuiInputBase-root': {
                  color: theme.palette.text.primary,
                },
              }}
            >
              {tiposPrestamista.map(tipo => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            datos.tipoPrestamista || <Typography fontStyle="italic">Por definir</Typography>
          )}
        </Typography>

        <Grid container spacing={2} justifyContent="center" mt={2}>
          <Grid item xs={12} sm={6} md={5}>
            {editMode ? (
              <TextField
                label="Contacto 1"
                name="contacto1"
                value={datos.contacto1}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              <>
                <Typography variant="subtitle2">Contacto 1</Typography>
                <Typography>{datos.contacto1 || 'Por definir'}</Typography>
              </>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            {editMode ? (
              <TextField
                label="Contacto 2"
                name="contacto2"
                value={datos.contacto2}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              <>
                <Typography variant="subtitle2">Contacto 2</Typography>
                <Typography>{datos.contacto2 || 'Por definir'}</Typography>
              </>
            )}
          </Grid>
        </Grid>

        {/* Método de pago */}
        <Grid item xs={12} mt={3}>
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
              {metodosPago.map(m => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </TextField>
          ) : (
            <Typography>{datos.metodoPago || 'Por definir'}</Typography>
          )}
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Grid>
        {/* Descripción */}
        <Grid item xs={12}>
          <Typography>Descripción</Typography>
          <TextField
            name="descripcion"
            value={datos.descripcion}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            disabled={!editMode}
            placeholder="Por definir"
          />
        </Grid>

        {/* Portafolio */}
        <Grid item xs={12}>
          <Typography>Portafolio / Experiencia</Typography>
          <TextField
            name="portafolio"
            value={datos.portafolio}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            disabled={!editMode}
            placeholder="Por definir"
          />
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Imágenes */}
        <Grid item xs={12}>
          <Typography variant="body2" fontStyle="italic" color="text.secondary">
            Imágenes de trabajos (máx. 5)
          </Typography>
          {editMode && (
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.target.files).slice(0, 5);
                const urls = files.map(file => URL.createObjectURL(file));
                setDatos(prev => ({ ...prev, imagenes: urls }));
              }}
            />
          )}

          {!editMode && datos.imagenes.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 2 }}>
              {datos.imagenes.map((src, idx) => (
                <Box
                  key={idx}
                  component="img"
                  src={src}
                  alt={`imagen-${idx}`}
                  onClick={() => handleImageClick(src)}
                  sx={{
                    width: 150,
                    height: 150,
                    objectFit: 'cover',
                    borderRadius: 2,
                    boxShadow: 1,
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Box>
          )}
        </Grid>
      </Grid>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 2,
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none'
          }}
        >
          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={modalImage}
            alt="preview"
            sx={{
              maxWidth: '100%',
              maxHeight: '80vh',
              display: 'block',
              mx: 'auto',
              mt: 4
            }}
          />
        </Box>
      </Modal>

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          startIcon={editMode ? <SaveIcon /> : <EditIcon />}
          onClick={toggleEdit}
        >
          {editMode ? 'Guardar cambios' : 'Editar perfil'}
        </Button>
      </Box>
    </Paper>
    <Footer />
    </Stack>
  );
}
