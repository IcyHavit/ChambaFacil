// Ejemplo de datos para visualizar el componente PerfilClienteView
// Puedes copiar este objeto y usarlo en el componente padre o en una página de prueba

/*
const datosEjemploCliente = {
  nombre: "María López",
  foto: "https://randomuser.me/api/portraits/women/2.jpg",
  fechaNacimiento: "1985-08-22",
  tipoCliente: "Particular",
  telefono1: "555-111-2233",
  telefono2: "555-444-5566",
  metodoPago: ["Efectivo", "Tarjeta"],
  horarios: ["Lunes a Viernes 8am-5pm", "Sábados 9am-1pm"]
};

// Uso:
// <PerfilClienteView datos={datosEjemploCliente} />
*/

import { Avatar, Typography, Box, Divider, Paper, Stack, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';


export default function PerfilClienteView({ datos }) {
  const theme = useTheme();
  return (
    <Stack sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Paper elevation={3} sx={{ maxWidth: 700, mx: 'auto', mt: 5, p: 4, borderRadius: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mb: 4 }}>
          <Avatar
            src={datos?.foto || undefined}
            sx={{ width: 120, height: 120, border: `3px solid ${theme.palette.primary.main}`, boxShadow: 3 }}
          />
          <Typography variant="h5" fontWeight="bold" color="text.primary" textAlign="center" mt={2}>
            {datos?.nombre}
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>Información Personal</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Box sx={{ flex: '1 1 300px' }}>
            <Typography variant="subtitle2">Fecha de Nacimiento</Typography>
            <Typography>{datos?.fechaNacimiento}</Typography>
          </Box>
          <Box sx={{ flex: '1 1 300px' }}>
            <Typography variant="subtitle2">Tipo de Cliente</Typography>
            <Typography>{datos?.tipoCliente}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Box sx={{ flex: '1 1 300px' }}>
            <Typography variant="subtitle2">Teléfono 1</Typography>
            <Typography>{datos?.telefono1}</Typography>
          </Box>
          <Box sx={{ flex: '1 1 300px' }}>
            <Typography variant="subtitle2">Teléfono 2</Typography>
            <Typography>{datos?.telefono2 || '—'}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Métodos de Pago
            </Typography>
            {datos?.metodoPago?.length > 0 ? (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {datos.metodoPago.map((m) => (
                  <Chip key={m} label={m} color="primary" />
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary">No especificado</Typography>
            )}
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Horarios Preferidos
            </Typography>
            {datos?.horarios?.length > 0 ? (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {datos.horarios.map((d) => (
                  <Chip key={d} label={d} color="secondary" />
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary">No especificado</Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </Stack>
  );
}
