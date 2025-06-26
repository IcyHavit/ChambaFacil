import { Box, Typography, Button, TextField, Divider, List, IconButton, Stack, Avatar } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import React, { act } from 'react';
import ChatBubble from '../components/Chat/Chats';
import ProfilePanel from '../components/Chat/Informacion';
import MessageBubble from '../components/Chat/ChatPrincipal';
import PerfilImg from '../assets/images/Perfil.png';
// pruebas de la API
import { getRecentChats, sendChatMessage, getChatMessages, getContactData } from '../api/chat';

export default function Home() {

  // cambiar esto por el email real del localStorage
  const actualUserEmail = localStorage.getItem('email') || localStorage.getItem('correo') || '';
  console.log("Email del usuario actual:", actualUserEmail);

  // Estados para manejar: los ultimos chats, el chat seleccionado, todos los chats y el estado del perfil abierto
  const [recentChats, setRecentChats] = React.useState([]);
  const [selectedChat, setSelectedChat] = React.useState(null);
  const [chats, setChats] = React.useState([]);
  const [messageContent, setMessageContent] = React.useState("");
  const [openProfile, setOpenProfile] = React.useState(false);
  const [contactData, setContactData] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");

  // recuperar los chats desde un API al cargar el componente
  React.useEffect(() => {
    const fetchRecentChats = async () => {
      try {
        const chatsData = await getRecentChats(actualUserEmail);
        setRecentChats(chatsData);
        console.log("Chats recientes obtenidos:", chatsData);
      } catch (error) {
        console.error("Error fetching recent chats:", error);
      }
    };

    fetchRecentChats();
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
      const response = await sendChatMessage(messageData);
      console.log("Mensaje enviado:", response);

      // Si el mensaje fue enviado correctamente, actualizar el chat
      setChats(prevChats => [...prevChats, response]);
      setMessageContent("");

    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  // Funcion para obtener los datos de contacto de un usuario
  const obtainContactData = async (senderEmail, receiverEmail) => {
    try {
      const contactInfo = await getContactData(senderEmail, receiverEmail);
      setContactData(contactInfo);
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };

  const obtainUsersChat = async (senderEmail, receiverEmail) => {
    try {
      const chatMessages = await getChatMessages(senderEmail, receiverEmail);
      console.log("Mensajes obtenidos:", chatMessages);
      setChats(chatMessages);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  // Manejar la seleccion de un chat
  const handleChatSelect = (chat_Id) => {
    const chatObj = recentChats.find(chat => chat._id === chat_Id);
    if (chatObj) {
      setSelectedChat(chatObj);
      setOpenProfile(false);
      console.log("Chat seleccionado:", chatObj);
      obtainUsersChat(actualUserEmail, chatObj.senderEmail === actualUserEmail ? chatObj.receiverEmail : chatObj.senderEmail);
    } else {
      console.warn("Chat not found:", chat_Id);
    }
  };

  // Peticiones periodicas para actualizar los chats y mensajes, corregir a futuro y cambiar a WebSockets
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (selectedChat) {
  //       obtainUsersChat(actualUserEmail, selectedChat.senderEmail === actualUserEmail ? selectedChat.receiverEmail : selectedChat.senderEmail);
  //     }
  //     getRecentChats(actualUserEmail).then(chatsData => {
  //       setRecentChats(chatsData);
  //     }).catch(error => {
  //       console.error("Error fetching recent chats:", error);
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [selectedChat, actualUserEmail]);

  const bottomRef = React.useRef(null);

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
              const destinRealAvatar = actualUserEmail === chat.senderEmail ? chat.receiverPathProfilePicture : chat.senderPathProfilePicture;
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
              {/* Avatar del chat */}
              <Avatar
                src={
                  selectedChat
                    ? (selectedChat.senderEmail === actualUserEmail
                      ? selectedChat.receiverPathProfilePicture
                      : selectedChat.senderPathProfilePicture)
                    : PerfilImg
                }
                sx={{ width: 48, height: 48, mr: 2 }}
              />

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
                  src={typeof message.content === 'object' ? message.content.filepath : undefined}
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
              name: contactData.contactName || 'No disponib',
              job: contactData.contactOccupation || 'No disponible',
              phone1: contactData.contactPhone || 'No disponible',
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
