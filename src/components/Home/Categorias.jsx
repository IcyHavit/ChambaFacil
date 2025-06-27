import React, { useState } from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import {
  Plumbing as PlumbingIcon,
  CleaningServices as CleaningIcon,
  Carpenter as CarpenterIcon,
  Handyman as HandymanIcon,
  ElectricalServices as ElectricalIcon,
  LocalFlorist as GardeningIcon,
  ChildCare as ChildCareIcon,
  Pets as PetsIcon,
  Elderly as ElderlyIcon,
  School as SchoolIcon,
  LocalShipping as ShippingIcon,
  LocalGroceryStore as GroceryIcon,
  LaptopMac as ComputerIcon,
  DesignServices as DesignIcon,
  Event as EventIcon,
  DirectionsCar as CarIcon,
  FaceRetouchingNatural as MakeupIcon,
  Iron as IronIcon,
  FormatPaint as PaintIcon,
  LocalHospital as NursingIcon,
  AccessibilityNew as MassageIcon,
} from '@mui/icons-material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ButtonMod from '../../components/ButtonMod';

export default function Categorias() {
  const theme = useTheme();
  const navigate = useNavigate();

  const categorias = [
    { id: 1, name: 'Albañilería', Icon: HandymanIcon },
    { id: 2, name: 'Asesorías', Icon: SchoolIcon },
    { id: 3, name: 'Ayuda en negocios', Icon: BusinessCenterIcon },
    { id: 4, name: 'Carpintería', Icon: CarpenterIcon },
    { id: 5, name: 'Chofer', Icon: CarIcon },
    { id: 6, name: 'Clases particulares', Icon: SchoolIcon },
    { id: 7, name: 'Cocina', Icon: RestaurantMenuIcon },
    { id: 8, name: 'Computación y soporte técnico', Icon: ComputerIcon },
    { id: 9, name: 'Costura', Icon: IronIcon },
    { id: 10, name: 'Cuidado de adultos mayores', Icon: ElderlyIcon },
    { id: 11, name: 'Cuidado de mascotas', Icon: PetsIcon },
    { id: 12, name: 'Cuidado de niños', Icon: ChildCareIcon },
    { id: 13, name: 'Decoración', Icon: DesignIcon },
    { id: 14, name: 'Electricidad', Icon: ElectricalIcon },
    { id: 15, name: 'Enfermería', Icon: NursingIcon },
    { id: 16, name: 'Fletes', Icon: ShippingIcon },
    { id: 17, name: 'Instalación de servicios', Icon: ElectricalIcon },
    { id: 18, name: 'Jardinería', Icon: GardeningIcon },
    { id: 19, name: 'Limpieza', Icon: CleaningIcon },
    { id: 20, name: 'Masajes', Icon: MassageIcon },
    { id: 21, name: 'Mudanzas', Icon: ShippingIcon },
    { id: 22, name: 'Organización de eventos', Icon: EventIcon },
    { id: 23, name: 'Paseo de perros', Icon: PetsIcon },
    { id: 24, name: 'Peluquería', Icon: MakeupIcon },
    { id: 25, name: 'Pintura', Icon: PaintIcon },
    { id: 26, name: 'Plomería', Icon: PlumbingIcon },
    { id: 27, name: 'Reparaciones', Icon: HandymanIcon },
    { id: 28, name: 'Uñas y maquillaje', Icon: MakeupIcon },
  ];

  const [paginaActual, setPaginaActual] = useState(0);
  const itemsPorPagina = 4;
  const totalPaginas = Math.ceil(categorias.length / itemsPorPagina);

  const categoriasVisibles = categorias.slice(
    paginaActual * itemsPorPagina,
    (paginaActual + 1) * itemsPorPagina
  );

  const handleVerMas = () => {
    navigate(`/search`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        px: { xs: 2, md: 10 },
        py: 7,
        bgcolor: theme.palette.background.default,
        flexWrap: 'wrap',
        gap: 4,
      }}
    >
      {/* Texto y botón lado izquierdo */}
      <Box sx={{ maxWidth: 800 }}>
        <Typography color={theme.palette.primary.main} variant="h5" fontWeight="bold" mb={2}>
          Explora categorías de servicios disponibles cerca de ti.
        </Typography>
        <Typography color={theme.palette.secondary.dark} mb={4}>
          Busca fácilmente lo que necesitas: plomería, carpintería, electricidad y más.
          Encuentra personas confiables con experiencia, listas para ayudarte cuando más lo necesites.
        </Typography>
        <ButtonMod
          variant="principal"
          textCont="Ver más"
          width="auto"
          height="2.5rem"
          type="button"
          clickEvent={handleVerMas}
        />
      </Box>

      {/* Tarjetas lado derecho */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: 2,
          maxWidth: 600,
          flex: 1,
        }}
      >
        {categoriasVisibles.map(({ id, name, Icon }) => (
          <Paper
            key={id}
            onClick={() => navigate(`/search?categoria=${encodeURIComponent(name)}`)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
              cursor: 'pointer',
              '&:hover': { boxShadow: 4 },
            }}
            elevation={2}
          >
            <Icon sx={{ fontSize: 40, color: theme.palette.secondary.dark, mr: 2 }} />
            <Box>
              <Typography sx={{ color: theme.palette.secondary.dark, fontWeight: 'bold' }}>
                {name}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Navegación con flechas y puntos */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          mt: 3,
        }}
      >
        <IconButton onClick={() => setPaginaActual(p => Math.max(p - 1, 0))} disabled={paginaActual === 0}>
          <ChevronLeftIcon />
        </IconButton>

        {[...Array(totalPaginas)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: i === paginaActual ? theme.palette.primary.main : theme.palette.background.paper,
            }}
          />
        ))}

        <IconButton
          onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas - 1))}
          disabled={paginaActual === totalPaginas - 1}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
