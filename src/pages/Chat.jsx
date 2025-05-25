import { Box, Typography, Button,TextField,InputAdornment,Divider,List,IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import React from 'react';
import ChatBubble from '../components/Chat/Chats';
import ProfilePanel from '../components/Chat/Informacion';
import PerfilImg from '../assets/images/Perfil.png';

export default function Home() {

const [openProfile, setOpenProfile] = React.useState(false);
const [searchOpen, setSearchOpen] = React.useState(false);

const currentUser = {
  name: 'Wrandon Segura',
  job:  'Electricista y plomería',
  phone1: '+52 56-5346-53',
  phone2: '+52 56-5346-53',
  rating: 4.6,
  avatar: PerfilImg,
};

const sharedFiles = [
  
    {
        id: 1,
        src: PerfilImg,
    },
    {
        id: 1,
        src: PerfilImg,
    },
    {
        id: 1,
        src: PerfilImg,
    },
    {
        id: 1,
        src: PerfilImg,
    },
    {
        id: 1,
        src: PerfilImg,
    },
    {
        id: 1,
        src: PerfilImg,
    }
    
]

const chatsData = [
  {
    id: 1,
    name: 'Juan Perez',
    avatar: '',
    lastMessage: '¿Nos vemos mañana en la obra?',
    time: '13:45',
  },
  {
    id: 2,
    name: 'María López',
    avatar: '',
    lastMessage: 'Perfecto, gracias por avisar.',
    time: '12:30',
  },
  {
    id: 3,
    name: 'María López',
    avatar: '',
    lastMessage: 'Perfecto, gracias por avisar.',
    time: '12:30',
  },
  {
    id: 4,
    name: 'María López',
    avatar: '',
    lastMessage: 'Perfecto, gracias por avisar.',
    time: '12:30',
  },
  {
    id: 5,
    name: 'María López',
    avatar: '',
    lastMessage: 'Perfecto, gracias por avisar.',
    time: '12:30',
  },
  {
    id: 6,
    name: 'María López',
    avatar: '',
    lastMessage: 'Perfecto, gracias por avisar.',
    time: '12:30',
  },
  {
    id: 7,
    name: 'María López',
    avatar: '',
    lastMessage: 'Perfecto, gracias por avisar.',
    time: '12:30',
  },
  // agrega más chats si quieres...
];

const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    // Aquí puedes actualizar estado, filtrar mensajes, etc.
    console.log("Buscando mensajes con:", searchValue);
  };



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
            />
        </Box>
        <Divider />
        <List sx={{
                    overflowY: 'auto',
                    flexGrow: 1,
                    '&::-webkit-scrollbar': {
                    width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                    background: '#f0f0f0',
                    borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#4c9b82', // tu color verde del proyecto
                    borderRadius: '4px',
                    border: '2px solid #f0f0f0',
                    },
                }}
                >
            {chatsData.map(chat => (
                <ChatBubble
                key={chat.id}
                name={chat.name}
                avatar={chat.avatar}
                lastMessage={chat.lastMessage}
                time={chat.time}
                />
            ))}
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
                {searchOpen && (
                    <TextField
                    size="small"
                    placeholder="Buscar mensajes..."
                    variant="outlined"
                    sx={{ ml: 2, bgcolor: 'background.paper', borderRadius: 1 }}
                    autoFocus
                    onChange={handleSearchChange} // define esta función para manejar la búsqueda
                    />
                )}

                <IconButton onClick={() => setSearchOpen(prev => !prev)}>
                <SearchIcon sx={{ color: 'common.white' }} />
                </IconButton>
                <IconButton><InsertDriveFileIcon sx={{ color: 'common.white' }} /></IconButton>
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
        <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField fullWidth placeholder="Escribe un mensaje..." size="small" variant="outlined" />
        
        {/* Botón para adjuntar archivo */}
        <IconButton color="primary" component="label">
            <AttachFileIcon />
            <input
            type="file"
            hidden
            onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                console.log("Archivo seleccionado:", file);
                // Aquí agregas lógica para subir o manejar el archivo
                }
            }}
            />
        </IconButton>
        
        <Button variant="contained" color="primary">Enviar</Button>
        </Box>
    </Box>

    {/* 3. Panel de Perfil como barra lateral */}
    {openProfile && (
    <ProfilePanel
        user={currentUser}
        files={sharedFiles}
        onClose={() => setOpenProfile(false)}
    />
    )}
</Box>
);

}
