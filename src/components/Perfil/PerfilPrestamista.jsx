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
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

dayjs.locale('es');

const tiposPrestamista = ['Personal', 'Grupo', 'Empresa'];
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
  const [nuevaExperiencia, setNuevaExperiencia] = useState('');
  const [errores, setErrores] = useState({});

  const [datos, setDatos] = useState({
    nombre: 'Carlos Martínez',
    fechaNacimiento: '1985-05-12',
    descripcion: '',
    tipoPrestamista: '',
    contacto1: '',
    contacto2: '',
    portafolio: [],
    metodoPago: [],
    horarios: [],
    redes: { facebook: '', instagram: '', youtube: '' },
  });

  const [fechaNacimiento, setFechaNacimiento] = useState(dayjs(datos.fechaNacimiento));

  // Función de validación individual de campos
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
      
      case 'contacto1':
      case 'contacto2':
        if (name === 'contacto1' && !value.trim()) return 'El teléfono es obligatorio';
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
    } catch (_) {
      return false;
    }
  };

  // Validación completa del formulario
  const validate = () => {
    const newErrors = {};

    // Validar campos básicos
    const nombreError = validateField('nombre', datos.nombre);
    if (nombreError) newErrors.nombre = nombreError;

    const descripcionError = validateField('descripcion', datos.descripcion);
    if (descripcionError) newErrors.descripcion = descripcionError;

    const contacto1Error = validateField('contacto1', datos.contacto1);
    if (contacto1Error) newErrors.contacto1 = contacto1Error;
    
    if (datos.contacto2) {
      const contacto2Error = validateField('contacto2', datos.contacto2);
      if (contacto2Error) newErrors.contacto2 = contacto2Error;
    }

    // Validar teléfonos duplicados
    if (datos.contacto1 && datos.contacto2 && 
        datos.contacto1.replace(/\s/g, '') === datos.contacto2.replace(/\s/g, '')) {
      newErrors.contacto2 = 'Los teléfonos no pueden ser iguales';
    }

    // Validar fecha de nacimiento
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

    // Validar tipo de prestamista
    if (!datos.tipoPrestamista) {
      newErrors.tipoPrestamista = 'Selecciona el tipo de prestamista';
    }


    // Validar horarios
    if (datos.horarios.length === 0) {
      newErrors.horarios = 'Selecciona al menos un día';
    }

    // Validar URLs de redes sociales
    Object.keys(datos.redes).forEach(red => {
      const urlError = validateField(red, datos.redes[red]);
      if (urlError) newErrors[red] = urlError;
    });

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

  const handleRedChange = (e) => {
    const { name, value } = e.target;
    
    // Limpiar errores del campo actual
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }

    setDatos({ ...datos, redes: { ...datos.redes, [name]: value } });
    
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
      fechaNacimiento: newValue ? newValue.format('YYYY-MM-DD') : '',
    }));
    
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
    
    const urls = [...imagenes, ...validFiles].slice(0, 5).map((file) => 
      typeof file === 'string' ? file : URL.createObjectURL(file)
    );
    setImagenes(urls);
    
    if (validFiles.length > 0 && errores.imagenes) {
      setErrores(prev => ({ ...prev, imagenes: '' }));
    }
  };

  const eliminarImagen = (index) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageClick = (src) => {
    setModalImage(src);
    setModalOpen(true);
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

    const prestamista = {
      nombre: datos.nombre,
      descripcion: datos.descripcion,
      telefono1: datos.contacto1.replace(/\s/g, ''),
      telefono2: datos.contacto2.replace(/\s/g, ''),
      tipoPrestamista: datos.tipoPrestamista,
      fechaNacimiento: fechaNacimiento ? fechaNacimiento.format('DD/MM/YYYY') : null,
      metodoPago: datos.metodoPago,
      horarios: datos.horarios,
      fotoPerfil: foto,
      portafolio: datos.portafolio,
      redesSociales: datos.redes,
      imagenes: imagenes
    };
    
    console.log('Datos del prestamista:', prestamista);
    
    // Aquí puedes agregar la lógica para enviar los datos
    alert('Perfil guardado exitosamente');
    setEditMode(false);
  };

  const toggleEdit = () => {
    if (editMode) {
      // Si está saliendo del modo edición, realizar validación
      handleSubmit(new Event('submit'));
    } else {
      setEditMode(true);
    }
  };

  return (
    <Stack sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Navbar />

      <Paper elevation={3} sx={{ maxWidth: 1000, mx: 'auto', mt: 5, p: 4, borderRadius: 4, mb: 4 }}>
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
              {errores.foto && <Typography variant="caption" color="error">{errores.foto}</Typography>}
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

          <Box sx={{ flex: '1 1 300px' }}>
            <Typography variant="subtitle2">Tipo de Prestamista</Typography>

            {editMode ? (
              <TextField
                select
                name="tipoPrestamista"
                value={datos.tipoPrestamista}
                onChange={handleChange}
                fullWidth
                error={!!errores.tipoPrestamista}
                helperText={errores.tipoPrestamista}
              >
                {tiposPrestamista.map((t) => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField fullWidth value={datos.tipoPrestamista} disabled />
            )}
          </Box>
        </Box>

        {/* Fila 2: Contacto 1 + Contacto 2 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
          <Box sx={{ flex: '1 1 300px' }}>
            <Typography variant="subtitle2">Contacto 1</Typography>
            <TextField
              fullWidth
              name="contacto1"
              value={datos.contacto1}
              onChange={handleChange}
              disabled={!editMode}
              error={!!errores.contacto1}
              helperText={errores.contacto1 || (editMode ? 'Formato: 10 dígitos' : '')}
              slotProps={{input:{ maxLength: 15, pattern: '[0-9]*' }}}

            />
          </Box>

          <Box sx={{ flex: '1 1 300px' }}>
            <Typography variant="subtitle2">Contacto 2</Typography>
            <TextField
              fullWidth
              name="contacto2"
              value={datos.contacto2}
              onChange={handleChange}
              disabled={!editMode}
              error={!!errores.contacto2}
              helperText={errores.contacto2 || (editMode ? 'Opcional: 10 dígitos' : '')}
                                slotProps={{input:{ maxLength: 15, pattern: '[0-9]*' }}}
            />
          </Box>
        </Box>

        {/* Campo descripción separado */}
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
                  slotProps={{input:{ maxLength: 500 }}}
          />
        </Box>

        {/* Redes sociales */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" color="primary" sx={{ mb: 2 }}>Redes Sociales</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <TextField
              name="facebook"
              label="Facebook"
              placeholder="https://facebook.com/..."
              value={datos.redes.facebook}
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
              value={datos.redes.instagram}
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
              value={datos.redes.youtube}
              onChange={handleRedChange}
              disabled={!editMode}
              error={!!errores.youtube}
              helperText={errores.youtube}
              sx={{ flex: '1 1 300px' }}
            />
          </Box>
        </Box>

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
                  slotProps={{input:{ maxLength: 100 }}}
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
          <Button 
            variant="contained" 
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