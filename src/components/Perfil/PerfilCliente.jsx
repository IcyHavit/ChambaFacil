import { useState } from 'react';
import {
  Avatar, Typography, TextField, Button,
  Box, MenuItem, Divider, Paper, Checkbox, FormGroup, FormControlLabel,
  useTheme, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

const tiposCliente = ['Personal', 'Grupo', 'Empresa'];
const metodosPago = ['Efectivo', 'Transferencia', 'Tarjeta'];
const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function PerfilCliente() {
  dayjs.locale('es');
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errores, setErrores] = useState({});

  const [datos, setDatos] = useState({
    nombre: 'Juan Pérez',
    fechaNacimiento: '1990-01-01',
    tipoCliente: '',
    telefono1: '',
    telefono2: '',
    horarios: [],
    metodoPago: [],
  });

  const [fechaNacimiento, setFechaNacimiento] = useState(dayjs(datos.fechaNacimiento));

  // Validaciones
  const validateField = (name, value) => {
    switch (name) {
      case 'nombre':
        if (!value.trim()) return 'El nombre es obligatorio';
        if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
        if (value.trim().length > 50) return 'El nombre no puede exceder 50 caracteres';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return 'El nombre solo puede contener letras';
        return '';

      case 'telefono1':
      case 'telefono2':
        if (name === 'telefono1' && !value.trim()) return 'El teléfono es obligatorio';
        if (value.trim() && !/^\d{10}$/.test(value.replace(/\s/g, ''))) {
          return 'El teléfono debe tener 10 dígitos';
        }
        return '';

      default:
        return '';
    }
  };

  const validateDateChange = (newValue) => {
    if (!newValue) return 'Selecciona tu fecha de nacimiento';

    const today = dayjs();
    const age = today.diff(newValue, 'year');

    if (newValue.isAfter(today)) {
      return 'La fecha no puede ser futura';
    } else if (age < 18) {
      return 'Debes ser mayor de 18 años';
    } else if (age > 120) {
      return 'Fecha no válida';
    }
    return '';
  };

  const validate = () => {
    const newErrors = {};

    // Validar nombre
    const nombreError = validateField('nombre', datos.nombre);
    if (nombreError) newErrors.nombre = nombreError;

    // Validar fecha de nacimiento
    const fechaError = validateDateChange(fechaNacimiento);
    if (fechaError) newErrors.fechaNacimiento = fechaError;

    // Validar tipo de cliente
    if (!datos.tipoCliente) {
      newErrors.tipoCliente = 'Selecciona un tipo de cliente';
    }

    // Validar teléfonos
    const telefono1Error = validateField('telefono1', datos.telefono1);
    if (telefono1Error) newErrors.telefono1 = telefono1Error;

    if (datos.telefono2) {
      const telefono2Error = validateField('telefono2', datos.telefono2);
      if (telefono2Error) newErrors.telefono2 = telefono2Error;
    }

    // Validar teléfonos duplicados
    if (datos.telefono1 && datos.telefono2 &&
      datos.telefono1.replace(/\s/g, '') === datos.telefono2.replace(/\s/g, '')) {
      newErrors.telefono2 = 'Los teléfonos no pueden ser iguales';
    }

    // Validar métodos de pago
    if (datos.metodoPago.length === 0) {
      newErrors.metodoPago = 'Selecciona al menos un método de pago';
    }

    // Validar horarios
    if (datos.horarios.length === 0) {
      newErrors.horarios = 'Selecciona al menos un día';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limpiar errores del campo actual
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }

    setDatos({ ...datos, [name]: value });

    // Validación en tiempo real
    const error = validateField(name, value);
    if (error) {
      setErrores(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleCheckChange = (e, key) => {
    const { value, checked } = e.target;
    const actual = new Set(datos[key]);
    checked ? actual.add(value) : actual.delete(value);
    const updatedArray = Array.from(actual);

    setDatos((prev) => ({ ...prev, [key]: updatedArray }));

    // Limpiar errores si se selecciona al menos un elemento
    if (updatedArray.length > 0 && errores[key]) {
      setErrores(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        setErrores(prev => ({ ...prev, foto: 'Solo se permiten imágenes (JPG, PNG, GIF, WEBP)' }));
        return;
      }

      if (file.size > maxSize) {
        setErrores(prev => ({ ...prev, foto: 'La imagen no puede superar 5MB' }));
        return;
      }

      // Limpiar error de foto si existe
      if (errores.foto) {
        setErrores(prev => ({ ...prev, foto: '' }));
      }

      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDateChange = (newValue) => {
    setFechaNacimiento(newValue);
    setDatos((prev) => ({
      ...prev,
      fechaNacimiento: newValue ? newValue.format('YYYY-MM-DD') : '',
    }));

    // Limpiar error de fecha si existe
    if (errores.fechaNacimiento) {
      setErrores(prev => ({ ...prev, fechaNacimiento: '' }));
    }

    // Validar fecha en tiempo real
    const error = validateDateChange(newValue);
    if (error) {
      setErrores(prev => ({ ...prev, fechaNacimiento: error }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editMode) {
      const validationErrors = validate();

      if (Object.keys(validationErrors).length > 0) {
        setErrores(validationErrors);

        // Scroll al primer error
        const firstErrorField = Object.keys(validationErrors)[0];
        const element = document.querySelector(`[name="${firstErrorField}"]`) ||
          document.querySelector(`#${firstErrorField}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
        return;
      }

      // Limpiar todos los errores
      setErrores({});

      // Procesar datos
      const processedData = {
        ...datos,
        fechaNacimiento: fechaNacimiento.format('DD/MM/YYYY'),
        telefono1: datos.telefono1.replace(/\s/g, ''),
        telefono2: datos.telefono2.replace(/\s/g, ''),
        foto: foto
      };

      console.log('Datos del perfil actualizados:', processedData);

      // Aquí puedes hacer la llamada a tu API
      // await updateProfile(processedData);

      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  const handleSave = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrores(validationErrors);

      // Scroll al primer error
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`) ||
        document.querySelector(`#${firstErrorField}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    // Limpiar errores
    setErrores({});

    // Procesar datos
    const updatedData = {
      ...datos,
      fechaNacimiento: fechaNacimiento.format('DD/MM/YYYY'),
      telefono1: datos.telefono1.replace(/\s/g, ''),
      telefono2: datos.telefono2.replace(/\s/g, ''),
      foto,
    };

    console.log('Datos actualizados:', updatedData);

    // Salir del modo edición
    setEditMode(false);
  };

  const toggleEdit = () => {
    // Alternar el estado de edición
    setEditMode((prev) => !prev);
  };
  return (
    <Stack sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Navbar />

      <Paper elevation={3} sx={{ maxWidth: 1000, mx: 'auto', mt: 5, p: 4, borderRadius: 4, mb: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
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
                {errores.foto && (
                  <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                    {errores.foto}
                  </Typography>
                )}
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
                  required
                  error={!!errores.nombre}
                  helperText={errores.nombre || ' '}
                  slotProps={{ input: { maxLength: 50 } }}
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

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: '1 1 300px' }}>
              <Typography variant="subtitle2">Fecha de Nacimiento</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <DatePicker
                  value={fechaNacimiento}
                  onChange={handleDateChange}
                  format="DD/MM/YYYY"
                  disabled={!editMode}
                  maxDate={dayjs().subtract(18, 'year')}
                  minDate={dayjs().subtract(120, 'year')}
                  slotProps={{
                    textField: {
                      name: 'fechaNacimiento',
                      fullWidth: true,
                      error: !!errores.fechaNacimiento,
                      helperText: errores.fechaNacimiento || ' '
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>

            <Box sx={{ flex: '1 1 300px' }}>
              <Typography variant="subtitle2">Tipo de Cliente</Typography>
              {editMode ? (
                <TextField
                  select
                  name="tipoCliente"
                  value={datos.tipoCliente}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errores.tipoCliente}
                  helperText={errores.tipoCliente || ' '}
                >
                  {tiposCliente.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </TextField>
              ) : (
                <TextField fullWidth value={datos.tipoCliente} disabled />
              )}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
            <Box sx={{ flex: '1 1 300px' }}>
              <Typography variant="subtitle2">Teléfono 1</Typography>
              <TextField
                fullWidth
                name="telefono1"
                value={datos.telefono1}
                onChange={handleChange}
                disabled={!editMode}
                required={editMode}
                type="tel"
                error={!!errores.telefono1}
                helperText={errores.telefono1 || (editMode ? 'Formato: 10 dígitos' : ' ')}
                slotProps={{ input: { maxLength: 15, pattern: '[0-9]*' } }}
              />
            </Box>

            <Box sx={{ flex: '1 1 300px' }}>
              <Typography variant="subtitle2">Teléfono 2</Typography>
              <TextField
                fullWidth
                name="telefono2"
                value={datos.telefono2}
                onChange={handleChange}
                disabled={!editMode}
                type="tel"
                error={!!errores.telefono2}
                helperText={errores.telefono2 || (editMode ? 'Opcional: 10 dígitos' : ' ')}
                slotProps={{ input: { maxLength: 15, pattern: '[0-9]*' } }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Métodos de Pago {editMode && '*'}
              </Typography>
              <FormGroup row>
                {metodosPago.map((m) => (
                  <FormControlLabel
                    key={m}
                    control={
                      <Checkbox
                        checked={datos.metodoPago.includes(m)}
                        onChange={(e) => handleCheckChange(e, 'metodoPago')}
                        value={m}
                        disabled={!editMode}
                      />
                    }
                    label={m}
                  />
                ))}
              </FormGroup>
              {errores.metodoPago && (
                <Typography variant="caption" color="error">
                  {errores.metodoPago}
                </Typography>
              )}
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Horarios Preferidos {editMode && '*'}
              </Typography>
              <FormGroup row>
                {diasSemana.map((d) => (
                  <FormControlLabel
                    key={d}
                    control={
                      <Checkbox
                        checked={datos.horarios.includes(d)}
                        onChange={(e) => handleCheckChange(e, 'horarios')}
                        value={d}
                        disabled={!editMode}
                      />
                    }
                    label={d}
                  />
                ))}
              </FormGroup>
              {errores.horarios && (
                <Typography variant="caption" color="error">
                  {errores.horarios}
                </Typography>
              )}
            </Box>
          </Box>

          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              startIcon={editMode ? <SaveIcon /> : <EditIcon />}
              onClick={editMode ? handleSave : toggleEdit}
            >
              {editMode ? 'Guardar cambios' : 'Editar perfil'}
            </Button>
          </Box>
        </Box>
      </Paper>

      <Footer />
    </Stack>
  );
}