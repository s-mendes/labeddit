import { useNavigate } from 'react-router-dom';
import { goToLogin } from '../routes/coordinator';
import { useEffect } from 'react';
import { isExpired, decodeToken } from 'react-jwt';

function useProtectPage () {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = decodeToken(token);
    const tokenExpired = isExpired(token);

    if (token === null) {
      goToLogin(navigate);
    }

    if(tokenExpired) {
      goToLogin(navigate);
    }

    if (!decodedToken) {
      goToLogin(navigate);
    }

  }, [navigate]);
}

export default useProtectPage;
