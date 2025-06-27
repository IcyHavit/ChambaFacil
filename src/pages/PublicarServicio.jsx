import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Grid,
  Avatar,
  IconButton,
  Button,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';

import { createService } from '../api/service';
import { uploadFile } from '../api/file';

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const alcaldias = [
  'Mi lugar', 'Álvaro Obregón', 'Azcapotzalco', 'Benito Juárez', 'Coyoacán', 'Cuajimalpa',
  'Cuauhtémoc', 'Gustavo A. Madero', 'Iztacalco', 'Iztapalapa', 'La Magdalena Contreras',
  'Miguel Hidalgo', 'Milpa Alta', 'Tláhuac', 'Tlalpan', 'Venustiano Carranza', 'Xochimilco',
];

export default function PublicarServicio() {
  const theme = useTheme();
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [materiales, setMateriales] = useState('');
  const [garantia, setGarantia] = useState('');
  const [garantiaDesc, setGarantiaDesc] = useState('');
  const [zonaTrabajo, setZonaTrabajo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [modalidades, setModalidades] = useState({
    'Por hora': { checked: false, precio: '' },
    'Por semana': { checked: false, precio: '' },
    'Por proyecto': { checked: false, precio: '' },
    'Por mes': { checked: false, precio: '' },
    'Visita de diagnóstico sin cobro': { checked: false, precio: '' },
    'Visita de diagnóstico con costo': { checked: false, precio: '' },
    'Cotización': { checked: false, precio: '' },
  });
  const [diasDisponibles, setDiasDisponibles] = useState({});
  const [imagenes, setImagenes] = useState([]);
  const [errores, setErrores] = useState({});

  const handleCheckboxChangeM = (modalidad) => {
    setModalidades((prev) => ({
      ...prev,
      [modalidad]: { ...prev[modalidad], checked: !prev[modalidad].checked },
    }));
  };

  const handlePrecioChangeM = (modalidad, precio) => {
    setModalidades((prev) => ({
      ...prev,
      [modalidad]: { ...prev[modalidad], precio },
    }));
  };

  const handleCheckboxChange = (dia) => {
    setDiasDisponibles((prev) => ({
      ...prev,
      [dia]: prev[dia] ? null : { desde: '', hasta: '' },
    }));
  };

  const handleHorarioChange = (dia, campo, valor) => {
    setDiasDisponibles((prev) => ({
      ...prev,
      [dia]: { ...prev[dia], [campo]: valor },
    }));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    const nuevosErrores = {};

    if (!titulo.trim()) {
      nuevosErrores.titulo = "El título es obligatorio";
    }

    if (!categoria) {
      nuevosErrores.categoria = "Selecciona una categoría";
    }

    if (!descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es obligatoria";
    }

    if (!materiales) {
      nuevosErrores.materiales = "Selecciona si incluye materiales";
    }

    if (!garantia) {
      nuevosErrores.garantia = "Selecciona si ofreces garantía";
    }

    if (garantia === 'si' && !garantiaDesc.trim()) {
      nuevosErrores.garantiaDesc = "Debes especificar la garantía ofrecida";
    }

    if (!zonaTrabajo) {
      nuevosErrores.zonaTrabajo = "Selecciona una zona de trabajo";
    }

    if (zonaTrabajo === "Mi lugar" && !direccion.trim()) {
      nuevosErrores.direccion = "La dirección es obligatoria";
    }

    const alMenosUnaModalidad = Object.values(modalidades).some(m => m.checked);
    if (!alMenosUnaModalidad) {
      nuevosErrores.modalidades = "Selecciona al menos una modalidad de cobro";
    }

    const alMenosUnDia = Object.keys(diasDisponibles).length > 0;
    if (!alMenosUnDia) {
      nuevosErrores.dias = "Selecciona al menos un día";
    }

    if (imagenes.length === 0) {
      nuevosErrores.imagenes = "Debes subir al menos una imagen";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      console.log("Errores encontrados:", nuevosErrores);
      setErrores(nuevosErrores);
      return;
    }

    const data = new FormData(event.currentTarget);

    const servicio = {
      titulo: data.get('titulo'),
      categoria: data.get('categoria'),
      descripcion: data.get('desc'),
      materiales: data.get('materiales'),
      garantia: data.get('garantia') === 'si' ? data.get('garantiaDesc') : null,
      // eliminar mi lugar de la zona de trabajo
      zonaTrabajo: zonaTrabajo.filter((zona) => zona !== 'Mi lugar'),
      direccion,
      modalidades: Object.keys(modalidades)
        .filter((modalidad) => modalidades[modalidad].checked)
        .map((modalidad) => ({
          modalidad,
          precio: modalidades[modalidad].precio,
        })),
      disponibilidad: Object.keys(diasDisponibles).map((dia) => ({
        dia,
        desde: diasDisponibles[dia]?.desde,
        hasta: diasDisponibles[dia]?.hasta,
      }))
    };

    if (typeof localStorage.getItem('id') === 'string')
      servicio.prestamistaId = parseInt(localStorage.getItem('id'), 10);

    // Subir imagenes y obtener URLs
    const imagenesUrls = [];
    for (const file of imagenes) {
      try {
        const response = await uploadFile(file, 'services');
        imagenesUrls.push(response.link);
      }
      catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al subir imagen. Por favor, intenta nuevamente.';
        alert(`Error al subir imagen: ${errorMessage}`);
        return;
      }
    }

    const dataForCreation = {
      prestamistaId: servicio.prestamistaId,
      categoria: servicio.categoria,
      titulo: servicio.titulo,
      descripcion: servicio.descripcion,
      materiales: servicio.materiales === 'si'? true : false,
      direccion: servicio.direccion,
      zona: JSON.stringify(servicio.zonaTrabajo),
      fechaInicio: new Date().toISOString(),
      modalidades: JSON.stringify(servicio.modalidades),
      garantia: servicio.garantia || "No aplica",
      imagenes: JSON.stringify(imagenesUrls),
      disponibilidad: JSON.stringify(servicio.disponibilidad),
    }

    try {
      const response = await createService(dataForCreation);
      alert('Servicio publicado exitosamente');
      console.log('Servicio creado:', response);
      // window.location.href = '/servicios'; // Redirigir a la lista de servicios publicados
    }
    catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al crear servicio, por favor intenta nuevamente.';
        // Aleta provisional sin estilo de error
        alert(`Error al crear servicio. ${errorMessage}`);
    }

  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ bgcolor: theme.palette.background.default }}
    >
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{
            ...theme.typography.bodyLarge,
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            mb: 3,
          }}
        >
          Publicar Servicio
        </Typography>

        {/* Bloque 1: Título y Categoría */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
            <TextField
              label="Título del servicio"
              name="titulo"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              sx={{ flex: 1 }}
              error={!!errores.titulo}
              helperText={errores.titulo}
            />
            <FormControl required sx={{ minWidth: 200 }} error={!!errores.categoria}>
              <InputLabel>Categoría</InputLabel>
              <Select
                name="categoria"
                value={categoria}
                label="Categoría"
                onChange={(e) => setCategoria(e.target.value)}
              >
                <MenuItem value="Electricidad">Electricidad</MenuItem>
                <MenuItem value="Plomero">Plomero</MenuItem>
                <MenuItem value="Carpintero">Carpintero</MenuItem>
                <MenuItem value="Electrodomésticos">Reparación de electrodomésticos</MenuItem>
                <MenuItem value="Tecnología">Tecnología</MenuItem>
                <MenuItem value="Otros">Otros</MenuItem>
              </Select>
              {errores.categoria && (
                <Typography variant="caption" color="error">
                  {errores.categoria}
                </Typography>
              )}
            </FormControl>
          </Box>
        </Paper>

        {/* Bloque 2: Descripción */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <TextField
            name="desc"
            label="Descripción"
            fullWidth
            required
            multiline
            minRows={4}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            error={!!errores.descripcion}
            helperText={errores.descripcion}
          />
        </Paper>

        {/* Bloque 3: Materiales, Garantía y Zona de trabajo */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography fontWeight="bold">¿Incluye materiales?</Typography>
          <FormControl component="fieldset" error={!!errores.materiales} sx={{ mt: 2 }}>
            <RadioGroup row name="materiales" value={materiales} onChange={(e) => setMateriales(e.target.value)}>
              <FormControlLabel value="si" control={<Radio />} label="Sí" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            {errores.materiales && (
              <Typography variant="caption" color="error">
                {errores.materiales}
              </Typography>
            )}
          </FormControl>

          <Typography fontWeight="bold" mt={2}>¿Ofreces garantía?</Typography>
          <FormControl component="fieldset" error={!!errores.garantia} sx={{ mt: 2 }}>
            <RadioGroup row name="garantia" value={garantia} onChange={(e) => setGarantia(e.target.value)}>
              <FormControlLabel value="si" control={<Radio />} label="Sí" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            {errores.garantia && (
              <Typography variant="caption" color="error">
                {errores.garantia}
              </Typography>
            )}
          </FormControl>

          {garantia === 'si' && (
            <TextField
              name="garantiaDesc"
              fullWidth
              required
              label="Especifica la garantía"
              placeholder="Ej. Garantía de 6 meses"
              sx={{ mt: 2 }}
              value={garantiaDesc}
              onChange={(e) => setGarantiaDesc(e.target.value)}
              error={!!errores.garantiaDesc}
              helperText={errores.garantiaDesc}
            />
          )}

          <Typography fontWeight="bold" mt={2}>Zonas de trabajo</Typography>
          <FormGroup>
            {alcaldias.map((alcaldia) => (
              <FormControlLabel
                key={alcaldia}
                control={
                  <Checkbox
                    checked={zonaTrabajo.includes(alcaldia)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setZonaTrabajo((prev) => [...prev, alcaldia]);
                      } else {
                        setZonaTrabajo((prev) => prev.filter((zona) => zona !== alcaldia));
                      }
                    }}
                  />
                }
                label={alcaldia}
              />
            ))}
          </FormGroup>
          {zonaTrabajo.includes('Mi lugar') && (
            <TextField
              name="zonaLugar"
              fullWidth
              required
              label="Dirección de tu lugar"
              placeholder="Calle, número..."
              sx={{ mt: 2 }}
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              error={!!errores.direccion}
              helperText={errores.direccion}
            />

          )}
          {!zonaTrabajo.includes('Mi lugar') && (
            <TextField
              name="zonaLugar"
              fullWidth
              label="Dirección de tu lugar"
              placeholder="Calle, número..."
              sx={{ mt: 2 }}
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              error={!!errores.direccion}
              helperText={errores.direccion}
            />

          )}
        </Paper>

        {/* Bloque 4: Modalidades */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography fontWeight="bold" mt={2}>Modalidad de cobro</Typography>
          <Box display="flex" flexDirection="column" gap={2} pl={2}>
            <FormGroup>
              {Object.keys(modalidades).map((modalidad) => (
                <Box key={modalidad} sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={modalidades[modalidad].checked}
                        onChange={() => handleCheckboxChangeM(modalidad)}
                      />
                    }
                    label={modalidad}
                  />
                  {modalidades[modalidad].checked &&
                    !['Visita de diagnóstico sin cobro', 'Cotización'].includes(modalidad) && (
                      <Box sx={{ mt: 1, pl: 2 }}>
                        <TextField
                          label="Precio"
                          placeholder="Ej. 500"
                          type="number"
                          value={modalidades[modalidad].precio}
                          onChange={(e) => handlePrecioChangeM(modalidad, e.target.value)}
                          sx={{ maxWidth: 150 }}
                        />
                      </Box>
                    )}
                </Box>
              ))}
            </FormGroup>
            {errores.modalidades && (
              <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                {errores.modalidades}
              </Typography>
            )}
          </Box>
        </Paper>

        {/* Bloque 5: Disponibilidad */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography fontWeight="bold" mb={2}>Disponibilidad</Typography>
          {diasSemana.map((dia) => (
            <Box key={dia} sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!diasDisponibles[dia]}
                    onChange={() => handleCheckboxChange(dia)}
                  />
                }
                label={dia}
              />
              {diasDisponibles[dia] && (
                <Box display="flex" gap={2} mt={1}>
                  <TextField
                    label="Desde"
                    type="time"
                    value={diasDisponibles[dia]?.desde || ''}
                    onChange={(e) => handleHorarioChange(dia, 'desde', e.target.value)}
                    sx={{ maxWidth: 150 }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                  <TextField
                    label="Hasta"
                    type="time"
                    value={diasDisponibles[dia]?.hasta || ''}
                    onChange={(e) => handleHorarioChange(dia, 'hasta', e.target.value)}
                    sx={{ maxWidth: 150 }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
          ))}
          {errores.dias && (
            <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
              {errores.dias}
            </Typography>
          )}
        </Paper>

        {/* Bloque 6: Multimedia */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Imágenes de trabajos (máx. 3)
          </Typography>
          <Grid container spacing={2}>
            {imagenes.map((file, index) => (
              <Grid key={index}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={URL.createObjectURL(file)}
                    variant="rounded"
                    sx={{ width: 150, height: 150, boxShadow: 2 }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => setImagenes((prev) => prev.filter((_, i) => i !== index))}
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
            {imagenes.length < 3 && (
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
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const nuevas = [...imagenes, ...files].slice(0, 3);
                    setImagenes(nuevas);
                  }}
                  id="evidencias"
                  style={{ display: 'none' }}
                />
                <label htmlFor="evidencias">
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 150,
                      height: 150,
                      cursor: 'pointer',
                    }}
                  />
                </label>
              </Box>
            )}
          </Grid>
          {errores.imagenes && (
            <Typography variant="caption" color="error" sx={{ mt: 1 }}>
              {errores.imagenes}
            </Typography>
          )}
        </Paper>

        {/* Botón */}
        <Box textAlign="center">
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: theme.palette.secondary.dark,
              color: theme.palette.tertiary.main,
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Publicar
          </button>
        </Box>
      </Container>
    </Box>

  );
}
