import PerfilGeneral from '../components/Perfil/PerfilGeneral';

export default function Perfil() {
  const tipoUsuario = 'Cliente'; // o 'Prestamista' desde tu estado global/contexto
  return <PerfilGeneral userType={tipoUsuario} />;
}
