import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const initialLogin = JSON.parse(sessionStorage.getItem('')) || {
  isAuth: false,
  isAdmin: false,
  user: undefined,
}

export const useAuth = () => {
  const [login, dispatch] = useReducer(loginReducer, initialLogin);
  const navigate = useNavigate();

  const handlerLogin = async ({ username, password }) => {
    try {
      const response = await loginUser({ username, password });
      const token = response.data.token;
      const claims = JSON.parse(window.atob(token.split('.')[1]));
      console.log(claims);
      const user = { username: claims.sub };
      dispatch({
        type: 'login',
        payload: { user, isAdmin: claims.isAdmin },
      });
      sessionStorage.setItem('login', JSON.stringify({
        isAuth: true,
        isAdmin: claims.isAdmin,
        user,
      }));
      sessionStorage.setItem('token', `Bearer ${token}`);
      navigate('/users');
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire('Error Login', 'Username o password inválidos', 'error');
      }
      if (error.response.status === 403) {
        Swal.fire('Error Login', 'No tiene acceso o permisos al recurso!', 'error');
      } else {
        throw error;
      }
    }
  };

  const handlerLogout = () => {
    dispatch({
      type: 'logout',
    });
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('token');
    sessionStorage.clear();
  };

  return {
    login,
    handlerLogin,
    handlerLogout,
  };
};

