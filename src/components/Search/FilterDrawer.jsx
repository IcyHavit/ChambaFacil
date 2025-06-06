import React, { useState } from 'react';
import { Box, Drawer, Typography, FormGroup, FormControlLabel, Checkbox, Grid, Divider, IconButton } from '@mui/material';
import Star from '@mui/icons-material/Star';
import { useTheme } from '@emotion/react';
import ButtonMod from '../ButtonMod';

export default function FilterDrawer({ open, onClose, selectedApplyFilters }) {
  const theme = useTheme();
  const [filters, setFilters] = useState({
    availability: [],
    rating: null,
    experience: [],
    academicExperience: [],
        modalidadCobro: [], // Nuevo filtro
    garantia: [], // Nuevo filtro
  });

  // Manejo genérico de cambios en los filtros
  const updateFilters = (category, value, isCheckbox = true) => {
    setFilters((prev) => {
      const updatedCategory = isCheckbox
        ? prev[category].includes(value)
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value]
        : value;
      return { ...prev, [category]: updatedCategory };
    });
  };

  const handleApplyFilters = () => {
    selectedApplyFilters(filters);
    onClose();
  };


  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Box sx={{ padding: '2rem', width: '23rem', height: '100%', backgroundColor: theme.palette.tertiary.main }}>
        <Typography sx={{ color: theme.palette.primary.main, fontSize: '1.8rem', fontWeight: 'bold' }}>Filtros de Búsqueda</Typography>

        {/* Disponibilidad */}
        <Typography sx={{ color: theme.palette.secondary.main, fontSize: '1.2rem', fontWeight: 'bold', mt: 2 }}>Disponibilidad</Typography>
        <FormGroup>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={6}>
              <FormControlLabel control={<Checkbox onChange={() => updateFilters('availability', 'Lunes')} />} label="Lunes" />
              <FormControlLabel control={<Checkbox onChange={() => updateFilters('availability', 'Martes')} />} label="Martes" />
              <FormControlLabel control={<Checkbox onChange={() => updateFilters('availability', 'Miércoles')} />} label="Miércoles" />
              <FormControlLabel control={<Checkbox onChange={() => updateFilters('availability', 'Jueves')} />} label="Jueves" />
            </Grid>
            <Grid size={6}>
              <FormControlLabel control={<Checkbox onChange={() => updateFilters('availability', 'Viernes')} />} label="Viernes" />
              <FormControlLabel control={<Checkbox onChange={() => updateFilters('availability', 'Sábado')} />} label="Sábado" />
              <FormControlLabel control={<Checkbox onChange={() => updateFilters('availability', 'Domingo')} />} label="Domingo" />
            </Grid>
          </Grid>
        </FormGroup>

        <Divider sx={{ my: 2, backgroundColor: theme.palette.primary.main }} />

        {/* Calificación */}
        <Typography sx={{ color: theme.palette.secondary.main, fontSize: '1.2rem', fontWeight: 'bold', mt: 2 }}>Calificación</Typography>
        <FormGroup>
          <Typography sx={{ color: theme.palette.secondary.main, fontSize: '1rem', mb: 1, pt: 1 }}>Selecciona la calificación mínima:</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <IconButton
                key={star}
                onClick={() => updateFilters('rating', star, false)}
                color="secondary"
              >
                <Star sx={{ fontSize: '2rem', color: star <= filters.rating ? theme.palette.primary.main : '#ccc' }} />
              </IconButton>
            ))}
          </Box>
        </FormGroup>

        {/* Experiencia */}
        <Divider sx={{ my: 2, backgroundColor: theme.palette.primary.main }} />
        <Typography sx={{ color: theme.palette.secondary.main, fontSize: '1.2rem', fontWeight: 'bold', mt: 2 }}>Experiencia</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox onChange={() => updateFilters('experience', 'Sin experiencia')} />} label="Sin experiencia" />
          <FormControlLabel control={<Checkbox onChange={() => updateFilters('experience', '1 año')} />} label="1 año" />
          <FormControlLabel control={<Checkbox onChange={() => updateFilters('experience', '2 años')} />} label="2 años" />
          <FormControlLabel control={<Checkbox onChange={() => updateFilters('experience', '3 años')} />} label="3 años" />
          <FormControlLabel control={<Checkbox onChange={() => updateFilters('experience', '4 años')} />} label="4 años" />
          <FormControlLabel control={<Checkbox onChange={() => updateFilters('experience', '5 años o más')} />} label="5 años o más" />
        </FormGroup>

        {/* Experiencia Académica */}
        <Divider sx={{ my: 2, backgroundColor: theme.palette.primary.main }} />
        <Typography sx={{ color: theme.palette.secondary.main, fontSize: '1.2rem', fontWeight: 'bold', mt: 2 }}>Experiencia</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox onChange={() => updateFilters('academicExperience', 'Sí')} />} label="Con carre" />
          <FormControlLabel control={<Checkbox onChange={() => updateFilters('academicExperience', 'No')} />} label="Sin carrera" />
        </FormGroup>
        {/* Modalidad de Cobro */}
        <Typography sx={{ color: theme.palette.secondary.main, fontSize: '1.2rem', fontWeight: 'bold', mt: 2 }}>Modalidad de Cobro</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox onChange={() => updateFilters('modalidadCobro', 'Efectivo')} />} label="Efectivo" />
          <FormControlLabel control={<Checkbox onChange={() => updateFilters('modalidadCobro', 'Transferencia')} />} label="Transferencia" />
          <FormControlLabel control={<Checkbox onChange={() => updateFilters('modalidadCobro', 'Tarjeta')} />} label="Tarjeta" />
        </FormGroup>

        <Divider sx={{ my: 2, backgroundColor: theme.palette.primary.main }} />

        {/* Garantía */}
        <Typography sx={{ color: theme.palette.secondary.main, fontSize: '1.2rem', fontWeight: 'bold', mt: 2 }}>Garantía</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox onChange={() => updateFilters('garantia', 'Sí')} />} label="Sí" />
          <FormControlLabel control={<Checkbox onChange={() => updateFilters('garantia', 'No')} />} label="No" />
        </FormGroup>

        {/* Botón para aplicar filtros */}
        <Box sx={{ mt: 4, paddingBottom: '2rem' }}>
          <ButtonMod
            variant="principal"
            textCont="Aplicar Filtros"
            width="100%"
            height="2rem"
            clickEvent={handleApplyFilters}
          />
        </Box>
      </Box>
    </Drawer>
  );
}
