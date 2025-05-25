import { Box, Typography, Button,TextField,Divider,List,IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import React from 'react';
import ChatBubble from '../components/Chat/Chats';
import ProfilePanel from '../components/Chat/Informacion';
import MessageBubble from '../components/Chat/ChatPrincipal';
import PerfilImg from '../assets/images/Perfil.png';

export default function Home() {

const [openProfile, setOpenProfile] = React.useState(false);
const [searchOpen, setSearchOpen] = React.useState(false);
const [selectedChat, setSelectedChat] = React.useState(null);

const handleChatSelect = (chatId) => {
  const chatObj = chatsData.find((c) => c.id === chatId);
  setSelectedChat(chatObj || null);
};

const chatsData = [
  {
    id: 1,
    name: 'Juan Perez',
    avatar: '',
    lastMessage: '¿Nos vemos mañana en la obra?',
    time: '13:45',
    job: 'Albañil',        
    phone1: '+52 55-1234-5678',
    phone2: '',
    rating: 4.3,
    files: [
      { id: 1, src: PerfilImg }
    ],
    messages: [
      { id: 1, from: 'them', text: '¿Nos vemos mañana en la obra?', time: '13:45' },
      { id: 2, from: 'me',   text: 'Claro, 5 pm en el sitio.',      time: '13:46' },
    ]
  },
    {
    id: 2,
    name: 'Maria Lopez',
    avatar: '',
    lastMessage: 'Hola, ¿cómo estás?',
    time: '12:30',
    job: 'Arquitecta',     
    phone1: '+52 55-9876-5432',
    phone2: '+52 55-8765-4321',
    rating: 4.8,
    files: [],
    messages: [
      { id: 1, from: 'them', text: 'Perfecto, gracias por confirmar.', time: '12:30' },
    ]
    },
    {
    id: 3,
    name: 'Carlos Gomez',
    avatar: '',
    lastMessage: 'El proyecto está en marcha.',
    time: '11:15',
    job: 'Ingeniero',      
    phone1: '+52 55-2345-6789',
    phone2: '',
    rating: 4.5,
    files: [],
    messages: []
    },
    {
    id: 4,
    name: 'Ana Torres',
    avatar: '',
    lastMessage: '¿Puedes enviarme los planos?',
    time: '10:00',
    job: 'Diseñadora',    
    phone1: '+52 55-3456-7890',
    phone2: '+52 55-6543-2109',
    rating: 4.7,
    files: [],
    messages: []
    },
    {
    id: 5,
    name: 'Luis Martinez',
    avatar: '',
    lastMessage: 'Revisé el informe, está bien.',
    time: '09:45',
    job: 'Gerente',       // NUEVO
    phone1: '+52 55-4567-8901',
    phone2: '',
    rating: 4.6,
    files: [],
    messages: []
    },
];

const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    // Aquí puedes actualizar estado, filtrar mensajes, etc.
    console.log("Buscando mensajes con:", searchValue);
  };

const bottomRef = React.useRef(null);

React.useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [selectedChat]);



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
                    backgroundColor: 'secondary.main', // tu color verde del proyecto
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
                isActive={selectedChat?.id === chat.id}
                onSelect={() => handleChatSelect(chat.id)}
                />
            ))}
        </List>
    </Box>

    {/* 2. Zona Central Chat */}
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Box
                        sx={{ display: 'inline-block', cursor: selectedChat ? 'pointer' : 'default' }}
                        onClick={() => selectedChat && setOpenProfile((p) => !p)}
                    >
                        <Typography variant="h6" color="text.primary">
                        {selectedChat ? selectedChat.name : 'Selecciona un chat'}
                        </Typography>
                    </Box>
                    {selectedChat && (
                        <Typography variant="body2" color="text.secondary">
                        {selectedChat.job || 'Ocupación no disponible'}
                        </Typography>
                    )}
                    </Box>
                <Box sx={{ display: 'flex', gap: 2, bgcolor: 'secondary.main', borderRadius: 1, boxShadow: 2, p: 1 }}>
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
                {selectedChat?.messages.map((m) => (
                    <MessageBubble key={m.id} {...m} />
                ))}
                <div ref={bottomRef} />
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
    {openProfile && selectedChat && (
        <ProfilePanel
        user={{
        name: selectedChat.name,
        job:  selectedChat.job,
        phone1: selectedChat.phone1,
        phone2: selectedChat.phone2,
        rating: selectedChat.rating,
        avatar: selectedChat.avatar,
        }}
        files={selectedChat.files}
        onClose={() => setOpenProfile(false)}
    />
    )}

</Box>
);

}
