// src/pages/Solicitudes.jsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Pagination,
} from '@mui/material';
import Mascota from '../assets/images/Mascota.png';
import SolicitudCard from '../components/Solicitudes/Tarjetas'; // la tarjeta aislada

/* ---------- datos mock ---------- */
const solicitudes = [
  {
    id: 1,
    estado: 'aceptadas',
    puesto: 'Niñera de tiempo completo',
    ubicacion: 'Condesa, CDMX',
    tipo: 'Full time',
    inicio: '31 de Mayo de 2025 a las 9:00 AM',
  },
  {
    id: 2,
    estado: 'pendientes',
    puesto: 'Cuidador de mascotas',
    ubicacion: 'Roma, CDMX',
    tipo: 'Part time',
    inicio: '15 de Junio de 2025 a las 10:00 AM',
  },
  {
    id: 3,
    estado: 'archivadas',
    puesto: 'Limpiador de casas',
    ubicacion: 'Polanco, CDMX',
    tipo: 'Full time',
    inicio: '01 de Julio de 2025 a las 8:00 AM',
  },
  {
    id: 4,
    estado: 'aceptadas',
    puesto: 'Asistente personal',
    ubicacion: 'Santa Fe, CDMX',
    tipo: 'Full time',
    inicio: '20 de Julio de 2025 a las 9:00 AM',
  },
  {
    id: 5,
    estado: 'pendientes',
    puesto: 'Cocinero a domicilio',
    ubicacion: 'Coyoacán, CDMX',
    tipo: 'Part time',
    inicio: '05 de Agosto de 2025 a las 11:00 AM',
  },
  {
    id: 6,
    estado: 'archivadas',
    puesto: 'Jardinero profesional',
    ubicacion: 'Tlalpan, CDMX',
    tipo: 'Full time',
    inicio: '15 de Septiembre de 2025 a las 7:00 AM',
  },
];

export default function Solicitudes() {
  /* filtros */
  const [filtro, setFiltro] = React.useState('aceptadas');
  const [pagina, setPagina] = React.useState(1);

  const perPage = 3;
  const filtradas = solicitudes.filter((s) =>
    filtro === 'todas' ? true : s.estado === filtro
  );
  const pageCount = Math.ceil(filtradas.length / perPage);
  const pageData = filtradas.slice((pagina - 1) * perPage, pagina * perPage);

  /* botones laterales */
  const botones = [
    { id: 'todas', label: 'Todas' },
    { id: 'aceptadas', label: 'Aceptadas' },
    { id: 'pendientes', label: 'Pendientes' },
    { id: 'archivadas', label: 'Archivadas' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        bgcolor: 'background.default',
        p: 4,
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '60vw' }, // 60 % en desktop
          maxWidth: 900,
          display: 'flex',
          gap: 3,
        }}
      >
        {/* --------- Sidebar --------- */}
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
              onClick={() => {
                setFiltro(b.id);
                setPagina(1);
              }}
              sx={{ textTransform: 'none' }}
            >
              {b.label}
            </Button>
          ))}

          {/* mascota */}
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

        {/* --------- Panel central --------- */}
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
            {`Solicitudes ${
              filtro.charAt(0).toUpperCase() + filtro.slice(1)
            }`.replace('Todas', 'Todas las Solicitudes')}
          </Typography>

          {/* lista */}
          <List sx={{ flexGrow: 1 }}>
            {pageData.map((s) => (
              <ListItem key={s.id} sx={{ mb: 2, p: 0 }}>
                <SolicitudCard data={s} />
              </ListItem>
            ))}
          </List>

          {/* paginación */}
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
    </Box>
  );
}
