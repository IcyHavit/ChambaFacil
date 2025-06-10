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
import 'dayjs/locale/es'; // idioma español
import Checkbox from '@mui/material/Checkbox';
import ButtonMod from '../ButtonMod';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';


dayjs.locale('es'); // aplica el idioma


export default function Prestamista() {
  const [fechaNacimiento, setFechaNacimiento] = useState(null);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (foto) {
      data.append('fotoPerfil', foto);
    }

    const prestamista = {
      nombre: data.get('name'),
      telefono1: data.get('tel1'),
      telefono2: data.get('tel2'),
      tipoCuenta: data.get('tipoCuenta'),
      fechaNacimiento: fechaNacimiento ? fechaNacimiento.format('DD/MM/YYYY') : null,
      preferenciasPago: data.getAll('pago'),
      horarios: data.getAll('horario'),
      fotoPerfil: foto,
      experiencia: experiencias,
      redesSociales: {
        facebook: data.get('facebook'),
        instagram: data.get('instagram'),
        linkedin: data.get('linkedin'),
      },
      imagenes: imagenes

    };
    console.log(prestamista);
  };


  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const theme = useTheme();

  const [nuevaExperiencia, setNuevaExperiencia] = useState('');
  const [experiencias, setExperiencias] = useState([]);


  const agregarExperiencia = () => {
    if (nuevaExperiencia.trim() !== '') {
      setExperiencias([...experiencias, nuevaExperiencia.trim()]);
      setNuevaExperiencia('');
    }
  };

  const eliminarExperiencia = (index) => {
    setExperiencias((prev) => prev.filter((_, i) => i !== index));
  };

  const [imagenes, setImagenes] = useState([]);

  const handleImagenesChange = (e) => {
    const files = Array.from(e.target.files);
    const nuevas = [...imagenes, ...files].slice(0, 5);
    setImagenes(nuevas);
  };

  const eliminarImagen = (index) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ borderColor: theme.palette.primary.main, borderStyle: 'solid', width: '55rem', height: 'auto', borderRadius: theme.shape.borderRadius }}>
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
          boxShadow: 3,
          borderRadius: 2,
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
        </Box>
        <TextField
          name='name'
          label='Nombre'
          required
          fullWidth
        />
        <TextField
          name='description'
          label='Descripción'
          multiline
          required
          rows={4}
          placeholder='Escribe una descripción de tí'
          fullWidth
        />

        <Grid container>
          <Grid size={6} pr={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label='Fecha de nacimiento' format='DD/MM/YYYY' value={fechaNacimiento} onChange={(newValue) => setFechaNacimiento(newValue)} slotProps={{
                  textField: {
                    name: 'fechaNacimiento',
                    sx: { width: 350, },
                  }
                }} />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid size={6}>

            <FormControl>
              <FormLabel id="tipo">Tipo de cuenta</FormLabel>
              <RadioGroup
                row
                aria-labelledby="tipoCuenta"
                defaultValue="Personal"
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
            </FormControl>

          </Grid>
        </Grid>

        <Grid container>
          <Grid size={6} pr={2}>
            <TextField
              name='tel1'
              label='Teléfono'
              required
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              name='tel2'
              label='Segundo teléfono'
              fullWidth
            />

          </Grid>
        </Grid>


        <Typography sx={{ fontFamily: theme.typography.bodySmall, fontWeight: 'bold', color: theme.palette.secondary.main }}>
          Portafolio - Experiencias
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Nueva experiencia"
            placeholder="Ej. Instalación eléctrica residencial"
            value={nuevaExperiencia}
            onChange={(e) => setNuevaExperiencia(e.target.value)}
            fullWidth
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
        </Box>

        <Grid container>
          <Grid size={4} pr={2}>
            <Typography sx={{ pt: 2, fontFamily: theme.typography.bodySmall, fontWeight: 'bold', color: theme.palette.secondary.main }}>
              Preferencias de Pago
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox name="pago" value="Efectivo" />} label="Efectivo" />
              <FormControlLabel control={<Checkbox name="pago" value="Transferencia" />} label="Transferencia" />
              <FormControlLabel control={<Checkbox name="pago" value="Tarjeta" />} label="Tarjeta" />
            </FormGroup>


          </Grid>
          <Grid size={4}>
            <Typography sx={{ pt: 2, fontFamily: theme.typography.bodySmall, fontWeight: 'bold', color: theme.palette.secondary.main }}>
              Horarios Preferidos
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} name='horario' label="Lunes" />
              <FormControlLabel control={<Checkbox />} name='horario' label='Martes' />
              <FormControlLabel control={<Checkbox />} name='horario' label='Miercoles' />
              <FormControlLabel control={<Checkbox />} name='horario' label='Jueves' />
              <FormControlLabel control={<Checkbox />} name='horario' label='Viernes' />
              <FormControlLabel control={<Checkbox />} name='horario' label='Sábado' />
              <FormControlLabel control={<Checkbox />} name='horario' label='Domingo' />
            </FormGroup>
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
              />
              <TextField
                name="instagram"
                label="Instagram"
                placeholder="https://instagram.com/..."

              />

              <TextField
                name="Youtube"
                label="Youtube"
                placeholder="https://youtube.com/..."

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
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 100,
                        height: 100,
                        cursor: 'pointer',
                      }}
                    />
                  </label>
                </Box>
            )}
          </Grid>
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
  );
};
