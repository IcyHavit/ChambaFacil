
import React, { useRef } from 'react';
import AlertD from './alert';
import ButtonMod from './ButtonMod';
import img from '../assets/images/Mascota.png';

export default function AlertExample() {
  //obligatorio
  const alertRef = useRef();
//obligatorio
  const openAlert = () => {
    // Dispara la alerta definida en AlertD
    if (alertRef.current) {
      alertRef.current.handleClickOpen();
    }
  };

  const handleConfirm = () => {
    console.log('Usuario confirmó la alerta');
    // Aquí tu lógica tras confirmar
  };

  return (
    <>
      <ButtonMod
        variant=""
        textCont="Mostrar Alerta"
        width="auto"
        height="2rem"
        clickEvent={openAlert}
      />
      <AlertD
        ref={alertRef}
        titulo="Título de Ejemplo"
        mensaje="Este es el cuerpo del mensaje de la alerta. a ver si muchos webos pinche gayro"
        imagen={img} //opcional
        boton1="Aceptar"//opcional, se usa cuando deseas hacer una accion al confirmar
        boton2="Cerrar" //esta siempre se usa, es el boton que cierra la alerta
        onConfirm={handleConfirm}
      />
    </>
  );
}