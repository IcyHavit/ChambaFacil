import { useState } from 'react';
import ButtonMod from '../components/ButtonMod';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ClienteComponent from '../components/InitialForm/cliente'; 
import PrestamistaComponent from '../components/InitialForm/prestamista'; 
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { Box, Stack } from '@mui/material';

export default function InitialForm() {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <Stack spacing={6} alignItems="center" sx={{ p: 6 }}>
      <Box sx={{ display: 'flex', gap: 10 }}>
        <ButtonMod
          variant="principal"
          textCont="Cliente"
          width="12rem"
          height="5rem"
          clickEvent={() => setSelectedRole('cliente')}
          startIcon={<EmojiPeopleIcon />}
        />
        <ButtonMod
          variant="principal"
          textCont="Prestamista"
          width="12rem"
          height="5rem"
          clickEvent={() => setSelectedRole('prestamista')}
          startIcon={<EngineeringIcon />}
        />
      </Box>

      {/* Formulario debajo de los botones */}
      {selectedRole === 'cliente' && <ClienteComponent />}
      {selectedRole === 'prestamista' && <PrestamistaComponent />}
    </Stack>
  );
}
