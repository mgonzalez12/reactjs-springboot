import { UsersList } from "../components/UsersList";
import { usersReducer } from "../reducers/usersReducer";
import { useUsers } from "../hooks/useUsers";
import { UserModelForm } from "../components/UserModelForm";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../auth/context/AuthContext";


export const UsersPage = () => {

  const {
    users,
    visibleForm,
    handlerOpenForm,
    getUsers,
  
  } = useContext(UserContext);

  const {login } = useContext(AuthContext);

  useEffect( () => {
    getUsers();
  }, [])

  return (
    <>

      {!visibleForm ||
        <UserModelForm/>
      }
      <div className="container my-4">
        <h2>User App</h2>
        <div className="row">
          <div className="col">
            {(visibleForm || !login.isAdmin )||
              <button className="btn btn-primary my-2"
                onClick={handlerOpenForm}>
                Nuevo Usuario
              </button>
            }
            {users.length === 0 ?
              <div className="alert alert-warning">No hay usuario en el sistema</div>
              : <UsersList />
            }
          </div>

        </div>
      </div>
    </>
  );
}
