import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/user.store';
import { jwtDecode } from 'jwt-decode';
import usuarioStore from '../store/usuarioStore';
import useUsuarioCache from '../hooks/usuario/useUsuarioCache';

export const PublicRoutes = ({children}) => {
  
  //const user = useUserStore(state => state.user)
  const {userCredentials} =useUsuarioCache()
  
  if (!userCredentials?.accessToken) {
    return <>{children}</>
  }

  const tokenString = JSON.stringify(userCredentials?.accessToken);
  
  try {
    const decodedToken = jwtDecode(tokenString);
    if ( decodedToken.exp * 1000 < Date.now() ) {
      return (
      <> {children} </>
      )
    }
  } catch (error) {
    return <Navigate to="/login" />;
  }

  return <Navigate to="/user/home" />;
}