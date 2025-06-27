// src/pages/Solicitudes.jsx
import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Pagination,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating
} from '@mui/material';

import Mascota from '../assets/images/Mascota.png';
import SolicitudCard from '../components/Solicitudes/Tarjetas';               // genérica
import SolicitudCardAceptada from '../components/Solicitudes/TarjetasAceptadas';
import SolicitudCardPendiente from '../components/Solicitudes/TarjetasPendientes';
import { getSolicitudesByUser } from '../api/solicitud';

/* ---------- datos mock ---------- */
const solicitudesMock = [
  { id: 1, estado: 'aceptadas',  puesto: 'Niñera de tiempo completo', ubicacion: 'Condesa, CDMX',       tipo: 'Full time', inicio: '31 de Mayo de 2025 a las 9:00 AM' },
  { id: 2, estado: 'pendientes', puesto: 'Cuidador de mascotas',      ubicacion: 'Roma, CDMX',          tipo: 'Part time', inicio: '15 de Junio de 2025 a las 10:00 AM' },
  { id: 3, estado: 'archivadas', puesto: 'Limpiador de casas',        ubicacion: 'Polanco, CDMX',       tipo: 'Full time', inicio: '01 de Julio de 2025 a las 8:00 AM' },
  { id: 4, estado: 'aceptadas',  puesto: 'Asistente personal',        ubicacion: 'Santa Fe, CDMX',      tipo: 'Full time', inicio: '20 de Julio de 2025 a las 9:00 AM' },
  { id: 5, estado: 'pendientes', puesto: 'Cocinero a domicilio',      ubicacion: 'Coyoacán, CDMX',      tipo: 'Part time', inicio: '05 de Agosto de 2025 a las 11:00 AM' },
  { id: 6, estado: 'archivadas', puesto: 'Jardinero profesional',     ubicacion: 'Tlalpan, CDMX',       tipo: 'Full time', inicio: '15 de Septiembre de 2025 a las 7:00 AM' },
  { id: 7, estado: 'aceptadas',  puesto: 'Conductor privado',         ubicacion: 'Álvaro Obregón, CDMX',tipo: 'Part time', inicio: '10 de Octubre de 2025 a las 6:00 PM' },
];

// Trabajos terminados pendientes de calificar (simulado)
const trabajosTerminados = [
  { 
    id: 101, 
    puesto: 'Plomero', 
    prestamista: 'Juan Pérez', 
    fechaTermino: '20 de Junio de 2025',
    ubicacion: 'Roma Norte, CDMX'
  },
  { 
    id: 102, 
    puesto: 'Electricista', 
    prestamista: 'María García', 
    fechaTermino: '22 de Junio de 2025',
    ubicacion: 'Condesa, CDMX'
  },
];

