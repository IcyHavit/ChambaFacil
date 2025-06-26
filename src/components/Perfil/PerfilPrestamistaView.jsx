import { Avatar, Typography, Box, Divider, Paper, Stack, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function PerfilPrestamistaView({ datos }) {
  const theme = useTheme();
  return (
    <Stack sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Paper elevation={3} sx={{ maxWidth: 800, mx: 'auto', mt: 5, p: 4, borderRadius: 4, mb: 4 }}>
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
            <Typography variant="subtitle2">Tipo de Prestamista</Typography>
            <Typography>{datos?.tipoPrestamista}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Box sx={{ flex: '1 1 300px' }}>
            <Typography variant="subtitle2">Contacto 1</Typography>
            <Typography>{datos?.contacto1}</Typography>
          </Box>
          <Box sx={{ flex: '1 1 300px' }}>
            <Typography variant="subtitle2">Contacto 2</Typography>
            <Typography>{datos?.contacto2 || '—'}</Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Descripción</Typography>
          <Typography color="text.secondary">{datos?.descripcion || '—'}</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Redes Sociales</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
            {datos?.redes?.facebook && <Chip label="Facebook" color="primary" component="a" href={datos.redes.facebook} target="_blank" clickable />}
            {datos?.redes?.instagram && <Chip label="Instagram" color="secondary" component="a" href={datos.redes.instagram} target="_blank" clickable />}
            {datos?.redes?.youtube && <Chip label="YouTube" color="error" component="a" href={datos.redes.youtube} target="_blank" clickable />}
            {(!datos?.redes?.facebook && !datos?.redes?.instagram && !datos?.redes?.youtube) && <Typography color="text.secondary">No especificado</Typography>}
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Portafolio - Experiencias</Typography>
          {datos?.portafolio?.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
              {datos.portafolio.map((exp, idx) => (
                <Chip key={idx} label={exp} variant="outlined" color="primary" />
              ))}
            </Box>
          ) : (
            <Typography color="text.secondary">No hay experiencias registradas.</Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
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
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" color="primary">Imágenes de Trabajo</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
            {datos?.imagenes && datos.imagenes.length > 0 ? (
              datos.imagenes.map((src, idx) => (
                <Avatar key={idx} src={src} variant="rounded" sx={{ width: 100, height: 100, boxShadow: 2 }} />
              ))
            ) : (
              <Typography color="text.secondary">No hay imágenes.</Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </Stack>
  );
}
