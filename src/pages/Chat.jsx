import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button,TextField,InputAdornment,Divider,List,IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

export default function Home() {
  const theme = useTheme();

const [openProfile, setOpenProfile] = React.useState(false);

const handleProfileClose = () => setOpenProfile(false);
return (
 <Box sx={{ height: '100vh', display: 'flex', bgcolor: 'background.default', p: 2, gap: 2 }}>
    {/* 1. Lista de Chats */}

    <Box sx={{ width: 300, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" sx={{ p: 2, fontWeight: 'bold', color: 'text.secondary' }}>Chats</Typography>
        <Box sx={{ px: 2, pb: 2 }}>
            <TextField
                fullWidth
                placeholder="Buscar"
                size="small"
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
        <Divider />
        <List sx={{ overflowY: 'auto', flexGrow: 1 }}>
            {/* lista de chats */}
        </List>
    </Box>

    {/* 2. Zona Central Chat */}
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'inline-block', cursor: 'pointer' }} onClick={() => setOpenProfile((prev) => !prev)}>
                    <Typography variant="h6" color="text.primary">
                    Wrandon Segura
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">Electricista y plomería</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, bgcolor: 'primary.main', borderRadius: 1, boxShadow: 2, p: 1 }}>
                <IconButton><SearchIcon sx={{ color: 'common.white' }} /></IconButton>
                <IconButton><AttachFileIcon sx={{ color: 'common.white' }} /></IconButton>
                <IconButton><InsertPhotoIcon sx={{ color: 'common.white' }} /></IconButton>
                </Box>
            </Box>
            <Divider />

            {/* Mensajes */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', mt: 2, px: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ maxWidth: '60%', bgcolor: 'grey.300', borderRadius: 1, p: 1 }}>
                        <Typography variant="body2" color="text.primary">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', color: 'text.secondary' }}>6:12 pm</Typography>
                    </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                    <Box sx={{ maxWidth: '60%', bgcolor: 'primary.main', borderRadius: 1, p: 1, ml: 'auto' }}>
                        <Typography variant="body2" color="tertiary.main">
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia.
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', color: 'tertiary.main' }}>6:12 pm</Typography>
                    </Box>
                    </Box>

                    <Box sx={{ textAlign: 'center', my: 2, color: 'text.secondary', fontWeight: 'bold' }}>
                    Hoy
                    </Box>
                </Box>

                {/* Input mensaje */}
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <TextField fullWidth placeholder="Escribe un mensaje..." size="small" variant="outlined" />
            <Button variant="contained" color="primary">Enviar</Button>
        </Box>
    </Box>

    {/* 3. Panel de Perfil como barra lateral */}
    {openProfile && (
        <Box
            sx={{
                width: 340,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1,
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                zIndex: 1300,
                position: 'relative',
            }}
        >
            <Box sx={{ alignSelf: 'flex-end' }}>
                <IconButton onClick={handleProfileClose}><CloseIcon color="action" /></IconButton>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold" color="text.primary" mt={1}>
                    Wrandon Segura
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    Electricista y plomería
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                    <strong>Tel 1:</strong> +52 56-5346-53<br />
                    <strong>Tel 2:</strong> +52 56-5346-53
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="text.primary" mb={1}>4.6 Rating</Typography>
            </Box>
        </Box>
    )}
</Box>
);

}
