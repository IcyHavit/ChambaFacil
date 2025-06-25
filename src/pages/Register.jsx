import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Box, Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import img from '../assets/images/registro/registro.webp';
import ButtonMod from '../components/ButtonMod';
import { Link, useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

// Backend
import { useGoogleLogin } from '@react-oauth/google';
import { registerUser, registerPrestamistaGoogle, errorGoogleHandler } from '../api/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Register() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    tipoUsuario: '',
  });

  /* Para mostrar y ocultar contraseña */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  }
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword((prev) => !prev);
  }
  const handleConfirmPasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


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
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#+])[A-Za-z\d$@$!%*?&#+]{8,15}$/;

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) {
      newErrors.email = 'El correo debe ser válido.';
    }
    if (formData.phone.length < 10) {
      newErrors.phone = 'El teléfono debe tener al menos 10 dígitos.';
    }
    if (!formData.tipoUsuario) {
      newErrors.tipoUsuario = 'Selecciona un tipo de usuario.';
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Debe tener 8-15 caracteres y al menos una mayúscula, minúscula, número y símbolo.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Formulario válido:', formData);
      const data = {
        correo: formData.email,
        contraseña: formData.password,
        telefono: formData.phone,
      };

      const role = formData.tipoUsuario;

      try {
        const response = await registerUser(data, role);

        localStorage.setItem('email', response.email);
        localStorage.setItem('id', response.id);
        localStorage.setItem('name', response.name);
        localStorage.setItem('role', response.role);

        // Aviso provisional sin estilo de registro exitoso
        alert('Registro exitoso (Alerta provisional).');

        if (response.role === 'prestamista') {
          navigate('/FormPrestamista');
        }else {
          navigate('/FormCliente');
        }
      } catch (error) {
        // Alerta provisional sin estilo de error
        alert(`Error en el registro. ${error.message}`);
      }

      // Prueba de el token en cookies
      // const response = axios.get('http://localhost:3000/check-token', { withCredentials: true })
      // .then(res => console.log(res.data))
      // .catch(err => console.error('Error al obtener token:', err));
      // console.log(response);
    }
  };



  const successGoogleHandler = async (tokenResponse) => {
    try {
      const response = await registerPrestamistaGoogle(tokenResponse.access_token);

      localStorage.setItem('email', response.email);
      localStorage.setItem('id', response.id);
      localStorage.setItem('name', response.name);
      localStorage.setItem('role', response.role);

      // Aviso provisional sin estilo de registro exitoso
      alert('Registro exitoso con Google (Alerta provisional). Por favor, revisa tu correo para confirmar tu cuenta.');
      // window.location.href = '/login';
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      // Alerta provisional sin estilo de error
      alert(`Error al registrar con Google. ${error.message}`);
    }
  };

  const handleGoogleRegister = useGoogleLogin({
    onSuccess: successGoogleHandler,
    onError: errorGoogleHandler,
  });

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
        <Grid container alignItems="flex-start" sx={{ minHeight: '400' }} >

          <Grid size={6} sx={{ pr: { md: 2 } }}>
  <Box
    component="img"
    src={img}
    alt="Registro"
    sx={{
      pt:8,
      maxWidth: '100%',
      height: 'auto',
      objectFit: 'cover',
      borderRadius: 2
    }}
  />
          </Grid>
          <Grid size={6} sx={{ xs: 12, md: 6 }}>
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
                <FormControl fullWidth required error={!!errors.tipoUsuario}>
                  <InputLabel id="tipoUser">Tipo de usuario</InputLabel>

                  <Select
                    labelId="tipoUser"
                    id="tipoUsuario"
                    name="tipoUsuario"
                    label="Tipo de usuario"
                    value={formData.tipoUsuario}
                    onChange={handleChange}
                  >
                    <MenuItem value="prestamista">Prestamista</MenuItem>
                    <MenuItem value="cliente">Cliente</MenuItem>
                  </Select>

                  {/* aquí va el texto de error (o un espacio en blanco para no mover el layout) */}
                  <FormHelperText>
                    {errors.tipoUsuario || ' '}
                  </FormHelperText>
                </FormControl>

                <TextField
                  required
                  id="password"
                  name="password"
                  label="Ingresa tu contraseña"
                  variant="outlined"
                  size="small"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handlePasswordChange}
                  error={!!errors.password}
                  helperText={errors.password || ' '}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge='end'
                            aria-label='mostrar/ocultar contraseña'
                          >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <TextField
                  required
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirmar contraseña"
                  variant="outlined"
                  size="small"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword || ' '}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={toggleConfirmPasswordVisibility}
                            edge='end'
                            aria-label='mostrar/ocultar contraseña'
                          >
                            {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
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
                  clickEvent={handleSubmit}
                  type='submit'
                />
              </Box>

          </Grid>

        </Grid>

      </Container>

    </Box>
  );
}