export default function Solicitudes() {
  /* --- rol --- */
  const role = 'prestamista';           // cambié a 'cliente' para mostrar los modales de calificación

  /* --- estado principal --- */
  const [openRating, setOpenRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [solicitudParaCalificar, setSolicitudParaCalificar] = useState(null);
  const [solicitudes, setSolicitudes] = useState(solicitudesMock);
  const [filtro, setFiltro] = useState('aceptadas');
  const [pagina, setPagina] = useState(1);

  /* --- estados para modal automático de calificación --- */
  const [trabajosPendientesCalificar, setTrabajosPendientesCalificar] = useState([]);
  const [trabajoActualCalificar, setTrabajoActualCalificar] = useState(null);
  const [openModalCalificacion, setOpenModalCalificacion] = useState(false);
  const [calificacionActual, setCalificacionActual] = useState(0);
  /* --- Snackbar --- */
  const [alert, setAlert] = useState({ open: false, msg: '', sev: 'success' });

  
  // funcion para obtener las solicitudes del usuario

  const fetchSolicitudes = async () => {
    try {
      const idUser = localStorage.getItem('id'); // Obtener el ID del usuario actual
      const solicitudesData = await getSolicitudesByUser(idUser);
      setSolicitudes(solicitudesData);
      console.log('Solicitudes obtenidas:', solicitudesData);
    } catch (error) {
      console.error('Error fetching solicitudes:', error);
      setAlert({ open: true, msg: 'Error al cargar las solicitudes', sev: 'error' });
    }
  };

  useEffect(() => {
    // const fetchSolicitudes = async () => {
    //   try {
    //     const idUser = localStorage.getItem('id'); // Obtener el ID del usuario actual
    //     const solicitudesData = await getSolicitudesByUser(idUser);
    //     setSolicitudes(solicitudesData);
    //     console.log('Solicitudes obtenidas:', solicitudesData);
    //   } catch (error) {
    //     console.error('Error fetching solicitudes:', error);
    //     setAlert({ open: true, msg: 'Error al cargar las solicitudes', sev: 'error' });
    //   }
    // };
    fetchSolicitudes();
  }, []); // Ejecutar solo una vez al cargar el componente




  /* --- useEffect para detectar trabajos terminados al cargar la página --- */
  useEffect(() => {
    // Simular verificación de trabajos terminados pendientes de calificar
    // En una app real, aquí harías una llamada a la API
    if (role === 'cliente' && trabajosTerminados.length > 0) {
      setTrabajosPendientesCalificar([...trabajosTerminados]);
      // Mostrar el primer trabajo para calificar
      setTrabajoActualCalificar(trabajosTerminados[0]);
      setOpenModalCalificacion(true);
    }
  }, [role]);

  /* --- helpers de filtrado / paginación --- */
  const perPage = 3;

  const filtradas = useMemo(
    () => solicitudes.filter((s) => (filtro === 'todas' ? true : s.estado === filtro)),
    [solicitudes, filtro],
  );

  const pageCount = Math.ceil(filtradas.length / perPage);
  const pageData = filtradas.slice((pagina - 1) * perPage, pagina * perPage);

  /* --- handlers que llegarán a las tarjetas --- */
  const handleCancel = (id, motivo) => {
    // TODO: llamada a API
    console.log(`Cancelar ${id}. Motivo:`, motivo);

    setSolicitudes((prev) => prev.filter((s) => s.id !== id));
    fetchSolicitudes();
    setAlert({ open: true, msg: 'Solicitud cancelada', sev: 'warning' });
  };

  const handleFinish = (id, foto) => {
  setSolicitudParaCalificar({ id, foto });
  setOpenRating(true);
  fetchSolicitudes();
};

  const handleAccept = (id) => {
    // cambia el estado a 'aceptadas'
    setSolicitudes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, estado: 'aceptadas' } : s)),
    );
    fetchSolicitudes();
    setAlert({ open: true, msg: 'Solicitud aceptada', sev: 'success' });
  };
  const handleReject = (id, motivo) => {
    setSolicitudes((prev) => prev.filter((s) => s.id !== id));
    setAlert({ open: true, msg: 'Solicitud rechazada', sev: 'warning' });
    fetchSolicitudes();
  };

  /* --- handler para calificar trabajo terminado --- */
  const handleCalificarTrabajo = (calificacion) => {
    // TODO: enviar calificación a la API
    console.log(`Calificando trabajo ${trabajoActualCalificar.id} con ${calificacion} estrellas`);
    
    // Remover el trabajo actual de la lista de pendientes
    const trabajosRestantes = trabajosPendientesCalificar.filter(t => t.id !== trabajoActualCalificar.id);
    setTrabajosPendientesCalificar(trabajosRestantes);
    
    // Si hay más trabajos pendientes, mostrar el siguiente
    if (trabajosRestantes.length > 0) {
      setTrabajoActualCalificar(trabajosRestantes[0]);
      setCalificacionActual(0); // resetear la calificación
      // El modal se mantiene abierto
    } else {
      // No hay más trabajos, cerrar el modal
      setOpenModalCalificacion(false);
      setTrabajoActualCalificar(null);
      setCalificacionActual(0);
    }
    
    setAlert({ 
      open: true, 
      msg: `Trabajo calificado. ${trabajosRestantes.length > 0 ? 'Califica el siguiente trabajo.' : 'Todas las calificaciones completadas.'}`, 
      sev: 'success' 
    });
    fetchSolicitudes();
  };


  /* --- botones del sidebar --- */
  const botones = [
    { id: 'todas',      label: 'Todas' },
    { id: 'aceptadas',  label: 'Aceptadas' },
    { id: 'pendientes', label: 'Pendientes' },
    { id: 'archivadas', label: 'Archivadas' },
  ];

  /* ---------- UI ---------- */
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >

      <Box
        sx={{
          width: '100%',
          maxWidth: 1100,
          display: 'flex',
          gap: 3,
          mx: 'auto',
          mb: 4,
          mt: 4,
        }}
      >
        {/* ---------- Sidebar ---------- */}
        <Box
          sx={{
            width: 220,
            flexShrink: 0,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Solicitudes
          </Typography>

          {botones.map((b) => (
            <Button
              key={b.id}
              variant={filtro === b.id ? 'contained' : 'outlined'}
              color={filtro === b.id ? 'primary' : 'inherit'}
              onClick={() => { setFiltro(b.id); setPagina(1); }}
              sx={{ textTransform: 'none' }}
            >
              {b.label}
            </Button>
          ))}

          <Box
            component="img"
            src={Mascota}
            alt="Mascota ChambaFácil"
            sx={{
              mt: 'auto',
              width: '100%',
              maxWidth: 160,
              alignSelf: 'center',
              objectFit: 'contain',
              userSelect: 'none',
            }}
          />
        </Box>

        {/* ---------- Panel central ---------- */}
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={3}>
            {`Solicitudes ${filtro.charAt(0).toUpperCase() + filtro.slice(1)}`.replace(
              'Todas',
              'Todas las Solicitudes',
            )}
          </Typography>

          <List sx={{ flexGrow: 1 }}>
            {pageData.map((s) => (
              <ListItem key={s.id} sx={{ mb: 2, p: 0 }}>
                {s.estado === 'aceptadas' ? (
                    <SolicitudCardAceptada
                      data={s}
                      role={role}
                      onCancel={handleReject}     // cancelar aceptada
                      onFinish={handleFinish}     // finalizar
                    />
                  ) : s.estado === 'pendientes' ? (
                    <SolicitudCardPendiente
                      data={s}
                      role={role}
                      onAccept={handleAccept}
                      onReject={handleReject}
                    />
                  ) : (
                    <SolicitudCard data={s} />      // archivadas u otras
                  )}
                </ListItem>
            ))}
          </List>

          {pageCount > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={pageCount}
                page={pagina}
                onChange={(_, p) => setPagina(p)}
                color="primary"
                siblingCount={0}
              />
            </Box>
          )}        </Box>
      </Box>

      {/* ---------- Modal de calificación automática para trabajos terminados ---------- */}
      <Dialog 
        open={openModalCalificacion} 
        onClose={() => {}} // No permitir cerrar el modal haciendo clic fuera
        maxWidth="sm" 
        fullWidth
        disableEscapeKeyDown // No permitir cerrar con escape
      >
        <DialogTitle sx={{ textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          ¡Trabajo Completado!
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {trabajoActualCalificar && (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" mb={2}>
                El trabajo "{trabajoActualCalificar.puesto}" ha sido completado
              </Typography>
              <Typography variant="body1" mb={1}>
                <strong>Prestamista:</strong> {trabajoActualCalificar.prestamista}
              </Typography>
              <Typography variant="body1" mb={1}>
                <strong>Ubicación:</strong> {trabajoActualCalificar.ubicacion}
              </Typography>
              <Typography variant="body1" mb={3}>
                <strong>Fecha de término:</strong> {trabajoActualCalificar.fechaTermino}
              </Typography>
              
              <Typography variant="body1" mb={2}>
                Por favor, califica el trabajo realizado:
              </Typography>
              
              <Rating
                name="calificacion-trabajo"
                value={calificacionActual}
                onChange={(event, newValue) => setCalificacionActual(newValue)}
                precision={0.5}
                size="large"
                sx={{ mb: 2 }}
              />
              
              {trabajosPendientesCalificar.length > 1 && (
                <Typography variant="body2" color="text.secondary">
                  Te quedan {trabajosPendientesCalificar.length - 1} trabajos más por calificar
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            variant="contained"
            onClick={() => handleCalificarTrabajo(calificacionActual)}
            disabled={calificacionActual === 0}
            size="large"
          >
            {trabajosPendientesCalificar.length > 1 ? 'Calificar y Continuar' : 'Calificar'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openRating} onClose={() => setOpenRating(false)} maxWidth="xs" fullWidth>
      <DialogTitle>Tu opinión cuenta para nosotros</DialogTitle>
      <DialogContent>
        <Typography variant="body2" mb={2}>
          Por favor, califica a tu cliente.
        </Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          precision={0.5}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenRating(false)}>Cerrar</Button>
        <Button
          variant="contained"
          onClick={() => {
            // Aquí puedes enviar la calificación y eliminar la tarjeta
            // Por ejemplo:
            // enviarCalificacion(solicitudParaCalificar.id, rating);
            setSolicitudes((prev) => prev.filter((s) => s.id !== solicitudParaCalificar.id));
            setOpenRating(false);
            setRating(0);
            setSolicitudParaCalificar(null);
            setAlert({ open: true, msg: 'Trabajo finalizado y calificado', sev: 'success' });
          }}
          disabled={rating === 0}
        >
          Enviar calificación
        </Button>
      </DialogActions>
    </Dialog>

      {/* ---------- Snackbar ---------- */}
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={alert.sev}
          variant="filled"
          onClose={() => setAlert({ ...alert, open: false })}
          sx={{
            bgcolor: 'primary.main',   
            color: 'common.white',      
            '& .MuiSvgIcon-root': { color: 'common.white' }, 
          }}
        >
          {alert.msg}
        </Alert>
      </Snackbar>
    </Box>

    
  );
}
