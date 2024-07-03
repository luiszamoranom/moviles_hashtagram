import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/user.store';
import { jwtDecode } from 'jwt-decode';

export const PublicRoutes = ({children}) => {
  
  const user = useUserStore(state => state.user)
  
  if (!user.token) {
    return <>{children}</>
  }

  const tokenString = JSON.stringify(user.token);
  
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