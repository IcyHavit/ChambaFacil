import { useState, useEffect } from 'react';
import {
  Avatar, Typography, TextField,
  Box, MenuItem, Divider, Paper, Checkbox, FormGroup, FormControlLabel,
  useTheme, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import ButtonMod from '../ButtonMod'

import { getDataUser } from '../../api/user';
import { completarDatosUser } from '../../api/user';
import { uploadFile } from '../../api/file';

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
    nombre: '',
    fechaNacimiento: '',
    tipoCuenta: '',
    telefono: '',
    telefonoSecundario: '',
    linkFoto: '',
    metodoPago: [],
    horarios: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem('id');
        console.log(id);
        const role = localStorage.getItem('role');
        console.log(role);
        const response = await getDataUser(role, id);
        const data = response.data;

        setDatos({
          ...data,
          fechaNacimiento: data.fechaNacimiento ? dayjs(data.fechaNacimiento) : null,
          metodoPago: data.preferenciasPago ? JSON.parse(data.preferenciasPago) : [],
          horarios: data.horarios ? JSON.parse(data.horarios) : [],
        });

        setFechaNacimiento(data.fechaNacimiento ? dayjs(data.fechaNacimiento) : null);
      } catch (error) {
        console.error('Error al obtener datos del perfil:', error);
      }
    };

    fetchData();
  }, []);


  const handleCerrarSesion = () => {
    console.log("webos pal gayro")
  }
  const [fechaNacimiento, setFechaNacimiento] = useState(dayjs(datos.fechaNacimiento));

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
    setFechaNacimiento(newValue);
    setDatos((prev) => ({
      ...prev,
      fechaNacimiento: newValue ?? '',
    }));

    if (errores.fechaNacimiento) {
      setErrores(prev => ({ ...prev, fechaNacimiento: '' }));
    }

    if (newValue) {
      const today = dayjs();
      const age = today.diff(newValue, 'year');

      if (newValue.isAfter(today)) {
        setErrores(prev => ({ ...prev, fechaNacimiento: 'La fecha no puede ser futura' }));
      } else if (age < 18) {
        setErrores(prev => ({ ...prev, fechaNacimiento: 'Debes ser mayor de 18 años' }));
      } else if (age > 120) {
        setErrores(prev => ({ ...prev, fechaNacimiento: 'Fecha no válida' }));
      }
    }
  };

  const validate = () => {
    const newErrors = {};

    const nombreError = validateField('nombre', datos.nombre);
    if (nombreError) newErrors.nombre = nombreError;

    const fechaError = validateDateChange(fechaNacimiento);
    if (fechaError) newErrors.fechaNacimiento = fechaError;

    if (!datos.tipoCuenta) {
      newErrors.tipoCuenta = 'Selecciona un tipo de cuenta';
    }

    const telefonoError = validateField('telefono', datos.telefono);
    if (telefonoError) newErrors.telefono = telefonoError;

    if (datos.telefonoSecundario) {
      const telefonoSecundarioError = validateField('telefonoSecundario', datos.telefonoSecundario);
      if (telefonoSecundarioError) newErrors.telefonoSecundario = telefonoSecundarioError;
    }

    if (datos.telefono && datos.telefonoSecundario &&
      datos.telefono.replace(/\s/g, '') === datos.telefonoSecundario.replace(/\s/g, '')) {
      newErrors.telefonoSecundario = 'Los teléfonos no pueden ser iguales';
    }

    if (datos.metodoPago.length === 0) {
      newErrors.metodoPago = 'Selecciona al menos un método de pago';
    }

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
      fechaNacimiento: newValue ?? '',
    }));

    if (errores.fechaNacimiento) {
      setErrores(prev => ({ ...prev, fechaNacimiento: '' }));
    }

    if (newValue) {
      const today = dayjs();
      const age = today.diff(newValue, 'year');

      if (newValue.isAfter(today)) {
        setErrores(prev => ({ ...prev, fechaNacimiento: 'La fecha no puede ser futura' }));
      } else if (age < 18) {
        setErrores(prev => ({ ...prev, fechaNacimiento: 'Debes ser mayor de 18 años' }));
      } else if (age > 120) {
        setErrores(prev => ({ ...prev, fechaNacimiento: 'Fecha no válida' }));
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrores(validationErrors);

      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`) ||
        document.querySelector(`#${firstErrorField}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    setErrores({});

    const file = foto;
    if (!file) {
      alert('No se seleccionó ninguna imagen.');
      return;
    }

    let fotoPerfil = '';
    try {
      const res = await uploadFile(file, 'profile-pictures');
      fotoPerfil = res.link;
    } catch (error) {
      const errorMessage = error.res?.data?.error || 'Error al subir imagen. Por favor, intenta nuevamente.';
      alert(`Error al subir imagen: ${errorMessage}`);
      return;
    }

    const dataSend = {
      id: parseInt(localStorage.getItem('id')),
      datosCompletos: true,
      nombre: datos.nombre,
      telefono: datos.telefono.replace(/\s/g, ''),
      telefonoSecundario: datos.telefonoSecundario.replace(/\s/g, ''),
      linkFoto: fotoPerfil,
      tipoCuenta: datos.tipoCuenta,
      fechaNacimiento: dayjs(datos.fechaNacimiento).toDate().toISOString(),
      preferenciasPago: JSON.stringify(datos.metodoPago),
      horarios: JSON.stringify(datos.horarios),
    };

    try {
      let role = localStorage.getItem('role');
      const response = await completarDatosUser(dataSend, role);
      console.log('Response', response);
    } catch (error) {
      console.log(error.message);
    }

    alert('Perfil guardado exitosamente');
    setEditMode(false);
  };

  const toggleEdit = () => {
    if (editMode) {
      handleSubmit(new Event('submit'));
    } else {
      setEditMode(true);
    }
  };

  return (
    <Stack sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>

      <Paper elevation={3} sx={{ maxWidth: 1000, mx: 'auto', mt: 5, p: 4, borderRadius: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mb: 4 }}>
            {editMode ? (
              <>
                <input accept="image/*" type="file" onChange={handleFileChange} id="fotoPerfil" style={{ display: 'none' }} />
                <label htmlFor="fotoPerfil">
                  <Avatar
                    src={preview || datos.linkFoto || undefined}
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
                src={preview || datos.linkFoto || undefined}
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
              <Typography variant="subtitle2">Tipo de cuenta</Typography>
              {editMode ? (
                <TextField
                  select
                  name="tipoCuenta"
                  value={datos.tipoCuenta}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errores.tipoCuenta}
                  helperText={errores.tipoCuenta}
                >
                  {tiposCliente.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </TextField>
              ) : (
                <TextField fullWidth value={datos.tipoCuenta} disabled />
              )}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
            <Box sx={{ flex: '1 1 300px' }}>
              <Typography variant="subtitle2">Teléfono</Typography>
              <TextField
                fullWidth
                name="telefono1"
                value={datos.telefono}
                onChange={handleChange}
                disabled={!editMode}
                required={editMode}
                type="tel"
                error={!!errores.telefono}
                helperText={errores.telefono || (editMode ? 'Formato: 10 dígitos' : ' ')}
                slotProps={{ input: { maxLength: 15, pattern: '[0-9]*' } }}
              />
            </Box>

            <Box sx={{ flex: '1 1 300px' }}>
              <Typography variant="subtitle2">Teléfono secundario</Typography>
              <TextField
                fullWidth
                name="telefono2"
                value={datos.telefonoSecundario}
                onChange={handleChange}
                disabled={!editMode}
                type="tel"
                error={!!errores.telefonoSecundario}
                helperText={errores.telefonoSecundario || (editMode ? 'Opcional: 10 dígitos' : ' ')}
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
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <ButtonMod
                variant="principal"
                textCont={editMode ? 'Guardar cambios' : 'Editar perfil'}
                startIcon={editMode ? <SaveIcon /> : <EditIcon />}
                clickEvent={toggleEdit}
              />
              
              <ButtonMod
                variant=''
                textCont='Cerrar sesión'
                width='auto'
                height='2.3rem'
                clickEvent={handleCerrarSesion}
              />
            </Box>
          </Box>
      </Paper>
    </Stack>
  );
}