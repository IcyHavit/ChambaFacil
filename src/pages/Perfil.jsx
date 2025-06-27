import PerfilCliente from '../components/Perfil/PerfilCliente';
import PerfilPrestamista from '../components/Perfil/PerfilPrestamista';

export default function Perfil() {
const tipoUsuario = localStorage.getItem('role');

return tipoUsuario === 'prestamista'
  ? <PerfilPrestamista />
  : <PerfilCliente />;

}

