import React from 'react'
import { useTheme } from '@mui/material/styles';

import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

// variant: principal-->Rosa, secundario-->Blanco
// textCont: texto del boton
// clickEvent: funcion que se ejecuta al hacer click (ej: () => alert('Boton presionado'))
// width: ancho del boton (auto por defecto)
// height: alto del boton (auto por defecto)
// margin: margen del boton (auto por defecto)

/* ejemplo de uso:
  <ButtonMod
    variant='principal'
    textCont='Eliminar'
    width='auto'
    height='9rem'
    clickEvent={funcionAEjecutar}
    startIcon={<DeleteIcon />}
    type='submit'
  />
*/

function ButtonMod({ variant, textCont, clickEvent, width, height, startIcon, type }) {
    const theme = useTheme();

    const buttonStyle = variant === 'principal' ? {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.tertiary.main,
      width: width,
      height: height,
      fontSize: '0.65rem', // Tamaño de letra más pequeño
      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.tertiary.main,
        transition: '0.4s',
        borderColor: theme.palette.primary.main,
      }
    } : {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.tertiary.main,
      borderColor: theme.palette.secondary.main,
      width: width,
      height: height,
      fontSize: '0.65rem', // Tamaño de letra más pequeño
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.tertiary.main,
        borderColor: theme.palette.secondary.main,
        transition: '0.4s',
      }
    }

  return (
    <>
      {/* Boton principal */}
      <Button
        variant='outlined'
        startIcon={startIcon}
        sx={buttonStyle}
        onClick={clickEvent}
        type={type}
      >
        <Typography sx={{ fontFamily: theme.typography.bodySmall, borderRadius: theme.shape.borderRadius, }}>
          {textCont}
        </Typography>

      </Button>
      </>

  )
}

export default ButtonMod