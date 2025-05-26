import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Box, Grid, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import img from '../assets/images/registro/registro.webp';
import ButtonMod from '../components/ButtonMod';
import { Link } from 'react-router-dom';

export default function Register() {
  const theme = useTheme();

  const handleGoogleRegister = () => {
    console.log('Registro con Google');
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
                Registro
              </h1>

              <ButtonMod
                variant="principal"
                textCont="Registrarse con Google"
                width="auto"
                height="1.8rem"
                clickEvent={handleGoogleRegister}
                startIcon={<GoogleIcon />}
              />

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

              <TextField
                required
                id="correo"
                label="Correo"
                variant="outlined"
                size="small"
                type="email"
                placeholder="usuario@gmail.com"
              />
              <TextField
                required
                id="telefono"
                label="Teléfono"
                variant="outlined"
                size="small"
                type="tel"
                placeholder="5544322101"
              />
              <TextField
                required
                id="contrasena"
                label="Contraseña"
                variant="outlined"
                size="small"
                type="password"
              />
              <TextField
                required
                id="confirmar-contrasena"
                label="Confirmar Contraseña"
                variant="outlined"
                size="small"
                type="password"
              />

              <p>
                ¿Ya tienes una cuenta?{' '}
                <Link
                  to="/login"
                  style={{ color: theme.palette.primary.main }}
                >
                  Inicia sesión
                </Link>
                <br />
                Al registrarte, aceptas nuestros{' '}
                <a href="#" style={{ color: theme.palette.primary.main }}>
                  Términos de Servicio
                </a>{' '}
                y{' '}
                <a href="#" style={{ color: theme.palette.primary.main }}>
                  Política de Privacidad
                </a>
                .
              </p>

              <ButtonMod
                variant="secundario"
                textCont="Registrarse"
                width="auto"
                height="1.8rem"
                clickEvent={() => {}}
                type="submit"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
