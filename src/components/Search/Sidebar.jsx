import React, { useState } from 'react';
import { Box, Typography, Chip, Dialog, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import CloseIcon from '@mui/icons-material/Close';
import ButtonMod from '../ButtonMod';

export default function Sidebar({
  theme,
  titulo,
  img,
  nombre,
  calificacion,
  fechaPublicacion,
  alcaldia,
  categoria,
  incluyeMateriales,
  garantia,
  direccionReferencia,
  descripcion,
  modalidadesCobro,
  disponibilidad,
  evidencias,
}) {
  const [tipoUsuario] = useState('cliente');

  const handleInciarSolicitud = () => {
    // Aquí puedes manejar la lógica para iniciar una solicitud
    console.log('Iniciar solicitud');

    // imprimir el id de cliente obtenido del localStorage
    const clienteId = localStorage.getItem('id');
    console.log('ID del cliente:', clienteId);


    // Obtener el id del servicio seleccionado
    const servicioId = localStorage.getItem('servicioId');

  };
  const [previewSrc, setPreviewSrc] = useState(null); // Estado para la imagen seleccionada

  const renderStars = () => {
    const fullStars = Math.floor(calificacion);
    const hasHalfStar = calificacion % 1 !== 0;

    return (
      <>
        {Array.from({ length: fullStars }, (_, index) => (
          <StarIcon key={index} sx={{ color: '#FFD700' }} />
        ))}
        {hasHalfStar && <StarHalfIcon sx={{ color: '#FFD700' }} />}
      </>
    );
  };

  return (
    <>
      <Box
        sx={{
          padding: '1rem',
          backgroundColor: theme.palette.tertiary.main,
          borderRadius: '8px',
          boxShadow: '0px 1px 4px rgba(0, 0, 0, .5)',
          maxHeight: 800, // Altura fija para el scroll
          display: { xs: 'none', md: 'block' }, // Ocultar en móviles
          width: '100%',
          overflowY: 'auto', // Habilitar desplazamiento vertical
          scrollbarWidth: 'thin', // Estilo del scrollbar
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '8px',
          },
        }}
      >
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                src={img}
                alt="Foto de perfil"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{nombre}</Typography>
          </Box>
          <Typography sx={{ color: theme.palette.secondary.main }}>
            Calificación:
          </Typography>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
            {calificacion}
            {renderStars()}
          </Box>
        </Typography>


        <Typography sx={{ color: theme.palette.primary.main, marginTop: '0.5rem', fontSize: 25, fontWeight: 'bold' }}>
          {titulo}
        </Typography>


        <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
          <Typography component="span" sx={{ fontWeight: 'bold' }}>Fecha de publicación:</Typography> {fechaPublicacion}
        </Typography>

        <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
          <Typography component="span" sx={{ fontWeight: 'bold' }}>Alcaldía:</Typography> {alcaldia}
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
          <Typography component="span" sx={{ fontWeight: 'bold' }}>Categoría:</Typography> {categoria}
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
          <Typography component="span" sx={{ fontWeight: 'bold' }}>Incluye materiales:</Typography> {incluyeMateriales ? 'Sí' : 'No'}
        </Typography>
        {garantia && (
          <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
            <Typography component="span" sx={{ fontWeight: 'bold' }}>Garantía:</Typography> {garantia}
          </Typography>
        )}
        {direccionReferencia && (
          <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
            <Typography component="span" sx={{ fontWeight: 'bold' }}>Dirección de referencia:</Typography> {direccionReferencia}
          </Typography>
        )}
        <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
          <Typography component="span" sx={{ fontWeight: 'bold' }}>Descripción:</Typography> {descripcion}
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
          <Typography component="span" sx={{ fontWeight: 'bold' }}>Modalidad de Cobro:</Typography>
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {modalidadesCobro.map((modalidad, index) => (
            <Chip
              key={index}
              label={modalidad.costo ? `${modalidad.modalidad} - $${modalidad.costo}` : modalidad.modalidad}
              color="success"
              variant="outlined"
            />
          ))}
        </Box>
        <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
          <Typography component="span" sx={{ fontWeight: 'bold' }}>Disponibilidad:</Typography>
        </Typography>
        <Box sx={{ marginTop: '0.5rem' }}>
          {disponibilidad.map((dia, index) => (
            <Typography key={index} variant="body2" sx={{ color: theme.palette.secondary.main }}>
              {dia.dia}: {dia.desde} - {dia.hasta}
            </Typography>
          ))}
        </Box>


        <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
          <Typography component="span" sx={{ fontWeight: 'bold' }}>Evidencias:</Typography>
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginTop: '0.5rem' }}>
          {evidencias.slice(0, 5).map((evidencia, index) => (
            <img
              key={index}
              src={evidencia}
              alt={`Evidencia ${index + 1}`}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                cursor: 'pointer',
                borderRadius: '8px',
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)',
              }}
              onClick={() => setPreviewSrc(evidencia)} // Actualizar la imagen seleccionada
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: '1rem' }}>
          {tipoUsuario === 'cliente' && (
            <ButtonMod
              variant='principal'
              textCont='Iniciar solicitud'
              width='auto'
              height='2rem'
              clickEvent={handleInciarSolicitud}
              startIcon={<StarIcon />}
            />
          )}
        </Box>

      </Box>

      {/* Diálogo para mostrar la imagen seleccionada */}
      <Dialog
        open={Boolean(previewSrc)}
        onClose={() => setPreviewSrc(null)} // Cerrar el diálogo
        maxWidth="lg"
        PaperProps={{
          sx: { bgcolor: 'transparent', boxShadow: 'none' },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => setPreviewSrc(null)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'common.white',
              bgcolor: 'rgba(0,0,0,0.4)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
            }}
          >
            <CloseIcon />
          </IconButton>

          <img
            src={previewSrc}
            alt="preview"
            style={{
              display: 'block',
              maxWidth: '90vw',
              maxHeight: '90vh',
              margin: 'auto',
              borderRadius: 8,
            }}
          />
        </Box>
      </Dialog>

    </>
  );
}
