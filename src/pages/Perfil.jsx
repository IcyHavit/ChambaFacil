import PerfilCliente from '../components/Perfil/PerfilCliente';
import PerfilPrestamista from '../components/Perfil/PerfilPrestamista';

export default function Perfil() {
  const tipoUsuario = 'Cliente'; // puede venir de auth context o API

  return tipoUsuario === 'Cliente'
    ? <PerfilCliente />
    : <PerfilPrestamista />;
}
