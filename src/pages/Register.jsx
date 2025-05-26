import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Box, Grid, TextField, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google'; // Asegúrate de instalar @mui/icons-material
import img from '../assets/images/registro/registro.webp';
import ButtonMod from '../components/ButtonMod'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';

export default function Register() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validación en tiempo real para "confirmPassword"
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: 'Las contraseñas no coinciden.',
        }));
      } else {
        setErrors((prevErrors) => {
          const { ...rest } = prevErrors;
          return rest; // Elimina el error si las contraseñas coinciden
        });
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) {
      newErrors.email = 'El correo debe ser válido.';
    }
    if (formData.phone.length < 10) {
      newErrors.phone = 'El teléfono debe tener al menos 10 dígitos.';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Formulario válido:', formData);
      // Aquí puedes enviar los datos al servidor
    }
  };

  const handleGoogleRegister = () => {
    // Aquí puedes manejar la lógica para el registro con Google
    console.log('Registro con Google');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: theme.palette.background.default, padding: 2 }}>

      <Container
        maxWidth="md"
        sx={{
          border: `2px solid ${theme.palette.primary.main}`,
          borderRadius: 2,
          p: 2
        }}
      >
        <Grid container sx={{ minHeight: '400' }} >

          <Grid size={6} sx={{ paddingRight: 2, xs: 12, md: 6 }}>
            <item>
              <img
                src={img}
                alt="Registro"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
              />
            </item>
          </Grid>
          <Grid size={6} sx={{ xs: 12, md: 6 }}>
            <item>
              <Box component="form" onSubmit={handleSubmit} required noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <h1 style={{ textAlign: 'center', color: theme.palette.primary.main, fontFamily: theme.typography.bodyLarge.main, fontWeight: 'bold' }}>Registro</h1>
                {/* Boton de google para registrarte de ahi mas rapido */}
                <ButtonMod
                  variant='principal'
                  textCont='Registrarse con Google'
                  width='auto'
                  height='1.8rem'
                  clickEvent={handleGoogleRegister}
                  startIcon={<GoogleIcon />}
                />
                {/*separador */}
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                  <Box sx={{ flex: 1, height: '1px', bgcolor: theme.palette.secondary.main }} />
                  <Box sx={{ px: 2, color: 'grey.600', fontWeight: 'bold' }}>O</Box>
                  <Box sx={{ flex: 1, height: '1px', bgcolor: theme.palette.secondary.main }} />
                </Box>

                <TextField
                  required
                  id="email"
                  name="email"
                  label="Correo"
                  variant="outlined"
                  size="small"
                  type="email"
                  placeholder="usuario@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email || ' '}
                />
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label="Teléfono"
                  variant="outlined"
                  size="small"
                  type="tel"
                  placeholder="5544322101"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone || ' '}
                />
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Contraseña"
                  variant="outlined"
                  size="small"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password || ' '}
                />
                <TextField
                  required
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirmar Contraseña"
                  variant="outlined"
                  size="small"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword || ' '}
                />

                <p>
                  ¿Ya tienes una cuenta? <Link to="/login" style={{ color: theme.palette.primary.main }}>Inicia sesión</Link>
                  <br />
                  Al registrarte, aceptas nuestros <a href="#" style={{ color: theme.palette.primary.main }}>Términos de Servicio</a> y <a href="#" style={{ color: theme.palette.primary.main }}>Política de Privacidad</a>.
                </p>
                <ButtonMod
                  variant='secundario'
                  textCont='Registrarse'
                  width='auto'
                  height='1.8rem'
                  clickEvent={() => { }}
                  type='submit'
                />
              </Box>


            </item>

          </Grid>

        </Grid>

      </Container>

    </Box>
  );
}



