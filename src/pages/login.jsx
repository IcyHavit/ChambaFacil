import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Box, Grid, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import ButtonMod from '../components/ButtonMod';
import { Link } from 'react-router-dom';
import img from '../assets/images/registro/registro.webp';

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

  const handleGoogleLogin = () => {
    console.log('Inicia con Google');
  };

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
