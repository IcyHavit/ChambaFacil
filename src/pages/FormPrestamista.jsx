import { useState, useRef } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Box, FormGroup, Grid, TextField, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Checkbox, Avatar, Button, IconButton } from '@mui/material';
import { AddAPhoto as AddAPhotoIcon, Close as CloseIcon, Send as SendIcon } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import ButtonMod from '../components/ButtonMod';
import { completarDatosUser } from '../api/user';
import AlertD from '../components/alert';
import alertImage from '../assets/images/Mascota.png';
import imgError from '../assets/images/imgError.jpg';

dayjs.locale('es');

export default function Prestamista() {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    telefono1: '',
    telefono2: '',
    tipoCuenta: 'Personal',
    fechaNacimiento: null,
    preferenciasPago: [],
    horarios: [],
    redesSociales: {
      facebook: '',
      instagram: '',
      youtube: ''
    }
  });

  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [nuevaExperiencia, setNuevaExperiencia] = useState('');
  const [experiencias, setExperiencias] = useState([]);
  const [imagenes, setImagenes] = useState([]);
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

      case 'descripcion':
        if (!value.trim()) return 'La descripción es obligatoria';
        if (value.trim().length < 10) return 'La descripción debe tener al menos 10 caracteres';
        if (value.trim().length > 500) return 'La descripción no puede exceder 500 caracteres';
        return '';

      case 'telefono1':
      case 'telefono2':
        if (name === 'telefono1' && !value.trim()) return 'El teléfono es obligatorio';
        if (value.trim() && !/^\d{10}$/.test(value.replace(/\s/g, ''))) {
          return 'El teléfono debe tener 10 dígitos';
        }
        return '';

      case 'facebook':
      case 'instagram':
      case 'youtube':
        if (value.trim() && !isValidURL(value)) {
          return 'Ingresa una URL válida';
        }
        return '';

      default:
        return '';
    }
  };

  const isValidURL = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limpiar errores del campo actual
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }

    // Actualizar redes sociales
    if (['facebook', 'instagram', 'youtube'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        redesSociales: {
          ...prev.redesSociales,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

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

      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDateChange = (newValue) => {
    setFormData(prev => ({ ...prev, fechaNacimiento: newValue }));

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

  const agregarExperiencia = () => {
    if (nuevaExperiencia.trim() !== '') {
      if (nuevaExperiencia.trim().length < 5) {
        setErrores(prev => ({ ...prev, experiencia: 'La experiencia debe tener al menos 5 caracteres' }));
        return;
      }
      if (nuevaExperiencia.trim().length > 100) {
        setErrores(prev => ({ ...prev, experiencia: 'La experiencia no puede exceder 100 caracteres' }));
        return;
      }

      setExperiencias([...experiencias, nuevaExperiencia.trim()]);
      setNuevaExperiencia('');
      if (errores.experiencia) {
        setErrores(prev => ({ ...prev, experiencia: '' }));
      }
    }
  };

  const eliminarExperiencia = (index) => {
    setExperiencias((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImagenesChange = (e) => {
    const files = Array.from(e.target.files);

    // Validar cada archivo
    const validFiles = [];
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const file of files) {
      if (!validTypes.includes(file.type)) {
        setErrores(prev => ({ ...prev, imagenes: 'Solo se permiten imágenes (JPG, PNG, GIF, WEBP)' }));
        continue;
      }
      if (file.size > maxSize) {
        setErrores(prev => ({ ...prev, imagenes: 'Las imágenes no pueden superar 5MB cada una' }));
        continue;
      }
      validFiles.push(file);
    }

    const nuevas = [...imagenes, ...validFiles].slice(0, 5);
    setImagenes(nuevas);

    if (validFiles.length > 0 && errores.imagenes) {
      setErrores(prev => ({ ...prev, imagenes: '' }));
    }
  };

  const eliminarImagen = (index) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};

    // Validar campos básicos
    const nombreError = validateField('nombre', formData.nombre);
    if (nombreError) newErrors.nombre = nombreError;

    const descripcionError = validateField('descripcion', formData.descripcion);
    if (descripcionError) newErrors.descripcion = descripcionError;

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

    // Validar URLs de redes sociales
    Object.keys(formData.redesSociales).forEach(red => {
      const urlError = validateField(red, formData.redesSociales[red]);
      if (urlError) newErrors[red] = urlError;
    });

    return newErrors;
  };

  /* Para mostrar alerta de Success ----------------------------- */
  const navigate = useNavigate();

  const alertSuccessRef = useRef();
  const nextRoute = useRef(null);
  const handleAlertOpen = () => {
    if (nextRoute.current) {
      navigate(nextRoute.current);
    }
  };

  // /* Para mostrar alerta de Error ------------------------------ */
  const alertErrorRef = useRef();
  const [alertError, setAlertError] = useState('');
  
  /* handleSubmit ---------------------------------------------- */
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

    const data = {
      id: parseInt(localStorage.getItem('id')),
      datosCompletos: true,
      nombre: formData.nombre,
      telefono: formData.telefono1.replace(/\s/g, ''),
      telefonoSecundario: formData.telefono2.replace(/\s/g, ''),
      descripcion: formData.descripcion,
      linkFoto: 'https://www.facebook.com/sharer/sharer.php?u=', // Este campo aún faltas
      tipoCuenta: formData.tipoCuenta,
      fechaNacimiento: formData.fechaNacimiento?.toISOString(),
      preferenciasPago: JSON.stringify(formData.preferenciasPago),
      horarios: JSON.stringify(formData.horarios),
      redesSociales: JSON.stringify(formData.redesSociales),
      experiencia: JSON.stringify(experiencias),
    };

    try {
      let role = localStorage.getItem('role');
      const response = await completarDatosUser(data, role);
      console.log('Respuesta: ', response);
      
      nextRoute.current = '/';
      alertSuccessRef.current.handleClickOpen();
    } catch (error) {
      setAlertError(error.message);
      alertErrorRef.current.handleClickOpen();
    }
  };

  return (
    <>
    <Box sx={{ borderColor: theme.palette.primary.main, borderStyle: 'solid', width: '70%', height: 'auto', borderRadius: theme.shape.borderRadius, mx: 'auto', my: 2, pt:2, pb:2, marginTop: '50px', marginBottom: '50px' }}>
      <Typography sx={{ textAlign: 'center', fontFamily: theme.typography.bodyLarge, color: theme.palette.secondary.main, fontSize: 45, fontWeight: 'bold' }}>
        Prestamista
      </Typography>

      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,

        }}
      >
        <Typography sx={{ fontFamily: theme.typography.bodySmall, fontWeight: 'bold', color: theme.palette.secondary.main }}>
          Elige una foto de perfil
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {preview && (
            <Avatar src={preview} sx={{ width: 150, height: 150 }} />
          )}

          <input
            accept="image/*"
            type="file"
            name="fotoPerfil"
            id="fotoPerfil"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          <label htmlFor="fotoPerfil">
            <Button variant="contained" component="span">
              Subir foto
            </Button>
          </label>
          {errores.foto && <Typography variant="caption" color="error">{errores.foto}</Typography>}
        </Box>

        <TextField
          name='nombre'
          label='Nombre'
          required
          fullWidth
          value={formData.nombre}
          onChange={handleChange}
          error={!!errores.nombre}
          helperText={errores.nombre || ' '}
          inputProps={{ maxLength: 50 }}
        />

        <TextField
          name='descripcion'
          label='Descripción'
          multiline
          required
          rows={4}
          placeholder='Escribe una descripción de tí'
          fullWidth
          value={formData.descripcion}
          onChange={handleChange}
          error={!!errores.descripcion}
          helperText={errores.descripcion || 'Mínimo 10 caracteres, máximo 500'}
          slotProps={{input:{ maxLength: 500 }}}
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
                aria-labelledby="tipoCuenta"
                value={formData.tipoCuenta}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, tipoCuenta: e.target.value }));
                  if (errores.tipoCuenta) {
                    setErrores(prev => ({ ...prev, tipoCuenta: '' }));
                  }
                }}
                name="tipoCuenta"
              >
                <FormControlLabel
                  value="Personal"
                  control={<Radio />}
                  label="Personal"
                  sx={{ mr: 4 }}
                />
                <FormControlLabel
                  value="Grupo"
                  control={<Radio />}
                  label="Grupo"
                  sx={{ mr: 4 }}
                />
                <FormControlLabel
                  value="Empresa"
                  control={<Radio />}
                  label="Empresa"
                />
              </RadioGroup>
              {errores.tipoCuenta && <Typography variant="caption" color="error">{errores.tipoCuenta}</Typography>}
            </FormControl>
          </Grid>
        </Grid>

        <Grid container>
          <Grid size={6} pr={2}>
            <TextField
              name='telefono1'
              label='Teléfono'
              required
              fullWidth
              value={formData.telefono1}
              onChange={handleChange}
              error={!!errores.telefono1}
              helperText={errores.telefono1 || 'Formato: 10 dígitos'}
              inputProps={{ maxLength: 15, pattern: '[0-9]*' }}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              name='telefono2'
              label='Segundo teléfono'
              fullWidth
              value={formData.telefono2}
              onChange={handleChange}
              error={!!errores.telefono2}
              helperText={errores.telefono2 || 'Opcional: 10 dígitos'}
              inputProps={{ maxLength: 15, pattern: '[0-9]*' }}
            />
          </Grid>
        </Grid>

        <Typography sx={{ fontFamily: theme.typography.bodySmall, fontWeight: 'bold', color: theme.palette.secondary.main }}>
          Portafolio - Experiencias *
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Nueva experiencia"
            placeholder="Ej. Instalación eléctrica residencial"
            value={nuevaExperiencia}
            onChange={(e) => {
              setNuevaExperiencia(e.target.value);
              if (errores.experiencia) {
                setErrores(prev => ({ ...prev, experiencia: '' }));
              }
            }}
            fullWidth
            error={!!errores.experiencia}
            helperText={errores.experiencia}
            inputProps={{ maxLength: 100 }}
          />
          <Button variant="outlined" onClick={agregarExperiencia}>
            Agregar
          </Button>
        </Box>

        <Box>
          {experiencias.length === 0 ? (
            <Typography color="text.secondary">Aún no has agregado ninguna experiencia.</Typography>
          ) : (
            experiencias.map((exp, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography sx={{ padding: 0.8, height: 40, flexGrow: 1, borderColor: theme.palette.primary.main, borderStyle: 'solid', borderRadius: 1, borderWidth: 2 }}>{exp}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => eliminarExperiencia(index)}
                  size="small"
                >
                  Eliminar
                </Button>
              </Box>
            ))
          )}
          {errores.experiencias && <Typography variant="caption" color="error">{errores.experiencias}</Typography>}
        </Box>

        <Grid container>
          <Grid size={4} pr={2}>
            <Typography sx={{ pt: 2, fontFamily: theme.typography.bodySmall, fontWeight: 'bold', color: theme.palette.secondary.main }}>
              Preferencias de Pago *
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox
                  checked={formData.preferenciasPago.includes('Efectivo')}
                  onChange={() => toggleCheckbox('Efectivo', 'preferenciasPago')}
                />}
                label="Efectivo"
              />
              <FormControlLabel
                control={<Checkbox
                  checked={formData.preferenciasPago.includes('Transferencia')}
                  onChange={() => toggleCheckbox('Transferencia', 'preferenciasPago')}
                />}
                label="Transferencia"
              />
              <FormControlLabel
                control={<Checkbox
                  checked={formData.preferenciasPago.includes('Tarjeta')}
                  onChange={() => toggleCheckbox('Tarjeta', 'preferenciasPago')}
                />}
                label="Tarjeta"
              />
            </FormGroup>
            {errores.preferenciasPago && <Typography variant="caption" color="error">{errores.preferenciasPago}</Typography>}
          </Grid>
          <Grid size={4}>
            <Typography sx={{ pt: 2, fontFamily: theme.typography.bodySmall, fontWeight: 'bold', color: theme.palette.secondary.main }}>
              Horarios Preferidos *
            </Typography>
            <FormGroup>
              {['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((dia) => (
                <FormControlLabel
                  key={dia}
                  control={<Checkbox
                    checked={formData.horarios.includes(dia)}
                    onChange={() => toggleCheckbox(dia, 'horarios')}
                  />}
                  label={dia}
                />
              ))}
            </FormGroup>
            {errores.horarios && <Typography variant="caption" color="error">{errores.horarios}</Typography>}
          </Grid>
          <Grid size={4}>
            <Typography sx={{ pt: 2, pb: 2, fontFamily: theme.typography.bodySmall, fontWeight: 'bold', color: theme.palette.secondary.main }}>
              Redes sociales
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                name="facebook"
                label="Facebook"
                placeholder="https://facebook.com/..."
                value={formData.redesSociales.facebook}
                onChange={handleChange}
                error={!!errores.facebook}
                helperText={errores.facebook}
              />
              <TextField
                name="instagram"
                label="Instagram"
                placeholder="https://instagram.com/..."
                value={formData.redesSociales.instagram}
                onChange={handleChange}
                error={!!errores.instagram}
                helperText={errores.instagram}
              />
              <TextField
                name="youtube"
                label="Youtube"
                placeholder="https://youtube.com/..."
                value={formData.redesSociales.youtube}
                onChange={handleChange}
                error={!!errores.youtube}
                helperText={errores.youtube}
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Imágenes de trabajos (máx. 5)
          </Typography>

          <Grid container spacing={2}>
            {imagenes.map((file, index) => (
              <Grid key={index}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={URL.createObjectURL(file)}
                    variant="rounded"
                    sx={{
                      width: 150,
                      height: 150,
                      boxShadow: 2,
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => eliminarImagen(index)}
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      bgcolor: 'white',
                      border: '1px solid #ccc',
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}

            {imagenes.length < 5 && (
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 150,
                    height: 150,
                    bgcolor: 'grey.200',
                    cursor: 'pointer',
                    boxShadow: 2,
                  }}
                >
                  <AddAPhotoIcon color="action" />
                </Avatar>

                <input
                  accept="image/*"
                  type="file"
                  multiple
                  onChange={handleImagenesChange}
                  id="evidencias"
                  style={{ display: 'none' }}
                />
                <label htmlFor="evidencias">
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: 100, height: 100, cursor: 'pointer' }} />
                </label>
              </Box>
            )}
          </Grid>
          {errores.imagenes && <Typography variant="caption" color="error">{errores.imagenes}</Typography>}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <ButtonMod
            variant=''
            textCont='Enviar'
            width=' 10rem'
            height='3rem'
            startIcon={<SendIcon />}
            type='submit'
          />
        </Box>
      </Box>
    </Box>
    {/* Alerta de Success */}
    <AlertD
      ref={alertSuccessRef}
      titulo='Datos completados exitosamente'
      mensaje='Presiona aceptar para continuar'
      imagen={alertImage}
      boton1='Aceptar'
      onConfirm={handleAlertOpen}
    />
    {/* Alerta de Error */}
    <AlertD
      ref={alertErrorRef}
      titulo='Algo falló al completar los datos'
      mensaje={alertError}
      imagen={imgError}
      boton1='Cerrar'
      onConfirm={() => setAlertError('')}
    />
    </>
  );
};