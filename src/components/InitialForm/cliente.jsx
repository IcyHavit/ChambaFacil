import { Box, FormGroup, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
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
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';

dayjs.locale('es'); // aplica el idioma

const Cliente = () => {
  const [fechaNacimiento, setFechaNacimiento] = useState(null);

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  // Adjunta la imagen manualmente si fue seleccionada
  if (foto) {
    data.append('fotoPerfil', foto);
  }

  const cliente = {
    nombre: data.get('name'),
    telefono1: data.get('tel1'),
    telefono2: data.get('tel2'),
    tipoCuenta: data.get('tipoCuenta'),
    fechaNacimiento: fechaNacimiento ? fechaNacimiento.format('DD/MM/YYYY') : null,
    preferenciasPago: data.getAll('pago'),
    horarios: data.getAll('horario'),
    // puedes enviar la imagen como base64, o directamente como FormData
    fotoPerfil: foto
  };

  console.log(cliente);

  // Ejemplo: envío con fetch
  // fetch('/api/cliente', {
  //   method: 'POST',
  //   body: data
  // });
};

  const theme = useTheme();

  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setPreview(URL.createObjectURL(file)); // genera vista previa temporal
  };


  return (
    <Box sx={{ borderColor: theme.palette.primary.main, borderStyle: 'solid', width: '55rem', height: 'auto', borderRadius: theme.shape.borderRadius }}>
      <Typography sx={{ textAlign: 'center', fontFamily: theme.typography.bodyLarge, color: theme.palette.secondary.main, fontSize: 45, fontWeight: 'bold' }}>
        Cliente
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
          type='text'
          required
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
              label='Telefono'
              type='tel'
              required
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              name='tel2'
              label=' Segundo Telefono'
              type='tel'
              fullWidth
            />

          </Grid>
        </Grid>
        <Grid container>
          <Grid size={6} pr={2}>
            <Typography sx={{ pt: 2, fontFamily: theme.typography.bodySmall, fontWeight: 'bold', color: theme.palette.secondary.main }}>
              Preferencias de Pago
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox name="pago" value="Efectivo" />} label="Efectivo" />
              <FormControlLabel control={<Checkbox name="pago" value="Transferencia" />} label="Transferencia" />
              <FormControlLabel control={<Checkbox name="pago" value="Tarjeta" />} label="Tarjeta" />
            </FormGroup>


          </Grid>
          <Grid size={6}>
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
        </Grid>

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


    </Box >
  );
};

export default Cliente;