import { useState } from 'react';
import { Avatar, Typography, TextField, Grid, Button, Box, MenuItem } from '@mui/material';

const metodosPago = ['Efectivo', 'Transferencia', 'Tarjeta'];
const tiposCliente = ['Particular', 'Representante del negocio'];
const tiposPrestamista = ['Individual', 'Cuadrilla', 'Empresa pequeña'];

export default function PerfilGeneral({ userType = 'Cliente' }) {
  const [editMode, setEditMode] = useState(false);
  const [datos, setDatos] = useState({
    nombre: 'Juan Pérez',
    fechaNacimiento: '1990-01-01',
    metodoPago: '',
    // Cliente
    tipoCliente: '',
    telefono1: '',
    telefono2: '',
    horarios: '',
    // Prestamista
    descripcion: '',
    tipoPrestamista: '',
    portafolio: '',
    contacto1: '',
    contacto2: '',
    imagenes: []
  });

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => setEditMode(!editMode);

  return (
    <Box p={4} sx={{ maxWidth: 800, margin: 'auto' }}>
      {/* Bloque 1 */}
      <Box textAlign="center" mb={4}>
        <Avatar sx={{ width: 100, height: 100, margin: 'auto' }} />
        <Typography variant="h5" mt={2}>
          {editMode ? (
            <TextField name="nombre" value={datos.nombre} onChange={handleChange} />
          ) : datos.nombre}
        </Typography>
      </Box>

      {/* Bloque 2 (común) */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6}>
          <Typography>Fecha de nacimiento</Typography>
          {editMode ? (
            <TextField
              type="date"
              name="fechaNacimiento"
              value={datos.fechaNacimiento}
              onChange={handleChange}
              fullWidth
            />
          ) : (
            <Typography>{datos.fechaNacimiento}</Typography>
          )}
        </Grid>

        {userType === 'Cliente' && (
          <>
            <Grid item xs={12} sm={6}>
              <Typography>Tipo de usuario</Typography>
              {editMode ? (
                <TextField
                  select
                  name="tipoCliente"
                  value={datos.tipoCliente}
                  onChange={handleChange}
                  fullWidth
                >
                  {tiposCliente.map(tipo => (
                    <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                  ))}
                </TextField>
              ) : (
                <Typography>{datos.tipoCliente}</Typography>
              )}
            </Grid>
            <Grid item xs={6}><TextField label="Teléfono 1" name="telefono1" value={datos.telefono1} onChange={handleChange} fullWidth disabled={!editMode} /></Grid>
            <Grid item xs={6}><TextField label="Teléfono 2" name="telefono2" value={datos.telefono2} onChange={handleChange} fullWidth disabled={!editMode} /></Grid>
            <Grid item xs={12}><TextField label="Horarios preferidos" name="horarios" value={datos.horarios} onChange={handleChange} fullWidth disabled={!editMode} /></Grid>
          </>
        )}

        {userType === 'Prestamista' && (
          <>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                name="descripcion"
                value={datos.descripcion}
                onChange={handleChange}
                multiline
                fullWidth
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                name="tipoPrestamista"
                label="Tipo de prestamista"
                value={datos.tipoPrestamista}
                onChange={handleChange}
                fullWidth
                disabled={!editMode}
              >
                {tiposPrestamista.map(tipo => (
                  <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}><TextField label="Contacto 1" name="contacto1" value={datos.contacto1} onChange={handleChange} fullWidth disabled={!editMode} /></Grid>
            <Grid item xs={6}><TextField label="Contacto 2" name="contacto2" value={datos.contacto2} onChange={handleChange} fullWidth disabled={!editMode} /></Grid>
            <Grid item xs={12}>
              <TextField
                label="Portafolio / Experiencia"
                name="portafolio"
                value={datos.portafolio}
                onChange={handleChange}
                multiline
                fullWidth
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Imágenes de trabajo (máximo 5)</Typography>
              {editMode && <input type="file" multiple accept="image/*" />}
            </Grid>
          </>
        )}

        {/* Métodos de pago (común) */}
        <Grid item xs={12}>
          <TextField
            select
            name="metodoPago"
            label="Métodos de pago"
            value={datos.metodoPago}
            onChange={handleChange}
            fullWidth
            disabled={!editMode}
          >
            {metodosPago.map(m => (
              <MenuItem key={m} value={m}>{m}</MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Box textAlign="center">
        <Button variant="contained" color="primary" onClick={toggleEdit}>
          {editMode ? 'Guardar' : 'Editar'}
        </Button>
      </Box>
    </Box>
  );
}
