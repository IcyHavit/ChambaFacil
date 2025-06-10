// src/pages/Solicitudes.jsx
import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Pagination,
  Snackbar,
  Alert,
} from '@mui/material';

import Mascota from '../assets/images/Mascota.png';
import SolicitudCard from '../components/Solicitudes/Tarjetas';               // genérica
import SolicitudCardAceptada from '../components/Solicitudes/TarjetasAceptadas'; // para aceptadas
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

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

export default function Solicitudes() {
  /* --- rol --- */
  const role = 'Prestamista';           // cámbialo a 'prestamista' cuando corresponda

  /* --- estado principal --- */
  const [solicitudes, setSolicitudes] = useState(solicitudesMock);
  const [filtro, setFiltro] = useState('aceptadas');
  const [pagina, setPagina] = useState(1);

  /* --- Snackbar --- */
  const [alert, setAlert] = useState({ open: false, msg: '', sev: 'success' });

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
    setAlert({ open: true, msg: 'Solicitud cancelada', sev: 'warning' });
  };

  const handleFinish = (id, foto) => {
    // TODO: llamada a API
    console.log(`Finalizar ${id}. Foto:`, foto);

    setSolicitudes((prev) => prev.filter((s) => s.id !== id));
    setAlert({ open: true, msg: 'Trabajo finalizado', sev: 'success' });
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
      <Navbar />

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
                    onCancel={handleCancel}
                    onFinish={handleFinish}
                  />
                ) : (
                  <SolicitudCard data={s} />
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
          )}
        </Box>
      </Box>

      <Footer />

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
