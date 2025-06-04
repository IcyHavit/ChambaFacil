import React from 'react';
import { Box, Card, CardHeader, Divider, CardContent, Typography, CardActions } from '@mui/material';
import { useTheme } from '@emotion/react';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import SearchIcon from '@mui/icons-material/Search';
import ButtonMod from '../ButtonMod';

export default function CardWork({ titulo,nombre,imagen ,categoria, alcaldia, descripcion, fecha }) {
  const theme = useTheme();

  return (
    <Box>
      <Card
        sx={{
          width: { xs: '60vh', sm: 600 ,md:540, lg: 320 }, // Ancho completo en móviles, 320px en tablets y superior
          height: 250,
          backgroundColor: theme.palette.tertiary.main,
          borderRadius: theme.shape.borderRadius,
          boxShadow: '0px 1px 4px rgba(0, 0, 0, .5)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardHeader
          sx={{ pb: 0 }}
          avatar={
            <Box
              sx={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={imagen}
                alt={nombre}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          }
          title={
            <Box sx={{ width: '220px' }}> {/* Contenedor con ancho fijo */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.primary.main,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                }}
              >
                {titulo}
              </Typography>
            </Box>
          }
          subheader={nombre}
        />
        <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', justifyContent:'space-between', gap: 1, mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationPinIcon sx={{ color: theme.palette.primary.main, fontSize: '1rem' }} />
            <Typography sx={{ fontSize: '1rem' }}>{categoria}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationPinIcon sx={{ color: theme.palette.primary.main, fontSize: '1rem' }} />
            <Typography sx={{ fontSize: '1rem' }}>{alcaldia}</Typography>
          </Box>
          </Box>
          <Box sx={{ maxWidth: '100%', px: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                textAlign: 'justify',
                lineHeight: '1.5em',
                height: '4.5em',
              }}
            >
              {descripcion}
            </Typography>
          </Box>
        </CardContent>
        <Divider sx={{ backgroundColor: theme.palette.primary.main, width: '80%', margin: '0 auto' }} />
        <CardActions sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              {fecha}
            </Typography>
            <ButtonMod
              variant="principal"
              textCont="Ver más"
              width="auto"
              height="1.8rem"
              clickEvent={() => console.log('Eliminar trabajo')}
              startIcon={<SearchIcon />}
            />
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
