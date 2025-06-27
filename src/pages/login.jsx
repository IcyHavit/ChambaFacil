import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Container, Box, Grid, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import ButtonMod from '../components/ButtonMod';
import img from '../assets/images/registro/registro.webp';
import alertImage from '../assets/images/Mascota.png';
import imgError from '../assets/images/imgError.jpg';
// Backend
import { useGoogleLogin } from '@react-oauth/google';
import { login, loginGoogle, errorGoogleHandler } from '../api/auth';
import AlertD from '../components/alert';

export default function Login() {
  const navigate = useNavigate();

  /* Para mostrar la alerta de Success */
  const alertSuccessRef = useRef();
  const nextRoute = useRef(null);
  const handleAlertOpen = () => {
    if (nextRoute.current) {
      navigate(nextRoute.current);
    }
  };
  /* Para mostrar la alerta de Error */
  const alertErrorRef = useRef();
  const [alertError, setAlertError] = useState('');

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

    if (name === 'password' && value.length ===0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'La contraseña no debe estar vacía.',
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
    if (formData.password.length == 0) {
      newErrors.password = 'La contraseña no debe estar vacía.';
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
        const response = await login(data);
  
        localStorage.setItem('correo', response.data.email);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('role', response.data.role);

        nextRoute.current = response.role === 'prestamista' ? '/' : '/search';
        alertSuccessRef.current.handleClickOpen();
      }
      catch (error) {
        setAlertError(error.message);
        alertErrorRef.current.handleClickOpen();
      }
  
    }
  };

  const successGoogleHandler = async (tokenResponse) => {
    try {
      const response = await loginGoogle(tokenResponse.access_token);

      localStorage.setItem('email', response.email);
      localStorage.setItem('id', response.id);
      localStorage.setItem('name', response.name);
      localStorage.setItem('role', response.role);

      nextRoute.current = response.role === 'prestamista' ? '/' : '/search';
      alertSuccessRef.current.handleClickOpen();
      } catch (error) {
        setAlertError(error.message);
        alertErrorRef.current.handleClickOpen();
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: successGoogleHandler,
    onError: errorGoogleHandler,
  });

  return (
    <>
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
                  to="/correo"
                  style={{ color: theme.palette.primary.main }}
                >
                  Restaura tu contraseña
                </Link>
                <br />
                ¿Aun no cuentas con un perfil?{' '}
                <a href="/register" style={{ color: theme.palette.primary.main }}>
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
    {/* Alerta de Success */}
    <AlertD
      ref={alertSuccessRef}
      titulo='Inicio de sesión exitoso'
      mensaje='Presiona aceptar para continuar'
      imagen={alertImage}
      boton1='Aceptar'
      onConfirm={handleAlertOpen}
    />
    {/* Alerta de Error */}
    <AlertD
      ref={alertErrorRef}
      titulo='Fallo al iniciar sesión'
      mensaje={alertError}
      imagen={imgError}
      boton1='Cerrar'
      onConfirm={() => setAlertError('')}
    />
    </>
  );
}
