import { Box, FormGroup, Grid, TextField, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import Checkbox from '@mui/material/Checkbox';
import ButtonMod from '../components/ButtonMod'
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { Avatar, Button } from '@mui/material';

export default function Cliente() {
  dayjs.locale('es');
  const theme = useTheme();

  const [formData, setFormData] = useState({
    nombre: '',
    telefono1: '',
    telefono2: '',
    tipoCuenta: 'Personal',
    fechaNacimiento: null,
    preferenciasPago: [],
    horarios: [],
    foto: null,
  });

  const [preview, setPreview] = useState(null);
  const [errores, setErrores] = useState({});

  // Validación en tiempo real
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limpiar errores del campo actual
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validación en tiempo real
    const error = validateField(name, value);
    if (error) {
      setErrores(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Validar archivo
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

      setFormData((prev) => ({ ...prev, foto: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const toggleCheckbox = (value, listName) => {
    const currentList = formData[listName];
    const updatedList = currentList.includes(value)
      ? currentList.filter((item) => item !== value)
      : [...currentList, value];

    setFormData((prev) => ({ ...prev, [listName]: updatedList }));

    // Limpiar errores si se selecciona al menos un elemento
    if (updatedList.length > 0 && errores[listName]) {
      setErrores(prev => ({ ...prev, [listName]: '' }));
    }
  };

  const handleDateChange = (newValue) => {
    setFormData((prev) => ({ ...prev, fechaNacimiento: newValue }));

    // Limpiar error de fecha si existe
    if (errores.fechaNacimiento) {
      setErrores(prev => ({ ...prev, fechaNacimiento: '' }));
    }

    // Validar fecha
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

    // Validar nombre
    const nombreError = validateField('nombre', formData.nombre);
    if (nombreError) newErrors.nombre = nombreError;

    // Validar teléfonos
    const telefono1Error = validateField('telefono1', formData.telefono1);
    if (telefono1Error) newErrors.telefono1 = telefono1Error;

    if (formData.telefono2) {
      const telefono2Error = validateField('telefono2', formData.telefono2);
      if (telefono2Error) newErrors.telefono2 = telefono2Error;
    }

    // Validar teléfonos duplicados
    if (formData.telefono1 && formData.telefono2 &&
      formData.telefono1.replace(/\s/g, '') === formData.telefono2.replace(/\s/g, '')) {
      newErrors.telefono2 = 'Los teléfonos no pueden ser iguales';
    }

    // Validar tipo de cuenta
    if (!formData.tipoCuenta) {
      newErrors.tipoCuenta = 'Selecciona un tipo de cuenta';
    }

    // Validar fecha de nacimiento
    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = 'Selecciona tu fecha de nacimiento';
    } else {
      const today = dayjs();
      const age = today.diff(formData.fechaNacimiento, 'year');

      if (formData.fechaNacimiento.isAfter(today)) {
        newErrors.fechaNacimiento = 'La fecha no puede ser futura';
      } else if (age < 18) {
        newErrors.fechaNacimiento = 'Debes ser mayor de 18 años';
      } else if (age > 120) {
        newErrors.fechaNacimiento = 'Fecha no válida';
      }
    }

    // Validar preferencias de pago
    if (formData.preferenciasPago.length === 0) {
      newErrors.preferenciasPago = 'Selecciona al menos una forma de pago';
    }

    // Validar horarios
    if (formData.horarios.length === 0) {
      newErrors.horarios = 'Selecciona al menos un día';
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
      ...formData,
      fechaNacimiento: formData.fechaNacimiento.format('DD/MM/YYYY'),
      telefono1: formData.telefono1.replace(/\s/g, ''),
      telefono2: formData.telefono2.replace(/\s/g, ''),
    };

    console.log('Datos del formulario:', processedData);


  };

  return (
    <Box
      sx={{
        borderColor: theme.palette.primary.main,
        borderStyle: 'solid',
        width: 1100,
        height: 'auto',
        borderRadius: theme.shape.borderRadius,
        mx: 'auto',        // left-right margin “auto” ⇒ centra horizontalmente
        my: 2,              // (opcional) separa un poco arriba/abajo
        pt:2,
        pb:2
      }}
    >      <Typography sx={{ textAlign: 'center', fontFamily: theme.typography.bodyLarge, color: theme.palette.secondary.main, fontSize: 45, fontWeight: 'bold' }}>
        Cliente
      </Typography>

      <Box component='form' onSubmit={handleSubmit} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2}}>
        <Typography sx={{ fontFamily: theme.typography.bodySmall, fontWeight: 'bold', color: theme.palette.secondary.main }}>
          Elige una foto de perfil
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {preview && <Avatar src={preview} sx={{ width: 150, height: 150 }} />}
          <input accept="image/*" type="file" name="fotoPerfil" id="fotoPerfil" onChange={handleFileChange} style={{ display: 'none' }} />
          <label htmlFor="fotoPerfil">
            <Button variant="contained" component="span">Subir foto</Button>
          </label>
          {errores.foto && <Typography variant="caption" color="error">{errores.foto}</Typography>}
        </Box>

        <TextField
          required
          name='nombre'
          label='Nombre'
          type='text'
          fullWidth
          value={formData.nombre}
          onChange={handleChange}
          error={!!errores.nombre}
          helperText={errores.nombre || ' '}
          slotProps={{ input: { maxLength: 50 } }}
        />

        <Grid container>
          <Grid size={6} pr={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label='Fecha de nacimiento'
                  format='DD/MM/YYYY'
                  value={formData.fechaNacimiento}
                  onChange={handleDateChange}
                  maxDate={dayjs().subtract(18, 'year')}
                  minDate={dayjs().subtract(120, 'year')}
                  slotProps={{
                    textField: {
                      name: 'fechaNacimiento',
                      sx: { width: 350 },
                      error: !!errores.fechaNacimiento,
                      helperText: errores.fechaNacimiento || ' '
                    }
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid size={6}>
            <FormControl error={!!errores.tipoCuenta}>
              <FormLabel id="tipo">Tipo de cuenta</FormLabel>
              <RadioGroup
                row
                value={formData.tipoCuenta}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, tipoCuenta: e.target.value }));
                  if (errores.tipoCuenta) {
                    setErrores(prev => ({ ...prev, tipoCuenta: '' }));
                  }
                }}
              >
                <FormControlLabel value="Personal" control={<Radio />} label="Personal" />
                <FormControlLabel value="Grupo" control={<Radio />} label="Grupo" />
                <FormControlLabel value="Empresa" control={<Radio />} label="Empresa" />
              </RadioGroup>
              {errores.tipoCuenta && <Typography variant="caption" color="error">{errores.tipoCuenta}</Typography>}
            </FormControl>
          </Grid>
        </Grid>

        <Grid container>
          <Grid size={6} pr={2}>
            <TextField
              required
              name='telefono1'
              label='Teléfono'
              type='tel'
              fullWidth
              value={formData.telefono1}
              onChange={handleChange}
              error={!!errores.telefono1}
              helperText={errores.telefono1 || 'Formato: 10 dígitos'}
              slotProps={{ input: { maxLength: 15, pattern: '[0-9]*' } }}

            />
          </Grid>
          <Grid size={6}>
            <TextField
              name='telefono2'
              label='Segundo Teléfono'
              type='tel'
              fullWidth
              value={formData.telefono2}
              onChange={handleChange}
              error={!!errores.telefono2}
              helperText={errores.telefono2 || 'Opcional: 10 dígitos'}
              slotProps={{ input: { maxLength: 15, pattern: '[0-9]*' } }}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid size={6} pr={2}>
            <Typography sx={{ pt: 2, fontFamily: theme.typography.bodySmall, fontWeight: 'bold', color: theme.palette.secondary.main }}>
              Preferencias de Pago *
            </Typography>
            <FormGroup>
              {['Efectivo', 'Transferencia', 'Tarjeta'].map((opcion) => (
                <FormControlLabel
                  key={opcion}
                  control={<Checkbox checked={formData.preferenciasPago.includes(opcion)} onChange={() => toggleCheckbox(opcion, 'preferenciasPago')} />}
                  label={opcion}
                />
              ))}
              {errores.preferenciasPago && <Typography variant="caption" color="error">{errores.preferenciasPago}</Typography>}
            </FormGroup>
          </Grid>
          <Grid size={6}>
            <Typography sx={{ pt: 2, fontFamily: theme.typography.bodySmall, fontWeight: 'bold', color: theme.palette.secondary.main }}>
              Horarios Preferidos *
            </Typography>
            <FormGroup>
              {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((dia) => (
                <FormControlLabel
                  key={dia}
                  control={<Checkbox checked={formData.horarios.includes(dia)} onChange={() => toggleCheckbox(dia, 'horarios')} name='horario' />}
                  label={dia}
                />
              ))}
              {errores.horarios && <Typography variant="caption" color="error">{errores.horarios}</Typography>}
            </FormGroup>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <ButtonMod variant='' textCont='Enviar' width=' 10rem' height='3rem' startIcon={<SendIcon />} type='submit' />
        </Box>
      </Box>
    </Box>
  );
}