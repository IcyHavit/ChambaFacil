// PublicarServicio.jsx (versión final ordenada y validada)
import React, { useState } from 'react';
import {
  Box, Button, Container, Paper, TextField, Typography,
  FormControl, InputLabel, Select, MenuItem,
  FormControlLabel, RadioGroup, Radio, Grid,
  FormGroup, Checkbox
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DisponibilidadDia from '../components/PublicarServicio/DisponibilidadDia';
import SubidaImagenes from '../components/PublicarServicio/SubidaImagenes';
import { Form } from 'react-router-dom';
import { Avatar } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material'

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const alcaldias = [
  'Álvaro Obregón', 'Azcapotzalco', 'Benito Juárez', 'Coyoacán', 'Cuajimalpa',
  'Cuauhtémoc', 'Gustavo A. Madero', 'Iztacalco', 'Iztapalapa', 'La Magdalena Contreras',
  'Miguel Hidalgo', 'Milpa Alta', 'Tláhuac', 'Tlalpan', 'Venustiano Carranza', 'Xochimilco'
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
  const [referencia, setReferencia] = useState('');
  const [diasDisponibles, setDiasDisponibles] = useState({});
  const [imagenes, setImagenes] = useState([]);
  const [modalidades, setModalidades] = useState({
    'Por hora': { checked: false, precio: '' },
    'Por semana': { checked: false, precio: '' },
    'Por proyecto': { checked: false, precio: '' },
    'Por mes': { checked: false, precio: '' },
    'Visita de diagnóstico sin cobro': { checked: false, precio:'' },
    'Visita de diagnóstico con costo': { checked: false, precio: '' },
    'Cotización': { checked: false, precio: '' },
  });

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
      [dia]: prev[dia] ? undefined : { desde: '', hasta: '' }
    }));
  };

  const handleHorarioChange = (dia, campo, valor) => {
    setDiasDisponibles((prev) => ({
      ...prev,
      [dia]: { ...prev[dia], [campo]: valor }
    }));
  };

  const handleImagenes = (e) => {
    const files = Array.from(e.target.files);
    if (files.length <= 3) {
      setImagenes(files);
    } else {
      alert('Solo puedes subir hasta 3 archivos.');
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: theme.palette.background.default }}>
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography variant="h4" sx={{ ...theme.typography.bodyLarge, fontWeight: 'bold', color: theme.palette.primary.main, mb: 3 }}>
            Publicar Servicio
          </Typography>

          {/* Bloque 1: Título y Categoría */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
              <TextField
                label="Título del servicio"
                required
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                sx={{ flex: 1 }}
              />
              <FormControl required sx={{ minWidth: 200 }}>
                <InputLabel>Categoría</InputLabel>
                <Select value={categoria} label="Categoría" onChange={(e) => setCategoria(e.target.value)}>
                  <MenuItem value="Electricista">Electricista</MenuItem>
                  <MenuItem value="Plomero">Plomero</MenuItem>
                  <MenuItem value="Carpintero">Carpintero</MenuItem>
                  <MenuItem value="Electrodomésticos">Reparación de electrodomésticos</MenuItem>
                  <MenuItem value="Tecnología">Tecnología</MenuItem>
                  <MenuItem value="Otros">Otros</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>


          {/* Bloque 2: Descripción */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <TextField label="Descripción" fullWidth required multiline minRows={4} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          </Paper>

          /* Bloque 3: Materiales, Garantía y Zona de trabajo */
                <Paper sx={{ p: 3, mb: 3 }}>
                <Typography fontWeight="bold">¿Incluye materiales?</Typography>
                <RadioGroup row value={materiales} onChange={(e) => setMateriales(e.target.value)}>
                  <FormControlLabel value="si" control={<Radio required />} label="Sí" />
                  <FormControlLabel value="no" control={<Radio required />} label="No" />
                </RadioGroup>

                <Typography fontWeight="bold" mt={2}>¿Ofreces garantía?</Typography>
                <RadioGroup row value={garantia} onChange={(e) => setGarantia(e.target.value)}>
                  <FormControlLabel value="si" control={<Radio required />} label="Sí" />
                  <FormControlLabel value="no" control={<Radio required />} label="No" />
                </RadioGroup>

                {garantia === 'si' && (
                  <TextField
                  fullWidth
                  required
                  label="Especifica la garantía"
                  placeholder="Ej. Garantía de 6 meses"
                  sx={{ mt: 2 }}
                  value={garantiaDesc}
                  onChange={(e) => setGarantiaDesc(e.target.value)}
                  />
                )}

                <Typography fontWeight="bold" mt={2}>Zona de trabajo</Typography>
                <FormControl fullWidth required>
                  <InputLabel>Zonas de trabajo</InputLabel>
                  <Select value={zonaTrabajo} onChange={(e) => setZonaTrabajo(e.target.value)}>
                  <MenuItem value="Mi lugar">Mi lugar</MenuItem>
                  {alcaldias.map((a) => (
                    <MenuItem key={a} value={a}>{a}</MenuItem>
                  ))}
                  </Select>
                </FormControl>

                {zonaTrabajo === 'Mi lugar' && (
                  <TextField
                  fullWidth
                  required
                  label="Dirección de tu lugar"
                  placeholder="Calle, número..."
                  sx={{ mt: 2 }}
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  />
                )}

                {zonaTrabajo !== 'Mi lugar' && (
                  <TextField
                  fullWidth
                  label="Dirección de referencia"
                  placeholder="Cerca de parque, metro..."
                  sx={{ mt: 2 }}
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                  />
                )}
                </Paper>

                {/* Bloque 4: Modalidad y precio */}

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
                      </Box>
                      </Paper>

                      {/* Bloque 5: Disponibilidad */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography fontWeight="bold" mb={2}>Disponibilidad</Typography>
            {diasSemana.map((dia) => (
              <DisponibilidadDia key={dia} dia={dia} checked={!!diasDisponibles[dia]} desde={diasDisponibles[dia]?.desde || ''} hasta={diasDisponibles[dia]?.hasta || ''} onCheck={() => handleCheckboxChange(dia)} onHorarioChange={(campo, valor) => handleHorarioChange(dia, campo, valor)} />
            ))}
          </Paper>

          {/* Bloque 6: Multimedia */}
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
            sx={{
              width: 150,
              height: 150,
              boxShadow: 2,
            }}
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
</Paper>
          {/* Botón Final */}
          <Box textAlign="center">
            <Button variant="contained" sx={{ bgcolor: theme.palette.secondary.dark, color: theme.palette.tertiary.main, fontWeight: 'bold', textTransform: 'none', px: 5, py: 1.5, '&:hover': { bgcolor: theme.palette.secondary.main } }}>
              Publicar
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
