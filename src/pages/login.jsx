import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Box, Grid, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import ButtonMod from '../components/ButtonMod';
import { Link } from 'react-router-dom';
import img from '../assets/images/registro/registro.webp';

// Backend
import { useGoogleLogin } from '@react-oauth/google';
import { loginPrestamista, loginPrestamistaGoogle, errorGoogleHandler } from '../api/auth';

export default function Login() {
  const theme = useTheme();

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Estado para los errores
  const [errors, setErrors] = useState({});

  // Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validación en tiempo real
    if (name === 'email' && !value.includes('@')) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'El correo debe ser válido.',
      }));
    } else if (name === 'email') {
      setErrors((prevErrors) => {
        const { ...rest } = prevErrors;
        return rest; // Elimina el error si el correo es válido
      });
    }

    if (name === 'password' && value.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'La contraseña debe tener al menos 6 caracteres.',
      }));
    } else if (name === 'password') {
      setErrors((prevErrors) => {
        const { ...rest } = prevErrors;
        return rest; // Elimina el error si la contraseña es válida
      });
    }
  };

  // Validación al enviar el formulario
  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) {
      newErrors.email = 'El correo debe ser válido.';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }
    return newErrors;
  };

  // Manejar el envío del formulario
  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Formulario válido:', formData);
      const data = {
        correo: formData.email, 
        contraseña: formData.password,
      };

      try {
        const response = await loginPrestamista(data);
  
        localStorage.setItem('correo', response.data.email);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('role', response.data.role);

        alert('Login exitoso (Alerta provisional).');
        // Redirigir al usuario a la página de inicio o dashboard
        // window.location.href = '/';
      }
      catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al registrar. Por favor, intenta nuevamente.';
        // Aleta provisional sin estilo de error
        alert(`Error en el login. ${errorMessage}`);
      }
  
    }
  };

  const successGoogleHandler = async (tokenResponse) => {
    try {
      const response = await loginPrestamistaGoogle(tokenResponse.access_token);

      localStorage.setItem('email', response.email);
      localStorage.setItem('id', response.id);
      localStorage.setItem('name', response.name);
      localStorage.setItem('role', response.role);

      // Aviso provisional sin estilo de registro exitoso
      alert('Inicio de sesion exitoso con Google (Alerta provisional).');
      // window.location.href = '/login';
      } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      // Alerta provisional sin estilo de error
      alert(`Error al iniciar sesion con Google. ${error.message}`);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: successGoogleHandler,
    onError: errorGoogleHandler,
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: theme.palette.background.default,
        p: 2,
      }}
    >
      <Container
        maxWidth="md"
        disableGutters
        sx={{
          border: `2px solid ${theme.palette.primary.main}`,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Grid container>
          <Grid
            size={{ xs: 0, md: 6 }}
            sx={{
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Box
              component="img"
              src={img}
              alt="Registro"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ p: 4 }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              required
              noValidate
              autoComplete="off"
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              <h1
                style={{
                  textAlign: 'center',
                  color: theme.palette.primary.main,
                  fontFamily: theme.typography.bodyLarge?.main || 'inherit',
                  fontWeight: 'bold',
                }}
              >
                Inicia Sesión
              </h1>
              <TextField
                required
                id="email"
                name="email"
                label="Correo"
                variant="outlined"
                type="email"
                placeholder="usuario@gmail.com"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email || ' '}
              />
              <TextField
                required
                id="password"
                name="password"
                label="Contraseña"
                variant="outlined"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password || ' '}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: 2,
                  paddingBottom: 2,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    height: '1px',
                    bgcolor: theme.palette.secondary.main,
                  }}
                />
                <Box
                  sx={{
                    px: 2,
                    color: 'grey.600',
                    fontWeight: 'bold',
                  }}
                >
                  O
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    height: '1px',
                    bgcolor: theme.palette.secondary.main,
                  }}
                />
              </Box>
              <ButtonMod
                variant="principal"
                textCont="Iniciar con Google"
                width="auto"
                height="1.8rem"
                clickEvent={handleGoogleLogin}
                startIcon={<GoogleIcon />}
              />

              <br />
              <p>
                ¿Olvidaste la contraseña?{' '}
                <Link
                  to="/contraseña"
                  style={{ color: theme.palette.primary.main }}
                >
                  Restaura tu contraseña
                </Link>
                <br />
                ¿Aun no cuentas con un perfil?{' '}
                <a href="#" style={{ color: theme.palette.primary.main }}>
                  Registrate
                </a>
              </p>

              <ButtonMod
                variant="secundario"
                textCont="Iniciar Sesión"
                width="auto"
                height="1.8rem"
                type="submit"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
