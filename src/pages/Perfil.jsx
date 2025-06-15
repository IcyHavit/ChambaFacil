import PerfilCliente from '../components/Perfil/PerfilCliente';
import PerfilPrestamista from '../components/Perfil/PerfilPrestamista';

export default function Perfil() {
const tipoUsuario = 'prestamista'; // Temporal, reemplaza por contexto de autenticación real

return tipoUsuario === ''
  ? <PerfilCliente />
  : <PerfilPrestamista />;

}

