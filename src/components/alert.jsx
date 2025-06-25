import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box } from '@mui/material';
import ButtonMod from './ButtonMod';

// Componente de alerta sin React.memo
const AlertD = forwardRef(
  function AlertD(
    {
      titulo = '',
      mensaje,
      imagen = null,
      boton1 = null,
      boton2 = null,
      onConfirm,
      onCloseAction
    },
    ref
  ) {
    const [open, setOpen] = useState(false);

    useImperativeHandle(
      ref,
      () => ({ handleClickOpen: () => setOpen(true) }),
      []
    );

    const handleClose = () => {
      setOpen(false);
      onCloseAction?.();
    };

    const handleConfirm = () => {
      onConfirm?.();
      handleClose();
    };

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,

        }}
      >
        {titulo && (
          <DialogTitle
            id="alert-dialog-title"
            sx={{ color: 'primary.main', fontWeight: 'bold' }}
          >
            {titulo}
          </DialogTitle>
        )}
        <DialogContent>
          {imagen && (
            <Box
              component="img"
              src={imagen}
              alt="alert image"
              sx={{ height: 140, mb: 2, mx: 'auto', display: 'flex', justifyContent: 'center' }}
            />
          )}
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: 'center', color: 'text.secondary' }}
          >
            {mensaje}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 1 }}>
          {boton2 && (
            <ButtonMod
              variant="secundario"
              textCont={boton2}
              width="auto"
              height="2rem"
              clickEvent={handleClose}
            />
          )}
          {boton1 && (
            <ButtonMod
              variant="principal"
              textCont={boton1}
              width="auto"
              height="2rem"
              clickEvent={handleConfirm}
            />
          )}
        </DialogActions>
      </Dialog >
    );
  }
);

export default AlertD;
