import { Box, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
// Importa ButtonMod
import ButtonMod from '../components/ButtonMod';
import CardPublicacion from '../components/Publicaciones/cardPublicacion';
import {trabajos} from '../components/Search/trabajos';

export default function Publicaciones() {
  const theme = useTheme();
  const navigate = useNavigate();

  // Simula la función de eliminación de una publicación
  const handleDelete = (id) => {  
    // Aquí iría la lógica para eliminar la publicación
    console.log(`Publicación con ID ${id} eliminada`);
  }

  return (
    <Box
      sx={{
        minHeight: '85vh',
        bgcolor: theme.palette.background.default,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
      >
        Mis Publicaciones
      </Typography>

      
        <Stack
        direction='column'
          sx={{
            width: '100%',
            padding: '1%',
            top: theme.spacing(2),
            right: theme.spacing(2),
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            <ButtonMod
              variant="principal"
              textCont="Publicar servicios"
              width="auto"
              height="auto"
              clickEvent={() => navigate('/publicar')}
            />
          </Box>

          <Box
            sx={{
              width: '90vw',
              height: '75vh',
              position: 'relative', 
              bgcolor: theme.palette.background.paper,
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
              mt: 2,
              overflow: 'auto',
            }}
          >
            
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            mt: 6,
          }}
        >
          {trabajos.map((trabajo, index) => (
            <CardPublicacion
              key={index}
              titulo={trabajo.titulo}
              nombre={trabajo.nombre}
              imagen={trabajo.imagen}
              categoria={trabajo.categoria}
              alcaldia={trabajo.alcaldia}
              descripcion={trabajo.descripcion}
              fecha={trabajo.fecha}
              onDelete={() => {handleDelete(trabajo.id)}}
            />
          ))}
        </Box>
        </Box>
        </Stack>
      </Box>
  );
}