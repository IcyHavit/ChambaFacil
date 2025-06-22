import { Box, Typography, Button, TextField, Divider, List, IconButton, Stack } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import React from 'react';
import ChatBubble from '../components/Chat/Chats';
import ProfilePanel from '../components/Chat/Informacion';
import MessageBubble from '../components/Chat/ChatPrincipal';
import PerfilImg from '../assets/images/Perfil.png';

// Pruebas de axios
import axios from 'axios';

export default function Home() {

  // cambiar esto por el email real del localStorage
  const actualUserEmail = 'jesushervert@correo.com';


  // Estados para manejar: los ultimos chats, el chat seleccionado, todos los chats y el estado del perfil abierto
  const [recentChats, setRecentChats] = React.useState([]);
  const [selectedChat, setSelectedChat] = React.useState(null);
  const [chats, setChats] = React.useState([]);
  const [openProfile, setOpenProfile] = React.useState(false);
  const [contactData, setContactData] = React.useState([]);


  // recuperar los chats desde un API al cargar el componente
  React.useEffect(() => {
    const obtainRecentChats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/chat/last-messages/' + actualUserEmail);
        setRecentChats(response.data);
        //console.log("Chats obtenidos:", response.data);
      } catch (error) {
        console.error("Error fetching recent chats:", error);
      }
    }
    obtainRecentChats();
  }, []);

  // Funcion para obtener los mensajes de un chat especifico entre dos usuarios
  const obtainUsersChat = async (senderEmail, receiverEmail) => {
    try {
      const response = await axios.get('http://localhost:3000/api/chat/messages/' + senderEmail + '/' + receiverEmail);
      setChats(response.data);
      console.log("Chat obtenido:", response.data);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  }

  // Funcion para obtener los datos de contacto de un usuario
  const obtainContactData = async (actualUserEmail, contactEmail) => {
    try {
      const response = await axios.get('http://localhost:3000/api/chat/user-profile/' + actualUserEmail + '/' + contactEmail);
      setContactData(response.data);
      console.log("Datos de contacto obtenidos:", response.data);
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  }

  // Manejar la seleccion de un chat
  const handleChatSelect = (chat_Id) => {
    const chatObj = recentChats.find(chat => chat._id === chat_Id);
    if (chatObj) {
      setSelectedChat(chatObj);
      setOpenProfile(false);
      obtainUsersChat(actualUserEmail, chatObj.senderEmail === actualUserEmail ? chatObj.receiverEmail : chatObj.senderEmail);
      console.log("Chat seleccionado:", chatObj);
    } else {
      console.warn("Chat not found:", chat_Id);
    }
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
        { id: 1, from: 'them', messageType: 'text', text: '¿Nos vemos mañana en la obra?', time: '13:45' },
        { id: 2, from: 'me', messageType: 'text', text: 'Claro, 5 pm en el sitio.', time: '13:46' },
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
      files: [{ id: 1, src: PerfilImg },
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
        { id: 1, from: 'them', messageType: 'text', text: 'Perfecto, gracias por confirmar.', time: '12:30' },
        { id: 2, from: 'me', messageType: 'image', src: PerfilImg, time: '13:46' },
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
    , {
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

  const bottomRef = React.useRef(null);

  React.useEffect(() => {

  }, [selectedChat]);



  return (
    <Stack sx={{ height: '100vh', width: '100%' }}>
      <Box sx={{ height: '100vh', display: 'flex', bgcolor: 'background.default', p: 2, gap: 2 }}>

        {/* 1. Lista de Chats */}

        <Box sx={{ width: 300, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px - 32px)' }}>
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
            {recentChats.map((chat) => {
              const destinRealName = actualUserEmail === chat.senderEmail ? chat.receiverName : chat.senderName;
              const destinRealAvatar = actualUserEmail === chat.senderEmail ? chat.receiverAvatar : chat.senderAvatar;
              const hour24 = new Date(chat.timestamp).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false });


              return (
                <ChatBubble
                  key={chat._id}
                  name={destinRealName}
                  avatar={destinRealAvatar || PerfilImg}
                  lastMessage={typeof chat.content === 'string' ? chat.content : 'Foto'}
                  time={hour24}
                  isActive={selectedChat?._id === chat._id}
                  onSelect={() => handleChatSelect(chat._id)} />
              );
            })}
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
                onClick={() => {
                  if (selectedChat) {
                    setOpenProfile((p) => !p);
                    obtainContactData(
                      actualUserEmail,
                      selectedChat.senderEmail === actualUserEmail ? selectedChat.receiverEmail : selectedChat.senderEmail
                    );
                  }
                }}
              >
                {/* Nombre del chat */}
                <Typography variant="h6" color="text.primary">
                  {
                    selectedChat
                      ? (selectedChat.senderEmail === actualUserEmail
                        ? selectedChat.receiverName
                        : selectedChat.senderName)
                      : 'Selecciona un chat'
                  }
                </Typography>

                {/* Ocupacion del chat */}
                {selectedChat && (
                  <Typography variant="body2" color="text.secondary">
                    {
                      selectedChat
                        ? (selectedChat.senderEmail === actualUserEmail
                          ? selectedChat.receiverOccupation
                          : selectedChat.senderOccupation)
                        : 'Selecciona un chat'
                    }
                  </Typography>
                )}
              </Box>

            </Box>
          </Box>
          <Divider />

          {/* Mensajes */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto', mt: 2, px: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {chats.map((message) => {
              const isMe = message.senderEmail === actualUserEmail ? 'me' : 'them';
              const time = new Date(message.timestamp).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false });

              return (
                <MessageBubble
                  key={message._id}
                  from={isMe}
                  messageType={typeof message.content === 'string' ? 'text' : 'image'}
                  text={typeof message.content === 'string' ? message.content : undefined}
                  src={typeof message.content === 'object' ? message.content : undefined}
                  time={time}
                />
              );
            })}
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
              id: contactData.id,
              name: contactData.contactName || 'Cargando...',
              job: contactData.contactOccupation || 'Cargando...',
              phone1: contactData.contactPhone || 'Cargando...',
              rating: contactData.contactRating || 0,
              avatar: contactData.contactPathProfilePicture || PerfilImg,
            }}
            files={contactData.sharedFiles || []}
            onClose={() => setOpenProfile(false)}
          />
        )}

      </Box>
    </Stack>
  );

}
