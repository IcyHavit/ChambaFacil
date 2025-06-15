import { Box, Typography, Button,TextField,Divider,List,IconButton,Stack } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import React from 'react';
import ChatBubble from '../components/Chat/Chats';
import ProfilePanel from '../components/Chat/Informacion';
import MessageBubble from '../components/Chat/ChatPrincipal';
import PerfilImg from '../assets/images/Perfil.png';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {

const [openProfile, setOpenProfile] = React.useState(false);
const [selectedChat, setSelectedChat] = React.useState(null);

const handleChatSelect = (chatId) => {
  const chatObj = chatsData.find((c) => c.id === chatId);
  setSelectedChat(chatObj || null);
};

const getLastPreview = chat => {
  // Si no hay mensajes, usa el campo estático lastMessage
  if (!chat.messages || chat.messages.length === 0) return chat.lastMessage || '';

  const last = chat.messages[chat.messages.length - 1];

  switch (last.messageType) {
    case 'image':
      return 'Foto';        // etiqueta para imágenes
    case 'document':
      return 'Documento';   // etiqueta para documentos
    default:
      return last.text;     // texto normal
  }
};

const getLastTime = chat =>
  chat.messages && chat.messages.length
    ? chat.messages[chat.messages.length - 1].time
    : chat.time;

const chatsData = [
  {
    id: 1,
    name: 'Juan Perez',
    avatar: '',
    time: '13:45',
    job: 'Albañil',        
    phone1: '+52 55-1234-5678',
    phone2: '',
    rating: 4.3,
    files: [
      { id: 1, src: PerfilImg }
    ],
    messages: [
      { id: 1, from: 'them',messageType: 'text', text: '¿Nos vemos mañana en la obra?', time: '13:45' },
      { id: 2, from: 'me',messageType: 'text',   text: 'Claro, 5 pm en el sitio.',      time: '13:46' },
    ]
  },
    {
    id: 2,
    name: 'Maria Lopez',
    avatar: '',
    time: '12:30',
    job: 'Arquitecta',     
    phone1: '+52 55-9876-5432',
    phone2: '+52 55-8765-4321',
    rating: 4.8,
    files: [ { id: 1, src: PerfilImg },
			{ id: 2, src: PerfilImg },
	 		{ id: 3, src: PerfilImg },
			{ id: 4, src: PerfilImg },
			{ id: 5, src: PerfilImg },
			{ id: 6, src: PerfilImg },
			{ id: 7, src: PerfilImg },
			{ id: 8, src: PerfilImg },
			{ id: 9, src: PerfilImg },
			{ id: 10, src: PerfilImg },				
		],
    messages: [
      { id: 1, from: 'them',messageType: 'text', text: 'Perfecto, gracias por confirmar.', time: '12:30' },
       { id: 2, from: 'me',   messageType: 'image', src:  PerfilImg, time: '13:46' },
    ]
    },
    {
    id: 3,
    name: 'Carlos Gomez',
    avatar: '',
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
    name: 'Luis Ramirez',
    avatar: '',
    time: '09:30',
    job: 'Constructor',
    phone1: '+52 55-4567-8901',
    phone2: '',
    rating: 4.2,
    files: [],
    messages: []
    }
    ,{
    id: 6,
    name: 'Sofia Martinez',
    avatar: '',
    time: '08:45',
    job: 'Gerente de Proyecto',
    phone1: '+52 55-5678-9012',
    phone2: '+52 55-7890-1234',
    rating: 4.6,
    files: [],
    messages: []
    }
    
];

const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    console.log("Buscando mensajes con:", searchValue);
  };

const bottomRef = React.useRef(null);

React.useEffect(() => {

}, [selectedChat]);



return (

<Stack sx={{ height: '100vh', width: '100%' }}>
<Navbar />

 <Box sx={{ height: '100vh', display: 'flex', bgcolor: 'background.default', p: 2, gap: 2 }}>

    {/* 1. Lista de Chats */}

    <Box sx={{ width: 300, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px - 32px)'}}>
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
            maxHeight: '100%',
            '&::-webkit-scrollbar': {
                width: '8px',
            },
            '&::-webkit-scrollbar-track': {
                background: '#f0f0f0',
                borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#4c9b82',
                borderRadius: '4px',
                border: '2px solid #f0f0f0',
            },
            }}>
            {chatsData.map(chat => (
                <ChatBubble
                key={chat.id}
                name={chat.name}
                avatar={chat.avatar}
                lastMessage={getLastPreview(chat)} 
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
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                {selectedChat?.avatar ? (
                    <Box
                    component="img"
                    src={selectedChat.avatar || PerfilImg}
                    alt={selectedChat.name}
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        mr: 2,
                    }}
                    />
                ) : (
                    <Box
                    component="img"
                    src={PerfilImg}
                    alt="default"
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        mr: 2,
                    }}
                    />
                )}

                <Box
                    sx={{ cursor: selectedChat ? 'pointer' : 'default' }}
                    onClick={() => selectedChat && setOpenProfile((p) => !p)}
                >
                    <Typography variant="h6" color="text.primary">
                    {selectedChat ? selectedChat.name : 'Selecciona un chat'}
                    </Typography>
                    {selectedChat && (
                    <Typography variant="body2" color="text.secondary">
                        {selectedChat.job || 'Ocupación no disponible'}
                    </Typography>
                    )}
                </Box>
                </Box>
            </Box>
            <Divider />

            {/* Mensajes */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', mt: 2, px: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
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
    <Footer />
</Stack>
);

}
