// MessageBubble.jsx  (versión simplificada)
import { Box, Typography, useTheme } from '@mui/material';
import pdfIcon from '../../assets/images/pdf-icon.png';
import { Link } from 'react-router-dom';

export default function MessageBubble({
  from,
  messageType,   // 'text' | 'image'
  text,
  src,
  fileName,
  time,
}) {
  const theme = useTheme();
  const isMe = from === 'me';
  const isImg = messageType === 'image';

  const srcLast3 = src ? src.slice(-3).toLowerCase() : '';
  if (srcLast3 == 'pdf') {
    messageType = 'pdf';
  }


  return (
    <Box
      sx={{
        /* lado de la burbuja */
        ml: isMe ? 'auto' : 0,
        mr: isMe ? 0 : 'auto',

        bgcolor: isMe
          ? theme.palette.primary.main
          : theme.palette.grey[200],
        color: isMe
          ? theme.palette.primary.contrastText
          : theme.palette.text.primary,

        p: isImg ? 1 : 1.2,
        borderRadius: theme.shape.borderRadius * 2,
        fontSize: '0.9rem',

        /* 👇 EL CAMBIO CLAVE 👇 */
        display: 'inline-flex',          // ancho = contenido
        flexDirection: 'column',
        maxWidth: '70%',                 // límite superior
      }}
    >
      {/* ------ TEXTO ------ */}
      {messageType === 'text' && (
        <>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
            {text}
          </Typography>

          <Typography
            variant="caption"
            sx={{ mt: 0.3, opacity: 0.6, textAlign: 'right' }}
          >
            {time}
          </Typography>
        </>
      )}

      {/* ------ IMAGEN ------ */}
      {messageType === 'image' && (
        <>
          <Box
            component="img"
            src={src}
            alt={text || 'imagen enviada'}
            sx={{ width: 300, borderRadius: 1 }}
          />

          <Typography
            variant="caption"
            sx={{ mt: 0.3, opacity: 0.6, textAlign: 'right' }}
          >
            {time}
          </Typography>
        </>
      )}

      {/* ------ PDF ------ */}
      {messageType === 'pdf' && (
        <>
          <Box
            component="img"
            src={pdfIcon}
            alt="PDF enviado"
            sx={{ width: 50, height: 50, mb: 1, borderRadius: 1, alignSelf: 'center' }}
            onClick={() => window.open(src, '_blank')}
            loading="lazy"
          />

          <Link
            to={src}
            target="_blank"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {fileName || 'documento PDF'}
            </Typography>
          </Link>

          <Typography
            variant="caption"
            sx={{ mt: 0.3, opacity: 0.6, textAlign: 'right' }}
          >
            {time}
          </Typography>
        </>
      )}

    </Box>
  );
}
