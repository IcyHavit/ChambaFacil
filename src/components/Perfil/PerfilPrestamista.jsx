import { useState, useEffect, useRef } from 'react';
import {
  Avatar, Typography, TextField, Button,
  Box, MenuItem, Divider, Paper, Checkbox, FormGroup, FormControlLabel,
  useTheme, Modal, IconButton, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ButtonMod from '../ButtonMod';

dayjs.locale('es');

import { getDataUser } from '../../api/user';
import { completarDatosUser } from '../../api/user';
import { uploadFile } from '../../api/file';
import AlertD from '../alert';
import alertImage from '../../assets/images/Mascota.png';
import imgError from '../../assets/images/imgError.jpg';

const tipoCuentaPrestamista = ['Personal', 'Grupo', 'Empresa'];
const metodosPago = ['Efectivo', 'Transferencia', 'Tarjeta'];
const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function PerfilPrestamista() {
  /* Para mostrar la alerta de Error y Success */
  const alertSuccessRef = useRef();
  const alertErrorRef = useRef();
  const [alertSuccess, setAlertSuccess] = useState('');
  const [alertError, setAlertError] = useState('');

  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [nuevaExperiencia, setNuevaExperiencia] = useState('');
  const [errores, setErrores] = useState({});

  /* Hacer petición de datos del prestamista ----------------------- */
  const [datos, setDatos] = useState({
    nombre: '',
    fechaNacimiento: '',
    descripcion: '',
    tipoCuenta: '',
    telefono: '',
    telefonoSecundario: '',
    linkFoto: '',
    portafolio: [],
    metodoPago: [],
    horarios: [],
    redesSociales: { facebook: '', instagram: '', youtube: ''},
    imagenes: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem('id');
        const role = localStorage.getItem('role');
        const response = await getDataUser(role, id);
        const data = response.data;

        setDatos({
          ...data,
          fechaNacimiento: data.fechaNacimiento ? dayjs(data.fechaNacimiento) : null,
          portafolio: data.experiencia ? JSON.parse(data.experiencia) : [],
          metodoPago: data.preferenciasPago ? JSON.parse(data.preferenciasPago) : [],
          horarios: data.horarios ? JSON.parse(data.horarios) : [],
          redesSociales: data.redesSociales ? JSON.parse(data.redesSociales) :{
            facebook: '',
            instagram: '',
            youtube: ''
          },
          imagenes: data.imgTrabajo ? JSON.parse(data.imgTrabajo) : []
        });
        setImagenes(data.imgTrabajo ? JSON.parse(data.imgTrabajo) : []);
        setFechaNacimiento(data.fechaNacimiento ? dayjs(data.fechaNacimiento) : null);
      } catch (error) {
        console.error('Error al obtener datos del perfil:', error);
      }
    };

    fetchData();
  }, []);
  
  const handleCerrarSesion = () => {
    console.log("jairoGameplays")
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

      case 'descripcion':
        if (!value.trim()) return 'La descripción es obligatoria';
        if (value.trim().length < 10) return 'La descripción debe tener al menos 10 caracteres';
        if (value.trim().length > 500) return 'La descripción no puede exceder 500 caracteres';
        return '';

      case 'telefono':
      case 'telefonoSecundario':
        if (name === 'telefono' && !value.trim()) return 'El teléfono es obligatorio';
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

  // Validación completa del formulario
  const validate = () => {
    const newErrors = {};

    const nombreError = validateField('nombre', datos.nombre);
    if (nombreError) newErrors.nombre = nombreError;

    const descripcionError = validateField('descripcion', datos.descripcion);
    if (descripcionError) newErrors.descripcion = descripcionError;

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

    if (!fechaNacimiento) {
      newErrors.fechaNacimiento = 'Selecciona tu fecha de nacimiento';
    } else {
      const today = dayjs();
      const age = today.diff(fechaNacimiento, 'year');

      if (fechaNacimiento.isAfter(today)) {
        newErrors.fechaNacimiento = 'La fecha no puede ser futura';
      } else if (age < 18) {
        newErrors.fechaNacimiento = 'Debes ser mayor de 18 años';
      } else if (age > 120) {
        newErrors.fechaNacimiento = 'Fecha no válida';
      }
    }

    if (!datos.tipoCuenta) {
      newErrors.tipoCuenta = 'Selecciona el tipo de cuenta';
    }

    if (datos.horarios.length === 0) {
      newErrors.horarios = 'Selecciona al menos un día';
    }

    Object.keys(datos.redesSociales).forEach(red => {
      const urlError = validateField(red, datos.redesSociales[red]);
      if (urlError) newErrors[red] = urlError;
    });

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }

    setDatos({ ...datos, [name]: value });

    const error = validateField(name, value);
    if (error) {
      setErrores(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleRedChange = (e) => {
    const { name, value } = e.target;

    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }

    setDatos({ ...datos, redes: { ...datos.redes, [name]: value } });

    const error = validateField(name, value);
    if (error) {
      setErrores(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleCheckChange = (e, key) => {
    const { value, checked } = e.target;
    const actual = new Set(datos[key]);
    checked ? actual.add(value) : actual.delete(value);
    const updatedList = Array.from(actual);

    setDatos((prev) => ({ ...prev, [key]: updatedList }));

    // Limpiar errores si se selecciona al menos un elemento
    if (updatedList.length > 0 && errores[key]) {
      setErrores(prev => ({ ...prev, [key]: '' }));
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

      setDatos((prev) => ({
        ...prev,
        portafolio: [...prev.portafolio, nuevaExperiencia.trim()],
      }));
      setNuevaExperiencia('');

      // Limpiar errores
      if (errores.experiencia) {
        setErrores(prev => ({ ...prev, experiencia: '' }));
      }
      if (errores.portafolio) {
        setErrores(prev => ({ ...prev, portafolio: '' }));
      }
    }
  };

  const eliminarExperiencia = (index) => {
    setDatos((prev) => ({
      ...prev,
      portafolio: prev.portafolio.filter((_, i) => i !== index),
    }));
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

  const [imagenFiles, setImagenFiles] = useState([]);
  const handleImageUpload = (e) => {
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

    const urls = [...imagenFiles, ...validFiles].slice(0, 5).map((file) =>
      URL.createObjectURL(file));
    setImagenes(urls);

    setImagenFiles(prev => [...prev, ...validFiles].slice(0, 5));

    if (validFiles.length > 0 && errores.imagenes) {
      setErrores(prev => ({ ...prev, imagenes: '' }));
    }
  };

  const eliminarImagen = (index) => {
    setImagenes(prev => prev.filter((_, i) => i !== index));
    setImagenFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageClick = (src) => {
    setModalImage(src);
    setModalOpen(true);
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

    let fotoPerfil = datos.linkFoto;

    if (foto) {
      try {
        const res = await uploadFile(foto, 'profile-pictures');
        fotoPerfil = res.link;
      } catch (error) {
        setAlertError(error.message);
        alertErrorRef.handleClickOpen();
        return;
      }
    }

    // lógica para subir las dem´sa fotos
    const nuevasUrls = [];
    const urlsExistentes = [];

    for (const img of imagenes) {
      if (img instanceof File) {
        try {
          const res = await uploadFile(img, 'profile-pictures');
          nuevasUrls.push(res.link);
        } catch (error) {
          alert(`Error al subir imagen: ${error.message}`);
          return;
        }
      } else if (typeof img === 'string') {
        urlsExistentes.push(img); // Ya estaban subidas
      }
    }

    const imagenesUrls = [...urlsExistentes, ...nuevasUrls];


    const dataSend = {
      id: parseInt(localStorage.getItem('id')),
      datosCompletos: true,
      nombre: datos.nombre,
      telefono: datos.telefono.replace(/\s/g, ''),
      telefonoSecundario: datos.telefonoSecundario.replace(/\s/g, ''),
      descripcion: datos.descripcion,
      linkFoto: fotoPerfil,
      tipoCuenta: datos.tipoCuenta,
      fechaNacimiento: dayjs(datos.fechaNacimiento).toDate().toISOString(),
      preferenciasPago: JSON.stringify(datos.metodoPago),
      horarios: JSON.stringify(datos.horarios),
      redesSociales: JSON.stringify(datos.redesSociales),
      experiencia: JSON.stringify(datos.portafolio),
      imgTrabajo: JSON.stringify(imagenesUrls),
    };

    try {
      let role = localStorage.getItem('role');
      console.log('role', role);
      const response = await completarDatosUser(dataSend, role);
      console.log('Response', response);
    } catch (error) {
      console.log(error.message);
      setAlertError(error.message);
      alertErrorRef.handleClickOpen();
    }

    setAlertSuccess('Presiona aceptar para continuar');
    alertSuccessRef.current.handleClickOpen();
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
    <>
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
              {errores.foto && <Typography variant="caption" color="error">{errores.foto}</Typography>}
            </>
          ) : (
            <Avatar
              src={preview || datos.linkFoto ||undefined}
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
                error={!!errores.nombre}
                helperText={errores.nombre}
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

        {/* Fecha de nacimiento ----------------------------- */}
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
                    helperText: errores.fechaNacimiento,
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
          
          {/* Tipo de cuenta --------------------------------- */}
          <Box sx={{ flex: '1 1 300px' }}>
            <Typography variant="subtitle2">Tipo de cuenta</Typography>

            {editMode ? (
              <TextField
                select
                name="tipoCuenta"
                value={datos.tipoCuenta}
                onChange={handleChange}
                fullWidth
                error={!!errores.tipoCuenta}
                helperText={errores.tipoCuenta}
              >
                {tipoCuentaPrestamista.map((t) => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField fullWidth value={datos.tipoCuenta} disabled />
            )}
          </Box>
        </Box>

        {/* Teléfono + teléfono secundario ---------------------- */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
          <Box sx={{ flex: '1 1 300px' }}>
            <Typography variant="subtitle2">Teléfono</Typography>
            <TextField
              fullWidth
              name="telefono"
              value={datos.telefono}
              onChange={handleChange}
              disabled={!editMode}
              error={!!errores.telefono}
              sx={{ color: 'black' }}
              helperText={errores.telefono || (editMode ? 'Formato: 10 dígitos' : '')}
              slotProps={{ input: { maxLength: 15, pattern: '[0-9]*' } }}
            />
          </Box>

          <Box sx={{ flex: '1 1 300px' }}>
            <Typography variant="subtitle2">Teléfono secundario</Typography>
            <TextField
              fullWidth
              name="telefonoSecundario"
              value={datos.telefonoSecundario}
              onChange={handleChange}
              disabled={!editMode}
              error={!!errores.telefonoSecundario}
              helperText={errores.telefonoSecundario || (editMode ? 'Opcional: 10 dígitos' : '')}
              slotProps={{ input: { maxLength: 15, pattern: '[0-9]*' } }}
            />
          </Box>
        </Box>

        {/* Descripción ---------------------------------------- */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2">Descripción</Typography>
          <TextField
            fullWidth
            name="descripcion"
            value={datos.descripcion}
            onChange={handleChange}
            multiline
            rows={3}
            disabled={!editMode}
            error={!!errores.descripcion}
            helperText={errores.descripcion || (editMode ? 'Mínimo 10 caracteres, máximo 500' : '')}
            slotProps={{ input: { maxLength: 500 } }}
          />
        </Box>

        {/* Redes sociales -------------------------------------- */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" color="primary" sx={{ mb: 2 }}>Redes Sociales</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <TextField
              name="facebook"
              label="Facebook"
              placeholder="https://facebook.com/..."
              value={datos.redesSociales.facebook}
              onChange={handleRedChange}
              disabled={!editMode}
              error={!!errores.facebook}
              helperText={errores.facebook}
              sx={{ flex: '1 1 300px' }}
            />
            <TextField
              name="instagram"
              label="Instagram"
              placeholder="https://instagram.com/..."
              value={datos.redesSociales.instagram}
              onChange={handleRedChange}
              disabled={!editMode}
              error={!!errores.instagram}
              helperText={errores.instagram}
              sx={{ flex: '1 1 300px' }}
            />
            <TextField
              name="youtube"
              label="Youtube"
              placeholder="https://youtube.com/..."
              value={datos.redesSociales.youtube}
              onChange={handleRedChange}
              disabled={!editMode}
              error={!!errores.youtube}
              helperText={errores.youtube}
              sx={{ flex: '1 1 300px' }}
            />
          </Box>
        </Box>

        {/* Experiencia --------------------------------------------------- */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3 }}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: theme.palette.secondary.main, mb: 1 }}>
              Portafolio - Experiencias
            </Typography>

            {editMode && (
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  label="Nueva experiencia"
                  placeholder="Ej. Instalación de aire acondicionado"
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
                  slotProps={{ input: { maxLength: 100 } }}
                />
                <Button variant="outlined" onClick={agregarExperiencia}>Agregar</Button>
              </Box>
            )}

            {datos.portafolio.length === 0 ? (
              <Typography color="text.secondary">Aún no has agregado ninguna experiencia.</Typography>
            ) : (
              datos.portafolio.map((exp, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography
                    sx={{
                      padding: 1,
                      flexGrow: 1,
                      border: '2px solid',
                      borderColor: theme.palette.primary.main,
                      borderRadius: 1,
                      backgroundColor: editMode ? '#f9f9f9' : 'transparent',
                    }}
                  >
                    {exp}
                  </Typography>
                  {editMode && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => eliminarExperiencia(index)}
                      size="small"
                    >
                      Eliminar
                    </Button>
                  )}
                </Box>
              ))
            )}
            {errores.portafolio && <Typography variant="caption" color="error">{errores.portafolio}</Typography>}
          </Box>

          {/* Métodos de pago -----------------------------------------------------  */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Métodos de Pago
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
            {errores.metodoPago && <Typography variant="caption" color="error">{errores.metodoPago}</Typography>}
          </Box>

          {/* Horarios --------------------------------------------------------------- */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Horarios Preferidos
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
            {errores.horarios && <Typography variant="caption" color="error">{errores.horarios}</Typography>}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" color="primary">Imágenes de Trabajo (máx. 5)</Typography>
        {editMode && (
          <Box sx={{ mt: 1 }}>
            <input
              accept="image/*"
              multiple
              type="file"
              id="imagenesTrabajo"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="imagenesTrabajo">
              <Button variant="contained" component="span" startIcon={<AddAPhotoIcon />}>
                Subir imágenes
              </Button>
            </label>
            {errores.imagenes && <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>{errores.imagenes}</Typography>}
          </Box>
        )}

        {/* Imágenes de trabajo -------------------------------------------- */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
          {imagenes.map((src, idx) => (
            <Box key={idx} sx={{ position: 'relative' }}>
              <Avatar
                src={src}
                variant="rounded"
                sx={{ width: 120, height: 120, boxShadow: 2, cursor: 'pointer' }}
                onClick={() => handleImageClick(src)}
              />
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
    {/* Alerta de Success */}
    <AlertD
      ref={alertSuccessRef}
      titulo='Datos guardados'
      mensaje={alertSuccess}
      imagen={alertImage}
      boton1='Aceptar'
      onConfirm={() => setAlertSuccess('')}
    />
    {/* Alerta de Error */}
    <AlertD
      ref={alertErrorRef}
      titulo='Error al guardar datos'
      mensaje={alertError}
      imagen={imgError}
      boton1='Cerrar'
      onConfirm={() => setAlertError('')}
    />
    </>
  );
}