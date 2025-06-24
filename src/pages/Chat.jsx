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
  const [messageContent, setMessageContent] = React.useState("");
  const [openProfile, setOpenProfile] = React.useState(false);
  const [contactData, setContactData] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");

  // recuperar los chats desde un API al cargar el componente
  const obtainRecentChats = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/chat/last-messages/' + actualUserEmail);
      setRecentChats(response.data);
      //console.log("Chats obtenidos:", response.data);
    } catch (error) {
      console.error("Error fetching recent chats:", error);
    }
  }
  React.useEffect(() => {
    obtainRecentChats();
  }, [chats]);

  // Filtrar chats con base en el texto de busqeuda
  const filteredChats = recentChats.filter(chat => {
    const destinRealName = actualUserEmail === chat.senderEmail ? chat.receiverName : chat.senderName;
    return destinRealName.toLowerCase().includes(searchText.toLowerCase());
  });

  // Función para enviar el mensaje
  const sendMessage = async () => {
    if (!messageContent.trim()) {
      console.log("No se puede enviar un mensaje vacío.");
      return;
    }

    try {
      const messageData = {
        senderEmail: actualUserEmail,
        receiverEmail: selectedChat.senderEmail === actualUserEmail ? selectedChat.receiverEmail : selectedChat.senderEmail,
        content: messageContent,
        timestamp: new Date().toISOString(),
      };

      // Enviar la solicitud POST al backend
      const response = await axios.post('http://localhost:3000/api/chat/send', messageData);
      console.log("Mensaje enviado:", response.data);

      // Si el mensaje fue enviado correctamente, actualizar el chat
      setChats(prevChats => [...prevChats, response.data]);
      setMessageContent("");

    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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
            {filteredChats.map((chat) => {
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
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, display: 'flex', flexDirection: 'column', p: 2, height: 'calc(100vh - 64px - 32px)' }}>
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
              <TextField
                fullWidth
                placeholder="Escribe un mensaje..."
                size="small"
                variant="outlined"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />


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

            <Button variant="contained" color="primary" onClick={sendMessage}>Enviar</Button >
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
